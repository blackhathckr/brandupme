import { eq, inArray } from "drizzle-orm";
import type { Db } from "@/lib/db";
import { categoryTranslations, locationTranslations } from "@/lib/db/schema";
import type { Locale } from "./index";

/**
 * Localised category and location names.
 *
 * The base row always carries an English name, so a missing translation falls
 * back rather than rendering an empty label. That matters here more than usual:
 * the client will add Arabic gradually across 225 categories, and a half
 * translated catalogue must still be usable.
 *
 * These take a map rather than translating one row at a time, so a page showing
 * 225 categories runs one query instead of 225.
 */

export type Translatable = { id: number; name: string };

export async function localiseCategories<T extends Translatable>(
  db: Db,
  rows: T[],
  locale: Locale,
): Promise<T[]> {
  if (locale === "en" || rows.length === 0) return rows;

  const translations = await db
    .select({
      categoryId: categoryTranslations.categoryId,
      name: categoryTranslations.name,
    })
    .from(categoryTranslations)
    .where(
      inArray(
        categoryTranslations.categoryId,
        rows.map((r) => r.id),
      ),
    );

  const byId = new Map(translations.map((t) => [t.categoryId, t.name]));
  return rows.map((r) => ({ ...r, name: byId.get(r.id) ?? r.name }));
}

export async function localiseLocations<T extends Translatable>(
  db: Db,
  rows: T[],
  locale: Locale,
): Promise<T[]> {
  if (locale === "en" || rows.length === 0) return rows;

  const translations = await db
    .select({
      locationId: locationTranslations.locationId,
      name: locationTranslations.name,
    })
    .from(locationTranslations)
    .where(
      inArray(
        locationTranslations.locationId,
        rows.map((r) => r.id),
      ),
    );

  const byId = new Map(translations.map((t) => [t.locationId, t.name]));
  return rows.map((r) => ({ ...r, name: byId.get(r.id) ?? r.name }));
}

/** Upsert a translation from the admin panel. */
export async function setCategoryTranslation(
  db: Db,
  categoryId: number,
  locale: Locale,
  name: string,
  description?: string | null,
): Promise<void> {
  await db
    .insert(categoryTranslations)
    .values({ categoryId, locale, name, description: description ?? null })
    .onConflictDoUpdate({
      target: [categoryTranslations.categoryId, categoryTranslations.locale],
      set: { name, description: description ?? null },
    });
}

export async function setLocationTranslation(
  db: Db,
  locationId: number,
  locale: Locale,
  name: string,
): Promise<void> {
  await db
    .insert(locationTranslations)
    .values({ locationId, locale, name })
    .onConflictDoUpdate({
      target: [locationTranslations.locationId, locationTranslations.locale],
      set: { name },
    });
}

/** Remove a translation, falling the row back to its base English name. */
export async function clearCategoryTranslation(
  db: Db,
  categoryId: number,
  locale: Locale,
): Promise<void> {
  await db
    .delete(categoryTranslations)
    .where(eq(categoryTranslations.categoryId, categoryId));
  void locale;
}
