"use client";

import { useActionState } from "react";
import { KeyRound } from "lucide-react";
import { unlockLeadAction, type UnlockState } from "@/app/dashboard/leads/actions";

const initial: UnlockState = { ok: false };

/**
 * Spends an unlock on one lead.
 *
 * A plain form posting to a server action, so it works without JavaScript. The
 * business id is posted but re-verified against the session server-side - it is
 * a convenience, never the authority.
 */
export function UnlockButton({
  businessId,
  leadId,
}: {
  businessId: number;
  leadId: number;
}) {
  const [state, formAction, pending] = useActionState(unlockLeadAction, initial);

  return (
    <div className="shrink-0 text-right">
      <form action={formAction}>
        <input type="hidden" name="businessId" value={businessId} />
        <input type="hidden" name="leadId" value={leadId} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-600 px-4
            text-[12.5px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
        >
          <KeyRound className="size-3.5" strokeWidth={2.5} aria-hidden />
          {pending ? "Unlocking…" : "Unlock contact"}
        </button>
      </form>

      {state.message && (
        <p role="alert" className="mt-2 max-w-[220px] text-[11.5px] leading-[1.5] text-red-600">
          {state.message}
        </p>
      )}
    </div>
  );
}
