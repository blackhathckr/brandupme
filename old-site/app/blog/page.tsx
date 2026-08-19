import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "Blog | BrandUpMe" };

export default function Page() {
  return (
    <ComingSoon
      title="Blog"
      batch="Batch 3"
      detail="Articles and business growth guides."
    />
  );
}
