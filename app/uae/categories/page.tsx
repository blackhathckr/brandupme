import type { Metadata } from "next";
import Link from "next/link";
import { PortalNav } from "@/components/portal/portal-nav";
import { getCategoryTree, getCountry } from "@/lib/directory/queries";
import { Icon } from "@/components/ui/icon";

/**
 * Every category, in full.
 *
 * A single flat index rather than paginated: it is the page both crawlers and
 * people use to see the whole catalogue, and 21 groups of sub-categories is
 * small enough to render at once.
 *
 * Links point at Dubai because it is the client's primary market and a
 * category page needs a location. The emirate switcher on each listing page
 * takes it from there.
 */

export const metadata: Metadata = {
  title: "All business categories in the UAE",
  description:
    "Every business category on the BrandUpMe UAE directory, from business setup and real estate to cleaning, logistics and IT services.",
  alternates: { canonical: "/uae/categories/" },
};

export const dynamic = "force-dynamic";

export default async function Page() {
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

  const groups = await getCategoryTree(country.id);
  const total = groups.reduce((n, g) => n + g.children.length, 0);

  return (
    <>
      <PortalNav />
      <main>
        <section className="relative overflow-hidden bg-deep py-10 lg:py-14">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="deep-grid absolute inset-0 opacity-60" />
          </div>
          <div className="container-page relative">
            <h1 className="font-display text-[clamp(1.7rem,3.8vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-white">
              All <span className="text-brand-400">categories</span>
            </h1>
            <p className="mt-3 text-[14.5px] text-deep-muted">
              {groups.length} groups, {total.toLocaleString()} specialisations.
            </p>
          </div>
        </section>

        <section className="bg-surface-2 py-10 lg:py-14">
          <div className="container-page flex flex-col gap-5">
            {groups.map((g) => (
              <article key={g.id} className="rounded-2xl border border-line bg-white p-5 shadow-e1 lg:p-6">
                <h2 className="flex items-center gap-2.5 font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-green-text">
                    <Icon name={g.icon ?? "Target"} className="size-4" />
                  </span>
                  {g.name}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.children.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/uae/dubai/${c.slug}/`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2
                          px-3 py-1.5 text-[12px] font-medium text-ink-2 transition-colors
                          hover:border-brand-300 hover:bg-brand-50 hover:text-green-text"
                      >
                        {c.name}
                        {c.listingCount > 0 && (
                          <span className="text-[10.5px] text-ink-3">{c.listingCount}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
