import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { countries, planFeatures, plans } from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/guard";
import { FEATURE } from "@/lib/permissions/features";
import { PlanFeatureEditor } from "@/components/portal/plan-feature-editor";

/**
 * Plan and feature permission management.
 *
 * This is the screen the whole permission design exists to make possible: the
 * client changes what AED 349 includes here, and every profile, listing and
 * lead in the portal respects it on the next request. No deploy, no migration,
 * no code change - which is exactly what both of his PDFs asked for.
 */

export const metadata: Metadata = { title: "Plans", robots: { index: false } };
export const dynamic = "force-dynamic";

/** Feature keys grouped for the editor, with the input type each expects. */
const EDITABLE: { key: string; label: string; kind: "bool" | "number" | "leadAccess" }[] = [
  { key: FEATURE.LISTING, label: "Business listing", kind: "bool" },
  { key: FEATURE.PASSPORT, label: "Digital Business Card", kind: "bool" },
  { key: FEATURE.RICH_PROFILE, label: "Full profile (services, offers)", kind: "bool" },
  { key: FEATURE.CONTACT_VISIBLE, label: "Contact details visible", kind: "bool" },
  { key: FEATURE.WHATSAPP_VISIBLE, label: "WhatsApp button", kind: "bool" },
  { key: FEATURE.SOCIAL_VISIBLE, label: "Social links visible", kind: "bool" },
  { key: FEATURE.LEAD_ACCESS, label: "Lead contact access", kind: "leadAccess" },
  { key: FEATURE.LEAD_UNLOCK_QUOTA, label: "Lead unlocks per month", kind: "number" },
  { key: FEATURE.VERIFIED_BADGE, label: "Verified badge", kind: "bool" },
  { key: FEATURE.LEAD_GENERATION, label: "Receives matched leads", kind: "bool" },
  { key: FEATURE.PRIORITY_LISTING, label: "Priority in listings", kind: "bool" },
  { key: FEATURE.ANALYTICS, label: "Analytics dashboard", kind: "bool" },
  { key: FEATURE.IMAGE_QUOTA, label: "Gallery images allowed", kind: "number" },
  { key: FEATURE.POSTERS_PER_MONTH, label: "Posters per month", kind: "number" },
  { key: FEATURE.VIDEOS_PER_MONTH, label: "Video ads per month", kind: "number" },
];

export default async function Page() {
  await requirePermission("plan.manage", "/admin/plans/");
  const db = await getDb();

  const [country] = await db
    .select({ id: countries.id })
    .from(countries)
    .where(eq(countries.code, "ae"))
    .limit(1);
  if (!country) return null;

  const [planRows, featureRows] = await Promise.all([
    db
      .select({
        id: plans.id,
        name: plans.name,
        slug: plans.slug,
        priceMinor: plans.priceMinor,
        currency: plans.currency,
      })
      .from(plans)
      .where(eq(plans.countryId, country.id))
      .orderBy(asc(plans.sortOrder)),
    db
      .select({
        planId: planFeatures.planId,
        key: planFeatures.featureKey,
        value: planFeatures.featureValue,
      })
      .from(planFeatures),
  ]);

  const byPlan = new Map<number, Record<string, string>>();
  for (const f of featureRows) {
    const m = byPlan.get(f.planId) ?? {};
    m[f.key] = f.value;
    byPlan.set(f.planId, m);
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.035em] text-ink">
          Plans &amp; permissions
        </h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-[1.7] text-ink-2">
          What each plan grants. Changes take effect immediately across every
          listing, profile and lead - no deployment needed.
        </p>
      </header>

      <div className="flex flex-col gap-5">
        {planRows.map((p) => (
          <PlanFeatureEditor
            key={p.id}
            plan={{
              id: p.id,
              name: p.name,
              price:
                p.priceMinor === 0
                  ? "Free"
                  : `${p.currency} ${(p.priceMinor / 100).toLocaleString()}`,
            }}
            features={byPlan.get(p.id) ?? {}}
            editable={EDITABLE}
          />
        ))}
      </div>
    </div>
  );
}
