import { and, eq, gt, isNull, lt, or, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { ads, analyticsEvents } from "@/lib/db/schema";
import type { Ad } from "@/lib/db/schema";

/**
 * Pick an ad for a slot.
 *
 * Targeting is optional on both axes: an ad with no category and no location
 * runs everywhere. More specific ads win, because an advertiser paying to
 * target cleaning companies in Dubai should not be outranked by a generic
 * banner that happens to have a higher weight.
 *
 * Selection among equally specific candidates is weighted but deterministic per
 * request rather than random - Math.random in a server component would make the
 * markup differ between the server and client render.
 */

export type AdSlot = "hero" | "sidebar" | "footer" | "listing";

export async function selectAd(opts: {
  countryId: number;
  placement: AdSlot;
  categoryId?: number | null;
  locationId?: number | null;
  /** Anything stable per page - the URL works well. */
  seed?: string;
}): Promise<Ad | null> {
  const db = await getDb();
  const now = new Date();

  const candidates = await db
    .select()
    .from(ads)
    .where(
      and(
        eq(ads.countryId, opts.countryId),
        eq(ads.placement, opts.placement),
        eq(ads.status, "active"),
        or(isNull(ads.startsAt), lt(ads.startsAt, now)),
        or(isNull(ads.endsAt), gt(ads.endsAt, now)),
      ),
    );

  const eligible = candidates.filter(
    (a) =>
      (a.categoryId === null || a.categoryId === opts.categoryId) &&
      (a.locationId === null || a.locationId === opts.locationId),
  );
  if (eligible.length === 0) return null;

  // Specificity: both matched beats one beats none.
  const score = (a: Ad) =>
    (a.categoryId === null ? 0 : 1) + (a.locationId === null ? 0 : 1);
  const best = Math.max(...eligible.map(score));
  const pool = eligible.filter((a) => score(a) === best);
  if (pool.length === 1) return pool[0];

  const totalWeight = pool.reduce((n, a) => n + Math.max(1, a.weight), 0);
  let cursor = hash(opts.seed ?? opts.placement) % totalWeight;
  for (const a of pool) {
    cursor -= Math.max(1, a.weight);
    if (cursor < 0) return a;
  }
  return pool[0];
}

/** Small stable string hash. Not cryptographic - only used to spread traffic. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export async function recordAdImpression(adId: number): Promise<void> {
  try {
    const db = await getDb();
    await db
      .update(ads)
      .set({ impressions: sql`${ads.impressions} + 1` })
      .where(eq(ads.id, adId));
  } catch {
    // Never let ad accounting break a page render.
  }
}

export async function recordAdClick(adId: number): Promise<void> {
  const db = await getDb();
  await db
    .update(ads)
    .set({ clicks: sql`${ads.clicks} + 1` })
    .where(eq(ads.id, adId));
  await db.insert(analyticsEvents).values({
    eventType: "AD_CLICK",
    meta: { adId },
    createdAt: new Date(),
  });
}
