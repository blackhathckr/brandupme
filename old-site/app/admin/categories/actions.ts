"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { categories, categoryRelationships } from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/guard";

/**
 * Category and relationship management.
 *
 * The relationship table drives "Businesses you may also need", which is the
 * client's cross-sell. He asked to maintain it himself, so it is editable here
 * rather than fixed in code.
 */

export type CategoryState = { ok: boolean; message?: string };

export async function updateCategory(
  _prev: CategoryState,
  formData: FormData,
): Promise<CategoryState> {
  await requirePermission("category.manage", "/admin/categories/");

  const id = Number.parseInt(String(formData.get("categoryId") ?? ""), 10);
  if (!Number.isFinite(id)) return { ok: false, message: "Unknown category." };

  const name = String(formData.get("name") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();
  const hidden = formData.get("hidden") === "on";

  if (name.length < 2) return { ok: false, message: "Name is too short." };

  const db = await getDb();
  // The slug is deliberately not editable. Changing it would break every
  // indexed URL and every link the client has shared for that category.
  await db
    .update(categories)
    .set({
      name,
      icon: icon || null,
      status: hidden ? "hidden" : "active",
      updatedAt: new Date(),
    })
    .where(eq(categories.id, id));

  revalidatePath("/admin/categories/");
  revalidatePath("/uae/");
  return { ok: true, message: "Category updated." };
}

export async function addRelationship(
  _prev: CategoryState,
  formData: FormData,
): Promise<CategoryState> {
  await requirePermission("category.manage", "/admin/categories/");

  const categoryId = Number.parseInt(String(formData.get("categoryId") ?? ""), 10);
  const relatedId = Number.parseInt(String(formData.get("relatedCategoryId") ?? ""), 10);
  const strength = Number.parseInt(String(formData.get("strength") ?? "5"), 10);

  if (!Number.isFinite(categoryId) || !Number.isFinite(relatedId)) {
    return { ok: false, message: "Choose a category." };
  }
  if (categoryId === relatedId) {
    return { ok: false, message: "A category cannot recommend itself." };
  }

  const db = await getDb();
  await db
    .insert(categoryRelationships)
    .values({
      categoryId,
      relatedCategoryId: relatedId,
      strength: Math.min(10, Math.max(1, strength)),
    })
    .onConflictDoUpdate({
      target: [categoryRelationships.categoryId, categoryRelationships.relatedCategoryId],
      set: { strength: Math.min(10, Math.max(1, strength)) },
    });

  revalidatePath("/admin/categories/");
  return { ok: true, message: "Recommendation saved." };
}

export async function removeRelationship(
  _prev: CategoryState,
  formData: FormData,
): Promise<CategoryState> {
  await requirePermission("category.manage", "/admin/categories/");

  const categoryId = Number.parseInt(String(formData.get("categoryId") ?? ""), 10);
  const relatedId = Number.parseInt(String(formData.get("relatedCategoryId") ?? ""), 10);
  if (!Number.isFinite(categoryId) || !Number.isFinite(relatedId)) {
    return { ok: false, message: "Unknown recommendation." };
  }

  const db = await getDb();
  await db
    .delete(categoryRelationships)
    .where(
      and(
        eq(categoryRelationships.categoryId, categoryId),
        eq(categoryRelationships.relatedCategoryId, relatedId),
      ),
    );

  revalidatePath("/admin/categories/");
  return { ok: true, message: "Recommendation removed." };
}
