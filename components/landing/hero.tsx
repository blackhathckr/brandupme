"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, Mail, Users, TrendingUp } from "lucide-react";
import { HERO, TICKER, CONFIG, MARQUEE } from "@/lib/content";
import { MorphButton, Button } from "@/components/ui/brand-button";
import { Counter } from "@/components/ui/counter";
import { EASE } from "@/lib/motion";

const CHIPS = [
  { icon: PhoneCall, label: "Cold calling" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "Email outreach" },
  { icon: Users, label: "Lead generation" },
  { icon: TrendingUp, label: "More meetings" },
];

const TONE = {
  red: { dot: "bg-brand-600", tile: "bg-brand-50", text: "text-brand-600" },
  gold: { dot: "bg-gold-500", tile: "bg-gold-50", text: "text-bronze" },
  green: { dot: "bg-success", tile: "bg-[#EAF7F1]", text: "text-success-text" },
} as const;

/** Entrance timings, matching the reference cadence. */
const D = { badge: 0.15, head: 0.3, sub: 0.45, cta: 0.6, card: 0.5, chips: 0.75 };

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient warmth. Generated silk-flow art in the brand palette, with
          CSS halos layered over it so the effect still reads if the image is
          slow or blocked. Purely decorative, hence aria-hidden. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/brand/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right-top opacity-90"
        />
        <div className="absolute -right-32 -top-40 size-[620px] rounded-full bg-gold-300/25 blur-3xl" />
        <div className="absolute -left-40 top-40 size-[520px] rounded-full bg-brand-200/25 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="container-page grid gap-12 pb-20 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.badge, duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-2 backdrop-blur-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <span className="text-[13px] font-medium text-ink-2">
              {HERO.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.head, duration: 0.8, ease: EASE }}
            className="mt-6 font-display text-[clamp(2.5rem,6.2vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.042em] text-ink"
          >
            {HERO.headlineBefore}{" "}
            <span className="font-serif font-normal italic tracking-normal text-brand-600">
              {HERO.headlineItalic}
            </span>{" "}
            {HERO.headlineAfter}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.sub, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-xl text-[17px] leading-[1.75] text-ink-2 lg:text-lg"
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.cta, duration: 0.8, ease: EASE }}
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <MorphButton href="#register">{HERO.primaryCta}</MorphButton>
            <Button href="#how" variant="outline" size="lg">
              {HERO.secondaryCta}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: D.cta + 0.15, duration: 0.8 }}
            className="mt-6 flex items-baseline gap-2 text-[15px]"
          >
            <span className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
              {CONFIG.currency} {CONFIG.price}
            </span>
            <span className="text-muted-foreground">
              per month + success-based commission
            </span>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.chips, duration: 0.8, ease: EASE }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {CHIPS.map(({ icon: I, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-2 text-[13px] font-medium text-ink-2 backdrop-blur-sm"
              >
                <I className="size-3.5 text-brand-600" strokeWidth={1.9} />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ── Live activity card ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: D.card, duration: 0.9, ease: EASE }}
          className="relative"
        >
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-e4">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Today&rsquo;s outreach
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF7F1] px-2.5 py-1 text-[11px] font-semibold text-success-text">
                <span className="size-1.5 rounded-full bg-success" />
                Live
              </span>
            </div>

            <ul className="divide-y divide-hairline">
              {TICKER.map((row, i) => {
                const t = TONE[row.tone];
                return (
                  <motion.li
                    key={row.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: D.card + 0.25 + i * 0.12,
                      duration: 0.6,
                      ease: EASE,
                    }}
                    className="flex items-center gap-3.5 py-4"
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${t.tile}`}
                    >
                      <span className={`size-2 rounded-full ${t.dot}`} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14.5px] font-semibold text-ink">
                        {row.label}
                      </span>
                      <span className="block text-[12.5px] text-muted-foreground">
                        {row.meta}
                      </span>
                    </span>
                    <Counter
                      to={row.value}
                      className={`font-display text-xl font-extrabold tracking-[-0.03em] ${t.text}`}
                    />
                  </motion.li>
                );
              })}
            </ul>

            <p className="border-t border-hairline pt-4 text-[11.5px] leading-relaxed text-muted-foreground">
              Illustrative figures shown while onboarding. Replaced with your
              own reporting once your partnership is live.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Capability marquee ──────────────────────────────────────────── */}
      <div className="border-y border-line bg-surface/50 py-5">
        <div className="mask-edges overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 34, ease: "linear", repeat: Infinity }}
            className="flex w-max items-center gap-12"
          >
            {[0, 1].map((dup) =>
              MARQUEE.map((m) => (
                <span
                  key={`${dup}-${m}`}
                  className="flex shrink-0 items-center gap-3 whitespace-nowrap font-display text-lg font-semibold tracking-[-0.02em] text-muted-foreground"
                >
                  <span className="size-1.5 rounded-full bg-gold-500" />
                  {m}
                </span>
              )),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
