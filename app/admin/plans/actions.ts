"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { planFeatures } from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/guard";
import { FEATURE } from "@/lib/permissions/features";

/**
 * Update what a plan grants.
 *
 * Only keys the application knows about are accepted. Without that check an
 * operator could store a typo like "contact_visable", which would silently
 * evaluate as "not granted" and quietly lock every business on that plan out of
 * something they had paid for.
 */

const KNOWN = new Set<string>(Object.values(FEATURE));

export type PlanState = { ok: boolean; message?: string };

export async function savePlanFeatures(
  _prev: PlanState,
  formData: FormData,
): Promise<PlanState> {
  await requirePermission("plan.manage", "/admin/plans/");

  const planId = Number.parseInt(String(formData.get("planId") ?? ""), 10);
  if (!Number.isFinite(planId)) return { ok: false, message: "Unknown plan." };

  const db = await getDb();
  let written = 0;

  for (const [name, raw] of formData.entries()) {
    if (!name.startsWith("feature.")) continue;
    const key = name.slice("feature.".length);
    if (!KNOWN.has(key)) continue;

    const value = String(raw).trim();
    // Checkboxes post nothing when unchecked, so the form sends an explicit
    // "false" alongside each one - see the hidden input in the editor.
    await db
      .insert(planFeatures)
      .values({ planId, featureKey: key, featureValue: value })
      .onConflictDoUpdate({
        target: [planFeatures.planId, planFeatures.featureKey],
        set: { featureValue: value },
      });
    written++;
  }

  revalidatePath("/admin/plans/");
  revalidatePath("/uae/register/");
  return { ok: true, message: `Saved ${written} settings.` };
}

export async function removePlanFeature(
  _prev: PlanState,
  formData: FormData,
): Promise<PlanState> {
  await requirePermission("plan.manage", "/admin/plans/");
  const planId = Number.parseInt(String(formData.get("planId") ?? ""), 10);
  const key = String(formData.get("featureKey") ?? "");
  if (!Number.isFinite(planId) || !KNOWN.has(key)) {
    return { ok: false, message: "Unknown setting." };
  }

  const db = await getDb();
  await db
    .delete(planFeatures)
    .where(and(eq(planFeatures.planId, planId), eq(planFeatures.featureKey, key)));

  revalidatePath("/admin/plans/");
  return { ok: true, message: "Setting removed." };
}
