import type { RegionContent } from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

/**
 * Six dark-green cards on a white section, per the mockup.
 *
 * The cards carry the dark surface here rather than the section doing it,
 * which is what gives this band its contrast against the white ground - and
 * lets the green accents inside each card stay legible.
 */
export function Services({ r }: { r: RegionContent }) {
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
          {r.services.items.map((s) => (
            <RevealItem key={s.title}>
              <article
                className="group relative h-full overflow-hidden rounded-2xl bg-deep p-6 lg:p-7
                  transition-all duration-[280ms] ease-brand hover:-translate-y-1.5 hover:shadow-e4"
              >
                {/* Green wash that lifts on hover */}
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

                <span
                  className="relative mb-5 flex size-12 items-center justify-center rounded-xl
                    border border-brand-500/25 bg-brand-500/12 text-brand-400
                    transition-colors duration-[280ms] group-hover:bg-brand-500/20 group-hover:text-brand-300"
                >
                  <Icon name={s.icon} className="size-[22px]" />
                </span>

                <h3 className="relative font-display text-[17px] font-bold leading-snug tracking-[-0.02em] text-white">
                  {s.title}
                </h3>
                <p className="relative mt-2.5 text-[13.5px] leading-[1.65] text-deep-muted">
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
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
