import { TopBar } from "@/components/site/top-bar";
import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Categories } from "@/components/site/categories";
import { EcosystemDiagram } from "@/components/site/ecosystem-diagram";
import { FeaturedBusinesses } from "@/components/site/featured-businesses";
import { HowItWorks } from "@/components/site/how-it-works";
import { CtaTriptych } from "@/components/site/cta-triptych";
import { ClosingCta } from "@/components/site/closing-cta";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020F08]">
      <TopBar />
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <Categories />
        <EcosystemDiagram />
        <FeaturedBusinesses />
        <HowItWorks />
        <CtaTriptych />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
