import type { Metadata } from "next";
import { Landing } from "@/components/landing/landing";
import { getRegion } from "@/lib/content";

/**
 * The original UAE offering.
 *
 * The client moved this off /uae/ so that route could become the business
 * directory, and asked for it to sit under a dropdown headed "BrandUpMe
 * Business Partner Programme". The content is unchanged.
 */
const r = getRegion("AE");

export const metadata: Metadata = {
  title: `${r.entity} | Business Partner Programme in Dubai`,
  description: r.hero.sub,
  alternates: { canonical: "/uae/partner-programme/" },
  keywords: [
    "business partner programme Dubai",
    "remote sales representative Dubai",
    "outsourced sales UAE",
    "lead generation UAE",
  ],
};

export default function Page() {
  return <Landing region="AE" />;
}
