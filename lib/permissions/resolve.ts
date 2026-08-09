import { and, desc, eq, gt, isNull, or, sql } from "drizzle-orm";
import type { Db } from "@/lib/db";
import {
  businessSubscriptions,
  leadRecipients,
  planFeatures,
  plans,
} from "@/lib/db/schema";
import { EXPIRED_FEATURES, type FeatureMap } from "./features";

/**
 * Resolve a business's live entitlements.
 *
 * Everything that decides what a visitor sees, or what a business may read on
 * a lead, starts here. There is deliberately one path: no component, route or
 * query may work out permissions for itself.
 *
 * A subscription counts as active when its status says so AND it has not
 * expired. Checking status alone would keep a lapsed plan alive until some
 * cron job noticed, which means a business could stop paying and keep its
 * contact details visible. Expiry is evaluated on read, so it is exact.
 */

export type Entitlements = {
  features: FeatureMap;
  planId: number | null;
  planName: string | null;
  expiresAt: Date | null;
  /** False when the business is on the expired fallback. */
  active: boolean;
};

export const EXPIRED_ENTITLEMENTS: Entitlements = {
  features: EXPIRED_FEATURES,
  planId: null,
  planName: null,
  expiresAt: null,
  active: false,
};

export async function entitlementsFor(
  db: Db,
  businessId: number,
): Promise<Entitlements> {
  const now = new Date();

  const [sub] = await db
    .select({
      planId: plans.id,
      planName: plans.name,
      expiresAt: businessSubscriptions.expiresAt,
    })
    .from(businessSubscriptions)
    .innerJoin(plans, eq(plans.id, businessSubscriptions.planId))
    .where(
      and(
        eq(businessSubscriptions.businessId, businessId),
        eq(businessSubscriptions.status, "active"),
        // Null expiry is the open-ended free tier, not a missing value.
        or(
          isNull(businessSubscriptions.expiresAt),
          gt(businessSubscriptions.expiresAt, now),
        ),
      ),
    )
    // Highest-priced wins if a business somehow holds two active rows, so a
    // billing glitch never downgrades someone who has paid more.
    .orderBy(desc(plans.priceMinor), desc(businessSubscriptions.startsAt))
    .limit(1);

  if (!sub) return EXPIRED_ENTITLEMENTS;

  const rows = await db
    .select({ key: planFeatures.featureKey, value: planFeatures.featureValue })
    .from(planFeatures)
    .where(eq(planFeatures.planId, sub.planId));

  const features: Record<string, string> = { ...EXPIRED_FEATURES };
  for (const r of rows) features[r.key] = r.value;

  return {
    features: Object.freeze(features),
    planId: sub.planId,
    planName: sub.planName,
    expiresAt: sub.expiresAt ?? null,
    active: true,
  };
}

/** Batch version, so a listing page of 12 businesses runs two queries, not 24. */
export async function entitlementsForMany(
  db: Db,
  businessIds: number[],
): Promise<Map<number, Entitlements>> {
  const out = new Map<number, Entitlements>();
  if (businessIds.length === 0) return out;
  for (const id of businessIds) out.set(id, EXPIRED_ENTITLEMENTS);

  const now = new Date();
  const subs = await db
    .select({
      businessId: businessSubscriptions.businessId,
      planId: plans.id,
      planName: plans.name,
      priceMinor: plans.priceMinor,
      expiresAt: businessSubscriptions.expiresAt,
    })
    .from(businessSubscriptions)
    .innerJoin(plans, eq(plans.id, businessSubscriptions.planId))
    .where(
      and(
        sql`${businessSubscriptions.businessId} IN ${businessIds}`,
        eq(businessSubscriptions.status, "active"),
        or(
          isNull(businessSubscriptions.expiresAt),
          gt(businessSubscriptions.expiresAt, now),
        ),
      ),
    );

  // Keep the best plan per business.
  const best = new Map<number, (typeof subs)[number]>();
  for (const s of subs) {
    const cur = best.get(s.businessId);
    if (!cur || s.priceMinor > cur.priceMinor) best.set(s.businessId, s);
  }
  if (best.size === 0) return out;

  const planIds = [...new Set([...best.values()].map((s) => s.planId))];
  const featureRows = await db
    .select({
      planId: planFeatures.planId,
      key: planFeatures.featureKey,
      value: planFeatures.featureValue,
    })
    .from(planFeatures)
    .where(sql`${planFeatures.planId} IN ${planIds}`);

  const byPlan = new Map<number, Record<string, string>>();
  for (const r of featureRows) {
    const m = byPlan.get(r.planId) ?? { ...EXPIRED_FEATURES };
    m[r.key] = r.value;
    byPlan.set(r.planId, m);
  }

  for (const [businessId, s] of best) {
    out.set(businessId, {
      features: Object.freeze(byPlan.get(s.planId) ?? { ...EXPIRED_FEATURES }),
      planId: s.planId,
      planName: s.planName,
      expiresAt: s.expiresAt ?? null,
      active: true,
    });
  }

  return out;
}

/**
 * Unlocks this business has spent in the current billing month.
 *
 * Counted from lead_recipients rather than a running total on the subscription,
 * because a counter can drift and this cannot - the unlocks themselves are the
 * record.
 */
export async function unlocksUsedThisMonth(
  db: Db,
  businessId: number,
  since: Date,
): Promise<number> {
  const [row] = await db
    .select({ n: sql<number>`count(*)` })
    .from(leadRecipients)
    .where(
      and(
        eq(leadRecipients.businessId, businessId),
        eq(leadRecipients.unlockSource, "plan_allowance"),
        gt(leadRecipients.unlockedAt, since),
      ),
    );
  return row?.n ?? 0;
}

/** Start of the current calendar month, used as the quota window. */
export function currentQuotaWindow(now = new Date()): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}
