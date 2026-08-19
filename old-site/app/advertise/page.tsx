import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "Advertise Here | BrandUpMe" };

export default function Page() {
  return (
    <ComingSoon
      title="Advertise Here"
      batch="Batch 3"
      detail="Banner advertising from AED 19 — form, payment, proof approval and campaign analytics."
    />
  );
}
