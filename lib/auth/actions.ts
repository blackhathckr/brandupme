"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { createSession, destroySession } from "./session";
import { hashPassword, needsRehash, verifyPassword } from "./password";
import {
  registerBusiness,
  registrationSchema,
} from "@/lib/businesses/register";

/**
 * Authentication actions.
 *
 * Login deliberately gives one error for every failure - unknown email, wrong
 * password, suspended account. Distinguishing them turns the form into an
 * account-enumeration oracle: an attacker learns which emails are registered
 * before trying a single password.
 */

export type AuthState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(180),
  password: z.string().min(1, "Enter your password").max(200),
  next: z.string().optional(),
});

const GENERIC = "Email or password is incorrect.";

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") ?? undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) {
      fieldErrors[String(i.path[0] ?? "form")] ??= i.message;
    }
    return { ok: false, error: "Please check the fields below.", fieldErrors };
  }

  const db = await getDb();
  const [user] = await db
    .select({
      id: users.id,
      passwordHash: users.passwordHash,
      status: users.status,
      kind: users.kind,
    })
    .from(users)
    .where(eq(users.email, parsed.data.email.toLowerCase()))
    .limit(1);

  // Verify even when there is no user, against a dummy hash, so a missing
  // account and a wrong password take the same time. Otherwise the response
  // time alone reveals which emails exist.
  const stored =
    user?.passwordHash ??
    "pbkdf2$210000$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  const valid = await verifyPassword(parsed.data.password, stored);

  if (!user || !valid || user.status !== "active") {
    return { ok: false, error: GENERIC };
  }

  if (user.passwordHash && needsRehash(user.passwordHash)) {
    await db
      .update(users)
      .set({ passwordHash: await hashPassword(parsed.data.password) })
      .where(eq(users.id, user.id));
  }

  const h = await headers();
  await createSession(db, user.id, {
    userAgent: h.get("user-agent"),
    ip: h.get("cf-connecting-ip") ?? h.get("x-forwarded-for"),
  });
  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));

  // Only relative paths, so a crafted ?next= cannot bounce someone to another
  // site carrying the impression that BrandUpMe sent them there.
  const next = parsed.data.next;
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//")
      ? next
      : user.kind === "staff"
        ? "/admin/"
        : "/dashboard/";
  redirect(safeNext);
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login/");
}

export type RegisterState = AuthState & { passportSlug?: string };

export async function register(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = registrationSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) {
      fieldErrors[String(i.path[0] ?? "form")] ??= i.message;
    }
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors };
  }

  const result = await registerBusiness(parsed.data);
  if (!result.ok) {
    return { ok: false, error: result.error, fieldErrors: result.fieldErrors };
  }

  // Sign them straight in - asking someone to log in immediately after
  // registering is a pointless second hurdle.
  if (result.businessId > 0) {
    const db = await getDb();
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, parsed.data.email.toLowerCase()))
      .limit(1);
    if (user) {
      const h = await headers();
      await createSession(db, user.id, {
        userAgent: h.get("user-agent"),
        ip: h.get("cf-connecting-ip") ?? h.get("x-forwarded-for"),
      });
    }
  }

  return { ok: true, passportSlug: result.passportSlug };
}
