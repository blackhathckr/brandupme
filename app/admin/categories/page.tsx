import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { categories, categoryRelationships, countries } from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/guard";
import { CategoryManager } from "@/components/portal/category-manager";

/**
 * Category catalogue and cross-sell relationships.
 *
 * Only sub-categories can carry recommendations, because that is the level a
 * visitor actually browses - "Businesses you may also need" under Cleaning
 * Companies is useful, under Home & Maintenance Services it is not.
 */

export const metadata: Metadata = { title: "Categories", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  await requirePermission("category.manage", "/admin/categories/");
  const db = await getDb();

  const [country] = await db
    .select({ id: countries.id })
    .from(countries)
    .where(eq(countries.code, "ae"))
    .limit(1);
  if (!country) return null;

  const [all, relations] = await Promise.all([
    db
      .select({
        id: categories.id,
        parentId: categories.parentId,
        slug: categories.slug,
        name: categories.name,
        icon: categories.icon,
        status: categories.status,
        listingCount: categories.listingCount,
      })
      .from(categories)
      .where(eq(categories.countryId, country.id))
      .orderBy(asc(categories.sortOrder), asc(categories.name)),
    db
      .select({
        categoryId: categoryRelationships.categoryId,
        relatedCategoryId: categoryRelationships.relatedCategoryId,
        strength: categoryRelationships.strength,
      })
      .from(categoryRelationships),
  ]);

  const groups = all.filter((c) => c.parentId === null);
  const subs = all.filter((c) => c.parentId !== null);
  const nameById = new Map(all.map((c) => [c.id, c.name]));

  const relsByCategory = new Map<
    number,
    { id: number; name: string; strength: number }[]
  >();
  for (const r of relations) {
    const list = relsByCategory.get(r.categoryId) ?? [];
    list.push({
      id: r.relatedCategoryId,
      name: nameById.get(r.relatedCategoryId) ?? "Unknown",
      strength: r.strength,
    });
    relsByCategory.set(r.categoryId, list);
  }
  for (const list of relsByCategory.values()) {
    list.sort((a, b) => b.strength - a.strength);
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.035em] text-ink">
          Categories
        </h1>
        <p className="mt-1.5 text-[13.5px] text-ink-2">
          {groups.length} groups, {subs.length} sub-categories,{" "}
          {relations.length} cross-sell links.
        </p>
      </header>

      <CategoryManager
        groups={groups.map((g) => ({
          ...g,
          children: subs
            .filter((s) => s.parentId === g.id)
            .map((s) => ({
              ...s,
              related: relsByCategory.get(s.id) ?? [],
            })),
        }))}
        allSubCategories={subs.map((s) => ({ id: s.id, name: s.name }))}
      />
    </div>
  );
}
