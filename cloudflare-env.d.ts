/**
 * Cloudflare bindings available to the Worker.
 *
 * Regenerate with `pnpm cf-typegen` after changing wrangler.jsonc. Checked in
 * so a fresh clone typechecks without running wrangler first.
 */
/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  DB: D1Database;
  MEDIA: R2Bucket;
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
}
