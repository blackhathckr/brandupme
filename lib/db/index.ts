import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

/**
 * Request-scoped D1 handle.
 *
 * On Workers the binding lives on the request context, not in module scope, so
 * this must be called inside a request. Caching a handle in a module-level
 * variable works locally and then serves one isolate's binding to another
 * request in production, which is a data-leak shape of bug.
 *
 * `getCloudflareContext` is imported lazily so that anything importing the
 * schema for types - migrations, seeds, tests - does not drag the Workers
 * runtime in with it.
 */

export type Db = DrizzleD1Database<typeof schema>;

let warnedMissing = false;

export async function getDb(): Promise<Db> {
  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  // Async mode is required outside a request scope - during prerender and in
  // any route the adapter has not already bound. Sync mode throws there.
  const { env } = await getCloudflareContext({ async: true });
  const d1 = (env as unknown as { DB?: D1Database }).DB;

  if (!d1) {
    // A clear failure here beats a confusing "cannot read property prepare of
    // undefined" three layers down a query.
    throw new Error(
      "D1 binding `DB` is missing. Check wrangler.jsonc and that the dev " +
        "server was started through the Cloudflare adapter.",
    );
  }

  if (!warnedMissing && process.env.NODE_ENV === "development") {
    warnedMissing = true;
  }

  return drizzle(d1, { schema });
}

export { schema };
export * from "./schema";
