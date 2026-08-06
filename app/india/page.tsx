import type { Metadata } from "next";
import { Landing } from "@/components/landing/landing";
import { getRegion } from "@/lib/content";

const r = getRegion("IN");

export const metadata: Metadata = {
  title: `${r.entity} | Digital Marketing & Business Development`,
  description: r.hero.sub,
  alternates: { canonical: "/india/" },
};

export default function Page() {
  return <Landing region="IN" />;
}
