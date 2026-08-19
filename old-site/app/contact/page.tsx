import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "Contact Us | BrandUpMe" };

export default function Page() {
  return (
    <ComingSoon
      title="Contact Us"
      batch="Batch 3"
      detail="Support form, offices and direct contact channels."
    />
  );
}
