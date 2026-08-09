import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { PortalNav } from "@/components/portal/portal-nav";
import {
  getCategoryBySlug,
  getChildLocations,
  getCountry,
  getLocationBySlug,
  getRelatedCategories,
  listBusinesses,
} from "@/lib/directory/queries";
import { BusinessCard } from "@/components/portal/business-card";
import { AdSlot } from "@/components/portal/ad-slot";
import { ListingFilters } from "@/components/portal/listing-filters";

/**
 * Category listing for one emirate - the SEO pages the client is counting on.
 *
 * URL shape is his: /uae/dubai/cleaning-companies/.
 *
 * These are rendered on demand and cached rather than prebuilt. 33 cities and
 * 225 sub-categories is over 7,000 possible URLs; prebuilding them all would
 * make every deploy crawl and would publish thousands of empty pages, which is
 * how a directory earns a thin-content penalty instead of traffic. Pages come
 * into existence when they have something on them.
 */

type Props = {
  params: Promise<{ emirate: string; category: string }>;
  searchParams: Promise<{ page?: string; sort?: string; minRating?: string }>;
};

/**
 * Rendered per request. The D1 binding does not exist during the build, so
 * these pages cannot prerender; caching moves to ISR once an incremental cache
 * is configured in open-next.config.ts.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { emirate, category } = await params;
  const country = await getCountry("ae");
  if (!country) return {};

  const [loc, cat] = await Promise.all([
    getLocationBySlug(country.id, emirate),
    getCategoryBySlug(country.id, category),
  ]);
  if (!loc || !cat) return {};

  const title = `${cat.name} in ${loc.name}`;
  return {
    title,
    description: `Find and compare ${cat.name.toLowerCase()} in ${loc.name}, UAE. Verified companies, direct contact details and enquiries in one place.`,
    alternates: { canonical: `/uae/${loc.slug}/${cat.slug}/` },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { emirate, category } = await params;
  const { page: pageParam, sort, minRating } = await searchParams;

  const country = await getCountry("ae");
  if (!country) notFound();

  const [loc, cat] = await Promise.all([
    getLocationBySlug(country.id, emirate),
    getCategoryBySlug(country.id, category),
  ]);
  if (!loc || !cat) notFound();

  // An emirate page also covers businesses registered against its cities.
  const children = loc.parentId === null ? await getChildLocations(loc.id) : [];

  const { items, total, page, perPage } = await listBusinesses({
    countryId: country.id,
    categoryId: cat.id,
    locationId: loc.id,
    childLocationIds: children.map((c) => c.id),
    sort: (sort as "featured" | "rating" | "newest" | "name") ?? "featured",
    minRating: minRating ? Number.parseInt(minRating, 10) : undefined,
    page: Number.parseInt(pageParam ?? "1", 10) || 1,
  });

  const related = await getRelatedCategories(cat.id);
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <>
      <PortalNav />

      <main>
        {/* ── Header ───────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-deep py-10 lg:py-14">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="deep-grid absolute inset-0 opacity-60" />
            <div className="absolute -right-32 -top-24 size-[420px] rounded-full bg-brand-600/20 blur-[110px]" />
          </div>

          <div className="container-page relative">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-deep-muted">
              <Link href="/uae/" className="hover:text-white">Directory</Link>
              <ChevronRight className="size-3" aria-hidden />
              <Link href={`/uae/${loc.slug}/`} className="hover:text-white">{loc.name}</Link>
              <ChevronRight className="size-3" aria-hidden />
              <span className="text-white">{cat.name}</span>
            </nav>

            <h1 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-white">
              {cat.name} in <span className="text-brand-400">{loc.name}</span>
            </h1>
            <p className="mt-3 text-[14.5px] text-deep-muted">
              {total === 0
                ? "No businesses listed here yet."
                : `${total} ${total === 1 ? "business" : "businesses"} listed.`}
            </p>
          </div>
        </section>

        {/* ── Results ──────────────────────────────────────────────────── */}
        <section className="bg-surface-2 py-10 lg:py-14">
          <div className="container-page grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <ListingFilters
                basePath={`/uae/${loc.slug}/${cat.slug}/`}
                current={{ sort, minRating }}
                areas={children}
                hasRatings={items.some((b) => b.ratingCount > 0)}
              />

              <div className="mt-5" />

              {items.length === 0 ? (
                <EmptyState categoryName={cat.name} locationName={loc.name} />
              ) : (
                <ul className="flex flex-col gap-3.5">
                  {items.map((b) => (
                    <li key={b.id}>
                      <BusinessCard business={b} />
                    </li>
                  ))}
                </ul>
              )}

              {totalPages > 1 && (
                <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                  {page > 1 && (
                    <Link
                      href={`/uae/${loc.slug}/${cat.slug}/?page=${page - 1}`}
                      className="rounded-full border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink-2 hover:border-brand-300"
                    >
                      Previous
                    </Link>
                  )}
                  <span className="px-3 text-[13px] text-ink-3">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages && (
                    <Link
                      href={`/uae/${loc.slug}/${cat.slug}/?page=${page + 1}`}
                      className="rounded-full border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink-2 hover:border-brand-300"
                    >
                      Next
                    </Link>
                  )}
                </nav>
              )}
            </div>

            {/* ── Related categories, the client's cross-sell ──────────── */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <AdSlot
                countryId={country.id}
                placement="sidebar"
                categoryId={cat.id}
                locationId={loc.id}
                seed={`${loc.slug}/${cat.slug}`}
                className="mb-4"
              />

              {related.length > 0 && (
                <div className="rounded-2xl border border-line bg-white p-5 shadow-e1">
                  <h2 className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
                    Businesses you may also need
                  </h2>
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {related.map((r) => (
                      <li key={r.id}>
                        <Link
                          href={`/uae/${loc.slug}/${r.slug}/`}
                          className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-[13px] text-ink-2
                            transition-colors hover:bg-brand-50 hover:text-green-text"
                        >
                          <ChevronRight className="size-3.5 shrink-0 text-brand-400" strokeWidth={2.5} aria-hidden />
                          {r.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {children.length > 0 && (
                <div className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-e1">
                  <h2 className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
                    Areas in {loc.name}
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {children.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/uae/${c.slug}/${cat.slug}/`}
                          className="inline-block rounded-full border border-line bg-surface-2 px-2.5 py-1
                            text-[11.5px] font-medium text-ink-2 hover:border-brand-300 hover:text-green-text"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

function EmptyState({
  categoryName,
  locationName,
}: {
  categoryName: string;
  locationName: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
      <h2 className="font-display text-[17px] font-bold tracking-[-0.02em] text-ink">
        No {categoryName.toLowerCase()} listed in {locationName} yet
      </h2>
      <p className="mx-auto mt-2.5 max-w-md text-[14px] leading-[1.7] text-ink-2">
        This category is live but has no businesses yet. If you run one, listing
        it here takes a couple of minutes.
      </p>
      <Link
        href="/uae/register/"
        className="mt-6 inline-flex h-11 items-center rounded-full bg-brand-600 px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-500"
      >
        List your business
      </Link>
    </div>
  );
}
