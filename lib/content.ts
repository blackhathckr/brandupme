/**
 * Site content, keyed by country.
 *
 * ONE design, TWO offerings. The client sells different things in each market:
 *
 *   IN  digital marketing retainer - social media, creative, organic reach,
 *       inbound lead handling. Priced in monthly/yearly plans.
 *   AE  a dedicated remote sales representative - outbound calling, WhatsApp
 *       and email prospecting. Priced as a monthly fee plus success commission.
 *
 * So the country toggle swaps hero copy, services, process AND pricing - not
 * just the currency. Everything region-specific lives in REGIONS below; the
 * section components are shared and take content as props.
 */

export type Region = "IN" | "AE";
export const DEFAULT_REGION: Region = "IN";

/* ── Shared across both markets ─────────────────────────────────────────── */
export const NAV = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact Us", href: "#contact" },
] as const;

export const LEGAL_PAGES_PUBLISHED = false;

/** Where the contact form POSTs. PENDING client decision. */
export const FORM_ENDPOINT = "";

/* ── India ──────────────────────────────────────────────────────────────── */
const IN = {
  key: "IN" as const,
  label: "India",
  short: "India",
  flag: "🇮🇳",
  currency: "₹",
  entity: "BrandUpMe LLP",
  phone: "+916351717141",
  phoneDisplay: "+91 6351 7171 41",
  email: "hello@brandupme.com",
  address: "Surat, Gujarat, India",
  path: "/",

  hero: {
    badge: "Your Growth, Our Mission",
    line1: "We Build Brands",
    line2: "That Build",
    accent: "Business",
    sub: "BrandUpMe LLP is your digital marketing & business development partner. We help businesses grow online, get more visibility and generate quality leads.",
  },

  /** Client-confirmed as real figures. */
  stats: [
    { icon: "Users", value: "250+", label: "Happy Clients" },
    { icon: "Package", value: "500+", label: "Projects Completed" },
    { icon: "TrendingUp", value: "3+", label: "Years Experience" },
    { icon: "Target", value: "98%", label: "Client Satisfaction" },
  ],

  trust: {
    headline: "Trusted By Businesses Across INDIA",
    sub: "From startups to established brands, we help everyone grow bigger.",
    /** Client-confirmed real clients. Logo files pending. */
    logos: ["Tiger", "Vandna", "Marcus", "Milkio", "Fish Bot"],
  },

  services: {
    eyebrow: "Our Services",
    headline: "Complete Digital Marketing",
    accent: "Solutions",
    sub: "From social media management to business development, we offer everything you need to grow your business online.",
    items: [
      {
        icon: "MessageSquare",
        title: "Social Media Management",
        body: "We manage your Facebook, Instagram, X (Twitter) and YouTube professionally.",
        tags: ["Facebook", "Instagram", "X", "YouTube"],
      },
      {
        icon: "Palette",
        title: "Creative Design & Video Ads",
        body: "24 posters and 4 engaging video ads every month to promote your brand.",
        tags: ["24 Posters / Month", "4 Video Ads / Month"],
      },
      {
        icon: "Megaphone",
        title: "Organic Marketing",
        body: "Post publishing, content writing, local group sharing and post engagement.",
        tags: ["Content Writing", "Local Groups"],
      },
      {
        icon: "UserSearch",
        title: "Lead Generation & Business Development",
        body: "Targeted lead generation for organic growth and business development.",
        tags: ["Organic Leads", "Growth"],
      },
      {
        icon: "MessagesSquare",
        title: "Customer Inquiry Handling",
        body: "We reply to comments and messages and collect relevant information professionally.",
        tags: ["Comments", "DMs"],
      },
      {
        icon: "BadgeCheck",
        title: "Qualified Leads Delivered",
        body: "We pass verified and interested leads directly to your business.",
        tags: ["Verified", "Interested"],
      },
    ],
  },

  process: {
    headline: "Simple Process,",
    accent: "Guaranteed Results!",
    sub: "We handle the marketing and initial customer interactions so you can focus on closing more deals.",
    steps: [
      { n: "01", icon: "MessageCircle", title: "Customer Inquiry", body: "Someone comments or sends a message with an enquiry." },
      { n: "02", icon: "Headset", title: "We Respond", body: "The BrandUpMe team replies professionally to comments and messages." },
      { n: "03", icon: "ClipboardList", title: "Collect Information", body: "We gather the relevant details and understand their requirement." },
      { n: "04", icon: "Send", title: "Pass The Lead", body: "We pass qualified lead details straight to your company." },
      { n: "05", icon: "BarChart3", title: "You Close The Deal", body: "You follow up with the lead and convert them into your customer." },
    ],
  },

  pricing: {
    eyebrow: "Choose Your Plan",
    headline: "Flexible Plans For",
    accent: "Every Business",
    note: "All plans include dedicated support and monthly performance reports.",
    features: [
      "Social Media Management (FB, Instagram, X, YouTube)",
      "24 Posters / Month",
      "4 Video Ads / Month",
      "Organic Marketing",
      "Lead Management",
    ],
    plans: [
      { badge: "Starter Plan", name: "Monthly Plan", note: "Perfect for getting started", price: "4,000", period: "/ Month", featured: false },
      { badge: "Best Value", name: "Yearly Plan (Advance)", note: "Best value for long term", price: "35,000", period: "/ Year", featured: true },
      { badge: null, name: "Yearly Plan (2 Installments)", note: "Pay in 2 easy installments", price: "40,000", period: "/ Year", featured: false },
      { badge: null, name: "Yearly Plan (3 Installments)", note: "Pay in 3 easy installments", price: "45,000", period: "/ Year", featured: false },
    ],
  },

  cta: {
    headline: "Ready to Grow Your Business?",
    sub: "Let's work together to take your brand to the next level.",
    button: "Get Started Today",
  },

  footerServices: [
    "Social Media Management",
    "Creative Design & Video Ads",
    "Organic Marketing",
    "Lead Generation",
    "Business Development",
    "Website Designing",
  ],

  whatsappText: "Hi BrandUpMe, I'd like to know more about your digital marketing services.",
};

