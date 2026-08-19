/**
 * Mock ad creatives for the banner slots.
 *
 * The client asked twice for ad space to be designed in from the start —
 * category pages, sub-category pages, business profile pages and the footer of
 * every page. These stand in for real campaigns until the Banner Advertising
 * flow is wired up; the shape mirrors what an `ad_campaigns` row will carry so
 * swapping mock for live data is a query change, not a redesign.
 */

export type AdCreative = {
  id: string;
  brand: string;
  brandSub?: string;
  headline: string[];
  kicker?: string;
  /** Small pills under the headline, e.g. Flights | Hotels | Visa. */
  services?: string[];
  /** Trust strip along the bottom of wide banners. */
  features?: { label: string }[];
  offerLabel?: string;
  offerValue: string;
  offerSub: string;
  cta: string;
  url: string;
  note?: string;
  /** Tailwind gradient for the banner field. */
  field: string;
  accent: string;
};

/* ── Narrow units: category strip and listing sidebar ─────────────────── */

import type { PromoAdData } from "@/components/site/promo-ad";

/** The three-across strip above a category listing. */
export const CATEGORY_STRIP_ADS: PromoAdData[] = [
  {
    id: "sparkle-way",
    brand: "SPARKLE WAY",
    headline: "PROFESSIONAL CLEANING SERVICES YOU CAN TRUST",
    bullets: ["Home Cleaning", "Office Cleaning", "Deep Cleaning", "Pest Control"],
    cta: "Get a Free Quote",
    phone: "+971 52 345 6789",
    field: "from-[#0B1B33] via-[#12294A] to-[#1D3A63]",
    accent: "#4ADE80",
  },
  {
    id: "clean-max",
    brand: "CLEAN MAX",
    headline: "Cleaning Made Easy, Life More Comfortable",
    sub: "Trained Staff · Eco Friendly · Affordable Price",
    cta: "Book Now",
    phone: "+971 58 765 4321",
    field: "from-[#F2FBF4] via-[#E7F7EC] to-[#D8F0E2]",
    light: true,
  },
  {
    id: "bright-future",
    brand: "BRIGHT FUTURE",
    brandSub: "CLEANING",
    headline: "A Cleaner Space, A Better You",
    bullets: ["Residential Cleaning", "Commercial Cleaning", "Move In/Move Out"],
    cta: "Learn More",
    phone: "+971 55 987 6543",
    field: "from-[#0C3B78] via-[#1155A8] to-[#1C74C9]",
    accent: "#FFFFFF",
  },
];

/** Sidebar tiles beside a category listing. */
export const LISTING_SIDEBAR_ADS: PromoAdData[] = [
  {
    id: "office-cleaning",
    headline: "NEED OFFICE CLEANING?",
    sub: "Get a Free Site Visit & Quote Today!",
    bullets: [
      "Trained & Verified Staff",
      "Affordable Pricing",
      "Satisfaction Guaranteed",
    ],
    cta: "Book Now",
    phone: "+971 54 321 0987",
    field: "from-[#EFF7FF] via-[#E4F1FE] to-[#D7E9FC]",
    light: true,
  },
  {
    id: "deep-cleaning",
    headline: "DEEP CLEANING SPECIAL OFFER",
    offer: "20% OFF",
    offerSub: "For This Month",
    cta: "Claim Offer Now",
    field: "from-[#0D2B18] via-[#12401F] to-[#1A5C2A]",
    accent: "#F5C518",
  },
];

/** Sidebar tiles on the all-categories page. */
export const CATEGORY_SIDEBAR_ADS: PromoAdData[] = [
  {
    id: "business-setup",
    headline: "BUSINESS SETUP MADE SIMPLE",
    sub: "Start your company in UAE with 100% Ownership",
    bullets: ["Free Consultation", "Fast Processing", "All Activities Covered"],
    cta: "Get Started Now",
    phone: "+971 54 322 1100",
    field: "from-[#F6F4FF] via-[#EFEAFE] to-[#E4DCFD]",
    light: true,
  },
  {
    id: "travel-more",
    headline: "TRAVEL MORE WORRY LESS",
    sub: "Best Tour Packages at Best Prices",
    bullets: ["Flights", "Hotels", "Visa Assistance", "Holiday Packages"],
    cta: "Book Now",
    phone: "+971 52 987 6543",
    field: "from-[#0E7BC4] via-[#1795D8] to-[#38B6E8]",
    accent: "#F5C518",
  },
];

export const AD_CREATIVES: Record<string, AdCreative> = {
  goglobal: {
    id: "goglobal",
    brand: "GoGlobal",
    brandSub: "TRAVEL & TOURS",
    headline: ["EXPLORE THE WORLD", "WITH UNFORGETTABLE JOURNEYS"],
    services: ["Flights", "Hotels", "Holidays", "Visa", "Travel Insurance"],
    features: [
      { label: "Best Price Guarantee" },
      { label: "24/7 Support" },
      { label: "Easy Booking" },
      { label: "Custom Packages" },
      { label: "Secure Payments" },
    ],
    offerLabel: "SPECIAL OFFER",
    offerValue: "25% OFF",
    offerSub: "ON INTERNATIONAL PACKAGES",
    cta: "Book Now",
    url: "www.goglobaltours.ae",
    note: "T&C Apply",
    field: "from-[#0B1B3A] via-[#0E2A5C] to-[#0A6E8F]",
    accent: "#F5C518",
  },
  "royal-palace": {
    id: "royal-palace",
    brand: "ROYAL PALACE",
    brandSub: "HOTELS & RESORTS",
    headline: ["LUXURY STAYS.", "UNFORGETTABLE EXPERIENCES."],
    kicker: "BOOK YOUR PERFECT GETAWAY TODAY!",
    features: [
      { label: "5 Star Comfort" },
      { label: "Premium Locations" },
      { label: "Best Price Guarantee" },
      { label: "24/7 Guest Support" },
    ],
    offerLabel: "UP TO",
    offerValue: "25% OFF",
    offerSub: "ON SELECTED STAYS",
    cta: "BOOK NOW",
    url: "www.royalpalacehotels.com",
    field: "from-[#170E08] via-[#3A2415] to-[#6B3F1E]",
    accent: "#F5C518",
  },
};
