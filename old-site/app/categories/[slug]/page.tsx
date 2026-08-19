import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingScreen } from "@/components/directory/listing-screen";
import { PublicHeader } from "@/components/site/public-header";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/top-bar";
import { CATEGORIES } from "@/lib/brand/categories";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: "Category not found | BrandUpMe" };

  const short = category.name.replace(/ (Companies|Services)$/, "");
  return {
    title: `${short} in Dubai | BrandUpMe`,
    description: `Find the best ${short.toLowerCase()} companies in Dubai. Compare, connect and grow your business.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const short = category.name.replace(/ (Companies|Services)$/, "");

  return (
    <div className="min-h-dvh bg-white">
      <TopBar withApps />
      <PublicHeader />

      <ListingScreen
        category={category}
        heading={`${category.name} in Dubai`}
        subheading={`Find the best ${short.toLowerCase()} companies in Dubai. Compare, connect and grow your business.`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      <SiteFooter />
    </div>
  );
}
