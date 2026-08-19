import type { Metadata } from "next";
import { HomeScreen } from "@/components/home/home-screen";
import { PublicHeader } from "@/components/site/public-header";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/top-bar";

/**
 * The portal home page.
 *
 * This route used to be the India/UAE country gateway. The client asked for it
 * to go — "our website home ui ux should be like this, remove current India &
 * UAE Showing" — so the UAE portal is now the front door. The gateway component
 * and the /india and /uae routes are left in place, just no longer linked from
 * here.
 */
export const metadata: Metadata = {
  title: "BrandUpMe | Find, Connect & Grow Your Business in UAE",
  description:
    "Discover verified businesses across the UAE, generate leads and grow your brand with digital business cards, SEO business pages and powerful lead tools.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <div className="min-h-dvh bg-white">
      <TopBar withApps />
      <PublicHeader />
      <main>
        <HomeScreen />
      </main>
      <SiteFooter />
    </div>
  );
}
