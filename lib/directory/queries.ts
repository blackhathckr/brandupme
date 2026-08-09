import { and, asc, desc, eq, inArray, isNull, like, or, sql } from "drizzle-orm";
import { getDb, type Db } from "@/lib/db";
import {
  businessCategories,
  businessContacts,
  businessLocations,
  businessPassports,
  businesses,
  categories,
  categoryRelationships,
  countries,
  locations,
} from "@/lib/db/schema";
import { entitlementsForMany } from "@/lib/permissions/resolve";
import { publicContact, type PublicContact } from "@/lib/permissions/visibility";
import { FEATURE, can } from "@/lib/permissions/features";

/**
 * Read paths for the public directory.
 *
 * Two rules hold everywhere in this file:
 *
 *   1. Nothing returns a raw business_contacts row. Every function that
 *      surfaces contact details runs them through the permission layer first,
 *      so a locked phone number is absent from the payload rather than hidden
 *      in the markup.
 *
 *   2. Only published businesses are visible. Draft, pending, suspended and
 *      archived listings never appear, and the filter lives in the query rather
 *      than in the caller, so a new page cannot forget it.
 */

const PUBLISHED = eq(businesses.status, "published");

export type ListingCard = {
  id: number;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  logo: string | null;
  verified: boolean;
  featured: boolean;
  priority: boolean;
  ratingAvg: number;
  ratingCount: number;
  passportSlug: string | null;
  areaLabel: string | null;
  contact: PublicContact;
};

export async function getCountry(code: string) {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(countries)
    .where(and(eq(countries.code, code), eq(countries.status, "active")))
    .limit(1);
  return row ?? null;
}

/* ── Categories ─────────────────────────────────────────────────────────── */

export async function getCategoryTree(countryId: number) {
  const db = await getDb();
  const rows = await db
    .select({
      id: categories.id,
      parentId: categories.parentId,
      slug: categories.slug,
      name: categories.name,
      icon: categories.icon,
      image: categories.image,
      listingCount: categories.listingCount,
      sortOrder: categories.sortOrder,
    })
    .from(categories)
    .where(and(eq(categories.countryId, countryId), eq(categories.status, "active")))
    .orderBy(asc(categories.sortOrder), asc(categories.name));

  const groups = rows.filter((r) => r.parentId === null);
  const byParent = new Map<number, typeof rows>();
  for (const r of rows) {
    if (r.parentId === null) continue;
    const list = byParent.get(r.parentId) ?? [];
    list.push(r);
    byParent.set(r.parentId, list);
  }

  return groups.map((g) => ({ ...g, children: byParent.get(g.id) ?? [] }));
}

export async function getCategoryBySlug(countryId: number, slug: string) {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(categories)
    .where(
      and(
        eq(categories.countryId, countryId),
        eq(categories.slug, slug),
        eq(categories.status, "active"),
      ),
    )
    .limit(1);
  return row ?? null;
}

/** "Businesses you may also need", strongest link first. */
export async function getRelatedCategories(categoryId: number, limit = 8) {
  const db = await getDb();
  return db
    .select({
      id: categories.id,
      slug: categories.slug,
      name: categories.name,
      icon: categories.icon,
      listingCount: categories.listingCount,
      strength: categoryRelationships.strength,
    })
    .from(categoryRelationships)
    .innerJoin(categories, eq(categories.id, categoryRelationships.relatedCategoryId))
    .where(
      and(
        eq(categoryRelationships.categoryId, categoryId),
        eq(categories.status, "active"),
      ),
    )
    .orderBy(desc(categoryRelationships.strength), asc(categories.name))
    .limit(limit);
}

/* ── Locations ──────────────────────────────────────────────────────────── */

export async function getEmirates(countryId: number) {
  const db = await getDb();
  return db
    .select({
      id: locations.id,
      slug: locations.slug,
      name: locations.name,
      image: locations.image,
    })
    .from(locations)
    .where(
      and(
        eq(locations.countryId, countryId),
        isNull(locations.parentId),
        eq(locations.status, "active"),
      ),
    )
    .orderBy(asc(locations.sortOrder));
}

export async function getLocationBySlug(countryId: number, slug: string) {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(locations)
    .where(
      and(
        eq(locations.countryId, countryId),
        eq(locations.slug, slug),
        eq(locations.status, "active"),
      ),
    )
    .limit(1);
  return row ?? null;
}

export async function getChildLocations(parentId: number) {
  const db = await getDb();
  return db
    .select({ id: locations.id, slug: locations.slug, name: locations.name })
    .from(locations)
    .where(and(eq(locations.parentId, parentId), eq(locations.status, "active")))
    .orderBy(asc(locations.sortOrder));
}

/* ── Listings ───────────────────────────────────────────────────────────── */

export type ListingQuery = {
  countryId: number;
  categoryId?: number;
  /** An emirate id also matches businesses registered against its cities. */
  locationId?: number;
  childLocationIds?: number[];
  search?: string;
  sort?: "featured" | "rating" | "newest" | "name";
  page?: number;
  perPage?: number;
};

/**
 * Category and search listings.
 *
 * Ordering puts priority-plan listings above the rest, which is a paid benefit
 * the client sells. Within a tier it falls back to the chosen sort, so paying
 * buys position but never hides a better-rated competitor entirely.
 *
 * Priority cannot be sorted in SQL because it lives in plan_features, so the
 * page is fetched, entitlements resolved in one batch, then the page reordered.
 * That is correct for a page of 12-24 and would need a denormalised column if
 * pages ever got large.
 */
