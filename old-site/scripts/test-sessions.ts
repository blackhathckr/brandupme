import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";

/**
 * Creates predictable sessions for the automated verification pass.
 *
 * The token hash must match lib/auth/password.ts exactly - base64 of the
 * SHA-256 digest - so the app authenticates these the same way it would a real
 * login. Development only; the tokens are fixed strings and must never exist
 * in a production database.
 */

const TOKENS = [
  { email: "owner@alnoor.test", token: "test-owner-token-aaaaaaaaaaaaaaaaaaaa" },
  { email: "admin@brandupme.ae", token: "test-admin-token-bbbbbbbbbbbbbbbbbbbb" },
];

const hashToken = (t: string) =>
  createHash("sha256").update(t).digest("base64");

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(url);

  const users = await sql`SELECT id, email, kind FROM users ORDER BY id`;
  console.log("users:");
  for (const u of users) console.log(`  ${u.id}  ${u.email}  (${u.kind})`);

  await sql`DELETE FROM sessions`;

  for (const { email, token } of TOKENS) {
    const rows = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (rows.length === 0) {
      console.error(`  ! no user for ${email}`);
      continue;
    }
    await sql`
      INSERT INTO sessions (user_id, token_hash, expires_at, created_at)
      VALUES (${rows[0].id}, ${hashToken(token)}, now() + interval '1 day', now())
    `;
    console.log(`  session created for ${email}`);
  }

  const [count] = await sql`SELECT count(*)::int AS n FROM sessions`;
  console.log(`sessions in database: ${count.n}`);
}

main().catch((err) => {
  console.error("failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
