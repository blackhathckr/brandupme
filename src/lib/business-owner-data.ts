import {
  Award,
  Building2,
  CreditCard,
  Image as ImageIcon,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";

export const SIGNUP_STEPS: { n: number; title: string; subtitle: string; icon: LucideIcon }[] = [
  { n: 1, title: "Personal Information", subtitle: "Enter your personal details", icon: User },
  { n: 2, title: "Business Information", subtitle: "Add your business details", icon: Building2 },
  { n: 3, title: "Business Profile", subtitle: "Add images and social links", icon: ImageIcon },
  { n: 4, title: "Verification", subtitle: "Trade license & verification", icon: ShieldCheck },
  { n: 5, title: "Plan Selection", subtitle: "Choose your plan", icon: CreditCard },
];

export type Plan = {
  key: string;
  name: string;
  icon: LucideIcon;
  tone: string;
  price: number;
  period: "Day" | "Month";
  tagline: string;
  features: string[];
  popular?: boolean;
  maxExposure?: boolean;
  durations?: { label: string; days: number; price: number }[];
  avatar: string;
};

export const PLANS: Plan[] = [
  {
    key: "tester",
    name: "Tester Plan",
    icon: Award,
    tone: "green",
    price: 10,
    period: "Day",
    tagline: "Try BrandUpMe. Build your presence. Start growing.",
    features: [
      "Business Listing",
      "SEO-Friendly Business Page",
      "Digital Business Card",
      "Customer Inquiry Access",
      "Basic Analytics",
      "Refer & Earn",
      "Email Support",
    ],
    avatar: "/avatar/standing.webp",
    durations: [
      { label: "10 Days", days: 10, price: 100 },
      { label: "15 Days", days: 15, price: 150 },
      { label: "30 Days", days: 30, price: 300 },
    ],
  },
  {
    key: "basic",
    name: "Basic Plan",
    icon: Award,
    tone: "blue",
    price: 105,
    period: "Month",
    tagline: "Build your presence & get noticed.",
    features: [
      "All in Tester Plan",
      "Content Creation",
      "Link Building",
      "Social Media Links",
      "Business Analytics",
      "Priority Email Support",
    ],
    avatar: "/avatar/arms.webp",
  },
  {
    key: "standard",
    name: "Standard Plan",
    icon: Award,
    tone: "sky",
    price: 149,
    period: "Month",
    tagline: "Grow your visibility & get more inquiries.",
    features: [
      "All in Basic Plan",
      "10 Promotional Posters",
      "1 Video Ad (Per Month)",
      "Local Group Sharing",
      "Lead Generation",
      "Standard Support",
    ],
    avatar: "/avatar/tablet.webp",
  },
  {
    key: "professional",
    name: "Professional Plan",
    icon: Award,
    tone: "purple",
    price: 199,
    period: "Month",
    tagline: "Get more leads & build trust.",
    features: [
      "All in Standard Plan",
      "Verification Badge (Bronze)",
      "2 Video Ads (Per Month)",
      "Advanced Lead Management",
      "Business Analytics (Standard)",
      "Priority Support",
    ],
    avatar: "/avatar/seated.webp",
  },
  {
    key: "business",
    name: "Business Plan",
    icon: Award,
    tone: "orange",
    price: 349,
    period: "Month",
    tagline: "Boost credibility & business growth.",
    popular: true,
    features: [
      "All in Professional Plan",
      "Verification Badge (Silver)",
      "10 Promotional Posters",
      "2 Video Ads (Per Month)",
      "Lead Conversion Tools",
      "Advanced Analytics",
      "Priority Support",
    ],
    avatar: "/avatar/laptop.webp",
  },
  {
    key: "premium",
    name: "Premium Plan",
    icon: Award,
    tone: "teal",
    price: 500,
    period: "Month",
    tagline: "Premium features for serious businesses.",
    features: [
      "All in Business Plan",
      "Verification Badge (Gold)",
      "20 Promotional Posters",
      "3 Video Ads (Per Month)",
      "Video Meeting System",
      "Advanced SEO & Visibility",
      "24/7 Priority Support",
    ],
    avatar: "/avatar/tablet.webp",
  },
  {
    key: "elite",
    name: "Elite Plan",
    icon: Award,
    tone: "dark",
    price: 1000,
    period: "Month",
    tagline: "Ultimate growth with maximum exposure.",
    maxExposure: true,
    features: [
      "All in Premium Plan",
      "Verification Badge (Platinum)",
      "24 Promotional Posters",
      "4 Video Ads (Per Month)",
      "Multi-Business Management",
      "Premium Analytics",
      "24/7 Dedicated Support",
    ],
    avatar: "/avatar/standing.webp",
  },
];

export const PROFILE_EDIT_STEPS = [
  { n: 1, title: "Business Information", slug: "business-information" },
  { n: 2, title: "Business Address", slug: "business-address" },
  { n: 3, title: "Business Profile", slug: "business-profile" },
  { n: 4, title: "Website & Social Links", slug: "website-social-links" },
  { n: 5, title: "Business Images", slug: "business-images" },
  { n: 6, title: "Business Documents", slug: "business-documents" },
];

export const PAYMENT_METHODS = [
  { key: "card", label: "Card Payment", sub: "Visa, Mastercard, etc." },
  { key: "apple", label: "Apple Pay", sub: "Fast & Secure" },
  { key: "google", label: "Google Pay", sub: "Fast & Secure" },
  { key: "bank", label: "Bank Transfer", sub: "UAE Banks" },
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]["key"];
