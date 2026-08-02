import type { Metadata } from "next";
import { Landing } from "@/components/landing/landing";
import { getRegion } from "@/lib/content";

const r = getRegion("AE");

export const metadata: Metadata = {
  title: `${r.entity} | Hire Your Own Remote Sales Representative in Dubai`,
  description: r.hero.sub,
  alternates: { canonical: "/uae/" },
  keywords: [
    "remote sales representative Dubai",
    "outsourced sales UAE",
    "cold calling services Dubai",
    "lead generation UAE",
    "business development partner Dubai",
  ],
};

export default function Page() {
  return <Landing region="AE" />;
}
