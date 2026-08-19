import type { RegionContent } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

/**
 * Client logo row.
 *
 * Real logo files have not been supplied yet, so each brand renders as a
 * styled wordmark rather than a placeholder box. Swap in <Image> per entry
 * once the assets arrive - the layout does not change.
 */
export function Trust({ r }: { r: RegionContent }) {
  return (
    <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
      <Reveal className="container-page rounded-2xl border border-line bg-white p-6 shadow-e3 lg:p-7">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-10">
          <div className="lg:border-r lg:border-line lg:pr-8">
            <p className="flex items-center gap-2 font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
              <span aria-hidden className="text-lg leading-none">
                {r.flag}
              </span>
              {r.trust.headline}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-3">
              {r.trust.sub}
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-between lg:gap-x-4">
            {r.trust.logos.map((name) => (
              <li key={name}>
                <span
                  className="font-display text-[17px] font-extrabold uppercase tracking-[-0.01em] text-ink-3/70
                    transition-colors duration-[240ms] hover:text-green-text"
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
