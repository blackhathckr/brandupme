/**
 * Plans — the single source of truth for every plan surface in the portal.
 *
 * Used by: the onboarding wizard's plan grid, the Plans & Pricing page, the
 * "Learn More" modal, the dashboard's Plans & Benefits panel and the upgrade
 * prompts. Changing a price here changes it everywhere; nothing hard-codes a
 * plan name or price at a call site.
 *
 * ── NAMING ────────────────────────────────────────────────────────────────
 * The client gave THREE different naming sets across the dump:
 *   1. The wizard mockup      "Starter / Business Growth / Advanced / Verified
 *                              / Business Pro / Business Elite"
 *   2. The comparison matrix  "Basic / Standard / Professional / Business /
 *                              Premium / Elite"
 *   3. His 8:30 PM message    explicitly headed "Final Plan Name"
 *
 * Set 3 is used below. It is the only one he labelled final, and it is the one
 * his seven individual plan sheets are titled with. FLAGGED FOR CONFIRMATION.
 *
 * ── PRICES ────────────────────────────────────────────────────────────────
 * Two prices differ between the wizard mockup and every other source:
 *   Starter    mockup 99   -> 105 used (his final table + the Tester sheet's
 *                             "UPGRADE TO AED 105 BASIC" callout)
 *   Influencer mockup 49   -> 50 used (his final table + both influencer
 *                             infographics)
 * FLAGGED FOR CONFIRMATION.
 */

export type BadgeTier = "bronze" | "silver" | "gold" | "platinum";

export type PrimaryPlan = {
  id: string;
  /** Client's "Final Plan Name". */
  name: string;
  /** Shown under the name in the wizard grid, e.g. "10 AED / Day". */
  price: number;
  unit: "day" | "month";
  /** The one-line pitch printed inside the wizard's plan card. */
  blurb: string;
  /** His positioning column, used as the card eyebrow on the pricing page. */
  positioning: string;
  badge?: BadgeTier;
  /** Ticked list shown in the right-hand rail once this plan is selected. */
  highlights: string[];
  /** Requires a 10/15/30-day duration choice instead of monthly billing. */
  requiresDuration?: boolean;
  featured?: boolean;
};

export const PRIMARY_PLANS: PrimaryPlan[] = [
  {
    id: "tester",
    name: "Digital Card Daily Pass",
    price: 10,
    unit: "day",
    blurb: "Try our platform with a digital micro card for your business.",
    positioning: "Test BrandUpMe",
    requiresDuration: true,
    highlights: [
      "Digital Micro Card",
      "QR Code",
      "Unlimited Sharing",
      "Business Contact Info",
      "Social Media Links",
      "Basic Analytics",
    ],
  },
  {
    id: "starter",
    name: "Business Starter Plan",
    price: 105,
    unit: "month",
    blurb: "Basic business listing with SEO friendly page and content.",
    positioning: "Get Listed",
    highlights: [
      "BrandUpMe Business Listing",
      "SEO Friendly Business Page",
      "Digital Business Card",
      "Customer Inquiry Form",
      "Business Dashboard",
      "Inquiry Analytics",
    ],
  },
  {
    id: "visibility",
    name: "Business Visibility Plan",
    price: 149,
    unit: "month",
    blurb: "Includes social media profile creation + 10 posters monthly.",
    positioning: "Get Listed + Promote",
    highlights: [
      "Everything in Business Starter",
      "Social Media Profile Creation",
      "Social Media Profile Optimization",
      "10 Promotional Posters / Month",
      "Video Meeting System",
    ],
  },
  {
    id: "local-reach",
    name: "Local Reach Plan",
    price: 199,
    unit: "month",
    blurb: "Includes local group sharing and increased visibility.",
    positioning: "Promote + Local Reach",
    highlights: [
      "Everything in Business Visibility",
      "Organic Marketing / Local Group Sharing",
      "Business Promotion in Relevant Groups",
      "More Local Customer Reach",
      "10 Posters Used for Promotion",
    ],
  },
  {
    id: "verified",
    name: "Verified Business Plan",
    price: 349,
    unit: "month",
    blurb: "Verified badge + 10 posters + 2 video ads monthly.",
    positioning: "Get Verified + Get Trusted",
    badge: "bronze",
    highlights: [
      "Everything in Local Reach",
      "Verified Business Badge",
      "2 Video Ads / Month",
      "Enhanced Visibility",
      "Priority Support",
    ],
  },
  {
    id: "lead-generation",
    name: "Lead Generation Plan",
    price: 500,
    unit: "month",
    blurb: "Includes lead generation and business inquiries.",
    positioning: "Get Leads + Grow",
    badge: "gold",
    highlights: [
      "Everything in Verified Business",
      "Premium Verified Badge",
      "Lead Generation Service Included",
      "Lead Management & Tracking",
      "Monthly Lead Report",
      "24/7 Priority Support",
    ],
  },
  {
    id: "growth-max",
    name: "Business Growth Max Plan",
    price: 1000,
    unit: "month",
    blurb: "24 posters + 4 video ads + daily marketing + lead generation.",
    positioning: "Maximum Business Growth",
    badge: "platinum",
    featured: true,
    highlights: [
      "Everything in Lead Generation",
      "Elite Verified Business Badge",
      "24 Posters + 4 Video Ads / Month",
      "Daily Organic Marketing",
      "Dedicated Account Manager",
      "Monthly Growth Report",
    ],
  },
];

/** The 10 / 15 / 30-day choice the Daily Pass makes mandatory. */
export const TESTER_DURATIONS = [
  { days: 10, price: 100 },
  { days: 15, price: 150 },
  { days: 30, price: 300 },
] as const;

export type AddOnPlan = {
  id: string;
  name: string;
  price: number;
  unit: "month";
  blurb: string;
  /** Bulleted benefits printed inside the add-on card. */
  benefits: string[];
};

export const ADD_ON_PLANS: AddOnPlan[] = [
  {
    id: "influencer-discovery",
    name: "Influencer Discovery Plan",
    price: 50,
    unit: "month",
    blurb: "Promote brands, create campaigns and earn from collaborations.",
    benefits: [
      "Access to verified influencer network",
      "Smart influencer recommendations",
      "Direct inquiry system",
      "Video call meetings (Zoom / Google Meet)",
      "Performance tracking dashboard",
    ],
  },
  {
    id: "employer",
    name: "BrandUpMe Careers / Employer Plan",
    price: 25,
    unit: "month",
    blurb: "Post jobs, find talent and manage job applications.",
    benefits: [
      "Unlimited job postings",
      "Applicant management",
      "Resume search",
      "Shortlist & interview",
      "Employer dashboard",
    ],
  },
  {
    id: "multi-business",
    name: "Multiple Business Categories Listing Membership",
    price: 199,
    unit: "month",
    blurb: "List your business in multiple categories to get more visibility.",
    benefits: [
      "List in multiple categories",
      "More visibility in search",
      "Category based leads",
      "Priority in category pages",
      "Better reach & exposure",
    ],
  },
];

export function planById(id: string): PrimaryPlan | undefined {
  return PRIMARY_PLANS.find((p) => p.id === id);
}

export function addOnById(id: string): AddOnPlan | undefined {
  return ADD_ON_PLANS.find((p) => p.id === id);
}

/** "10 AED / Day", "105 AED / Month" — the exact format used in the mockups. */
export function priceLabel(plan: { price: number; unit: "day" | "month" }) {
  return `${plan.price} AED / ${plan.unit === "day" ? "Day" : "Month"}`;
}
