import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { analyticsEvents, leadRecipients } from "@/lib/db/schema";
import {
  currentQuotaWindow,
  entitlementsFor,
  unlocksUsedThisMonth,
} from "@/lib/permissions/resolve";
import { canUnlockLead } from "@/lib/permissions/visibility";
import { leadAccess } from "@/lib/permissions/features";

/**
 * Spending an unlock on a lead.
 *
 * This is the moment the product earns money, so it is deliberately strict:
 *
 *   - Entitlements are read fresh from the database, never from anything the
 *     client sent. A posted plan id would be a free upgrade.
 *   - The row must already exist in lead_recipients. A business can only unlock
 *     leads that were routed to it; passing someone else's lead id fails.
 *   - Unlocking is recorded permanently. A later downgrade does not revoke a
 *     lead the business has already paid to see, which is both fair and what
 *     the client's PDF describes.
 *   - Quota is counted from the unlock rows themselves rather than a running
 *     total, so it cannot drift out of step with reality.
 */

export type UnlockResult =
  | { ok: true; alreadyUnlocked: boolean }
  | { ok: false; reason: "not_found" | "plan" | "quota"; message: string };

export async function unlockLead(
  businessId: number,
  leadId: number,
): Promise<UnlockResult> {
  const db = await getDb();

  const [recipient] = await db
    .select({
      id: leadRecipients.id,
      unlockedAt: leadRecipients.unlockedAt,
    })
    .from(leadRecipients)
    .where(
      and(
        eq(leadRecipients.leadId, leadId),
        eq(leadRecipients.businessId, businessId),
      ),
    )
    .limit(1);

  if (!recipient) {
    return {
      ok: false,
      reason: "not_found",
      message: "That enquiry is not available to your business.",
    };
  }

  if (recipient.unlockedAt) return { ok: true, alreadyUnlocked: true };

  const ent = await entitlementsFor(db, businessId);
  const access = leadAccess(ent.features);

  // On a full-access plan nothing is spent - the details are simply visible,
  // so record it as such and do not consume an allowance.
  if (access === "full") {
    await db
      .update(leadRecipients)
      .set({ unlockedAt: new Date(), unlockSource: "plan_unlimited" })
      .where(eq(leadRecipients.id, recipient.id));
    await logUnlock(businessId, leadId);
    return { ok: true, alreadyUnlocked: false };
  }

  const used = await unlocksUsedThisMonth(db, businessId, currentQuotaWindow());
  const allowed = canUnlockLead(ent.features, used);

  if (!allowed.allowed) {
    return allowed.reason === "plan"
      ? {
          ok: false,
          reason: "plan",
          message:
            "Your current plan does not include customer contact details. Upgrade to unlock this enquiry.",
        }
      : {
          ok: false,
          reason: "quota",
          message:
            "You have used all your lead unlocks this month. Upgrade for unlimited access.",
        };
  }

  // Guarded on unlockedAt still being null so two rapid clicks cannot spend
  // two allowances on the same lead.
  await db
    .update(leadRecipients)
    .set({ unlockedAt: new Date(), unlockSource: "plan_allowance" })
    .where(
      and(eq(leadRecipients.id, recipient.id), isNull(leadRecipients.unlockedAt)),
    );

  await logUnlock(businessId, leadId);
  return { ok: true, alreadyUnlocked: false };
}

async function logUnlock(businessId: number, leadId: number): Promise<void> {
  try {
    const db = await getDb();
    await db.insert(analyticsEvents).values({
      businessId,
      leadId,
      eventType: "LEAD_UNLOCK",
      createdAt: new Date(),
    });
  } catch {
    // Analytics must never fail the unlock the business just paid for.
  }
}

/** Marks a lead as seen. Separate from unlocking - viewing is always free. */
export async function markLeadViewed(
  businessId: number,
  leadId: number,
): Promise<void> {
  const db = await getDb();
  await db
    .update(leadRecipients)
    .set({ viewedAt: new Date() })
    .where(
      and(
        eq(leadRecipients.leadId, leadId),
        eq(leadRecipients.businessId, businessId),
        isNull(leadRecipients.viewedAt),
      ),
    );
}
