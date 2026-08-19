import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { RegionContent } from "@/lib/content";
import { SERVICE_ART, SERVICE_LINKS } from "@/lib/services-in";
import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

/**
 * Six dark-green cards on a white section, per the mockup.
 *
 * India leads each card with the same circular artwork as the detail page, at
 * the client's request. The artwork is dense poster-style illustration, so it
 * is shown large enough to read as an image rather than shrunk to icon size.
 * Social Media Management has no artwork yet and falls back to a circle of the
 * same size holding its icon, so the grid keeps one rhythm instead of one card
 * collapsing to a different height.
 *
 * The UAE has no service artwork at all, so it keeps the original icon-tile
 * layout the client already approved.
 *
 * Cards link to their detail page where one exists. Services without a page
 * render as a plain card rather than a link - a card that looks clickable and
 * 404s is worse than one that clearly is not.
 */
export function Services({ r }: { r: RegionContent }) {
  const imageLed = r.key === "IN";

  return (
    <section id="services" className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead
          flourish
          eyebrow={r.services.eyebrow}
          before={r.services.headline}
          accent={r.services.accent}
          sub={r.services.sub}
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {r.services.items.map((s) => {
            const href = imageLed ? SERVICE_LINKS[s.title] : undefined;
            const art = imageLed ? SERVICE_ART[s.title] : undefined;

            const card = (
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-deep p-6 lg:p-7
                  transition-all duration-[280ms] ease-brand hover:-translate-y-1.5 hover:shadow-e4"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full
                    bg-brand-500/12 opacity-0 blur-2xl transition-opacity duration-[280ms]
                    group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0
                    bg-gradient-to-r from-brand-400 to-gold-500 transition-transform
                    duration-[420ms] ease-brand group-hover:scale-x-100"
                />

                {imageLed ? (
                  <div className="relative mx-auto mb-6 w-full max-w-[240px]">
                    {/* Soft ring so a light circle does not float unanchored
                        on the dark card. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-br
                        from-brand-500/30 to-gold-500/15 opacity-70 transition-opacity
                        duration-[280ms] group-hover:opacity-100"
                    />
                    {art ? (
                      <Image
                        src={art}
                        alt=""
                        width={1000}
                        height={1000}
                        sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 70vw"
                        className="relative aspect-square w-full rounded-full object-cover
                          shadow-e3 transition-transform duration-[420ms] ease-brand
                          group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div
                        className="relative flex aspect-square w-full items-center justify-center
                          rounded-full border border-brand-500/25 bg-brand-500/10 text-brand-400
                          transition-colors duration-[280ms] group-hover:text-brand-300"
                      >
                        <Icon name={s.icon} className="size-14" />
                      </div>
                    )}
                  </div>
                ) : (
                  <span
                    className="relative mb-5 flex size-12 items-center justify-center rounded-xl
                      border border-brand-500/25 bg-brand-500/12 text-brand-400
                      transition-colors duration-[280ms] group-hover:bg-brand-500/20 group-hover:text-brand-300"
                  >
                    <Icon name={s.icon} className="size-[22px]" />
                  </span>
                )}

                <h3 className="relative font-display text-[17px] font-bold leading-snug tracking-[-0.02em] text-white">
                  {s.title}
                </h3>
                <p className="relative mt-2.5 flex-1 text-[13.5px] leading-[1.65] text-deep-muted">
                  {s.body}
                </p>

                <ul className="relative mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-deep-line bg-white/[0.04] px-2.5 py-1
                        text-[11px] font-medium text-deep-soft/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {href && (
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-400">
                    Learn more
                    <ArrowRight
                      className="size-3.5 transition-transform duration-[240ms] ease-brand group-hover:translate-x-1"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </span>
                )}
              </article>
            );

            return (
              <RevealItem key={s.title}>
                {href ? (
                  <Link
                    href={href}
                    className="block h-full"
                    aria-label={`${s.title} - learn more`}
                  >
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
