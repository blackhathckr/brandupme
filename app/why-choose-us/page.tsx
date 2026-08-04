import type { Metadata } from "next";
import Image from "next/image";
import { WHY_CHOOSE } from "@/lib/pages";
import { PageShell } from "@/components/pages/page-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/brand-button";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Affordable digital marketing, 28 creatives every month, complete social media management and organic growth - why businesses choose BrandUpMe LLP.",
  alternates: { canonical: "/why-choose-us/" },
};

export default function Page() {
  return (
    <PageShell
      eyebrow={WHY_CHOOSE.eyebrow}
      headline={WHY_CHOOSE.headline}
      accent={WHY_CHOOSE.accent}
      sub={WHY_CHOOSE.sub}
    >
      {/* ── Reasons ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-page">
          <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.reasons.map((reason, i) => (
              <RevealItem key={reason.title}>
                <article
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl
                    border border-line bg-gradient-to-br from-white to-surface-2 p-6 lg:p-7
                    shadow-e1 transition-all duration-[280ms] ease-brand
                    hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-e3"
                >
                  {/* Green hairline that draws in on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0
                      bg-gradient-to-r from-brand-600 to-gold-500 transition-transform
                      duration-[420ms] ease-brand group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="flex size-12 shrink-0 items-center justify-center rounded-xl
                        bg-brand-50 text-green-text ring-1 ring-inset ring-brand-100
                        transition-colors duration-[280ms]
                        group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600"
                    >
                      <Icon name={reason.icon} className="size-[22px]" />
                    </span>
                    <span
                      aria-hidden
                      className="font-display text-[30px] font-extrabold leading-none tracking-[-0.05em] text-brand-100
                        transition-colors duration-[280ms] group-hover:text-brand-200"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-[17px] font-bold leading-snug tracking-[-0.02em] text-ink">
                    {reason.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.7] text-ink-2">
                    {reason.body}
                  </p>

                  {reason.stat && (
                    <p className="mt-5 flex items-baseline gap-2 border-t border-line pt-4">
                      <span className="font-display text-[24px] font-extrabold leading-none tracking-[-0.04em] text-green-text">
                        {reason.stat.value}
                      </span>
                      <span className="text-[12.5px] text-ink-3">
                        {reason.stat.label}
                      </span>
                    </p>
                  )}
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Commitment ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-deep py-16 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="deep-grid absolute inset-0 opacity-60" />
          <div className="absolute -right-32 top-0 size-[480px] rounded-full bg-brand-600/20 blur-[120px]" />
        </div>

        <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-16">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">
              {WHY_CHOOSE.commitment.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-bold leading-[1.14] tracking-[-0.03em] text-white">
              {WHY_CHOOSE.commitment.heading}
              <br />
              <span className="relative inline-block text-brand-400">
                {WHY_CHOOSE.commitment.accent}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-gold-500/70"
                />
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-[15.5px] leading-[1.8] text-deep-muted">
              {WHY_CHOOSE.commitment.body}
            </p>
            <div className="mt-8">
              <Button href="/#pricing" variant="primary" size="lg" icon>
                See our plans
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div
              aria-hidden
              className="absolute inset-x-4 bottom-0 top-6 rounded-3xl bg-gradient-to-b from-brand-500/15 to-transparent"
            />
            <Image
              src={WHY_CHOOSE.commitment.avatar}
              alt=""
              width={621}
              height={568}
              aria-hidden
              className="relative w-full rounded-2xl object-contain"
            />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
