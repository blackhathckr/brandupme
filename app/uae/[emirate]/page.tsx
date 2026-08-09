import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin } from "lucide-react";
import { PortalNav } from "@/components/portal/portal-nav";
import {
  getCategoryTree,
  getChildLocations,
  getCountry,
  getLocationBySlug,
} from "@/lib/directory/queries";
import { Icon } from "@/components/ui/icon";

/**
 * Emirate landing page - /uae/dubai/.
 *
 * Sits between the directory home and the category listings, giving every
 * emirate a real page to rank on and a place for its areas to be linked from.
 *
 * Category counts shown here are live listing counts. Categories with nothing
 * in them are still linked, because a visitor searching for something we do
 * not yet stock should land on a page that invites the business to list rather
 * than a dead end.
 */

type Props = { params: Promise<{ emirate: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { emirate } = await params;
  const country = await getCountry("ae");
  if (!country) return {};
  const loc = await getLocationBySlug(country.id, emirate);
  if (!loc) return {};

  return {
    title: `Businesses in ${loc.name}`,
    description: `Browse verified businesses across every category in ${loc.name}, UAE. Compare companies and send enquiries directly.`,
    alternates: { canonical: `/uae/${loc.slug}/` },
  };
}

export default async function Page({ params }: Props) {
  const { emirate } = await params;
  const country = await getCountry("ae");
  if (!country) notFound();

  const loc = await getLocationBySlug(country.id, emirate);
  if (!loc) notFound();

  const [groups, areas] = await Promise.all([
    getCategoryTree(country.id),
    loc.parentId === null ? getChildLocations(loc.id) : Promise.resolve([]),
  ]);

  return (
    <>
      <PortalNav />

      <main>
        <section className="relative overflow-hidden bg-deep py-10 lg:py-14">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="deep-grid absolute inset-0 opacity-60" />
            <div className="absolute -right-32 -top-24 size-[440px] rounded-full bg-brand-600/20 blur-[110px]" />
          </div>

          <div className="container-page relative">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] text-deep-muted">
              <Link href="/uae/" className="hover:text-white">Directory</Link>
              <ChevronRight className="size-3" aria-hidden />
              <span className="text-white">{loc.name}</span>
            </nav>

            <h1 className="mt-4 flex flex-wrap items-center gap-2.5 font-display text-[clamp(1.7rem,3.8vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-white">
              <MapPin className="size-6 text-brand-400" strokeWidth={2.5} aria-hidden />
              Businesses in <span className="text-brand-400">{loc.name}</span>
            </h1>
          </div>
        </section>

        {areas.length > 0 && (
          <section className="bg-white py-8 lg:py-10">
            <div className="container-page">
              <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
                Areas in {loc.name}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/uae/${a.slug}/`}
                      className="inline-block rounded-full border border-line bg-surface-2 px-3.5 py-1.5
                        text-[12.5px] font-medium text-ink-2 transition-colors
                        hover:border-brand-300 hover:bg-brand-50 hover:text-green-text"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="bg-surface-2 py-10 lg:py-14">
          <div className="container-page">
            <h2 className="font-display text-[clamp(1.2rem,2.4vw,1.6rem)] font-bold tracking-[-0.03em] text-ink">
              Browse categories in {loc.name}
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groups.map((g) => (
                <article
                  key={g.id}
                  className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-e1"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-green-text">
                      <Icon name={g.icon ?? "Target"} className="size-4" />
                    </span>
                    <h3 className="font-display text-[14.5px] font-bold leading-snug tracking-[-0.02em] text-ink">
                      {g.name}
                    </h3>
                  </div>

                  <ul className="mt-3.5 flex flex-1 flex-col gap-0.5">
                    {g.children.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/uae/${loc.slug}/${c.slug}/`}
                          className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5
                            text-[12.5px] text-ink-2 transition-colors hover:bg-brand-50 hover:text-green-text"
                        >
                          <span className="truncate">{c.name}</span>
                          {c.listingCount > 0 && (
                            <span className="shrink-0 text-[11px] text-ink-3">
                              {c.listingCount}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
