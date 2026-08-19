/**
 * Mock directory data, transcribed from the client's category-listing and
 * business-profile mockups down to the ratings, review counts and tag chips.
 *
 * Shape mirrors the existing `businesses` table plus its child tables, so the
 * prototype swaps to live queries without the components changing.
 */

export type BusinessCard = {
  slug: string;
  name: string;
  logoInitials: string;
  /** Tailwind classes for the placeholder logo tile. */
  logoChip: string;
  verified: boolean;
  rating: number;
  reviews: number;
  services: string[];
  area: string;
  emirate: string;
  openNow: boolean;
  summary: string;
  tags: string[];
  category: string;
};

export const BUSINESSES: BusinessCard[] = [
  {
    slug: "clean-max-cleaning-services",
    name: "Clean Max Cleaning Services LLC",
    logoInitials: "CM",
    logoChip: "bg-emerald-50 text-emerald-600",
    verified: true,
    rating: 4.8,
    reviews: 256,
    services: ["Home Cleaning", "Office Cleaning", "Deep Cleaning"],
    area: "Al Quoz",
    emirate: "Dubai",
    openNow: true,
    summary:
      "Professional cleaning services for homes, offices & commercial spaces.",
    tags: ["24/7 Service", "Online Booking", "Free Consultation", "Eco Friendly"],
    category: "cleaning-services",
  },
  {
    slug: "sparkle-way-cleaning-services",
    name: "Sparkle Way Cleaning Services",
    logoInitials: "SW",
    logoChip: "bg-sky-50 text-sky-600",
    verified: true,
    rating: 4.7,
    reviews: 198,
    services: ["Home Cleaning", "Deep Cleaning", "Pest Control"],
    area: "Dubai Marina",
    emirate: "Dubai",
    openNow: true,
    summary:
      "We provide top quality cleaning with trained staff and best equipment.",
    tags: ["Online Booking", "Offers Available", "Free Consultation"],
    category: "cleaning-services",
  },
  {
    slug: "bright-office-cleaning",
    name: "Bright Office Cleaning",
    logoInitials: "BO",
    logoChip: "bg-blue-50 text-blue-600",
    verified: true,
    rating: 4.6,
    reviews: 142,
    services: ["Office Cleaning", "Commercial Cleaning"],
    area: "Business Bay",
    emirate: "Dubai",
    openNow: true,
    summary:
      "Reliable office & commercial cleaning services tailored for your business.",
    tags: ["24/7 Service", "Online Booking", "Flexible Packages"],
    category: "cleaning-services",
  },
  {
    slug: "home-fresh-cleaning-services",
    name: "Home Fresh Cleaning Services",
    logoInitials: "HF",
    logoChip: "bg-lime-50 text-lime-700",
    verified: true,
    rating: 4.5,
    reviews: 89,
    services: ["Home Cleaning", "Deep Cleaning", "Move In/Move Out"],
    area: "Jumeirah",
    emirate: "Dubai",
    openNow: true,
    summary: "Your home deserves the best care. We make it spotless & healthy.",
    tags: ["Offers Available", "Eco Friendly", "Free Consultation"],
    category: "cleaning-services",
  },
];

/* ── The featured profile, from the business page mockup ──────────────── */

export const FEATURED_BUSINESS = {
  slug: "abc-cleaning-services",
  name: "ABC Cleaning Services LLC",
  logoInitials: "ABC",
  tagline: "Professional Cleaning Solutions",
  verified: true,
  badgeLabel: "Verified Business",
  emirate: "Dubai, UAE",
  since: 2022,
  businessId: "BUPM-82491",
  rating: 4.8,
  reviews: 56,
  headline:
    "Professional Cleaning Solutions for Homes, Offices & Commercial Spaces.",
  phone: "+971 50 123 4567",
  email: "info@abccleaning.ae",
  website: "www.abccleaning.ae",
  about:
    "ABC Cleaning Services LLC is a trusted cleaning company in Dubai offering professional cleaning solutions for homes, offices, villas, and commercial spaces. Our trained staff, eco-friendly products, and advanced equipment ensure a spotless and healthy environment.",
  facts: [
    { icon: "calendar", label: "Established Year", value: "2022" },
    { icon: "users", label: "Team Size", value: "25 - 50 Employees" },
    { icon: "globe", label: "Languages", value: "English, Arabic, Hindi" },
    { icon: "clock", label: "Working Hours", value: "Mon - Sat (8:00 AM - 6:00 PM)" },
  ],
  services: [
    { name: "Office Cleaning", body: "Professional office cleaning services.", chip: "bg-sky-50 text-sky-600" },
    { name: "Deep Cleaning", body: "Thorough deep cleaning for homes & offices.", chip: "bg-violet-50 text-violet-600" },
    { name: "Villa Cleaning", body: "Complete cleaning for villas & apartments.", chip: "bg-rose-50 text-rose-500" },
    { name: "Carpet Cleaning", body: "Expert carpet & sofa cleaning.", chip: "bg-amber-50 text-amber-600" },
    { name: "Sanitization", body: "Disinfection & sanitization services.", chip: "bg-emerald-50 text-emerald-600" },
  ],
  related: [
    "Trained & Experienced Staff",
    "Eco-friendly Cleaning Products",
    "Advanced Cleaning Equipment",
    "100% Customer Satisfaction",
  ],
  gallery: [
    "Office cleaning team at work",
    "Floor polishing in a lobby",
    "Living room deep clean",
    "Surface sanitisation close-up",
    "Window cleaning in progress",
  ],
} as const;

/** Category-page header statistics, as printed in the mockup. */
export const CATEGORY_STATS = {
  total: "1,248",
  verified: "892",
  views: "25,430",
  rating: "4.8",
} as const;
