import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /**
   * NO static export on this branch.
   *
   * The marketing site was `output: "export"` - plain HTML, no server, which
   * suited a brochure and deployed anywhere. The UAE business portal cannot be
   * built that way: plan-based field masking has to happen on the server, so
   * that a locked phone number is never in the payload at all. Static export
   * forbids exactly the things the portal needs - server rendering, route
   * handlers that read the request, and per-request auth.
   *
   * Target is now Cloudflare Workers through @opennextjs/cloudflare, which
   * gives SSR, ISR and Server Actions alongside the D1 and R2 bindings.
   * Build:  pnpm build && pnpm opennext:build
   * Deploy: pnpm deploy
   *
   * The marketing pages are unaffected in behaviour - they simply prerender
   * instead of exporting.
   */

  /** Kept from the static build so existing URLs do not move. */
  trailingSlash: true,

  /**
   * Cloudflare serves images through its own pipeline rather than the Next
   * optimiser. Left unoptimised so the two do not fight; R2-hosted uploads are
   * resized on write instead.
   */
  images: { unoptimized: true },

  /**
   * Fail the build on type errors rather than shipping them. Next already
   * defaults this way; stated explicitly so nobody "fixes" a red build by
   * switching it off.
   *
   * Note: there is no `eslint` key in Next 16 - `next lint` was removed and
   * linting is now a standalone `eslint .` script (see package.json).
   */
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;

/**
 * Makes D1 and R2 available to `next dev`.
 *
 * Without this the dev server has no Cloudflare bindings, so every page that
 * touches the database throws - which looks like a broken app rather than a
 * missing binding. The deployed Worker gets its bindings from wrangler.jsonc
 * instead, so this is a development-only concern.
 *
 * Not awaited: Next loads this config through require() in some code paths,
 * and a top-level await makes that fail outright.
 */
if (process.env.NODE_ENV === "development") {
  void initOpenNextCloudflareForDev();
}

