import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { timestamps } from "./core";

/**
 * Users, sessions and role-based access control.
 *
 * The client asked for RBAC with roles and permissions kept flexible - five
 * staff today, and one person may only verify listings while another only
 * manages plans. So permissions are rows, not an enum on the user: a new role
 * is an insert, not a deploy.
 *
 * Passwords use PBKDF2-SHA256 via Web Crypto. bcrypt and argon2 are native
 * modules and do not run on Workers; PBKDF2 with a high iteration count is the
 * standard choice on that runtime. See lib/auth/password.ts.
 *
 * Sessions are opaque random tokens stored as a hash. If the database leaks,
 * the tokens in it cannot be replayed.
 */

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    emailVerifiedAt: integer("email_verified_at", { mode: "timestamp" }),
    passwordHash: text("password_hash"),
    name: text("name").notNull(),
    phone: text("phone"),
    avatar: text("avatar"),
    /** Coarse account type. Fine-grained rights come from roles. */
    kind: text("kind", { enum: ["staff", "business", "customer"] })
      .notNull()
      .default("business"),
    status: text("status", { enum: ["active", "suspended"] })
      .notNull()
      .default("active"),
    lastLoginAt: integer("last_login_at", { mode: "timestamp" }),
    ...timestamps,
  },
  (t) => [index("users_kind_idx").on(t.kind, t.status)],
);

export const sessions = sqliteTable(
  "sessions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    /** SHA-256 of the cookie value. The raw token is never stored. */
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    userAgent: text("user_agent"),
    ip: text("ip"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (t) => [index("sessions_user_idx").on(t.userId)],
);

export const roles = sqliteTable("roles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  /** Built-in roles cannot be deleted from the admin panel. */
  isSystem: integer("is_system", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export const permissions = sqliteTable("permissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** Dotted verb-object, e.g. "business.verify", "plan.manage". */
  slug: text("slug").notNull().unique(),
  description: text("description"),
  /** Groups the admin UI's checkbox list. */
  groupName: text("group_name").notNull().default("general"),
});

export const rolePermissions = sqliteTable(
  "role_permissions",
  {
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: integer("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })],
);

export const userRoles = sqliteTable(
  "user_roles",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.roleId] })],
);

/** Single-use tokens for password reset and listing claims. */
export const authTokens = sqliteTable(
  "auth_tokens",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    tokenHash: text("token_hash").notNull(),
    purpose: text("purpose", {
      enum: ["password_reset", "email_verify", "business_claim"],
    }).notNull(),
    /** Extra context, e.g. which business is being claimed. */
    payload: text("payload"),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    usedAt: integer("used_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (t) => [uniqueIndex("auth_tokens_hash_idx").on(t.tokenHash)],
);

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Role = typeof roles.$inferSelect;
