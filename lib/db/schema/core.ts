import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

/**
 * Countries, locations and categories.
 *
 * Everything is country-scoped from the start. The UAE portal ships first, but
 * India reuses these exact tables by inserting another country row - no schema
 * change, no migration, no second codebase.
 *
 * Locations are a self-referencing tree rather than fixed emirate/city columns,
 * because "emirate" and "city" are UAE words. India needs state/city, and a
 * third country may need a level we have not thought of. `level` names the tier
 * for display; `parent_id` gives the hierarchy.
 *
 * Names live in translation tables rather than name_en/name_ar columns, so
 * adding Arabic - or any later language - is inserting rows, not altering
 * tables. The client asked for Arabic to be planned now.
 */

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
};

/* ── Countries ──────────────────────────────────────────────────────────── */

export const countries = sqliteTable("countries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** ISO 3166-1 alpha-2, lowercased: "ae", "in". Used in URLs. */
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  currency: text("currency").notNull(),
  dialCode: text("dial_code").notNull(),
  /** Locales this country's portal is published in, JSON array of tags. */
  locales: text("locales", { mode: "json" }).$type<string[]>().notNull(),
  defaultLocale: text("default_locale").notNull().default("en"),
  status: text("status", { enum: ["active", "hidden"] })
    .notNull()
    .default("active"),
  ...timestamps,
});

/* ── Locations ──────────────────────────────────────────────────────────── */

export const locations = sqliteTable(
  "locations",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    countryId: integer("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    parentId: integer("parent_id"),
    /** Tier name for this country: emirate, city, area, state, district. */
    level: text("level").notNull(),
    slug: text("slug").notNull(),
    /** Fallback name; translations table carries the localised versions. */
    name: text("name").notNull(),
    /** Ordering in dropdowns. Lower sorts first. */
    sortOrder: integer("sort_order").notNull().default(0),
    /** Hero image for the emirate/city browse tiles. */
    image: text("image"),
    status: text("status", { enum: ["active", "hidden"] })
      .notNull()
      .default("active"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("locations_country_slug_idx").on(t.countryId, t.slug),
    index("locations_parent_idx").on(t.parentId),
  ],
);

export const locationTranslations = sqliteTable(
  "location_translations",
  {
    locationId: integer("location_id")
      .notNull()
      .references(() => locations.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    name: text("name").notNull(),
  },
  (t) => [primaryKey({ columns: [t.locationId, t.locale] })],
);

/* ── Categories ─────────────────────────────────────────────────────────── */

export const categories = sqliteTable(
  "categories",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    countryId: integer("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    /** Null for the 21 main groups; set for the ~350 sub-categories. */
    parentId: integer("parent_id"),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    /** Icon key resolved by the UI. Placeholder until the client sends art. */
    icon: text("icon"),
    image: text("image"),
    sortOrder: integer("sort_order").notNull().default(0),
    /** Denormalised count of live listings, kept fresh by the listing writes.
        Category pages need it on every render; counting each time is wasteful
        and it is also how we decide whether a page is worth publishing. */
    listingCount: integer("listing_count").notNull().default(0),
    status: text("status", { enum: ["active", "hidden"] })
      .notNull()
      .default("active"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("categories_country_slug_idx").on(t.countryId, t.slug),
    index("categories_parent_idx").on(t.parentId),
  ],
);

export const categoryTranslations = sqliteTable(
  "category_translations",
  {
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    name: text("name").notNull(),
    description: text("description"),
  },
  (t) => [primaryKey({ columns: [t.categoryId, t.locale] })],
);

/**
 * "Businesses you may also need".
 *
 * Directed, so cleaning -> recruitment can be strong while recruitment ->
 * cleaning is weak. Strength drives ordering and lets weak links be dropped
 * from the UI without deleting the row. Client maintains these in admin.
 */
export const categoryRelationships = sqliteTable(
  "category_relationships",
  {
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    relatedCategoryId: integer("related_category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    /** 1-10, per the client's relationship-strength table. */
    strength: integer("strength").notNull().default(5),
  },
  (t) => [
    primaryKey({ columns: [t.categoryId, t.relatedCategoryId] }),
    index("category_rel_strength_idx").on(t.categoryId, t.strength),
  ],
);

/* ── Plans and feature permissions ──────────────────────────────────────── */

/**
 * Plans carry no feature logic. Everything a plan grants lives in
 * plan_features as key/value rows, so the client can change what AED 349 gives
 * from the admin panel without a code change or a migration. The PDF is
 * explicit about this and it is the right call.
 */
export const plans = sqliteTable(
  "plans",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    countryId: integer("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    /** Stored in minor units to avoid float money. AED 99 -> 9900. */
    priceMinor: integer("price_minor").notNull(),
    currency: text("currency").notNull(),
    /** monthly | yearly. Annual tiers can be added as rows later. */
    billingCycle: text("billing_cycle").notNull().default("monthly"),
    purpose: text("purpose"),
    badge: text("badge"),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    status: text("status", { enum: ["active", "hidden"] })
      .notNull()
      .default("active"),
    ...timestamps,
  },
  (t) => [uniqueIndex("plans_country_slug_idx").on(t.countryId, t.slug)],
);

export const planFeatures = sqliteTable(
  "plan_features",
  {
    planId: integer("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "cascade" }),
    /** See lib/permissions/features.ts for the known keys. */
    featureKey: text("feature_key").notNull(),
    /** Stringified so one column holds booleans, numbers and enums.
        "true" | "false" | "10" | "masked" | "unlimited". */
    featureValue: text("feature_value").notNull(),
  },
  (t) => [primaryKey({ columns: [t.planId, t.featureKey] })],
);

/* ── Advertising ────────────────────────────────────────────────────────── */

/**
 * Sold and scheduled by BrandUpMe staff, per the client. Targeting is optional
 * on both axes: null category or null location means "all".
 */
export const ads = sqliteTable(
  "ads",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    countryId: integer("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    image: text("image").notNull(),
    targetUrl: text("target_url").notNull(),
    ctaLabel: text("cta_label"),
    /** hero | sidebar | footer | listing - the slots in the client's mockup. */
    placement: text("placement").notNull(),
    categoryId: integer("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    locationId: integer("location_id").references(() => locations.id, {
      onDelete: "set null",
    }),
    startsAt: integer("starts_at", { mode: "timestamp" }),
    endsAt: integer("ends_at", { mode: "timestamp" }),
    weight: integer("weight").notNull().default(1),
    impressions: integer("impressions").notNull().default(0),
    clicks: integer("clicks").notNull().default(0),
    status: text("status", { enum: ["active", "paused"] })
      .notNull()
      .default("active"),
    ...timestamps,
  },
  (t) => [index("ads_slot_idx").on(t.countryId, t.placement, t.status)],
);

/* Shared by the other schema files. */
export { timestamps };

export type Country = typeof countries.$inferSelect;
export type Location = typeof locations.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Plan = typeof plans.$inferSelect;
export type Ad = typeof ads.$inferSelect;
