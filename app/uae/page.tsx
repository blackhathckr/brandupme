import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { PortalNav } from "@/components/portal/portal-nav";
import { getCategoryTree, getCountry, getEmirates } from "@/lib/directory/queries";
import { Icon } from "@/components/ui/icon";

/**
 * UAE directory home.
 *
 * The client asked for this route to become the categories page, with the
 * previous UAE offering moved under the Business Partner Programme.
 *
 * Deliberately absent: the "25K+ Verified Businesses" and "50K+ Businesses"
 * counters from his mockup. Those numbers are not real yet, and publishing
 * invented totals on a commercial directory is a trust and legal problem. The
 * live counts below come from the database, so they are right by construction
 * and grow on their own.
 */

export const metadata: Metadata = {
  title: "UAE Business Directory | Find verified companies across the Emirates",
  description:
    "Search verified businesses across Dubai, Abu Dhabi, Sharjah and the rest of the UAE. Browse by category and emirate, compare companies and send enquiries directly.",
  alternates: { canonical: "/uae/" },
};

/**
 * Rendered per request. The D1 binding does not exist during the build, so
 * these pages cannot prerender; caching moves to ISR once an incremental cache
 * is configured in open-next.config.ts.
 */
export const dynamic = "force-dynamic";

export default async function Page() {
  const country = await getCountry("ae");
  if (!country) {
    return (
      <>
        <PortalNav />
        <main className="container-page py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-ink">
            Directory not configured
          </h1>
          <p className="mt-3 text-[15px] text-ink-2">
            The UAE country record is missing. Run the database seed.
          </p>
        </main>
      </>
    );
  }

  const [groups, emirates] = await Promise.all([
    getCategoryTree(country.id),
    getEmirates(country.id),
  ]);

  const totalCategories = groups.reduce((n, g) => n + g.children.length, 0);

  return (
    <>
      <PortalNav />

      <main>
        {/* ── Hero and search ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-deep py-14 lg:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="deep-grid absolute inset-0 opacity-60" />
            <div className="absolute -right-40 -top-32 size-[520px] rounded-full bg-brand-600/22 blur-[120px]" />
          </div>

          <div className="container-page relative text-center">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.22em] text-brand-400">
              United Arab Emirates
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(1.9rem,4.6vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
              Find the right business,{" "}
              <span className="text-brand-400">anywhere in the UAE</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.7] text-deep-muted">
              Browse {totalCategories.toLocaleString()} categories across{" "}
              {emirates.length} emirates. Compare companies and send an enquiry
              in a couple of taps.
            </p>

            <form
              action="/uae/search/"
              className="mx-auto mt-8 flex max-w-2xl flex-col gap-2.5 sm:flex-row"
            >
              <div className="relative flex-1">
                <label htmlFor="q" className="sr-only">
                  Search businesses
                </label>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-3"
                  strokeWidth={2}
                  aria-hidden
                />
                <input
                  id="q"
                  name="q"
                  placeholder="Cleaning, business setup, real estate…"
                  className="h-12 w-full rounded-full border border-white/15 bg-white/95 pl-11 pr-4 text-[14px]
                    text-ink outline-none placeholder:text-ink-3 focus-visible:border-brand-400"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-7
                  text-[14px] font-bold text-white transition-colors hover:bg-brand-500"
              >
                Search
                <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />
              </button>
            </form>
          </div>
        </section>

        {/* ── Emirates ─────────────────────────────────────────────────── */}
        <section className="bg-white py-14 lg:py-16">
          <div className="container-page">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.3rem,2.6vw,1.8rem)] font-bold tracking-[-0.03em] text-ink">
                Browse by emirate
              </h2>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {emirates.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/uae/${e.slug}/`}
                    className="group flex items-center gap-2.5 rounded-2xl border border-line bg-surface-2 px-4 py-3.5
                      transition-all duration-[240ms] ease-brand hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
                  >
                    <MapPin className="size-4 shrink-0 text-green-text" strokeWidth={2} aria-hidden />
                    <span className="text-[13.5px] font-semibold text-ink">{e.name}</span>
                    <ArrowRight
                      className="ml-auto size-3.5 text-ink-3 transition-transform duration-[240ms] group-hover:translate-x-0.5 group-hover:text-green-text"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Categories ───────────────────────────────────────────────── */}
        <section className="bg-surface-2 py-14 lg:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-[clamp(1.3rem,2.6vw,1.8rem)] font-bold tracking-[-0.03em] text-ink">
                  Browse business categories
                </h2>
                <p className="mt-2 text-[14px] text-ink-2">
                  {groups.length} main groups, {totalCategories.toLocaleString()}{" "}
                  specialisations.
                </p>
              </div>
              <Link
                href="/uae/categories/"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green-text"
              >
                View all categories
                <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groups.map((g) => (
                <article
                  key={g.id}
                  className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-e1 lg:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-green-text">
                      <Icon name={g.icon ?? "Target"} className="size-[18px]" />
                    </span>
                    <h3 className="font-display text-[15px] font-bold leading-snug tracking-[-0.02em] text-ink">
                      {g.name}
                    </h3>
                  </div>

                  <ul className="mt-4 flex flex-1 flex-wrap gap-1.5">
                    {g.children.slice(0, 6).map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/uae/dubai/${c.slug}/`}
                          className="inline-block rounded-full border border-line bg-surface-2 px-2.5 py-1
                            text-[11.5px] font-medium text-ink-2 transition-colors
                            hover:border-brand-300 hover:bg-brand-50 hover:text-green-text"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {g.children.length > 6 && (
                    <p className="mt-3 text-[11.5px] text-ink-3">
                      + {g.children.length - 6} more
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
