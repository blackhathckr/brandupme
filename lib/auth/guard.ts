import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { businesses } from "@/lib/db/schema";
import { currentUser, type SessionUser } from "./session";

/**
 * Route guards.
 *
 * Every protected page and action starts with one of these. They redirect
 * rather than return null, so a page body can never accidentally render for an
 * unauthorised visitor because a caller forgot to check the result.
 *
 * Authorisation is by permission slug, never by role name. "Can this user
 * verify a listing" survives the client inventing a new role next month;
 * "is this user a listing-manager" does not.
 */

export async function requireUser(next?: string): Promise<SessionUser> {
  const user = await currentUser();
  if (!user) {
    redirect(`/login/?next=${encodeURIComponent(next ?? "/dashboard/")}`);
  }
  return user;
}

export async function requirePermission(
  permission: string,
  next?: string,
): Promise<SessionUser> {
  const user = await requireUser(next);
  if (!user.permissions.has(permission)) {
    // 404 rather than 403: a staff-only URL should not confirm it exists to
    // someone who cannot use it.
    redirect("/not-found/");
  }
  return user;
}

export async function requireStaff(next?: string): Promise<SessionUser> {
  const user = await requireUser(next);
  if (user.kind !== "staff") redirect("/not-found/");
  return user;
}

/**
 * The business this user may act on, or a redirect.
 *
 * Staff with business.edit may act on any business; an owner only on their own.
 * Ownership is re-checked from the database on every call - never trusted from
 * a form field, a query string or a client-supplied id.
 */
export async function requireOwnedBusiness(
  businessId: number,
): Promise<{ user: SessionUser; businessId: number }> {
  const user = await requireUser();
  if (user.kind === "staff" && user.permissions.has("business.edit")) {
    return { user, businessId };
  }

  const db = await getDb();
  const [owned] = await db
    .select({ id: businesses.id })
    .from(businesses)
    .where(and(eq(businesses.id, businessId), eq(businesses.ownerId, user.id)))
    .limit(1);

  if (!owned) redirect("/dashboard/");
  return { user, businessId };
}

export function hasPermission(user: SessionUser | null, slug: string): boolean {
  return user?.permissions.has(slug) ?? false;
}
