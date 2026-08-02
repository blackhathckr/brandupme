"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  XIcon,
} from "@/components/ui/social-icons";
import type { RegionContent } from "@/lib/content";
import { Button } from "@/components/ui/brand-button";
import { Icon } from "@/components/ui/icon";
import { EASE } from "@/lib/motion";

/** Entrance cadence, staggered top to bottom. */
const D = { badge: 0.15, head: 0.28, sub: 0.46, cta: 0.6, stats: 0.75, mark: 0.4 };

/**
 * Orbiting social chips around the brand mark. Lucide dropped brand glyphs in
 * v1, so Facebook/Instagram/Youtube here are the generic lucide shapes; the X
 * mark is inlined. Positions are percentages of the mark's square container.
 */
const ORBIT = [
  { Icon: FacebookIcon, cls: "left-[6%] top-[18%]", delay: 0 },
  { Icon: InstagramIcon, cls: "right-[8%] top-[8%]", delay: 0.6 },
  { Icon: YouTubeIcon, cls: "left-[-2%] top-[52%]", delay: 1.2 },
];

export function Hero({ r }: { r: RegionContent }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-deep pb-16 pt-[72px] lg:pb-20"
    >
      {/* Depth: faint grid, then two soft green blooms. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="deep-grid absolute inset-0 opacity-70" />
        <div className="absolute -right-40 -top-32 size-[560px] rounded-full bg-brand-600/25 blur-[120px]" />
        <div className="absolute -bottom-48 -left-32 size-[520px] rounded-full bg-brand-500/12 blur-[120px]" />
      </div>

      <div className="container-page relative grid items-center gap-12 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-16">
        {/* ── Copy ──────────────────────────────────────────────────────── */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.badge, duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-500/35 bg-brand-500/10 px-4 py-1.5 text-[12.5px] font-medium text-brand-200 backdrop-blur-sm"
          >
            <Sparkles className="size-3.5 text-brand-400" strokeWidth={2} aria-hidden />
            {r.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.head, duration: 0.8, ease: EASE }}
            className="mt-5 font-display text-[clamp(2.25rem,5.4vw,3.6rem)] font-extrabold uppercase leading-[1.06] tracking-[-0.03em] text-white"
          >
            {r.hero.line1}
            <br />
            {r.hero.line2}{" "}
            <span className="text-brand-400">{r.hero.accent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.sub, duration: 0.8, ease: EASE }}
            className="mt-5 max-w-lg text-[15.5px] leading-[1.75] text-deep-muted"
          >
            {r.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.cta, duration: 0.8, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="#services" variant="primary" size="lg" icon>
              Our Services
            </Button>
            <Button href="#pricing" variant="white" size="lg" icon>
              View Pricing
            </Button>
          </motion.div>

          {/* ── Stats ───────────────────────────────────────────────────── */}
          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D.stats, duration: 0.8, ease: EASE }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
          >
            {r.stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <Icon name={s.icon} className="size-[18px] shrink-0 text-brand-400" />
                <div className="min-w-0">
                  <dd className="font-display text-[19px] font-extrabold leading-none tracking-[-0.03em] text-white">
                    {s.value}
                  </dd>
                  <dt className="mt-1 truncate text-[11.5px] text-deep-muted">
                    {s.label}
                  </dt>
                </div>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── Brand mark ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: D.mark, duration: 1, ease: EASE }}
          className="relative mx-auto aspect-square w-full max-w-[420px]"
        >
          {/* Concentric rings + podium glow, built in CSS rather than shipped
              as a render - stays crisp at any size and re-themes with tokens. */}
          <div aria-hidden className="absolute inset-0">
            <div className="absolute inset-[8%] rounded-full border border-brand-500/20" />
            <div className="absolute inset-[20%] rounded-full border border-brand-500/15" />
            <motion.div
              className="absolute inset-[14%] rounded-full bg-brand-500/10 blur-2xl"
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src="/brand/logo-mark.png"
              alt="BrandUpMe"
              width={224}
              height={224}
              priority
              className="w-[54%] max-w-[230px] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
            />
          </motion.div>

          {/* Podium */}
          <div aria-hidden className="absolute inset-x-[18%] bottom-[10%]">
            <div className="h-2.5 rounded-[50%] bg-brand-500/70 blur-[2px]" />
            <div className="mx-auto -mt-1 h-14 w-[86%] rounded-[50%] bg-brand-500/25 blur-2xl" />
          </div>

          {/* Orbiting social chips */}
          {ORBIT.map(({ Icon: I, cls, delay }) => (
            <motion.span
              key={cls}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
              className={`absolute ${cls} flex size-11 items-center justify-center rounded-full border border-brand-500/25 bg-deep-3/90 text-white shadow-e3 backdrop-blur-sm lg:size-12`}
            >
              <I className="size-[18px]" />
            </motion.span>
          ))}
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
            className="absolute right-[2%] top-[46%] flex size-11 items-center justify-center rounded-full border border-brand-500/25 bg-deep-3/90 text-white shadow-e3 backdrop-blur-sm lg:size-12"
          >
            <XIcon className="size-4" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
