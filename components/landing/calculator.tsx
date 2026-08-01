"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CALC, CONFIG } from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { MorphButton } from "@/components/ui/brand-button";
import { Reveal } from "@/components/ui/reveal";
import { VIEWPORT } from "@/lib/motion";

/** Benchmark close rate on properly followed-up enquiries. Stated openly. */
const CLOSE_RATE = 0.25;

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14px] text-night-muted">
          {label}
        </label>
        <output
          htmlFor={id}
          className="font-display text-lg font-bold tracking-[-0.02em] text-gold-400"
        >
          {format(value)}
        </output>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none
          [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-500
          [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-night
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-gold-500 [&::-moz-range-thumb]:border-[3px]
          [&::-moz-range-thumb]:border-night [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--color-gold-500) ${pct}%, var(--color-night-3) ${pct}%)`,
        }}
      />
    </div>
  );
}

export function Calculator() {
  const [enquiries, setEnquiries] = useState(60);
  const [orderValue, setOrderValue] = useState(8000);
  const [followUp, setFollowUp] = useState(30);

  /**
   * The gap between the enquiries currently followed up and all of them,
   * converted to annual revenue at a benchmark close rate. Deliberately framed
   * as recoverable upside, not as money the owner has "lost".
   */
  const annual = useMemo(() => {
    const missed = enquiries * (1 - followUp / 100);
    return Math.round(missed * CLOSE_RATE * orderValue * 12);
  }, [enquiries, orderValue, followUp]);

  const fmt = (n: number) =>
    `${CONFIG.currency} ${n.toLocaleString("en-AE", { maximumFractionDigits: 0 })}`;

  return (
    <section className="relative overflow-hidden bg-night py-14 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-brand-600/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-[20%] size-[520px] rounded-full bg-gold-600/15 blur-3xl"
      />

      <div className="container-page relative">
        <SectionHead
          onDark
          eyebrow={CALC.eyebrow}
          before={CALC.headlineBefore}
          italic={CALC.headlineItalic}
          after={CALC.headlineAfter}
          sub={CALC.sub}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <Reveal className="rounded-2xl border border-night-line bg-night-2/70 p-7 backdrop-blur-sm lg:p-9">
            <div className="flex flex-col gap-8">
              <Slider
                label="Enquiries you receive each month"
                value={enquiries}
                min={10}
                max={300}
                step={5}
                onChange={setEnquiries}
                format={(n) => String(n)}
              />
              <Slider
                label="Your average order value"
                value={orderValue}
                min={1000}
                max={100000}
                step={1000}
                onChange={setOrderValue}
                format={fmt}
              />
              <Slider
                label="Enquiries you currently follow up properly"
                value={followUp}
                min={0}
                max={100}
                step={5}
                onChange={setFollowUp}
                format={(n) => `${n}%`}
              />
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col justify-between rounded-2xl border border-gold-500/25 bg-gradient-to-br from-gold-500/[0.12] to-transparent p-7 lg:p-9"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-400">
                Additional revenue within reach
              </p>

              <motion.p
                key={annual}
                initial={{ opacity: 0.4, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 font-display text-[clamp(2.5rem,6vw,3.75rem)] font-extrabold leading-none tracking-[-0.045em] text-gold-300"
              >
                {fmt(annual)}
              </motion.p>

              <p className="mt-2 text-[14px] text-night-muted">per year</p>

              <p className="mt-6 text-[14px] leading-relaxed text-night-muted">
                That is the value sitting in the{" "}
                <strong className="font-semibold text-night-fg">
                  {Math.round(enquiries * (1 - followUp / 100))} enquiries a
                  month
                </strong>{" "}
                nobody currently has time to chase. Your representative&rsquo;s
                entire job is to chase them.
              </p>
            </div>

            <div className="mt-8">
              <MorphButton href="#register" tone="white">
                Put someone on it
              </MorphButton>
              <p className="mt-5 border-t border-night-line pt-4 text-[11.5px] leading-relaxed text-night-muted/80">
                {CALC.note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
