import { getRegion, type Region } from "@/lib/content";
import { SiteNav } from "./site-nav";
import { Hero } from "./hero";
import { Trust } from "./trust";
import { Services } from "./services";
import { Process } from "./process";
import { Pricing } from "./pricing";
import { PlansAE } from "./plans-ae";
import { CtaBand, Footer } from "./footer";

/**
 * One page, rendered per country.
 *
 * Section order follows the client's approved mockup exactly:
 *   hero (dark) -> trust -> services (white) -> process (dark) ->
 *   pricing (light) -> CTA card -> footer (dark)
 *
 * Every section takes its copy from the region object, so India and the UAE
 * share one layout and one design while selling different things.
 */
export function Landing({ region }: { region: Region }) {
  const r = getRegion(region);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "#org",
        name: r.entity,
        logo: "/brand/mark-512.png",
        email: r.email,
        telephone: r.phone,
        address: { "@type": "PostalAddress", addressLocality: r.address },
      },
      {
        "@type": "Service",
        name: r.services.headline,
        serviceType: r.services.items.map((s) => s.title),
        provider: { "@id": "#org" },
        offers: r.pricing.plans.map((p) => ({
          "@type": "Offer",
          name: p.name,
          price: p.price.replace(/,/g, ""),
          priceCurrency: region === "IN" ? "INR" : "AED",
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav r={r} region={region} />
      <main>
        <Hero r={r} />
        <Trust r={r} />
        <Services r={r} />
        <Process r={r} />
        {/* UAE now sells six tiered partnership plans, not a single fee.
            India keeps the four-plan retainer layout. */}
        {region === "AE" ? <PlansAE /> : <Pricing r={r} />}
        <CtaBand r={r} />
      </main>
      <Footer r={r} />
    </>
  );
}
