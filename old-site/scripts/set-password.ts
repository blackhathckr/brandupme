import { pbkdf2Sync, randomBytes } from "node:crypto";
import { Buffer } from "node:buffer";
import { neon } from "@neondatabase/serverless";

/**
 * Sets a password on an existing user without changing their kind or roles.
 *
 * Used for business-owner accounts, which create-admin.ts cannot serve because
 * that script promotes the user to staff. Hash format matches
 * lib/auth/password.ts so the account signs in through the normal path.
 *
 * Usage: tsx scripts/set-password.ts <email> [password]
 */

const ITERATIONS = 210_000;

function hashPassword(plain: string): string {
  const salt = randomBytes(16);
  const dk = pbkdf2Sync(plain, salt, ITERATIONS, 32, "sha256");
  return `pbkdf2$${ITERATIONS}$${Buffer.from(salt).toString("base64")}$${Buffer.from(dk).toString("base64")}`;
}

async function main() {
  const [email, given] = process.argv.slice(2);
  if (!email) {
    console.error("usage: tsx scripts/set-password.ts <email> [password]");
    process.exit(1);
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(url);
  const password = given ?? randomBytes(12).toString("base64url");

  const rows = await sql`
    UPDATE users
    SET password_hash = ${hashPassword(password)},
        status        = 'active',
        updated_at    = now()
    WHERE email = ${email.toLowerCase()}
    RETURNING id, name, kind
  `;

  if (rows.length === 0) {
    console.error(`no user with email ${email}`);
    process.exit(1);
  }

  const owned = await sql`
    SELECT b.name, p.name AS plan
    FROM businesses b
    LEFT JOIN business_subscriptions s
      ON s.business_id = b.id AND s.status = 'active'
    LEFT JOIN plans p ON p.id = s.plan_id
    WHERE b.owner_id = ${rows[0].id}
  `;

  console.log("");
  console.log("  Email    ", email.toLowerCase());
  console.log("  Password ", password);
  console.log("  Name     ", rows[0].name);
  console.log("  Kind     ", rows[0].kind);
  for (const b of owned) {
    console.log(`  Business  ${b.name} - ${b.plan ?? "no active plan"}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error("failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
