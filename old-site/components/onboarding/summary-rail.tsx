"use client";

import Link from "next/link";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { ADD_ON_PLANS, TESTER_DURATIONS } from "@/lib/brand/plans";
import type { Wizard } from "./wizard-state";

/**
 * The right-hand rail from the mockup: what you have chosen, what it includes,
 * and what it costs — recalculated live as the wizard state changes.
 */
export function SummaryRail({ wizard }: { wizard: Wizard }) {
  const selectedAddOns = ADD_ON_PLANS.filter((a) => wizard.addOns.includes(a.id));
  const duration = TESTER_DURATIONS.find((d) => d.days === wizard.durationDays);

  return (
    <aside className="space-y-4">
      {/* ── Current selection ──────────────────────────────────────── */}
      <div className="rounded-xl border border-rule bg-white p-5 shadow-p1">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[15px] font-bold text-slate-ink">
            Your Current Selection
          </h2>
          {wizard.plan.requiresDuration ? (
            <span className="shrink-0 rounded-md bg-iris-100 px-2 py-0.5 text-[11px] font-semibold text-iris-700">
              Tester Plan
            </span>
          ) : null}
        </div>

        <dl className="mt-4 space-y-3 text-[13px]">
          <div>
            <dt className="font-semibold text-slate-2">Primary Plan</dt>
            <dd className="mt-1 flex items-baseline justify-between gap-3">
              <span className="font-medium text-iris-600">{wizard.plan.name}</span>
              <span className="shrink-0 text-[12.5px] font-semibold text-slate-2">
                {wizard.plan.price} AED /{" "}
                {wizard.plan.unit === "day" ? "Day" : "Month"}
              </span>
            </dd>
          </div>

          {wizard.needsDuration ? (
            <div className="flex items-baseline justify-between gap-3">
              <dt className="font-semibold text-slate-2">Duration</dt>
              <dd className="text-[12.5px] font-semibold text-slate-2">
                {duration?.days} Days
              </dd>
            </div>
          ) : null}

          <div>
            <dt className="font-semibold text-slate-2">Additional Plans</dt>
            <dd className="mt-1 text-[12.5px] text-slate-3">
              {selectedAddOns.length ? (
                <ul className="space-y-1">
                  {selectedAddOns.map((a) => (
                    <li key={a.id} className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 truncate text-iris-600">{a.name}</span>
                      <span className="shrink-0 font-semibold text-slate-2">
                        {a.price} AED
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                "No additional plan selected yet."
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* ── Plan benefits ──────────────────────────────────────────── */}
      <div className="rounded-xl border border-rule bg-white p-5 shadow-p1">
        <h2 className="text-[15px] font-bold text-slate-ink">
          Plan Benefits{" "}
          <span className="font-semibold text-iris-600">({wizard.plan.name})</span>
        </h2>
        <ul className="mt-4 space-y-2.5">
          {wizard.plan.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircle2 aria-hidden className="mt-px size-4 shrink-0 text-ok" />
              <span className="text-[13px] text-slate-2">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Totals ─────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-rule bg-white p-5 shadow-p1">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[15px] font-bold text-iris-700">
            Total Payable{" "}
            <span className="font-medium text-slate-3">(Estimate)</span>
          </h2>
          <p className="text-[15px] font-extrabold text-iris-700">
            {wizard.total} AED
          </p>
        </div>

        <dl className="mt-4 space-y-2 text-[12.5px]">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-slate-3">
              Primary Plan
              {wizard.needsDuration && duration
                ? ` (${wizard.plan.name} - ${duration.days} Days)`
                : ""}
            </dt>
            <dd className="shrink-0 font-semibold text-slate-2">
              {wizard.primaryTotal} AED
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-slate-3">Additional Plans</dt>
            <dd className="shrink-0 font-semibold text-slate-2">
              {wizard.addOnTotal} AED
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-t border-rule pt-2.5 text-[14px]">
            <dt className="font-bold text-iris-700">Total</dt>
            <dd className="font-extrabold text-iris-700">{wizard.total} AED</dd>
          </div>
        </dl>

        <p className="mt-2.5 text-[11.5px] text-slate-3">
          Taxes applicable as per UAE law.
        </p>
      </div>

      {/* ── Upsell ─────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-rule bg-white p-5 shadow-p1">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-bold text-slate-ink">
              Need More Power?
            </h2>
            <p className="mt-1 text-[12.5px] leading-snug text-slate-3">
              Upgrade to our monthly plans anytime and grow your business faster.
            </p>
          </div>
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-full bg-iris-100 text-iris-600"
          >
            <TrendingUp className="size-5" />
          </span>
        </div>

        <Link
          href="/plans"
          className="mt-4 flex h-10 items-center justify-center rounded-lg border border-iris-200 text-[14px] font-semibold text-iris-700 transition-colors hover:bg-iris-50"
        >
          View All Plans
        </Link>
      </div>
    </aside>
  );
}
