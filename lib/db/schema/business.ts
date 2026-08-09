import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { categories, countries, locations, plans, timestamps } from "./core";
import { users } from "./auth";

/**
 * Businesses and everything hanging off them.
 *
 * Two rules from the client's PDF drive the design:
 *
 *   1. Business data is permanent. Expiry and downgrade change what is
 *      *visible*, never what is stored. So nothing here has a plan column -
 *      contact details are always written in full and the permission layer
 *      decides what leaves the server.
 *
 *   2. One business, one passport, one permanent URL. The passport is issued
 *      once and never changes, so a QR code printed on a brochure keeps working
 *      through upgrades, downgrades and renewals.
 *
 * Categories and locations are many-to-many because the client confirmed a
 * business can appear in several of each.
 */

export const businesses = sqliteTable(
  "businesses",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    countryId: integer("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    /** Null while BrandUpMe has uploaded the listing but nobody has claimed
        it. The client wants to seed listings before owners sign up. */
    ownerId: integer("owner_id").references(() => users.id, {
      onDelete: "set null",
    }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    tagline: text("tagline"),
    description: text("description"),
    logo: text("logo"),
    coverImage: text("cover_image"),
    establishedYear: integer("established_year"),
    teamSize: text("team_size"),
    languages: text("languages", { mode: "json" }).$type<string[]>(),
    workingHours: text("working_hours"),
    businessType: text("business_type"),
    licenseNo: text("license_no"),
    registrationNo: text("registration_no"),

    /** draft while the owner is filling it in, pending until an admin
        approves, published once live. Nothing is ever deleted - suspended and
        archived keep the row and the passport intact. */
    status: text("status", {
      enum: ["draft", "pending", "published", "suspended", "archived"],
    })
      .notNull()
      .default("draft"),
    /** Manual, by an admin. Drives the Verified badge, which is also gated on
        the plan - both must pass. */
    verified: integer("verified", { mode: "boolean" }).notNull().default(false),
    verifiedAt: integer("verified_at", { mode: "timestamp" }),
    verifiedBy: integer("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    /** Claim flow for admin-uploaded listings. */
    claimToken: text("claim_token"),
    claimedAt: integer("claimed_at", { mode: "timestamp" }),

    /** Denormalised review aggregates so listing pages need no join. */
    ratingAvg: integer("rating_avg").notNull().default(0),
    ratingCount: integer("rating_count").notNull().default(0),
    /** Editorial pin, independent of any paid placement. */
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("businesses_country_slug_idx").on(t.countryId, t.slug),
    index("businesses_status_idx").on(t.countryId, t.status),
    index("businesses_owner_idx").on(t.ownerId),
  ],
);

/**
 * Contact details, always stored complete.
 *
 * Never select this table straight into a response. Go through
 * lib/permissions/visibility.ts, which returns only the fields the viewer's
 * plan permits. The PDF calls this out twice and it is the whole product.
 */
export const businessContacts = sqliteTable("business_contacts", {
  businessId: integer("business_id")
    .primaryKey()
    .references(() => businesses.id, { onDelete: "cascade" }),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  email: text("email"),
  website: text("website"),
  address: text("address"),
  /** Free-text area/landmark; the structured location lives in the join. */
  area: text("area"),
  mapUrl: text("map_url"),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  linkedinUrl: text("linkedin_url"),
  xUrl: text("x_url"),
  youtubeUrl: text("youtube_url"),
  tiktokUrl: text("tiktok_url"),
  ...timestamps,
});

export const businessCategories = sqliteTable(
  "business_categories",
  {
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    /** Exactly one primary per business; drives breadcrumbs and canonical URL. */
    isPrimary: integer("is_primary", { mode: "boolean" })
      .notNull()
      .default(false),
  },
  (t) => [
    primaryKey({ columns: [t.businessId, t.categoryId] }),
    index("business_categories_category_idx").on(t.categoryId),
  ],
);

export const businessLocations = sqliteTable(
  "business_locations",
  {
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    locationId: integer("location_id")
      .notNull()
      .references(() => locations.id, { onDelete: "cascade" }),
    isPrimary: integer("is_primary", { mode: "boolean" })
      .notNull()
      .default(false),
  },
  (t) => [
    primaryKey({ columns: [t.businessId, t.locationId] }),
    index("business_locations_location_idx").on(t.locationId),
  ],
);

/**
 * Permanent public identity. Issued once, never reissued, never renumbered.
 * The share URL and QR code both resolve here.
 */
export const businessPassports = sqliteTable(
  "business_passports",
  {
    businessId: integer("business_id")
      .primaryKey()
      .references(() => businesses.id, { onDelete: "cascade" }),
    /** Human-quotable, e.g. BUM-AE-000123. */
    passportNumber: text("passport_number").notNull().unique(),
    /** The /p/<slug> segment. Independent of the business slug so renaming a
        business never breaks a printed QR code. */
    slug: text("slug").notNull().unique(),
    issuedAt: integer("issued_at", { mode: "timestamp" }).notNull(),
    status: text("status", { enum: ["active", "revoked"] })
      .notNull()
      .default("active"),
    ...timestamps,
  },
  (t) => [index("passports_slug_idx").on(t.slug)],
);

export const businessImages = sqliteTable(
  "business_images",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    alt: text("alt"),
    /** gallery | logo | cover. The card shows three gallery images. */
    imageType: text("image_type").notNull().default("gallery"),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (t) => [index("business_images_business_idx").on(t.businessId, t.sortOrder)],
);

export const businessServices = sqliteTable(
  "business_services",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    icon: text("icon"),
    priceFromMinor: integer("price_from_minor"),
    priceToMinor: integer("price_to_minor"),
    sortOrder: integer("sort_order").notNull().default(0),
    status: text("status", { enum: ["active", "hidden"] })
      .notNull()
      .default("active"),
    ...timestamps,
  },
  (t) => [index("business_services_business_idx").on(t.businessId)],
);

export const businessHighlights = sqliteTable(
  "business_highlights",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    icon: text("icon"),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (t) => [index("business_highlights_business_idx").on(t.businessId)],
);

export const businessOffers = sqliteTable(
  "business_offers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    discount: text("discount"),
    image: text("image"),
    startsAt: integer("starts_at", { mode: "timestamp" }),
    endsAt: integer("ends_at", { mode: "timestamp" }),
    status: text("status", { enum: ["active", "expired", "hidden"] })
      .notNull()
      .default("active"),
    ...timestamps,
  },
  (t) => [index("business_offers_business_idx").on(t.businessId)],
);

