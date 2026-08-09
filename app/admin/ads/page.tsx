import type { Metadata } from "next";
import { asc, desc, eq, isNotNull, and } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { ads, categories, countries, locations } from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/guard";
import { AdManager } from "@/components/portal/ad-manager";

export const metadata: Metadata = { title: "Sponsored placements", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  await requirePermission("ad.manage", "/admin/ads/");
  const db = await getDb();

  const [country] = await db
    .select({ id: countries.id })
    .from(countries)
    .where(eq(countries.code, "ae"))
    .limit(1);
  if (!country) return null;

  const [rows, cats, locs] = await Promise.all([
    db
      .select({
        id: ads.id,
        title: ads.title,
        subtitle: ads.subtitle,
        image: ads.image,
        targetUrl: ads.targetUrl,
        placement: ads.placement,
        status: ads.status,
        impressions: ads.impressions,
        clicks: ads.clicks,
        categoryName: categories.name,
        locationName: locations.name,
      })
      .from(ads)
      .leftJoin(categories, eq(categories.id, ads.categoryId))
      .leftJoin(locations, eq(locations.id, ads.locationId))
      .where(eq(ads.countryId, country.id))
      .orderBy(desc(ads.createdAt)),
    db
      .select({ id: categories.id, name: categories.name })
      .from(categories)
      .where(and(eq(categories.countryId, country.id), isNotNull(categories.parentId)))
      .orderBy(asc(categories.name)),
    db
      .select({ id: locations.id, name: locations.name })
      .from(locations)
      .where(eq(locations.countryId, country.id))
      .orderBy(asc(locations.sortOrder)),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.035em] text-ink">
          Sponsored placements
        </h1>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-[1.7] text-ink-2">
          Leave category and emirate empty for a placement that runs everywhere.
          More specific placements win over general ones.
        </p>
      </header>

      <AdManager ads={rows} categories={cats} locations={locs} />
    </div>
  );
}
