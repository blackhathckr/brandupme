"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { ads, countries } from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/guard";
import { uploadImage } from "@/lib/media/upload";

/**
 * Sponsored placement management.
 *
 * The client's team sells and schedules these, so there is no advertiser
 * self-service - just create, pause and delete.
 */

const adSchema = z.object({
  title: z.string().trim().min(2, "Enter a title").max(160),
  subtitle: z.string().trim().max(240).optional().or(z.literal("")),
  targetUrl: z.string().trim().url("Enter a valid destination URL").max(400),
  ctaLabel: z.string().trim().max(60).optional().or(z.literal("")),
  placement: z.enum(["hero", "sidebar", "footer", "listing"]),
  categoryId: z.string().optional().or(z.literal("")),
  locationId: z.string().optional().or(z.literal("")),
  weight: z.string().optional().or(z.literal("")),
});

export type AdState = { ok: boolean; message?: string };

export async function createAd(
  _prev: AdState,
  formData: FormData,
): Promise<AdState> {
  await requirePermission("ad.manage", "/admin/ads/");

  const parsed = adSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check the form." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose a creative image." };
  }

  const upload = await uploadImage(file, "ads");
  if (!upload.ok) return { ok: false, message: upload.error };

  const db = await getDb();
  const [country] = await db
    .select({ id: countries.id })
    .from(countries)
    .where(eq(countries.code, "ae"))
    .limit(1);
  if (!country) return { ok: false, message: "Country not configured." };

  const d = parsed.data;
  const categoryId = d.categoryId ? Number.parseInt(d.categoryId, 10) : null;
  const locationId = d.locationId ? Number.parseInt(d.locationId, 10) : null;

  await db.insert(ads).values({
    countryId: country.id,
    title: d.title,
    subtitle: d.subtitle || null,
    image: upload.url,
    targetUrl: d.targetUrl,
    ctaLabel: d.ctaLabel || null,
    placement: d.placement,
    // Empty means "runs everywhere", which is why these are nullable rather
    // than defaulted to some catch-all row.
    categoryId: Number.isFinite(categoryId as number) ? categoryId : null,
    locationId: Number.isFinite(locationId as number) ? locationId : null,
    weight: Number.parseInt(d.weight ?? "1", 10) || 1,
    status: "active",
  });

  revalidatePath("/admin/ads/");
  return { ok: true, message: "Placement created." };
}

export async function toggleAd(
  _prev: AdState,
  formData: FormData,
): Promise<AdState> {
  await requirePermission("ad.manage", "/admin/ads/");
  const id = Number.parseInt(String(formData.get("adId") ?? ""), 10);
  if (!Number.isFinite(id)) return { ok: false, message: "Unknown placement." };

  const db = await getDb();
  const [row] = await db.select({ status: ads.status }).from(ads).where(eq(ads.id, id)).limit(1);
  if (!row) return { ok: false, message: "Unknown placement." };

  await db
    .update(ads)
    .set({ status: row.status === "active" ? "paused" : "active", updatedAt: new Date() })
    .where(eq(ads.id, id));

  revalidatePath("/admin/ads/");
  return { ok: true, message: row.status === "active" ? "Paused." : "Resumed." };
}

export async function deleteAd(
  _prev: AdState,
  formData: FormData,
): Promise<AdState> {
  await requirePermission("ad.manage", "/admin/ads/");
  const id = Number.parseInt(String(formData.get("adId") ?? ""), 10);
  if (!Number.isFinite(id)) return { ok: false, message: "Unknown placement." };

  const db = await getDb();
  await db.delete(ads).where(eq(ads.id, id));

  revalidatePath("/admin/ads/");
  return { ok: true, message: "Placement deleted." };
}
