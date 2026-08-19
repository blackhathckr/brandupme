import type { Metadata } from "next";
import { CreateAccount } from "@/components/onboarding/create-account";
import { AdBanner } from "@/components/site/ad-banner";
import { PublicHeader } from "@/components/site/public-header";
import { TopBar } from "@/components/site/top-bar";

export const metadata: Metadata = {
  title: "Create Your Account | BrandUpMe",
  description:
    "Join BrandUpMe as a business owner, promoter, referral partner or customer and unlock the power to grow your business in the UAE.",
};

export default function Page() {
  return (
    <div className="min-h-dvh bg-white">
      <TopBar />
      <PublicHeader />

      <main className="container-portal py-8">
        <CreateAccount />
        <AdBanner creative="royal-palace" className="mt-8" />
      </main>
    </div>
  );
}