export const businessAchievements = sqliteTable(
  "business_achievements",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    image: text("image"),
    achievedOn: integer("achieved_on", { mode: "timestamp" }),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (t) => [index("business_achievements_business_idx").on(t.businessId)],
);

export const businessTimeline = sqliteTable(
  "business_timeline",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    image: text("image"),
    eventOn: integer("event_on", { mode: "timestamp" }),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (t) => [index("business_timeline_business_idx").on(t.businessId)],
);

/* ── Subscriptions ──────────────────────────────────────────────────────── */

/**
 * History, not current state. A business accumulates rows; the active one is
 * whichever is status=active and not past its expiry. Keeping the history is
 * what lets a previously locked lead unlock on upgrade without copying data.
 */
export const businessSubscriptions = sqliteTable(
  "business_subscriptions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    planId: integer("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "restrict" }),
    startsAt: integer("starts_at", { mode: "timestamp" }).notNull(),
    /** Null means open-ended, used by the free tier. */
    expiresAt: integer("expires_at", { mode: "timestamp" }),
    status: text("status", {
      enum: ["active", "expired", "cancelled", "pending_payment"],
    })
      .notNull()
      .default("pending_payment"),
    autoRenew: integer("auto_renew", { mode: "boolean" })
      .notNull()
      .default(false),
    /** Free text until a real processor is connected. */
    paymentRef: text("payment_ref"),
    /** Who activated it, when payment is collected offline. */
    activatedBy: integer("activated_by").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    index("subscriptions_business_idx").on(t.businessId, t.status),
  ],
);

export type Business = typeof businesses.$inferSelect;
export type BusinessContact = typeof businessContacts.$inferSelect;
export type BusinessPassport = typeof businessPassports.$inferSelect;
export type BusinessSubscription = typeof businessSubscriptions.$inferSelect;
