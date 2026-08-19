import { cookies } from "next/headers";
import { and, eq, gt, sql } from "drizzle-orm";
import { getDb, type Db } from "@/lib/db";
import {
  permissions,
  rolePermissions,
  sessions,
  userRoles,
  users,
} from "@/lib/db/schema";
import { generateToken, hashToken } from "./password";

/**
 * Session handling.
 *
 * Sessions are opaque random tokens in an httpOnly cookie. The database stores
 * only the SHA-256 of the token, so a dump of the sessions table cannot be
 * replayed as a login.
 *
 * SameSite=Lax rather than Strict: Strict would drop the cookie when a business
 * follows a link to its own dashboard from a notification email, which reads as
 * a broken login. Lax still blocks cross-site POSTs, which is the attack that
 * matters here.
 */

const COOKIE = "bum_session";
const TTL_DAYS = 30;

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  kind: "staff" | "business" | "customer";
  /** Flattened from every role the user holds. */
  permissions: ReadonlySet<string>;
};

export async function createSession(
  db: Db,
  userId: number,
  meta: { userAgent?: string | null; ip?: string | null } = {},
): Promise<void> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + TTL_DAYS * 86_400_000);

  await db.insert(sessions).values({
    userId,
    tokenHash: await hashToken(token),
    expiresAt,
    userAgent: meta.userAgent ?? null,
    ip: meta.ip ?? null,
    createdAt: new Date(),
  });

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  jar.delete(COOKIE);
  if (!token) return;

  const db = await getDb();
  await db.delete(sessions).where(eq(sessions.tokenHash, await hashToken(token)));
}

/**
 * The signed-in user, or null.
 *
 * Expiry is checked in the query rather than after loading, so an expired row
 * can never be treated as valid by a caller that forgets to look.
 */
export async function currentUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;

  const db = await getDb();
  const [row] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      kind: users.kind,
      status: users.status,
    })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(
      and(
        eq(sessions.tokenHash, await hashToken(token)),
        gt(sessions.expiresAt, new Date()),
      ),
    )
    .limit(1);

  if (!row || row.status !== "active") return null;

  const perms = await db
    .select({ slug: permissions.slug })
    .from(userRoles)
    .innerJoin(rolePermissions, eq(rolePermissions.roleId, userRoles.roleId))
    .innerJoin(permissions, eq(permissions.id, rolePermissions.permissionId))
    .where(eq(userRoles.userId, row.id));

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    kind: row.kind,
    permissions: new Set(perms.map((p) => p.slug)),
  };
}

/** Delete sessions that have already expired. Called from a cron trigger. */
export async function pruneSessions(db: Db): Promise<number> {
  const res = await db
    .delete(sessions)
    .where(sql`${sessions.expiresAt} <= unixepoch()`);
  return (res as { meta?: { changes?: number } }).meta?.changes ?? 0;
}
