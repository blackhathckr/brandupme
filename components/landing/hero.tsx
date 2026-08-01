"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  PhoneCall,
  MessageCircle,
  Mail,
  Users,
  TrendingUp,
  Check,
} from "lucide-react";
import { HERO, HERO_CARD, CONFIG, MARQUEE } from "@/lib/content";
import { MorphButton, Button } from "@/components/ui/brand-button";
import { MASCOT } from "@/lib/mascot";
import { EASE } from "@/lib/motion";

const CHIPS = [
  { icon: PhoneCall, label: "Cold calling" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "Email outreach" },
  { icon: Users, label: "Lead generation" },
  { icon: TrendingUp, label: "More meetings" },
];

/** Entrance timings, matching the reference cadence. */
const D = { badge: 0.15, head: 0.3, sub: 0.45, cta: 0.6, card: 0.5, chips: 0.75 };

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient warmth. Generated silk-flow art in the brand palette, with
          CSS halos layered over it so the effect still reads if the image is
          slow or blocked. Purely decorative, hence aria-hidden. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* On desktop the red corner sits clear of the copy. On mobile the
            image scales up and that red lands directly under the headline,
            where the brand-red "remote" becomes unreadable. Mobile therefore
            anchors to the gold bottom-left instead, and takes an ivory wash
            on top - readability wins over the art. */}
        <Image
          src="/brand/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-60 sm:object-right-top sm:opacity-90"
        />
        <div className="absolute inset-0 bg-canvas/60 sm:hidden" />
        <div className="absolute -right-32 -top-40 size-[620px] rounded-full bg-gold-300/25 blur-3xl" />
        <div className="absolute -left-40 top-40 size-[520px] rounded-full bg-brand-200/25 blur-3xl" />

        {/* Emblem behind the hero. Sits under the live-activity card, so it
            stays readable while the bull is clearly present. */}
        <Image
          src={MASCOT.watermark.src}
          alt=""
          width={MASCOT.watermark.w}
          height={MASCOT.watermark.h}
          aria-hidden
          className="absolute -right-10 top-4 w-[320px] select-none object-contain opacity-[0.08] sm:opacity-[0.22] lg:w-[520px]"
        />

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

        {/* ── What your representative does, card ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: D.card, duration: 0.9, ease: EASE }}
          className="relative"
        >
          {/* Same treatment as the services payoff card - gold gradient, gold
              border, mascot bleeding off the corner. The two strongest cards
              on the page now rhyme instead of looking unrelated. */}
          <div className="relative overflow-hidden rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-100/70 via-surface to-surface p-6 shadow-e4">
            <Image
              src={MASCOT.headset.src}
              alt=""
              width={MASCOT.headset.w}
              height={MASCOT.headset.h}
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-8 w-40 select-none object-contain lg:w-48"
            />

            {/* Same text structure as the services payoff card: bronze
                eyebrow, display heading, one supporting line with a tick.
                Text only - the invented daily metrics that used to sit here
                needed a disclaimer admitting they were illustrative, and that
                disclaimer undercut the card the moment anyone read it. */}
            <div className="relative max-w-[70%]">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bronze">
                {HERO_CARD.eyebrow}
              </p>

              <h2 className="mt-3 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold leading-tight tracking-[-0.03em] text-ink">
                {HERO_CARD.heading}
              </h2>

              <p className="mt-3 flex items-start gap-2 text-[14px] text-ink-2">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-success-text"
                  strokeWidth={2.5}
                  aria-hidden
                />
                {HERO_CARD.line}
              </p>
            </div>
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
