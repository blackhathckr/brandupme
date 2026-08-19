import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "Plans & Pricing | BrandUpMe" };

export default function Page() {
  return (
    <ComingSoon
      title="Plans & Pricing"
      batch="Batch 3"
      detail="All seven plans with Learn More detail modals, the comparison matrix and the add-on plans."
    />
  );
}
