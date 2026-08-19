import { createHash, pbkdf2Sync, randomBytes } from "node:crypto";
import { Buffer } from "node:buffer";
import { neon } from "@neondatabase/serverless";

/**
 * Creates or updates a staff account and assigns it a role.
 *
 * The password hash format matches lib/auth/password.ts exactly, so the account
 * signs in through the normal login path with no special casing.
 *
 * Usage:
 *   tsx scripts/create-admin.ts <email> <role-slug> [name]
 *
 * The generated password is printed once. It is not stored anywhere else, so
 * capture it there and then.
 */

const ITERATIONS = 210_000;

function hashPassword(plain: string): string {
  const salt = randomBytes(16);
  const dk = pbkdf2Sync(plain, salt, ITERATIONS, 32, "sha256");
  return `pbkdf2$${ITERATIONS}$${Buffer.from(salt).toString("base64")}$${Buffer.from(dk).toString("base64")}`;
}

async function main() {
  const [email, roleSlug, ...nameParts] = process.argv.slice(2);
  if (!email || !roleSlug) {
    console.error("usage: tsx scripts/create-admin.ts <email> <role-slug> [name]");
    process.exit(1);
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(url);
  const name = nameParts.join(" ") || "BrandUpMe Admin";
  const password = process.env.ADMIN_PASSWORD ?? randomBytes(12).toString("base64url");

  const roles = await sql`SELECT id, name FROM roles WHERE slug = ${roleSlug}`;
  if (roles.length === 0) {
    const all = await sql`SELECT slug FROM roles ORDER BY slug`;
    console.error(`unknown role "${roleSlug}". Available: ${all.map((r) => r.slug).join(", ")}`);
    process.exit(1);
  }

  // Upsert, so re-running resets the password rather than failing.
  const users = await sql`
    INSERT INTO users (email, name, kind, status, password_hash, created_at, updated_at)
    VALUES (${email.toLowerCase()}, ${name}, 'staff', 'active', ${hashPassword(password)}, now(), now())
    ON CONFLICT (email) DO UPDATE
      SET password_hash = EXCLUDED.password_hash,
          name          = EXCLUDED.name,
          kind          = 'staff',
          status        = 'active',
          updated_at    = now()
    RETURNING id
  `;

  const userId = users[0].id;

  await sql`
    INSERT INTO user_roles (user_id, role_id)
    VALUES (${userId}, ${roles[0].id})
    ON CONFLICT DO NOTHING
  `;

  const perms = await sql`
    SELECT count(*)::int AS n
    FROM user_roles ur
    JOIN role_permissions rp ON rp.role_id = ur.role_id
    WHERE ur.user_id = ${userId}
  `;

  console.log("");
  console.log("  Email       ", email.toLowerCase());
  console.log("  Password    ", password);
  console.log("  Role        ", roles[0].name);
  console.log("  Permissions ", perms[0].n);
  console.log("");
  console.log("  Sign in at /login/ then go to /admin/");
  console.log("  This password is shown once and stored nowhere else.");
  console.log("");
  // Fingerprint lets you confirm later which password was set without
  // recording the password itself.
  console.log("  fingerprint ", createHash("sha256").update(password).digest("hex").slice(0, 12));
}

main().catch((err) => {
  console.error("failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
