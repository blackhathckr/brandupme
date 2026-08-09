import { defineConfig } from "drizzle-kit";

/**
 * Migrations are generated here and applied with
 * `wrangler d1 migrations apply brandupme` (add --remote for production).
 *
 * Dialect is sqlite/d1-http rather than a direct connection: D1 has no TCP
 * endpoint, so drizzle-kit generates the SQL and wrangler ships it.
 */
export default defineConfig({
  schema: "./lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "d1-http",
  verbose: true,
  strict: true,
});
