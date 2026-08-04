import type { Metadata } from "next";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { ABOUT } from "@/lib/pages";
import { PageShell } from "@/components/pages/page-shell";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "About Us",
  description: ABOUT.sub,
  alternates: { canonical: "/about/" },
};

export default function Page() {
  return (
    <PageShell
      eyebrow={ABOUT.eyebrow}
      headline={ABOUT.headline}
      accent={ABOUT.accent}
      sub={ABOUT.sub}
    >
      {/* ── Stat band, overlapping the hero ─────────────────────────────── */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <Reveal className="container-page rounded-2xl border border-line bg-white p-6 shadow-e3">
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {ABOUT.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dd className="font-display text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold leading-none tracking-[-0.04em] text-green-text">
                  {s.value}
                </dd>
                <dt className="mt-2 text-[12.5px] text-ink-3">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ── Story + avatar ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
              {ABOUT.intro.heading}
            </h2>
            {ABOUT.intro.body.map((p) => (
              <p key={p} className="mt-4 text-[15.5px] leading-[1.8] text-ink-2">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="relative">
            {/* Soft green plate behind the portrait so a photo on white does
                not float unanchored. */}
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-0 top-8 rounded-3xl bg-gradient-to-b from-brand-100 to-surface-2"
            />
            <Image
              src={ABOUT.intro.avatar}
              alt=""
              width={410}
              height={673}
              aria-hidden
              className="relative mx-auto w-full max-w-[340px] rounded-2xl object-contain"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Problem / solution ──────────────────────────────────────────── */}
      <section className="bg-surface-2 py-16 lg:py-24">
        <div className="container-page">
          <SectionHead flourish eyebrow="The gap" before={ABOUT.problem.heading} />

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
            <Reveal className="rounded-2xl border border-line bg-white p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-3">
                What businesses face
              </p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {ABOUT.problem.pains.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-ink-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-3">
                      <X className="size-3 text-ink-3" strokeWidth={3} aria-hidden />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={0.1}
              className="relative overflow-hidden rounded-2xl border border-brand-600 bg-deep p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-brand-500/20 blur-2xl"
              />
              <p className="relative text-[11px] font-bold uppercase tracking-[0.16em] text-brand-400">
                What we do about it
              </p>
              <p className="relative mt-5 text-[15.5px] leading-[1.75] text-deep-soft">
                {ABOUT.problem.answer}
              </p>
              <span className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/12 px-4 py-2 text-[12.5px] font-semibold text-brand-300">
                <Check className="size-3.5" strokeWidth={3} aria-hidden />
                Everything under one roof
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What we do ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-page">
          <SectionHead
            flourish
            eyebrow="Capabilities"
            before={ABOUT.whatWeDo.heading}
            sub={ABOUT.whatWeDo.sub}
          />

          <RevealGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT.whatWeDo.items.map((item) => (
              <RevealItem key={item.label}>
                <div
                  className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5
                    transition-all duration-[240ms] ease-brand hover:-translate-y-1
                    hover:border-brand-300 hover:shadow-e3"
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl
                      bg-brand-50 text-green-text transition-colors duration-[240ms]
                      group-hover:bg-brand-600 group-hover:text-white"
                  >
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">
                    {item.label}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Mission / vision / promise ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-deep py-16 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="deep-grid absolute inset-0 opacity-60" />
          <div className="absolute -left-40 top-1/4 size-[520px] rounded-full bg-brand-600/18 blur-[120px]" />
        </div>

        <div className="container-page relative">
          <SectionHead
            onDark
            eyebrow={ABOUT.future.eyebrow}
            before={ABOUT.future.heading}
            accent={ABOUT.future.accent}
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
            <Reveal className="relative order-2 lg:order-1">
              <div
                aria-hidden
                className="absolute inset-x-4 bottom-0 top-6 rounded-3xl bg-gradient-to-b from-brand-500/15 to-transparent"
              />
              <Image
                src={ABOUT.future.avatar}
                alt=""
                width={622}
                height={568}
                aria-hidden
                className="relative w-full rounded-2xl object-contain"
              />
            </Reveal>

            {/* Timeline: connected dots down the left edge */}
            <ol className="order-1 flex flex-col gap-8 lg:order-2">
              {ABOUT.future.blocks.map((b, i) => (
                <Reveal
                  key={b.title}
                  as="li"
                  delay={i * 0.08}
                  className="relative pl-14"
                >
                  <span className="absolute left-0 top-0 flex size-11 items-center justify-center rounded-xl border border-brand-500/30 bg-brand-500/12 text-brand-400">
                    <Icon name={b.icon} className="size-5" />
                  </span>
                  {i < ABOUT.future.blocks.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[21px] top-12 h-[calc(100%+1rem)] w-px bg-gradient-to-b from-brand-500/40 to-transparent"
                    />
                  )}
                  <h3 className="font-display text-[18px] font-bold tracking-[-0.02em] text-white">
                    {b.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.75] text-deep-muted">
                    {b.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
