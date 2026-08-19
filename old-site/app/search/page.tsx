import type { Metadata } from "next";
import { ListingScreen } from "@/components/directory/listing-screen";
import { PublicHeader } from "@/components/site/public-header";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/top-bar";
import { CATEGORIES } from "@/lib/brand/categories";

export const metadata: Metadata = {
  title: "Search Results | BrandUpMe",
  description: "Search verified businesses across every category in the UAE.",
};

/**
 * Search results reuse the category listing template — the client's mockup is
 * the same screen with a different heading, so it is the same component with a
 * different breadcrumb rather than a second layout to maintain.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; emirate?: string }>;
}) {
  const { q, category, emirate } = await searchParams;

  const matched =
    CATEGORIES.find((c) => c.name === category) ??
    CATEGORIES.find((c) => c.slug === "cleaning-services")!;

  const where = emirate && emirate !== "All Emirates" ? emirate : "UAE";
  const heading = q ? `"${q}" in ${where}` : `${matched.name} in ${where}`;

  return (
    <div className="min-h-dvh bg-white">
      <TopBar withApps />
      <PublicHeader />

      <ListingScreen
        category={matched}
        heading={heading}
        subheading={`Compare verified businesses, connect directly and grow your business.`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Search" },
          { label: q ?? matched.name },
        ]}
      />

      <SiteFooter />
    </div>
  );
}
