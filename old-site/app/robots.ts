import type { MetadataRoute } from "next";

/**
 * Required with `output: "export"` - metadata routes are treated as Route
 * Handlers, which are dynamic by default and therefore fail the export.
 */
export const dynamic = "force-static";

/** Generated at build time into out/robots.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.brandupme.ae/sitemap.xml",
  };
}
