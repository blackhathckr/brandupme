import { Check } from "lucide-react";
import { PRICING, CONFIG, INDUSTRIES } from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MorphButton } from "@/components/ui/brand-button";

export function Industries() {
  return (
    <section className="bg-surface py-14 lg:py-20">
      <div className="container-page">
        <SectionHead
          align="center"
          eyebrow="Who we work with"
          before="Built for growing"
          italic="UAE"
          after="businesses"
          sub="If winning customers depends on conversations, the partnership fits."
        />

        <RevealGroup className="mt-12 flex flex-wrap justify-center gap-2.5">
          {INDUSTRIES.map((i) => (
            <RevealItem key={i}>
              <span
                className="inline-flex rounded-full border border-line bg-canvas px-5 py-2.5
                  text-[14px] font-medium text-ink-2 transition-all duration-[240ms] ease-brand
                  hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-50 hover:text-ink"
              >
                {i}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-14 lg:py-20">
      <div className="container-page">
        <SectionHead
          align="center"
          eyebrow="Partnership programme"
          before="One fee. One dedicated"
          italic="representative"
          sub="No setup fee. No long-term lock-in. No hidden charges."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative overflow-hidden rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-100/70 via-surface to-surface p-8 shadow-e4 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gold-300/40 blur-3xl"
            />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bronze">
                Business Partnership Program
              </p>

              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-ink-2">
                  {CONFIG.currency}
                </span>
                <span className="font-display text-[clamp(3rem,7vw,4.25rem)] font-extrabold leading-none tracking-[-0.05em] text-ink">
                  {CONFIG.price}
                </span>
                <span className="text-[15px] text-muted-foreground">/ month</span>
              </p>
              <p className="mt-2 text-[14.5px] text-ink-2">
                plus success-based commission on completed business, as agreed
              </p>

              <ul className="mt-8 flex flex-col gap-3.5">
                {PRICING.includes.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[15px] text-ink-2"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/12">
                      <Check
                        className="size-3 text-success-text"
                        strokeWidth={3}
                        aria-hidden
                      />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <MorphButton href="#register" className="w-full justify-between">
                  Become a business partner
                </MorphButton>
              </div>
            </div>
          </Reveal>

          <RevealGroup className="grid content-start gap-4">
            {PRICING.notes.map((n) => (
              <RevealItem key={n.title}>
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="font-display text-[16px] font-semibold tracking-[-0.02em] text-brand-600">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-ink-2">
                    {n.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