/* ── UAE ────────────────────────────────────────────────────────────────── */
const AE = {
  key: "AE" as const,
  label: "the UAE",
  short: "Dubai",
  flag: "🇦🇪",
  currency: "AED ",
  entity: "BrandUpMe",
  // PENDING - UAE contact details still to be confirmed by the client.
  phone: "+971501234567",
  phoneDisplay: "+971 50 123 4567",
  email: "hello@brandupme.ae",
  address: "Dubai, United Arab Emirates",
  path: "/uae/",

  hero: {
    badge: "Business Partnership Program",
    line1: "Hire Your Own",
    line2: "Remote Sales",
    accent: "Representative",
    sub: "We find the right prospects, start the conversation and follow up until they are ready. You do what you do best - close the deal.",
  },

  /**
   * PENDING - no verified UAE figures supplied. These describe the offer
   * rather than claiming results, so nothing here is a fabricated metric.
   */
  stats: [
    { icon: "Users", value: "1", label: "Dedicated Representative" },
    { icon: "Package", value: "4", label: "Outreach Channels" },
    { icon: "TrendingUp", value: "Days", label: "To First Outreach" },
    { icon: "Target", value: "0", label: "Visa or Office Cost" },
  ],

  trust: {
    headline: "Built For Growing Businesses Across THE UAE",
    sub: "Real estate, F&B, manufacturing, healthcare, IT, logistics and more.",
    logos: ["Real Estate", "Restaurants", "Manufacturing", "Healthcare", "Logistics"],
  },

  services: {
    eyebrow: "What Your Representative Does",
    headline: "Everything A Sales Department Does,",
    accent: "Handled",
    sub: "Your monthly fee covers the full business development workload, performed by a person, on your behalf, every working day.",
    items: [
      {
        icon: "Headset",
        title: "Cold Calling",
        body: "Professional outbound calls that introduce your business to the decision makers who should already know you.",
        tags: ["Outbound", "Decision Makers"],
      },
      {
        icon: "MessageSquare",
        title: "WhatsApp Outreach",
        body: "The channel UAE customers actually reply on, used consistently rather than occasionally.",
        tags: ["Daily Follow-up"],
      },
      {
        icon: "Send",
        title: "Email Campaigns",
        body: "Targeted introductions written around your offer, not a generic template blast.",
        tags: ["Written For You"],
      },
      {
        icon: "UserSearch",
        title: "Prospect Research",
        body: "We build the list before we dial - the right companies, the right person, the right reason to call.",
        tags: ["Qualified Lists"],
      },
      {
        icon: "ClipboardList",
        title: "Lead Qualification",
        body: "Requirement, budget and timeline confirmed before anything reaches your desk.",
        tags: ["Need", "Budget", "Timeline"],
      },
      {
        icon: "BadgeCheck",
        title: "Appointment Setting",
        body: "Qualified meetings booked straight into your calendar, with full context attached.",
        tags: ["Booked", "Briefed"],
      },
    ],
  },

  process: {
    headline: "Successful Sales Begin With",
    accent: "Understanding",
    sub: "Before we represent your business we learn how it actually works. We present your offer only when there is a genuine fit.",
    steps: [
      { n: "01", icon: "ClipboardList", title: "Understand Your Business", body: "Your products, pricing, market and goals - before we speak to anyone." },
      { n: "02", icon: "UserSearch", title: "Find The Right Prospects", body: "We research and build the outreach list. Quality over volume." },
      { n: "03", icon: "Headset", title: "Start The Conversation", body: "Calls, WhatsApp and email, on the channel each prospect responds to." },
      { n: "04", icon: "MessagesSquare", title: "Qualify The Need", body: "Requirement, budget and timeline established before any pitch." },
      { n: "05", icon: "BarChart3", title: "You Close The Deal", body: "A briefed, qualified prospect arrives in your calendar ready to talk." },
    ],
  },

  /**
   * The UAE offer is a SINGLE plan - a monthly fee plus success-based
   * commission - not a tiered menu. Rather than invent tiers to fill the
   * four-card layout, this renders one plan card beside the commission
   * explanation. Inventing prices would be worse than adapting the layout.
   */
  pricing: {
    eyebrow: "Partnership Program",
    headline: "One Fee. One Dedicated",
    accent: "Representative",
    note: "No setup fee. No long-term lock-in. Commission applies only on completed business.",
    features: [
      "A dedicated remote sales representative",
      "Cold calling and business outreach",
      "WhatsApp and email communication",
      "Prospect research and lead qualification",
      "Appointment booking and follow-up",
    ],
    plans: [
      {
        badge: "Business Partnership",
        name: "Monthly Partnership",
        note: "Plus success-based commission, as agreed",
        price: "500",
        period: "/ Month",
        featured: true,
      },
    ],
  },

  cta: {
    headline: "Ready to Grow Your Business?",
    sub: "Focus on your business. We'll bring you the business.",
    button: "Partner With Us Today",
  },

  footerServices: [
    "Cold Calling",
    "WhatsApp Outreach",
    "Email Campaigns",
    "Prospect Research",
    "Lead Qualification",
    "Appointment Setting",
  ],

  whatsappText: "Hi BrandUpMe, I'd like to know more about the Business Partnership Program.",
};

/* ── Registry ───────────────────────────────────────────────────────────── */
export const REGIONS = { IN, AE } as const;
export type RegionContent = typeof IN | typeof AE;

export function getRegion(region: Region): RegionContent {
  return REGIONS[region];
}

export function whatsappLink(r: RegionContent) {
  return `https://wa.me/${r.phone.replace("+", "")}?text=${encodeURIComponent(r.whatsappText)}`;
}

export const FOOTER_BLURB =
  "We are your digital marketing & business development partner, helping you build your brand, get more leads and grow your business.";

export const SOCIAL = {
  facebook: "#", // PENDING
  instagram: "#", // PENDING
  x: "#", // PENDING
  youtube: "#", // PENDING
  linkedin: "#", // PENDING
} as const;
