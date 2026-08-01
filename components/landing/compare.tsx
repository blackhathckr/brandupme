import { Check, X } from "lucide-react";
import { COMPARE } from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
import { MorphButton } from "@/components/ui/brand-button";

export function Compare() {
  const { inhouse, brandupme } = COMPARE;

  return (
    <section id="compare" className="py-14 lg:py-20">
      <div className="container-page">
        <SectionHead
          align="center"
          eyebrow="Before you hire another salesperson"
          before="Two ways to get the"
          italic="same"
          after="job done"
          sub="Both put someone on your pipeline. Only one of them starts this week."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-surface-2 p-7 lg:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {inhouse.label}
            </p>
            <p className="mt-4 font-display text-[2rem] font-extrabold leading-none tracking-[-0.04em] text-ink-2">
              {inhouse.price}
            </p>
            <p className="mt-2 text-[13.5px] text-muted-foreground">{inhouse.period}</p>

            <ul className="mt-7 flex flex-col gap-3">
              {inhouse.rows.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[14.5px] text-ink-2">
                  <X
                    className="mt-0.5 size-4 shrink-0 text-brand-400"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.1}
            className="relative overflow-hidden rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-50 to-surface p-7 shadow-e3 lg:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-gold-300/40 blur-2xl"
            />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bronze">
                {brandupme.label}
              </p>
              <p className="mt-4 font-display text-[2rem] font-extrabold leading-none tracking-[-0.04em] text-brand-600">
                {brandupme.price}
              </p>
              <p className="mt-2 text-[13.5px] text-muted-foreground">{brandupme.period}</p>

              <ul className="mt-7 flex flex-col gap-3">
                {brandupme.rows.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 text-[14.5px] font-medium text-ink"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-success-text"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <MorphButton href="#register">Start with a partnership</MorphButton>
        </Reveal>
      </div>
    </section>
  );
}
