import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { categories, locations, timestamps } from "./core";
import { businesses, businessServices } from "./business";
import { users } from "./auth";

/**
 * Leads, reviews, notifications and analytics.
 *
 * The lead table is the commercial heart of the portal. Two rules from the
 * client's PDF:
 *
 *   1. A lead is stored in full the moment it arrives, whatever the business's
 *      plan. Locking happens on the way out, never on the way in. A business
 *      that upgrades six months later must be able to see leads it could not
 *      read at the time.
 *
 *   2. The customer's contact details are the thing being sold. They are never
 *      sent to a business that has not earned access - not even hidden in a
 *      payload. See lib/permissions/visibility.ts.
 *
 * The client confirmed a lead may be routed to more than one business, so
 * routing lives in its own table rather than a column on the lead.
 */

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    /** Reference shown to the customer, e.g. LEAD-AE-0001A2. */
    reference: text("reference").notNull().unique(),
    /** The business the enquiry was submitted against. Null for enquiries
        raised from a category page rather than a specific profile. */
    businessId: integer("business_id").references(() => businesses.id, {
      onDelete: "cascade",
    }),
    /** Set when the enquirer happened to be logged in. Most are anonymous. */
    customerId: integer("customer_id").references(() => users.id, {
      onDelete: "set null",
    }),
    categoryId: integer("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    locationId: integer("location_id").references(() => locations.id, {
      onDelete: "set null",
    }),
    serviceId: integer("service_id").references(() => businessServices.id, {
      onDelete: "set null",
    }),

    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerEmail: text("customer_email"),
    customerCompany: text("customer_company"),
    message: text("message"),
    budget: text("budget"),

    status: text("status", {
      enum: ["new", "viewed", "contacted", "won", "lost", "spam"],
    })
      .notNull()
      .default("new"),
    /** Where it came from: profile | card | category | search. */
    source: text("source").notNull().default("profile"),
    /** Retained for abuse handling; the client wants leads kept indefinitely. */
    ip: text("ip"),
    userAgent: text("user_agent"),
    ...timestamps,
  },
  (t) => [
    index("leads_business_idx").on(t.businessId, t.status),
    index("leads_created_idx").on(t.createdAt),
  ],
);

/**
 * Which businesses may see a lead, and whether each has unlocked it.
 *
 * One row per business per lead. `unlockedAt` records the moment access was
 * granted so a later downgrade does not silently revoke something the business
 * has already paid to see.
 */
export const leadRecipients = pgTable(
  "lead_recipients",
  {
    id: serial("id").primaryKey(),
    leadId: integer("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    /** primary when the enquiry named this business, matched when BrandUpMe
        routed it on, per the client's "yes probably" to shared leads. */
    routing: text("routing", { enum: ["primary", "matched"] })
      .notNull()
      .default("primary"),
    viewedAt: timestamp("viewed_at", { withTimezone: true }),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true }),
    /** Counts against a plan's monthly unlock allowance. */
    unlockSource: text("unlock_source", {
      enum: ["plan_allowance", "plan_unlimited", "admin_grant"],
    }),
    ...timestamps,
  },
  (t) => [
    index("lead_recipients_business_idx").on(t.businessId),
    index("lead_recipients_lead_idx").on(t.leadId),
  ],
);

/* ── Reviews ────────────────────────────────────────────────────────────── */

/**
 * Public reviews, per the client. Anyone may post for now, so every row keeps
 * the IP and passes through a status field - the moderation queue exists even
 * though nothing is auto-rejected yet.
 */
export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    businessId: integer("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    authorId: integer("author_id").references(() => users.id, {
      onDelete: "set null",
    }),
    authorName: text("author_name").notNull(),
    authorTitle: text("author_title"),
    /** 1-5. */
    rating: integer("rating").notNull(),
    title: text("title"),
    body: text("body"),
    status: text("status", { enum: ["published", "pending", "rejected"] })
      .notNull()
      .default("published"),
    /** The business owner's public response. */
    reply: text("reply"),
    repliedAt: timestamp("replied_at", { withTimezone: true }),
    ip: text("ip"),
    ...timestamps,
  },
  (t) => [index("reviews_business_idx").on(t.businessId, t.status)],
);

/* ── Notifications ──────────────────────────────────────────────────────── */

/**
 * Dashboard notifications now; email later, which is exactly what the client
 * asked for. Writing them to a table rather than sending directly means adding
 * email is one background reader, not a rewrite of every call site.
 */
export const notifications = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    businessId: integer("business_id").references(() => businesses.id, {
      onDelete: "cascade",
    }),
    kind: text("kind").notNull(),
    title: text("title").notNull(),
    body: text("body"),
    href: text("href"),
    readAt: timestamp("read_at", { withTimezone: true }),
    /** Set once an email has gone out, so re-runs cannot double-send. */
    emailedAt: timestamp("emailed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  },
  (t) => [
    index("notifications_user_idx").on(t.userId, t.readAt),
    index("notifications_business_idx").on(t.businessId, t.readAt),
  ],
);

/* ── Analytics ──────────────────────────────────────────────────────────── */

/**
 * One row per tracked action, matching the event list in both PDFs. Kept raw
 * rather than pre-aggregated: D1 counts these cheaply at this volume, and
 * rolling up early throws away the ability to answer questions nobody has
 * asked yet.
 */
export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    businessId: integer("business_id").references(() => businesses.id, {
      onDelete: "cascade",
    }),
    leadId: integer("lead_id").references(() => leads.id, {
      onDelete: "set null",
    }),
    /** PROFILE_VIEW, CARD_VIEW, QR_SCAN, PHONE_CLICK, WHATSAPP_CLICK,
        EMAIL_CLICK, WEBSITE_CLICK, SHARE_CLICK, SAVE_CONTACT,
        INQUIRY_SUBMITTED, LEAD_VIEW, LEAD_UNLOCK, UPGRADE_STARTED,
        UPGRADE_COMPLETED, AD_IMPRESSION, AD_CLICK. */
    eventType: text("event_type").notNull(),
    /** Rotating anonymous id, not tied to a person. */
    visitorId: text("visitor_id"),
    source: text("source"),
    device: text("device"),
    meta: jsonb("meta").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  },
  (t) => [
    index("analytics_business_idx").on(t.businessId, t.eventType, t.createdAt),
  ],
);

export type Lead = typeof leads.$inferSelect;
export type LeadRecipient = typeof leadRecipients.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
