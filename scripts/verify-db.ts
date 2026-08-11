import { neon } from "@neondatabase/serverless";

/** Row counts, to confirm a seed or migration landed as expected. */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(url);
  const [row] = await sql`
    SELECT
      (SELECT count(*) FROM countries)              AS countries,
      (SELECT count(*) FROM locations)              AS locations,
      (SELECT count(*) FROM categories)             AS categories,
      (SELECT count(*) FROM category_relationships) AS relationships,
      (SELECT count(*) FROM plans)                  AS plans,
      (SELECT count(*) FROM plan_features)          AS plan_features,
      (SELECT count(*) FROM roles)                  AS roles,
      (SELECT count(*) FROM permissions)            AS permissions,
      (SELECT count(*) FROM users)                  AS users,
      (SELECT count(*) FROM businesses)             AS businesses,
      (SELECT count(*) FROM leads)                  AS leads
  `;

  for (const [k, v] of Object.entries(row)) {
    console.log(`  ${k.padEnd(16)} ${v}`);
  }
}

main();
