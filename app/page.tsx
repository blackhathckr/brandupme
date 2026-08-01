import { SiteNav } from "@/components/landing/site-nav";
import { Hero } from "@/components/landing/hero";
import { Calculator } from "@/components/landing/calculator";
import { Services } from "@/components/landing/services";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Day } from "@/components/landing/day";
import { Compare } from "@/components/landing/compare";
import { Industries, Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { Register } from "@/components/landing/register";
import { Contact, CtaBand, Footer } from "@/components/landing/footer";
import { FAQ, CONFIG } from "@/lib/content";

/**
 * Section order follows the design system's page-rhythm map: light dominates,
 * with two night bands (Calculator, Day) carrying the emotional weight before
 * releasing back to ivory.
 */
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.brandupme.ae/#org",
        name: "BrandUpMe",
        url: "https://www.brandupme.ae/",
        logo: "https://www.brandupme.ae/brand/mark-512.png",
        email: CONFIG.email,
        telephone: CONFIG.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: CONFIG.city,
          addressCountry: "AE",
        },
        areaServed: { "@type": "Country", name: CONFIG.country },
      },
      {
        "@type": "Service",
        name: "Remote Sales Representative / Business Partnership Program",
        serviceType: "Outsourced business development and sales representation",
        provider: { "@id": "https://www.brandupme.ae/#org" },
        areaServed: { "@type": "Country", name: CONFIG.country },
        offers: {
          "@type": "Offer",
          price: String(CONFIG.price),
          priceCurrency: CONFIG.currency,
          description:
            "AED 500 per month partnership fee plus success-based commission as agreed.",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
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
      <SiteNav />
      <main>
        <Hero />
        <Services />
        <Calculator />
        <HowItWorks />
        <Day />
        <Compare />
        <Industries />
        <Pricing />
        <Faq />
        <Register />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
