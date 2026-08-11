import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * No static export.
   *
   * The marketing site was `output: "export"` - plain HTML, no server, which
   * suited a brochure. The UAE business portal cannot be built that way:
   * plan-based field masking has to happen on the server, so that a locked
   * phone number is never in the payload at all. Static export forbids exactly
   * what the portal needs - server rendering, route handlers that read the
   * request, and per-request auth.
   *
   * Deploys to Vercel, which runs Next natively. The marketing pages are
   * unaffected in behaviour - they simply prerender instead of exporting.
   */

  /** Kept from the static build so existing URLs do not move. */
  trailingSlash: true,

  /** Uploaded images live on Vercel Blob, which serves them over its own CDN. */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },

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


