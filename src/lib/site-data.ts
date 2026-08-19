import {
  Boxes,
  Home as HomeIcon,
  Monitor,
  Rocket,
  HardHat,
  HeartPulse,
  Grid3x3,
  Tag,
  Search,
  Users,
  MapPin,
  Share2,
  ShoppingBag,
  Handshake,
  Star,
  MessageCircle,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories/main", hasDropdown: true },
  { label: "Businesses", href: "/#businesses" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Partners", href: "/partners" },
  { label: "Influencers", href: "/influencers" },
  { label: "Resources", href: "#", hasDropdown: true },
];

export const popularSearches = [
  "Business Setup",
  "Real Estate",
  "IT Services",
  "Marketing",
  "Construction",
  "Health Care",
];

export type Category = {
  name: string;
  icon: LucideIcon;
  count: string;
};

export const categories: Category[] = [
  { name: "Business Setup", icon: Boxes, count: "1,200+ Businesses" },
  { name: "Real Estate", icon: HomeIcon, count: "1,600+ Businesses" },
  { name: "IT Services", icon: Monitor, count: "1,100+ Businesses" },
  { name: "Marketing", icon: Rocket, count: "900+ Businesses" },
  { name: "Construction", icon: HardHat, count: "870+ Businesses" },
  { name: "Health Care", icon: HeartPulse, count: "760+ Businesses" },
  { name: "More Categories", icon: Grid3x3, count: "250+ Categories" },
];

export const stats = [
  { value: "10,000+", label: "Verified Businesses", icon: Boxes },
  { value: "250+", label: "Business Categories", icon: Tag },
  { value: "500K+", label: "Monthly Searches", icon: Search },
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "7", label: "UAE Emirates Covered", icon: MapPin },
];

export type EcosystemRole = {
  name: string;
  benefit: string;
  icon: LucideIcon;
};

// Arranged clockwise from 12 o'clock, matching the reference wheel.
export const ecosystemRoles: EcosystemRole[] = [
  { name: "Business Owner", benefit: "Get Visibility & Leads", icon: ShoppingBag },
  { name: "Promoter", benefit: "Promote & Earn Rewards", icon: Share2 },
  { name: "Business Referral Partner", benefit: "Connect Businesses & Earn", icon: Handshake },
  { name: "Influencer", benefit: "Connect & Create Impact", icon: Star },
  { name: "Category Partner", benefit: "Build Category & Earn", icon: Tag },
  { name: "Customer", benefit: "Discover & Earn Cashback", icon: Users },
];

export type Step = {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const steps: Step[] = [
  { step: 1, title: "Discover", description: "Find and explore verified businesses easily", icon: Search },
  { step: 2, title: "Connect", description: "Send inquiries & start meaningful conversations", icon: MessageCircle },
  { step: 3, title: "Collaborate", description: "Work with partners, influencers & businesses", icon: Handshake },
  { step: 4, title: "Grow", description: "Generate leads, sales & expand your reach", icon: TrendingUp },
  { step: 5, title: "Succeed", description: "Build long-term success in UAE & beyond", icon: Trophy },
];

export type FeaturedBusiness = {
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  image: string;
};

export const featuredBusinesses: FeaturedBusiness[] = [
  {
    name: "ABC Business Setup",
    category: "Business Setup",
    rating: 4.9,
    reviews: 100,
    location: "Dubai, UAE",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "XYZ Real Estate",
    category: "Real Estate",
    rating: 4.7,
    reviews: 200,
    location: "Dubai, UAE",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Tech Solutions LLC",
    category: "IT Services",
    rating: 4.9,
    reviews: 190,
    location: "Sharjah, UAE",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Brand Makers",
    category: "Marketing",
    rating: 4.8,
    reviews: 64,
    location: "Abu Dhabi, UAE",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "BuildWell Contracting",
    category: "Construction",
    rating: 4.3,
    reviews: 75,
    location: "Al Ain, UAE",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
  },
];

export const ownerChecklist = [
  "Premium Business Listing",
  "SEO Optimized Business Page",
  "Digital Business Card",
  "Lead Generation Tools",
  "Performance Insights",
];

export const joinChecklist = [
  "Expand Your Reach",
  "Connect With Right People",
  "Create More Opportunities",
  "Earn Rewards & Grow Together",
];

export const avatarImages = [
  "/avatar/standing.webp",
  "/avatar/seated.webp",
  "/avatar/laptop.webp",
  "/avatar/tablet.webp",
  "/avatar/arms.webp",
];

export const footerColumns = [
  {
    heading: "Quick Links",
    links: ["Home", "Categories", "Businesses", "Opportunities", "How It Works"],
  },
  {
    heading: "Ecosystem",
    links: ["Business Owner", "Promoter", "Customer", "Category Referral Partner", "Business Referral Partner", "Influencer"],
  },
  {
    heading: "Resources",
    links: ["Blog", "Guides", "Help Center", "Success Stories", "Contact Us"],
  },
];
