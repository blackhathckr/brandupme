"use client";

import { useActionState } from "react";
import {
  activateSubscription,
  publishBusiness,
  suspendBusiness,
  type AdminActionState,
} from "@/app/admin/businesses/actions";

/**
 * Admin controls for one listing.
 *
 * Buttons are hidden when the signed-in user lacks the permission, but the
 * server actions check again - a hidden button is presentation, not security,
 * and anyone can post a form by hand.
 */

const initial: AdminActionState = { ok: false };

export function AdminBusinessRow({
  businessId,
  status,
  verified,
  subscriptionId,
  subscriptionStatus,
  canVerify,
  canBill,
}: {
  businessId: number;
  status: string;
  verified: boolean;
  subscriptionId: number | null;
  subscriptionStatus: string | null;
  canVerify: boolean;
  canBill: boolean;
}) {
  const [publishState, publishAction, publishing] = useActionState(publishBusiness, initial);
  const [suspendState, suspendAction, suspending] = useActionState(suspendBusiness, initial);
  const [billState, billAction, billing] = useActionState(activateSubscription, initial);

  const message = publishState.message ?? suspendState.message ?? billState.message;

  if (!canVerify && !canBill) return null;

  return (
    <div className="mt-4 border-t border-line pt-4">
      <div className="flex flex-wrap items-end gap-3">
        {canVerify && status !== "published" && (
          <form action={publishAction} className="flex items-end gap-3">
            <input type="hidden" name="businessId" value={businessId} />
            <label className="flex items-center gap-2 text-[12.5px] text-ink-2">
              <input
                type="checkbox"
                name="verify"
                defaultChecked={verified}
                className="size-4 rounded border-line accent-brand-600"
              />
              Mark verified
            </label>
            <button
              type="submit"
              disabled={publishing}
              className="inline-flex h-9 items-center rounded-full bg-brand-600 px-4 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
            >
              {publishing ? "Publishing…" : "Publish listing"}
            </button>
          </form>
        )}

        {canVerify && status === "published" && (
          <form action={suspendAction}>
            <input type="hidden" name="businessId" value={businessId} />
            <button
              type="submit"
              disabled={suspending}
              className="inline-flex h-9 items-center rounded-full border border-red-200 bg-red-50 px-4 text-[12.5px] font-bold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-60"
            >
              {suspending ? "Suspending…" : "Suspend"}
            </button>
          </form>
        )}

        {canBill && subscriptionId && subscriptionStatus !== "active" && (
          <form action={billAction} className="flex flex-wrap items-end gap-2">
            <input type="hidden" name="subscriptionId" value={subscriptionId} />
            <div>
              <label
                htmlFor={`months-${subscriptionId}`}
                className="mb-1 block text-[11px] font-semibold text-ink-3"
              >
                Months
              </label>
              <input
                id={`months-${subscriptionId}`}
                name="months"
                type="number"
                min={1}
                max={36}
                defaultValue={1}
                className="h-9 w-20 rounded-lg border border-line px-2.5 text-[12.5px] outline-none focus-visible:border-brand-400"
              />
            </div>
            <div>
              <label
                htmlFor={`ref-${subscriptionId}`}
                className="mb-1 block text-[11px] font-semibold text-ink-3"
              >
                Payment reference
              </label>
              <input
                id={`ref-${subscriptionId}`}
                name="paymentRef"
                placeholder="Bank transfer, receipt no."
                className="h-9 w-52 rounded-lg border border-line px-2.5 text-[12.5px] outline-none focus-visible:border-brand-400"
              />
            </div>
            <button
              type="submit"
              disabled={billing}
              className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[12.5px] font-bold text-ink-2 transition-colors hover:border-brand-300 hover:text-green-text disabled:opacity-60"
            >
              {billing ? "Activating…" : "Activate plan"}
            </button>
          </form>
        )}
      </div>

      {message && (
        <p role="status" className="mt-3 text-[12px] font-medium text-green-text">
          {message}
        </p>
      )}
    </div>
  );
}
