import { Check, ShieldCheck } from "lucide-react";
import type { RegionContent } from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/brand-button";
import { cn } from "@/lib/utils";

/**
 * Plan cards.
 *
 * India has four (one monthly plus three annual payment terms), the UAE has
 * one (a monthly fee plus success commission). The grid adapts to the count
 * rather than inventing tiers to fill four columns - a fabricated price is
 * worse than an asymmetric layout.
 *
 * NOT a monthly/yearly toggle for India: three of its four plans are the same
 * annual plan on different payment terms, so that split would hide the thing
 * that actually sells - paying upfront is cheaper.
 */
export function Pricing({ r }: { r: RegionContent }) {
  const plans = r.pricing.plans;
  const single = plans.length === 1;

  return (
    <section id="pricing" className="bg-surface-2 py-16 lg:py-24">
      <div className="container-page">
        <SectionHead
          flourish
          eyebrow={r.pricing.eyebrow}
          before={r.pricing.headline}
          accent={r.pricing.accent}
        />

        <RevealGroup
          className={cn(
            "mt-12 grid gap-4",
            single
              ? "mx-auto max-w-md"
              : "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {plans.map((p) => (
            <RevealItem key={p.name}>
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-[280ms] ease-brand",
                  p.featured
                    ? "border-brand-600 bg-deep shadow-e4"
                    : "border-line bg-white shadow-e1 hover:-translate-y-1 hover:border-brand-300 hover:shadow-e3",
                  p.featured && !single && "lg:-translate-y-2",
                )}
              >
                {p.badge && (
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-b-lg px-3.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.12em]",
                      p.featured
                        ? "bg-gold-500 text-deep"
                        : "bg-brand-100 text-green-text",
                    )}
                  >
                    {p.badge}
                  </span>
                )}

                <div className={cn(p.badge ? "pt-6" : "pt-0")}>
                  <h3
                    className={cn(
                      "font-display text-[16.5px] font-bold leading-snug tracking-[-0.02em]",
                      p.featured ? "text-white" : "text-ink",
                    )}
                  >
                    {p.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-[12.5px]",
                      p.featured ? "text-deep-muted" : "text-ink-3",
                    )}
                  >
                    {p.note}
                  </p>

                  <p className="mt-5 flex items-baseline gap-1">
                    <span
                      className={cn(
                        "font-display font-extrabold leading-none tracking-[-0.04em]",
                        single
                          ? "text-[clamp(2.25rem,5vw,3rem)]"
                          : "text-[clamp(1.6rem,2.8vw,2rem)]",
                        p.featured ? "text-brand-400" : "text-ink",
                      )}
                    >
                      {r.currency}
                      {p.price}
                    </span>
                    <span
                      className={cn(
                        "text-[12.5px]",
                        p.featured ? "text-deep-muted" : "text-ink-3",
                      )}
                    >
                      {p.period}
                    </span>
                  </p>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {r.pricing.features.map((f) => (
                    <li
                      key={f}
                      className={cn(
                        "flex items-start gap-2.5 text-[12.5px] leading-[1.5]",
                        p.featured ? "text-deep-soft/85" : "text-ink-2",
                      )}
                    >
                      <Check
                        className={cn(
                          "mt-0.5 size-3.5 shrink-0",
                          p.featured ? "text-brand-400" : "text-green-text",
                        )}
                        strokeWidth={3}
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button
                    href="#contact"
                    variant={p.featured ? "primary" : "outline"}
                    size="md"
                    icon
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8 flex justify-center">
          <p className="inline-flex max-w-xl items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-center text-[12.5px] text-ink-3">
            <ShieldCheck
              className="size-4 shrink-0 text-green-text"
              strokeWidth={2}
              aria-hidden
            />
            {r.pricing.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
