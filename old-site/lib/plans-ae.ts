/**
 * UAE partnership plans - six tiers, each building on the one before.
 *
 * Structure follows the client's instruction directly: "each plan upgrades from
 * previous plan... when you are preparing plan 2, add plan 1 details as well".
 * So every plan stores only what it ADDS, and the UI renders
 * "Everything in <previous>, plus:" above it. That keeps the cards readable at
 * six tiers, and means a change to plan 1 propagates without editing five
 * other lists by hand.
 *
 * NOTE ON NAMING: the client's summary table calls AED 500 "Lead Growth
 * Partner", the detailed breakdown calls it "Growth Partner". Using the
 * detailed version - flagged for confirmation.
 *
 * NOTE ON POSTERS: plans 2-3 include "10 Creative Poster Designs", plan 4 adds
 * "10 Premium Poster Ads". Read as an upgrade in quality at the same volume,
 * not 20 posters. Plan 6 raises the volume to 24. Worth confirming.
 */

export type PlanGroup = { label: string; items: string[] };

export type Plan = {
  id: string;
  name: string;
  price: string;
  purpose: string;
  /** Name of the tier this one builds on, shown as "Everything in X, plus:" */
  inherits: string | null;
  featured?: boolean;
  badge?: string | null;
  /** Only what this tier ADDS on top of `inherits`. */
  adds: PlanGroup[];
  /** Stated exclusions, shown so buyers self-select rather than assume. */
  excludes?: string[];
};

export const AE_PLANS: Plan[] = [
  {
    id: "basic-listing",
    name: "Basic Listing Partner",
    price: "99",
    purpose: "Build online presence",
    inherits: null,
    badge: null,
    adds: [
      {
        label: "Business Listing & SEO",
        items: [
          "BrandUpMe business listing",
          "SEO-friendly business profile page",
          "Business description content writing",
          "Keyword optimisation",
          "Social media profile linking",
          "Basic link building",
          "Google search visibility improvement",
        ],
      },
    ],
    excludes: ["No social media management", "No lead generation"],
  },

  {
    id: "digital-presence",
    name: "Digital Presence Partner",
    price: "149",
    purpose: "Create a professional digital identity",
    inherits: "Basic Listing Partner",
    badge: null,
    adds: [
      {
        label: "Social Media Setup",
        items: [
          "Facebook business page creation",
          "Instagram business profile setup",
          "LinkedIn company profile setup",
          "Profile optimisation",
          "Social media bio & content setup",
        ],
      },
      {
        label: "Monthly Marketing",
        items: [
          "10 creative poster designs per month",
          "Content writing",
          "Post publishing",
        ],
      },
    ],
  },

  {
    id: "local-growth",
    name: "Local Growth Partner",
    price: "199",
    purpose: "Reach your local audience",
    inherits: "Digital Presence Partner",
    badge: null,
    adds: [
      {
        label: "Organic Marketing",
        items: [
          "Local community group sharing",
          "Business promotion in relevant groups",
          "Local audience reach",
          "Customer engagement support",
        ],
      },
      {
        label: "Reporting",
        items: ["Monthly marketing report"],
      },
    ],
  },

  {
    id: "verified-brand",
    name: "Verified Brand Partner",
    price: "349",
    purpose: "Build customer trust",
    inherits: "Local Growth Partner",
    badge: "Most Trusted",
    adds: [
      {
        label: "Verification Benefits",
        items: [
          "BrandUpMe verified badge",
          "Priority business listing",
          "Trust profile enhancement",
        ],
      },
      {
        label: "Content Marketing",
        items: [
          "10 premium poster ads per month",
          "2 professional video ads per month",
          "Promotional campaign planning",
        ],
      },
      {
        label: "Branding",
        items: [
          "Business story content",
          "Product & service highlights",
          "Customer trust building",
        ],
      },
    ],
  },

  {
    id: "growth-partner",
    name: "Growth Partner",
    price: "500",
    purpose: "Get business opportunities",
    inherits: "Verified Brand Partner",
    badge: null,
    adds: [
      {
        label: "Lead Generation System",
        items: [
          "Access to BrandUpMe customer enquiries",
          "Business requirement matching",
          "Qualified lead sharing",
          "Customer requirement details",
        ],
      },
    ],
  },

  {
    id: "growth-accelerator",
    name: "Business Growth Accelerator",
    price: "1000",
    purpose: "Outsourced marketing and sales support",
    inherits: "Growth Partner",
    // Client asked for the 1000 tier to carry the highlight, not the 500.
    featured: true,
    badge: "Most Popular",
    adds: [
      {
        label: "Content Marketing",
        items: [
          "24 creative poster ads per month",
          "4 professional video ads per month",
          "Daily organic marketing activities",
          "Social media posting management",
        ],
      },
      {
        label: "Lead Generation",
        items: [
          "Targeted customer research",
          "Prospect identification",
          "Business information sharing with prospects",
          "Customer follow-up support",
          "Lead nurturing assistance",
        ],
      },
      {
        label: "Sales Support",
        items: [
          "Customer communication support",
          "Requirement understanding",
          "Meeting coordination",
          "Conversion assistance",
        ],
      },
    ],
  },
];

export const AE_PRICING_COPY = {
  eyebrow: "Partnership Plans",
  headline: "Choose the plan that",
  accent: "fits your stage",
  sub: "Every plan includes everything from the one before it. Start where you are and move up as your business grows.",
  note: "All plans are monthly. No long-term lock-in.",
} as const;
