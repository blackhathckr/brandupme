import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export.
   *
   * `next build` emits plain HTML/CSS/JS into `out/`, which means the site can
   * be dropped straight into cPanel `public_html` with no Node runtime, while
   * still deploying to Vercel unchanged. It also lets the registration form
   * POST to a PHP endpoint sitting alongside it on the same host.
   *
   * Trade-off accepted: no SSR, no Route Handlers that read the request, no
   * middleware, no next/image optimisation - none of which a marketing landing
   * page needs. Ref: node_modules/next/dist/docs/01-app/02-guides/static-exports.md
   */
  output: "export",

  /**
   * Emits `/privacy/index.html` rather than `/privacy.html`, which Apache and
   * every shared host serve correctly without rewrite rules.
   */
  trailingSlash: true,

  /**
   * Required with `output: "export"` - the default loader needs a server.
   * Images are sized and compressed at build time instead.
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
