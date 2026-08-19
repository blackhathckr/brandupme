"use client";

import { CalendarDays, Check, Info, Layers, X } from "lucide-react";
import { Panel } from "@/components/site/form-kit";
import {
  ADD_ON_PLANS,
  PRIMARY_PLANS,
  TESTER_DURATIONS,
} from "@/lib/brand/plans";
import type { Wizard } from "./wizard-state";
import { cn } from "@/lib/utils";

/**
 * Step 3 — "Choose Your Plan".
 *
 * Three sections on one canvas, exactly as the mockup draws them: the seven
 * primary plans as a radio row, the tester duration picker (only meaningful for
 * the Daily Pass), and the optional add-ons. Section numbering follows the
 * mockup, which numbers 1 and 3 but leaves the duration block unnumbered.
 */
export function PlanStep({ wizard }: { wizard: Wizard }) {
  return (
    <div className="space-y-5">
      {/* ── 1. Primary plan ──────────────────────────────────────────── */}
      <Panel
        step="1."
        title={
          <>
            Choose Your Primary Plan{" "}
            <span className="text-[13px] font-semibold text-iris-600">
              (Required)
            </span>
          </>
        }
        description="This plan will be your main listing and visibility plan."
        action={
          <button
            type="button"
            className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-slate-2 transition-colors hover:text-iris-600"
          >
            <Layers className="size-4" aria-hidden />
            Compare All Plans
          </button>
        }
      >
        <div
          role="radiogroup"
          aria-label="Primary plan"
          className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-7"
        >
          {PRIMARY_PLANS.map((plan) => {
            const active = wizard.planId === plan.id;

            return (
              <button
                key={plan.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => wizard.setPlanId(plan.id)}
                className={cn(
                  "flex flex-col rounded-xl border p-3 text-left transition-all",
                  active
                    ? "border-iris-600 bg-iris-50/40 shadow-p2 ring-1 ring-iris-600"
                    : "border-rule bg-white hover:border-iris-300 hover:shadow-p1",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "grid size-[18px] shrink-0 place-items-center rounded-full border-2 transition-colors",
                    active ? "border-iris-600" : "border-slate-4",
                  )}
                >
                  {active ? (
                    <span className="size-2 rounded-full bg-iris-600" />
                  ) : null}
                </span>

                <span className="mt-3 text-[12.5px] font-bold leading-tight text-slate-ink">
                  {plan.name}
                </span>

                <span className="mt-2 block text-[12.5px] font-bold text-iris-600">
                  {plan.price} AED{" "}
                  <span className="font-medium text-slate-3">
                    / {plan.unit === "day" ? "Day" : "Month"}
                  </span>
                </span>

                <span className="mt-2 text-[11px] leading-snug text-slate-3">
                  {plan.blurb}
                </span>
              </button>
            );
          })}
        </div>
      </Panel>

      {/* ── Tester duration ──────────────────────────────────────────── */}
      {wizard.needsDuration ? (
        <section className="rounded-xl border border-iris-200 bg-paper-2 p-5">
          <h2 className="text-[15px] font-bold text-iris-700">
            Select Duration for Tester Plan{" "}
            <span className="text-[13px] font-semibold text-iris-600">
              (Required)
            </span>
          </h2>
          <p className="mt-1 text-[13px] text-slate-3">
            Choose the duration for your {wizard.plan.name}.
          </p>

          <div
            role="radiogroup"
            aria-label="Tester duration"
            className="mt-4 grid gap-3 sm:grid-cols-3"
          >
            {TESTER_DURATIONS.map((d) => {
              const active = wizard.durationDays === d.days;

              return (
                <button
                  key={d.days}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => wizard.setDurationDays(d.days)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border bg-white p-4 text-left transition-all",
                    active
                      ? "border-iris-600 shadow-p2 ring-1 ring-iris-600"
                      : "border-rule hover:border-iris-300",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg",
                      active
                        ? "bg-iris-100 text-iris-600"
                        : "bg-paper text-slate-4",
                    )}
                  >
                    <CalendarDays className="size-[18px]" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-slate-ink">
                      {d.days} Days
                    </span>
                    <span className="block text-[13px] font-semibold text-iris-600">
                      {d.price} AED
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className={cn(
                      "grid size-[18px] shrink-0 place-items-center rounded-full border-2",
                      active ? "border-iris-600" : "border-slate-4",
                    )}
                  >
                    {active ? (
                      <span className="size-2 rounded-full bg-iris-600" />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 flex items-start gap-2.5 rounded-lg bg-white/70 p-3 text-[12.5px] text-slate-3">
            <Info aria-hidden className="mt-px size-4 shrink-0 text-iris-500" />
            After the selected duration ends, the plan will expire automatically.
            You can renew or upgrade anytime.
          </p>
        </section>
      ) : null}

      {/* ── 3. Add-ons ───────────────────────────────────────────────── */}
      <Panel
        step="3."
        title="Add Additional Plans (Optional)"
        description="Boost your business growth with additional plans. You can add one or more plans."
      >
        <div className="grid gap-3 lg:grid-cols-3">
          {ADD_ON_PLANS.map((addOn) => {
            const active = wizard.addOns.includes(addOn.id);
            // The mockup draws the Influencer card's bullets with red crosses
            // while the other two use green ticks. Replicated as drawn, but it
            // reads as a design slip rather than intent — FLAGGED.
            const crossed = addOn.id === "influencer-discovery";

            return (
              <button
                key={addOn.id}
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => wizard.toggleAddOn(addOn.id)}
                className={cn(
                  "flex flex-col rounded-xl border p-4 text-left transition-all",
                  active
                    ? "border-iris-600 bg-iris-50/40 shadow-p2 ring-1 ring-iris-600"
                    : "border-rule bg-white hover:border-iris-300 hover:shadow-p1",
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg text-[15px]",
                      crossed
                        ? "bg-rose-100 text-rose-500"
                        : addOn.id === "employer"
                          ? "bg-sky-100 text-sky-600"
                          : "bg-emerald-100 text-emerald-600",
                    )}
                  >
                    <Layers className="size-[18px]" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-bold leading-tight text-slate-ink">
                      {addOn.name}
                    </span>
                    <span className="mt-1.5 block text-[13px] font-bold text-iris-600">
                      {addOn.price} AED{" "}
                      <span className="font-medium text-slate-3">/ Month</span>
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className={cn(
                      "grid size-[18px] shrink-0 place-items-center rounded border-2 transition-colors",
                      active
                        ? "border-iris-600 bg-iris-600"
                        : "border-slate-4 bg-white",
                    )}
                  >
                    {active ? (
                      <Check className="size-3 text-white" strokeWidth={3} />
                    ) : null}
                  </span>
                </div>

                <p className="mt-2.5 text-[11.5px] leading-snug text-slate-3">
                  {addOn.blurb}
                </p>

                <ul className="mt-3 space-y-1.5 border-t border-rule-2 pt-3">
                  {addOn.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-[11.5px] text-slate-2"
                    >
                      {crossed ? (
                        <X
                          aria-hidden
                          className="mt-px size-3.5 shrink-0 text-rose-400"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Check
                          aria-hidden
                          className="mt-px size-3.5 shrink-0 text-ok"
                          strokeWidth={2.5}
                        />
                      )}
                      {benefit}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
