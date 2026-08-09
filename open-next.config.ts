import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Default adapter config: no incremental cache configured yet, so ISR falls
 * back to plain SSR. Wiring R2 or KV as the cache is a later optimisation and
 * would otherwise be a second thing to debug during the first deploy.
 */
export default defineCloudflareConfig();
