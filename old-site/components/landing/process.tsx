"use client";

import { motion } from "framer-motion";
import type { RegionContent } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { EASE, VIEWPORT } from "@/lib/motion";

/**
 * The infographic band: five numbered stages on the dark green ground, joined
 * by dashed connectors that draw themselves in as the section enters view.
 *
 * The connectors are the whole point of the layout - they turn five cards into
 * one flow. They are decorative, so they are hidden from assistive tech and the
 * ordered list underneath carries the real semantics.
 */
export function Process({ r }: { r: RegionContent }) {
  return (
    <section id="about" className="relative overflow-hidden bg-deep py-16 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="deep-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-40 top-1/3 size-[520px] rounded-full bg-brand-600/18 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 size-[420px] rounded-full bg-gold-600/8 blur-[120px]" />
      </div>

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-14">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">
              How it works
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
              {r.process.headline}
              <br />
              <span className="relative inline-block text-brand-400">
                {r.process.accent}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-gold-500/70"
                />
              </span>
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-[1.7] text-deep-muted">
              {r.process.sub}
            </p>
          </Reveal>

          {/* ── Steps ─────────────────────────────────────────────────────── */}
          <ol className="relative grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5 lg:gap-x-2">
            {r.process.steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Connector to the next step. Hidden on the last item and on
                    narrow layouts where the steps stack. */}
                {i < r.process.steps.length - 1 && (
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.45, delay: 0.25 + i * 0.09, ease: EASE }}
                    className="absolute left-[calc(50%+34px)] right-[calc(-50%+34px)] top-8
                      hidden origin-left border-t-2 border-dashed border-brand-500/35 lg:block"
                  />
                )}

                <span
                  className="relative flex size-16 items-center justify-center rounded-full
                    border border-brand-500/30 bg-brand-500/10 text-brand-300
                    transition-all duration-[280ms] ease-brand
                    group-hover:scale-105 group-hover:border-brand-400 group-hover:bg-brand-500/20"
                >
                  <Icon name={s.icon} className="size-6" strokeWidth={1.9} />
                </span>

                <span className="mt-4 font-display text-[13px] font-extrabold tracking-[0.08em] text-gold-500">
                  {s.n}
                </span>
                <h3 className="mt-1.5 font-display text-[15px] font-bold tracking-[-0.02em] text-white">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[190px] text-[12.5px] leading-[1.6] text-deep-muted">
                  {s.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
