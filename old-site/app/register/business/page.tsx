import type { Metadata } from "next";
import { BusinessWizard } from "@/components/onboarding/business-wizard";

export const metadata: Metadata = {
  title: "Create Your Business Account | BrandUpMe",
  description:
    "Register your business on BrandUpMe in nine steps — business details, plan selection, contact person, address, documents and payment.",
};

export default function Page() {
  return <BusinessWizard />;
}
