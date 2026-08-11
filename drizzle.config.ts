import { defineConfig } from "drizzle-kit";

/**
 * Migrations are generated from the schema and applied with `pnpm db:migrate`.
 *
 * Postgres has a real connection, so drizzle-kit talks to Neon directly -
 * unlike D1, which had no TCP endpoint and needed wrangler to ship SQL files.
 */
export default defineConfig({
  schema: "./lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
