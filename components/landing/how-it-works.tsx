"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MASCOT } from "@/lib/mascot";
import { Check } from "lucide-react";
import { STAGES } from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Eight stages as an interactive rail plus a detail panel, rather than eight
 * static cards. Hover on pointer devices, tap on touch - both drive the same
 * state, so nothing is unreachable on mobile.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <section id="how" className="bg-surface py-14 lg:py-20">
      <div className="container-page">
        <SectionHead
          eyebrow="How it works"
          before="Successful sales begin with"
          italic="understanding"
          sub="Before we represent your business we learn how it actually works. We present your offer only when there is a genuine fit - which is why the conversations convert."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          {/* ── Rail ──────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-1.5">
            {STAGES.map((s, i) => {
              const on = i === active;
              return (
                <motion.button
                  key={s.n}
                  type="button"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-current={on}
                  className={cn(
                    "group flex items-center gap-4 rounded-xl border px-4 py-3 text-left",
                    "transition-all duration-[240ms] ease-brand",
                    on
                      ? "border-gold-300 bg-canvas shadow-e2"
                      : "border-transparent hover:bg-canvas",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl transition-all duration-[240ms]",
                      on
                        ? "scale-105 bg-gold-100 text-bronze"
                        : "bg-surface-3 text-muted-foreground group-hover:text-ink-2",
                    )}
                  >
                    <Icon name={s.icon} className="size-[18px]" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block font-display text-[15px] font-semibold tracking-[-0.02em]",
                        on ? "text-ink" : "text-ink-2",
                      )}
                    >
                      {s.title}
                    </span>
                    <span className="block text-[12.5px] text-muted-foreground">
                      {s.who}
                    </span>
                  </span>

                  <span
                    className={cn(
                      "font-display text-[13px] font-bold tabular-nums",
                      on ? "text-gold-600" : "text-line",
                    )}
                  >
                    {s.n}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* ── Detail ────────────────────────────────────────────────── */}
          <Reveal
            delay={0.15}
            /* No forced height on mobile - a fixed 420px leaves a dead gap
               under short stages. Only desktop needs it, to stop the panel
               resizing as you move down the rail. */
            className="relative flex flex-col overflow-hidden rounded-2xl border border-line bg-canvas p-6 shadow-e2 lg:min-h-[440px] lg:p-9"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gold-300/25 blur-3xl"
            />

            {/* The panel is held to a fixed height on desktop so it stops
                resizing as you move down the rail, which leaves dead space
                under the shorter stages. The bull fills it. Sits outside
                AnimatePresence so it stays put while stages change. */}
            <Image
              src={MASCOT.steady.src}
              alt=""
              width={MASCOT.steady.w}
              height={MASCOT.steady.h}
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-8 hidden w-[300px] select-none object-contain opacity-[0.16] lg:block"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="relative flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bronze">
                      Stage {stage.n} &middot; {stage.who}
                    </p>
                    <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight tracking-[-0.035em] text-ink">
                      {stage.title}
                    </h3>
                  </div>
                  <motion.span
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow-red"
                  >
                    <Icon name={stage.icon} className="size-6" />
                  </motion.span>
                </div>

                <p className="mt-5 max-w-md text-[16px] leading-[1.75] text-ink-2">
                  {stage.body}
                </p>

                <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-success/25 bg-[#EAF7F1] px-4 py-2">
                  <Check className="size-3.5 text-success-text" strokeWidth={2.5} />
                  <span className="text-[13px] font-semibold text-success-text">
                    {stage.output}
                  </span>
                </span>

                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <div className="flex items-center gap-1.5">
                    {STAGES.map((s, i) => (
                      <span
                        key={s.n}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors duration-300",
                          i <= active ? "bg-gold-500" : "bg-line",
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-[12.5px] text-muted-foreground">
                    Stage {active + 1} of {STAGES.length} - hover or tap to
                    explore
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
