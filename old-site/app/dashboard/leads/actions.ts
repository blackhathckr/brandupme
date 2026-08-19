"use server";

import { revalidatePath } from "next/cache";
import { requireOwnedBusiness } from "@/lib/auth/guard";
import { markLeadViewed, unlockLead } from "@/lib/leads/unlock";

/**
 * Unlock a lead.
 *
 * The business id is checked against the signed-in user on every call by
 * requireOwnedBusiness, which re-reads ownership from the database. A posted
 * business id is never trusted - otherwise anyone could unlock anyone's leads
 * by changing a number in the form.
 */

export type UnlockState = { ok: boolean; message?: string };

export async function unlockLeadAction(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const businessId = Number.parseInt(String(formData.get("businessId") ?? ""), 10);
  const leadId = Number.parseInt(String(formData.get("leadId") ?? ""), 10);

  if (!Number.isFinite(businessId) || !Number.isFinite(leadId)) {
    return { ok: false, message: "Something went wrong. Please refresh." };
  }

  await requireOwnedBusiness(businessId);
  const result = await unlockLead(businessId, leadId);

  if (!result.ok) return { ok: false, message: result.message };

  await markLeadViewed(businessId, leadId);
  revalidatePath("/dashboard/leads/");
  return { ok: true };
}
