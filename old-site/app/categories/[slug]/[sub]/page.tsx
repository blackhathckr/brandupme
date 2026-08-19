import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingScreen } from "@/components/directory/listing-screen";
import { PublicHeader } from "@/components/site/public-header";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/top-bar";
import {
  allSubcategoryParams,
  findCategory,
  findSubcategory,
} from "@/lib/brand/categories";

/**
 * Sub-category listing, e.g. /categories/cleaning-services/office-cleaning.
 *
 * Its own URL rather than a filter on the parent, because the client's Banner
 * Advertising product sells a sub-category page placement and registration
 * captures a sub-category — both need a page that exists and can be linked,
 * indexed and advertised against.
 */
export function generateStaticParams() {
  return allSubcategoryParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}): Promise<Metadata> {
  const { slug, sub } = await params;
  const category = findCategory(slug);
  const name = category && findSubcategory(category, sub);
  if (!category || !name) return { title: "Not found | BrandUpMe" };

  return {
    title: `${name} in Dubai | BrandUpMe`,
    description: `Find the best ${name.toLowerCase()} companies in Dubai. Compare verified businesses, connect and grow.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const name = findSubcategory(category, sub);
  if (!name) notFound();

  return (
    <div className="min-h-dvh bg-white">
      <TopBar withApps />
      <PublicHeader />

      <ListingScreen
        category={category}
        activeSub={name}
        heading={`${name} in Dubai`}
        subheading={`Find the best ${name.toLowerCase()} companies in Dubai. Compare, connect and grow your business.`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name, href: `/categories/${category.slug}` },
          { label: name },
        ]}
      />

      <SiteFooter />
    </div>
  );
}
