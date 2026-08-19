"use server";

import { revalidatePath } from "next/cache";
import { and, avg, count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { businesses, reviews } from "@/lib/db/schema";
import { getProfileByPassport } from "@/lib/directory/profile";

/**
 * Public review submission.
 *
 * Anyone may review for now, which is what the client asked. The status column
 * and the stored IP exist so moderation can be switched on later without a
 * migration, and so abuse can be traced when it happens.
 *
 * The business is resolved from the passport slug rather than a posted id, for
 * the same reason enquiries are: a posted id lets anyone review any listing.
 */

const reviewSchema = z.object({
  authorName: z.string().trim().min(2, "Enter your name").max(120),
  authorTitle: z.string().trim().max(120).optional().or(z.literal("")),
  rating: z.coerce.number().int().min(1, "Choose a rating").max(5),
  title: z.string().trim().max(160).optional().or(z.literal("")),
  body: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ReviewState = { ok: boolean; message?: string };

export async function submitReview(
  _prev: ReviewState,
  formData: FormData,
): Promise<ReviewState> {
  const slug = String(formData.get("passportSlug") ?? "");
  if (!slug) return { ok: false, message: "Something went wrong." };

  const parsed = reviewSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }
  if (parsed.data.website) return { ok: true, message: "Thank you for your review." };

  const profile = await getProfileByPassport(slug);
  if (!profile) return { ok: false, message: "This business is not available." };

  const db = await getDb();
  const h = await headers();

  await db.insert(reviews).values({
    businessId: profile.id,
    authorName: parsed.data.authorName,
    authorTitle: parsed.data.authorTitle || null,
    rating: parsed.data.rating,
    title: parsed.data.title || null,
    body: parsed.data.body || null,
    status: "published",
    ip: h.get("cf-connecting-ip") ?? h.get("x-forwarded-for"),
  });

  await refreshRating(profile.id);
  revalidatePath(`/p/${slug}`);
  return { ok: true, message: "Thank you for your review." };
}

/**
 * Recompute the denormalised rating.
 *
 * Stored as an integer tenth (4.9 -> 49) because SQLite has no decimal type and
 * repeated float averaging accumulates error.
 */
async function refreshRating(businessId: number): Promise<void> {
  const db = await getDb();
  const [row] = await db
    .select({ average: avg(reviews.rating), total: count() })
    .from(reviews)
    .where(and(eq(reviews.businessId, businessId), eq(reviews.status, "published")));

  const average = Number(row?.average ?? 0);
  await db
    .update(businesses)
    .set({
      ratingAvg: Math.round(average * 10),
      ratingCount: row?.total ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(businesses.id, businessId));
}
