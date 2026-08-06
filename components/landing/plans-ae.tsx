import { Check, Minus, ArrowUp } from "lucide-react";
import { AE_PLANS, AE_PRICING_COPY } from "@/lib/plans-ae";
import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/brand-button";
import { cn } from "@/lib/utils";

/**
 * Six stacked tiers.
 *
 * Each card shows only what it ADDS, under an "Everything in X, plus" line.
 * Listing all inherited features on all six cards would produce a wall of
 * forty-plus ticks per card and hide the actual difference between tiers -
 * which is the one thing a buyer is trying to work out.
 *
 * Three columns rather than six: six across is unreadable at any width, and
 * the tiers read naturally as two rows of three (entry / trust / growth).
 */
export function PlansAE() {
  return (
    <section id="pricing" className="bg-surface-2 py-16 lg:py-24">
      <div className="container-page">
        <SectionHead
          flourish
          eyebrow={AE_PRICING_COPY.eyebrow}
          before={AE_PRICING_COPY.headline}
          accent={AE_PRICING_COPY.accent}
          sub={AE_PRICING_COPY.sub}
        />

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {AE_PLANS.map((plan) => (
            <RevealItem key={plan.id}>
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-[280ms] ease-brand lg:p-7",
                  plan.featured
                    ? "border-brand-600 bg-deep shadow-e4"
                    : "border-line bg-white shadow-e1 hover:-translate-y-1 hover:border-brand-300 hover:shadow-e3",
                )}
              >
                {plan.badge && (
                  <span
                    className={cn(
                      "absolute right-5 top-0 rounded-b-lg px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em]",
                      plan.featured
                        ? "bg-gold-500 text-deep"
                        : "bg-brand-100 text-green-text",
                    )}
                  >
                    {plan.badge}
                  </span>
                )}

                {/* ── Head ─────────────────────────────────────────────── */}
                <p
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.14em]",
                    plan.featured ? "text-brand-400" : "text-ink-3",
                  )}
                >
                  {plan.purpose}
                </p>

                <h3
                  className={cn(
                    "mt-2 font-display text-[18px] font-bold leading-snug tracking-[-0.025em]",
                    plan.featured ? "text-white" : "text-ink",
                  )}
                >
                  {plan.name}
                </h3>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      "text-[15px] font-semibold",
                      plan.featured ? "text-deep-muted" : "text-ink-3",
                    )}
                  >
                    AED
                  </span>
                  <span
                    className={cn(
                      "font-display text-[clamp(2rem,4vw,2.5rem)] font-extrabold leading-none tracking-[-0.045em]",
                      plan.featured ? "text-brand-400" : "text-ink",
                    )}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      "text-[13px]",
                      plan.featured ? "text-deep-muted" : "text-ink-3",
                    )}
                  >
                    / month
                  </span>
                </p>

                {/* ── Inheritance ──────────────────────────────────────── */}
                {plan.inherits && (
                  <p
                    className={cn(
                      "mt-5 flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-semibold",
                      plan.featured
                        ? "border-brand-500/30 bg-brand-500/10 text-brand-300"
                        : "border-brand-100 bg-brand-50 text-green-text",
                    )}
                  >
                    <ArrowUp className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
                    Everything in {plan.inherits}, plus:
                  </p>
                )}

                {/* ── What this tier adds ──────────────────────────────── */}
                <div className="mt-5 flex flex-1 flex-col gap-4">
                  {plan.adds.map((group) => (
                    <div key={group.label}>
                      <p
                        className={cn(
                          "text-[10.5px] font-bold uppercase tracking-[0.13em]",
                          plan.featured ? "text-deep-muted" : "text-ink-3",
                        )}
                      >
                        {group.label}
                      </p>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className={cn(
                              "flex items-start gap-2 text-[12.5px] leading-[1.5]",
                              plan.featured ? "text-deep-soft/85" : "text-ink-2",
                            )}
                          >
                            <Check
                              className={cn(
                                "mt-0.5 size-3.5 shrink-0",
                                plan.featured ? "text-brand-400" : "text-green-text",
                              )}
                              strokeWidth={3}
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {plan.excludes && (
                    <ul className="flex flex-col gap-1.5 border-t border-line pt-3">
                      {plan.excludes.map((x) => (
                        <li
                          key={x}
                          className="flex items-start gap-2 text-[12px] leading-[1.5] text-ink-3"
                        >
                          <Minus className="mt-0.5 size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6">
                  <Button
                    href="#contact"
                    variant={plan.featured ? "primary" : "outline"}
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

        <p className="mt-8 text-center text-[12.5px] text-ink-3">
          {AE_PRICING_COPY.note}
        </p>
      </div>
    </section>
  );
}
