import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { PortalNav } from "@/components/portal/portal-nav";
import {
  getCountry,
  getEmirates,
  getLocationBySlug,
  getChildLocations,
  listBusinesses,
} from "@/lib/directory/queries";
import { BusinessCard } from "@/components/portal/business-card";

/**
 * Search results.
 *
 * Not indexed - search result pages are the classic thin-content trap, and
 * having Google index every query string a visitor happens to type is how a
 * directory dilutes the category pages that should be ranking instead.
 */

export const metadata: Metadata = {
  title: "Search businesses",
  robots: { index: false, follow: true },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; emirate?: string; page?: string; sort?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { q = "", emirate, page: pageParam, sort } = await searchParams;
  const country = await getCountry("ae");

  if (!country) {
    return (
      <>
        <PortalNav />
        <main className="container-page py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-ink">Not configured</h1>
        </main>
      </>
    );
  }

  const emirates = await getEmirates(country.id);
  const loc = emirate ? await getLocationBySlug(country.id, emirate) : null;
  const children = loc && loc.parentId === null ? await getChildLocations(loc.id) : [];

  const results = q.trim()
    ? await listBusinesses({
        countryId: country.id,
        search: q,
        locationId: loc?.id,
        childLocationIds: children.map((c) => c.id),
        sort: (sort as "featured" | "rating" | "newest" | "name") ?? "featured",
        page: Number.parseInt(pageParam ?? "1", 10) || 1,
        perPage: 24,
      })
    : { items: [], total: 0, page: 1, perPage: 24 };

  return (
    <>
      <PortalNav query={q} />

      <main>
        <section className="border-b border-line bg-white py-6">
          <div className="container-page">
            <form action="/uae/search/" className="flex flex-col gap-2.5 sm:flex-row">
              <div className="relative flex-1">
                <label htmlFor="q" className="sr-only">Search</label>
                <SearchIcon
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-3"
                  strokeWidth={2}
                  aria-hidden
                />
                <input
                  id="q"
                  name="q"
                  defaultValue={q}
                  placeholder="Search businesses, services or keywords"
                  className="h-11 w-full rounded-full border border-line bg-surface-2 pl-11 pr-4 text-[13.5px]
                    text-ink outline-none transition-colors placeholder:text-ink-3
                    focus-visible:border-brand-400 focus-visible:bg-white"
                />
              </div>

              <label htmlFor="emirate" className="sr-only">Emirate</label>
              <select
                id="emirate"
                name="emirate"
                defaultValue={emirate ?? ""}
                className="h-11 rounded-full border border-line bg-surface-2 px-4 text-[13.5px] text-ink
                  outline-none focus-visible:border-brand-400"
              >
                <option value="">All emirates</option>
                {emirates.map((e) => (
                  <option key={e.id} value={e.slug}>{e.name}</option>
                ))}
              </select>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-6
                  text-[13.5px] font-bold text-white transition-colors hover:bg-brand-500"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="bg-surface-2 py-8 lg:py-12">
          <div className="container-page">
            <h1 className="font-display text-[20px] font-bold tracking-[-0.03em] text-ink">
              {q.trim() ? (
                <>
                  {results.total} {results.total === 1 ? "result" : "results"} for{" "}
                  <span className="text-green-text">&ldquo;{q}&rdquo;</span>
                </>
              ) : (
                "Search the directory"
              )}
              {loc && <span className="text-ink-2"> in {loc.name}</span>}
            </h1>

            {!q.trim() ? (
              <p className="mt-3 text-[14px] text-ink-2">
                Enter a business name, service or keyword above, or{" "}
                <Link href="/uae/categories/" className="font-semibold text-green-text">
                  browse all categories
                </Link>
                .
              </p>
            ) : results.items.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
                <h2 className="font-display text-[16px] font-bold text-ink">
                  Nothing matched that search
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-[1.7] text-ink-2">
                  Try a broader term, or browse by category instead.
                </p>
                <Link
                  href="/uae/categories/"
                  className="mt-5 inline-flex h-10 items-center rounded-full border border-line bg-white px-5 text-[13px] font-semibold text-ink-2 hover:border-brand-300"
                >
                  Browse categories
                </Link>
              </div>
            ) : (
              <ul className="mt-6 flex flex-col gap-3.5">
                {results.items.map((b) => (
                  <li key={b.id}>
                    <BusinessCard business={b} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
