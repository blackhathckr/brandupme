"use client";

import { useActionState } from "react";
import { savePlanFeatures, type PlanState } from "@/app/admin/plans/actions";

const initial: PlanState = { ok: false };

type Editable = { key: string; label: string; kind: "bool" | "number" | "leadAccess" };

/**
 * One plan's feature grants.
 *
 * Every checkbox is preceded by a hidden input carrying "false", because an
 * unchecked checkbox posts nothing at all. Without it, unticking a box would
 * leave the old value in the database rather than turning the feature off.
 */
export function PlanFeatureEditor({
  plan,
  features,
  editable,
}: {
  plan: { id: number; name: string; price: string };
  features: Record<string, string>;
  editable: Editable[];
}) {
  const [state, formAction, saving] = useActionState(savePlanFeatures, initial);

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-white p-5 shadow-e1">
      <input type="hidden" name="planId" value={plan.id} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
          {plan.name}
          <span className="ml-2 text-[13px] font-semibold text-green-text">{plan.price}</span>
        </h2>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-9 items-center rounded-full bg-brand-600 px-4 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {editable.map((f) => {
          const value = features[f.key] ?? "";

          if (f.kind === "bool") {
            return (
              <label key={f.key} className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-2 px-3.5 py-2.5">
                <input type="hidden" name={`feature.${f.key}`} value="false" />
                <input
                  type="checkbox"
                  name={`feature.${f.key}`}
                  value="true"
                  defaultChecked={value === "true"}
                  className="size-4 rounded border-line accent-brand-600"
                />
                <span className="text-[12.5px] text-ink-2">{f.label}</span>
              </label>
            );
          }

          if (f.kind === "leadAccess") {
            return (
              <div key={f.key} className="rounded-xl border border-line bg-surface-2 px-3.5 py-2.5">
                <label htmlFor={`${plan.id}-${f.key}`} className="block text-[11.5px] font-semibold text-ink">
                  {f.label}
                </label>
                <select
                  id={`${plan.id}-${f.key}`}
                  name={`feature.${f.key}`}
                  defaultValue={value || "none"}
                  className="mt-1.5 h-9 w-full rounded-lg border border-line bg-white px-2.5 text-[12.5px] outline-none focus-visible:border-brand-400"
                >
                  <option value="none">None - names only</option>
                  <option value="limited">Limited - monthly quota</option>
                  <option value="full">Full - all leads</option>
                </select>
              </div>
            );
          }

          return (
            <div key={f.key} className="rounded-xl border border-line bg-surface-2 px-3.5 py-2.5">
              <label htmlFor={`${plan.id}-${f.key}`} className="block text-[11.5px] font-semibold text-ink">
                {f.label}
              </label>
              <input
                id={`${plan.id}-${f.key}`}
                name={`feature.${f.key}`}
                type="text"
                inputMode="numeric"
                defaultValue={value}
                placeholder="0"
                className="mt-1.5 h-9 w-full rounded-lg border border-line bg-white px-2.5 text-[12.5px] outline-none focus-visible:border-brand-400"
              />
            </div>
          );
        })}
      </div>

      {state.message && (
        <p role="status" className={`mt-3 text-[12px] font-medium ${state.ok ? "text-green-text" : "text-red-600"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
