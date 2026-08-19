import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";

export const metadata: Metadata = { title: "About BrandUpMe | BrandUpMe" };

export default function Page() {
  return (
    <ComingSoon
      title="About BrandUpMe"
      batch="Batch 3"
      detail="Who we are and why the platform exists."
    />
  );
}
