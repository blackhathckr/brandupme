import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Postgres connection.
 *
 * Neon's HTTP driver rather than a TCP pool: serverless functions are created
 * and destroyed constantly, and a pool per invocation exhausts Postgres
 * connections quickly. HTTP has no connection to leak.
 *
 * The trade-off is no interactive transactions. Nothing here needs them - the
 * only multi-write path is registration, and its steps are individually
 * meaningful rather than all-or-nothing. If that changes, swap to
 * drizzle-orm/neon-serverless, which is pooled and does support them.
 *
 * The client is cached per module instance. Unlike a pooled connection this is
 * safe: it holds no socket, just a URL and a fetch call.
 */

export type Db = NeonHttpDatabase<typeof schema>;

let cached: Db | null = null;

export function getDbSync(): Db {
  if (cached) return cached;

  const url = process.env.DATABASE_URL;
  if (!url) {
    // Explicit, because the alternative is a confusing failure deep inside a
    // query about `undefined` not being a valid connection string.
    throw new Error(
      "DATABASE_URL is not set. Add your Neon connection string to .env.local " +
        "for development, and to the Vercel project settings for deployments.",
    );
  }

  cached = drizzle(neon(url), { schema });
  return cached;
}

/**
 * Async wrapper.
 *
 * Kept async so every existing `await getDb()` call site works unchanged - the
 * D1 binding genuinely had to be awaited, Postgres does not. Not worth touching
 * a hundred call sites to remove one await.
 */
export async function getDb(): Promise<Db> {
  return getDbSync();
}

export { schema };
export * from "./schema";