export async function listBusinesses(q: ListingQuery): Promise<{
  items: ListingCard[];
  total: number;
  page: number;
  perPage: number;
}> {
  const db = await getDb();
  const page = Math.max(1, q.page ?? 1);
  const perPage = Math.min(48, Math.max(1, q.perPage ?? 12));

  const where = [eq(businesses.countryId, q.countryId), PUBLISHED];

  if (q.search?.trim()) {
    const term = `%${q.search.trim().toLowerCase()}%`;
    where.push(
      or(
        like(sql`lower(${businesses.name})`, term),
        like(sql`lower(${businesses.description})`, term),
        like(sql`lower(${businesses.tagline})`, term),
      )!,
    );
  }

  const locationIds = q.locationId
    ? [q.locationId, ...(q.childLocationIds ?? [])]
    : undefined;

  const base = db
    .selectDistinct({
      id: businesses.id,
      name: businesses.name,
      slug: businesses.slug,
      tagline: businesses.tagline,
      description: businesses.description,
      logo: businesses.logo,
      verified: businesses.verified,
      featured: businesses.featured,
      ratingAvg: businesses.ratingAvg,
      ratingCount: businesses.ratingCount,
      createdAt: businesses.createdAt,
    })
    .from(businesses)
    .$dynamic();

  let rowsQuery = base;
  if (q.categoryId !== undefined) {
    rowsQuery = rowsQuery.innerJoin(
      businessCategories,
      and(
        eq(businessCategories.businessId, businesses.id),
        eq(businessCategories.categoryId, q.categoryId),
      ),
    );
  }
  if (locationIds?.length) {
    rowsQuery = rowsQuery.innerJoin(
      businessLocations,
      and(
        eq(businessLocations.businessId, businesses.id),
        inArray(businessLocations.locationId, locationIds),
      ),
    );
  }

  const order =
    q.sort === "rating"
      ? [desc(businesses.ratingAvg), desc(businesses.ratingCount)]
      : q.sort === "newest"
        ? [desc(businesses.createdAt)]
        : q.sort === "name"
          ? [asc(businesses.name)]
          : [desc(businesses.featured), desc(businesses.ratingAvg)];

  const rows = await rowsQuery
    .where(and(...where))
    .orderBy(...order)
    .limit(perPage)
    .offset((page - 1) * perPage);

  const [{ total }] = await countBusinesses(db, q, where, locationIds);
  if (rows.length === 0) return { items: [], total, page, perPage };

  const ids = rows.map((r) => r.id);
  const [contactRows, passportRows, ents] = await Promise.all([
    db.select().from(businessContacts).where(inArray(businessContacts.businessId, ids)),
    db
      .select({ businessId: businessPassports.businessId, slug: businessPassports.slug })
      .from(businessPassports)
      .where(inArray(businessPassports.businessId, ids)),
    entitlementsForMany(db, ids),
  ]);

  const contactById = new Map(contactRows.map((c) => [c.businessId, c]));
  const passportById = new Map(passportRows.map((p) => [p.businessId, p.slug]));

  const items: ListingCard[] = rows.map((r) => {
    const features = ents.get(r.id)!.features;
    const contact = contactById.get(r.id);
    return {
      id: r.id,
      name: r.name,
      slug: r.slug,
      tagline: r.tagline,
      description: r.description,
      logo: r.logo,
      // Both must hold: an admin has verified them AND their plan includes the
      // badge. Either alone would sell trust that has not been checked, or
      // withhold a check that has been done.
      verified: r.verified && can(features, FEATURE.VERIFIED_BADGE),
      featured: r.featured,
      priority: can(features, FEATURE.PRIORITY_LISTING),
      ratingAvg: r.ratingAvg,
      ratingCount: r.ratingCount,
      passportSlug: passportById.get(r.id) ?? null,
      areaLabel: contact?.area ?? null,
      contact: publicContact(contact, features),
    };
  });

  // Priority listings float, order within each tier preserved.
  items.sort((a, b) => Number(b.priority) - Number(a.priority));

  return { items, total, page, perPage };
}

async function countBusinesses(
  db: Db,
  q: ListingQuery,
  where: ReturnType<typeof eq>[],
  locationIds?: number[],
) {
  let c = db
    .select({ total: sql<number>`count(distinct ${businesses.id})` })
    .from(businesses)
    .$dynamic();

  if (q.categoryId !== undefined) {
    c = c.innerJoin(
      businessCategories,
      and(
        eq(businessCategories.businessId, businesses.id),
        eq(businessCategories.categoryId, q.categoryId),
      ),
    );
  }
  if (locationIds?.length) {
    c = c.innerJoin(
      businessLocations,
      and(
        eq(businessLocations.businessId, businesses.id),
        inArray(businessLocations.locationId, locationIds),
      ),
    );
  }
  return c.where(and(...where));
}

/**
 * Whether a category/location page has enough content to publish.
 *
 * 40 cities times 225 sub-categories is 9,000 possible URLs. Publishing them
 * all while empty is how a directory earns a thin-content penalty instead of
 * traffic, so a page has to earn its place.
 */
export const MIN_LISTINGS_TO_PUBLISH = 1;
