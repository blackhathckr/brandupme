import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "How It Works | BrandUpMe" };

export default function Page() {
  return (
    <ComingSoon
      title="How It Works"
      batch="Batch 3"
      detail="The full customer, business, partner and promoter journeys."
    />
  );
}
