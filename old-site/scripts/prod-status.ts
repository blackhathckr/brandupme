import { neon } from "@neondatabase/serverless";

/** Clears all sessions and prints what production currently holds. */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(url);

  // The verification pass inserts sessions with fixed, published tokens.
  // They must not survive into production.
  await sql`DELETE FROM sessions`;

  const [counts] = await sql`
    SELECT
      (SELECT count(*) FROM sessions)   AS sessions,
      (SELECT count(*) FROM categories) AS categories,
      (SELECT count(*) FROM locations)  AS locations,
      (SELECT count(*) FROM plans)      AS plans,
      (SELECT count(*) FROM leads)      AS leads
  `;

  const staff = await sql`SELECT email FROM users WHERE kind = 'staff' ORDER BY id`;
  const businesses = await sql`SELECT name, status FROM businesses ORDER BY id`;

  console.log("  sessions cleared, now:", counts.sessions);
  console.log("  categories           :", counts.categories);
  console.log("  locations            :", counts.locations);
  console.log("  plans                :", counts.plans);
  console.log("  leads                :", counts.leads);
  console.log("  staff accounts       :", staff.map((r) => r.email).join(", "));
  console.log(
    "  sample businesses    :",
    businesses.map((r) => `${r.name} (${r.status})`).join(", "),
  );
}

main().catch((err) => {
  console.error("failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
