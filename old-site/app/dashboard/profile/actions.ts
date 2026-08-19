"use server";

import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import {
  businessContacts,
  businessImages,
  businesses,
} from "@/lib/db/schema";
import { requireOwnedBusiness } from "@/lib/auth/guard";
import { entitlementsFor } from "@/lib/permissions/resolve";
import { FEATURE, amount } from "@/lib/permissions/features";
import { uploadImage } from "@/lib/media/upload";

/**
 * Business profile editing.
 *
 * Ownership is re-read from the database on every call. The posted business id
 * is a convenience for the form, never the authority - otherwise changing a
 * number in the payload would let anyone edit any listing.
 *
 * Editing an already-published listing does not send it back for re-approval.
 * The client's team verifies a business, not every subsequent typo fix, and
 * making owners wait for a re-check would stop them keeping details current.
 */

const profileSchema = z.object({
  tagline: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
  establishedYear: z.string().trim().max(4).optional().or(z.literal("")),
  teamSize: z.string().trim().max(60).optional().or(z.literal("")),
  languages: z.string().trim().max(200).optional().or(z.literal("")),
  workingHours: z.string().trim().max(120).optional().or(z.literal("")),
  businessType: z.string().trim().max(120).optional().or(z.literal("")),
  licenseNo: z.string().trim().max(60).optional().or(z.literal("")),

  phone: z.string().trim().max(32).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(32).optional().or(z.literal("")),
  email: z.string().trim().max(180).optional().or(z.literal("")),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  address: z.string().trim().max(400).optional().or(z.literal("")),
  area: z.string().trim().max(120).optional().or(z.literal("")),
  facebookUrl: z.string().trim().max(300).optional().or(z.literal("")),
  instagramUrl: z.string().trim().max(300).optional().or(z.literal("")),
  linkedinUrl: z.string().trim().max(300).optional().or(z.literal("")),
  xUrl: z.string().trim().max(300).optional().or(z.literal("")),
  youtubeUrl: z.string().trim().max(300).optional().or(z.literal("")),
});

export type ProfileState = { ok: boolean; message?: string };

export async function saveProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const businessId = Number.parseInt(String(formData.get("businessId") ?? ""), 10);
  if (!Number.isFinite(businessId)) return { ok: false, message: "Unknown business." };

  await requireOwnedBusiness(businessId);

  const parsed = profileSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  const d = parsed.data;

  const db = await getDb();
  const year = Number.parseInt(d.establishedYear ?? "", 10);

  await db
    .update(businesses)
    .set({
      tagline: d.tagline || null,
      description: d.description || null,
      establishedYear: Number.isFinite(year) ? year : null,
      teamSize: d.teamSize || null,
      languages: d.languages
        ? d.languages.split(",").map((s) => s.trim()).filter(Boolean)
        : null,
      workingHours: d.workingHours || null,
      businessType: d.businessType || null,
      licenseNo: d.licenseNo || null,
      updatedAt: new Date(),
    })
    .where(eq(businesses.id, businessId));

  await db
    .update(businessContacts)
    .set({
      phone: d.phone || null,
      whatsapp: d.whatsapp || null,
      email: d.email || null,
      website: d.website || null,
      address: d.address || null,
      area: d.area || null,
      facebookUrl: d.facebookUrl || null,
      instagramUrl: d.instagramUrl || null,
      linkedinUrl: d.linkedinUrl || null,
      xUrl: d.xUrl || null,
      youtubeUrl: d.youtubeUrl || null,
      updatedAt: new Date(),
    })
    .where(eq(businessContacts.businessId, businessId));

  revalidatePath("/dashboard/profile/");
  return { ok: true, message: "Profile saved." };
}

/**
 * Logo and gallery uploads.
 *
 * The gallery cap comes from the plan's image_quota, so a business cannot post
 * more photos than it pays for by calling the endpoint repeatedly.
 */
export async function uploadBusinessImage(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const businessId = Number.parseInt(String(formData.get("businessId") ?? ""), 10);
  const kind = String(formData.get("kind") ?? "gallery");
  const file = formData.get("file");

  if (!Number.isFinite(businessId)) return { ok: false, message: "Unknown business." };
  if (!(file instanceof File)) return { ok: false, message: "Choose an image." };

  await requireOwnedBusiness(businessId);
  const db = await getDb();

  if (kind === "gallery") {
    const ent = await entitlementsFor(db, businessId);
    const quota = amount(ent.features, FEATURE.IMAGE_QUOTA);
    const [existing] = await db
      .select({ n: sql<number>`count(*)` })
      .from(businessImages)
      .where(
        and(
          eq(businessImages.businessId, businessId),
          eq(businessImages.imageType, "gallery"),
        ),
      );
    if ((existing?.n ?? 0) >= quota) {
      return {
        ok: false,
        message: `Your plan allows ${quota} ${quota === 1 ? "image" : "images"}. Remove one or upgrade.`,
      };
    }
  }

  const result = await uploadImage(file, `business/${businessId}`);
  if (!result.ok) return { ok: false, message: result.error };

  if (kind === "logo") {
    await db
      .update(businesses)
      .set({ logo: result.url, updatedAt: new Date() })
      .where(eq(businesses.id, businessId));
  } else {
    await db.insert(businessImages).values({
      businessId,
      url: result.url,
      imageType: "gallery",
    });
  }

  revalidatePath("/dashboard/profile/");
  return { ok: true, message: "Image uploaded." };
}

export async function deleteBusinessImage(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const businessId = Number.parseInt(String(formData.get("businessId") ?? ""), 10);
  const imageId = Number.parseInt(String(formData.get("imageId") ?? ""), 10);
  if (!Number.isFinite(businessId) || !Number.isFinite(imageId)) {
    return { ok: false, message: "Unknown image." };
  }

  await requireOwnedBusiness(businessId);
  const db = await getDb();

  // Scoped to the business as well as the image id, so an id from another
  // listing cannot be deleted by guessing.
  await db
    .delete(businessImages)
    .where(
      and(eq(businessImages.id, imageId), eq(businessImages.businessId, businessId)),
    );

  revalidatePath("/dashboard/profile/");
  return { ok: true, message: "Image removed." };
}
