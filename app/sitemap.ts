import type { MetadataRoute } from "next";
import { LEGAL_PAGES_PUBLISHED } from "@/lib/content";
import { SERVICE_PAGES } from "@/lib/services-in";

/** Required with `output: "export"` - see the note in robots.ts. */
export const dynamic = "force-static";

const SITE = "https://www.brandupme.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-02");

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/uae/`, lastModified, changeFrequency: "weekly", priority: 1 },
    // India-only pages - deliberately absent from any UAE nav
    { url: `${SITE}/about/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/why-choose-us/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...SERVICE_PAGES.map((s) => ({
      url: `${SITE}/services/${s.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];

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
