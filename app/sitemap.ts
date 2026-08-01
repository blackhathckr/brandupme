import type { MetadataRoute } from "next";
import { LEGAL_PAGES_PUBLISHED } from "@/lib/content";

/** Required with `output: "export"` - see the note in robots.ts. */
export const dynamic = "force-static";

const SITE = "https://www.brandupme.ae";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-01");

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified, changeFrequency: "weekly", priority: 1 },
  ];

  // Legal drafts stay out of the sitemap until the client signs them off.
  if (LEGAL_PAGES_PUBLISHED) {
    for (const p of ["privacy", "terms", "refund"]) {
      pages.push({
        url: `${SITE}/${p}/`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
  }

  return pages;
}
