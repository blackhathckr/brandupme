import {
  BarChart3,
  Cog,
  FileEdit,
  Mail,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  PlayCircle,
  Search,
  Share2,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  name: string;
  count: number;
  description: string;
  category: string;
  icon: LucideIcon;
};

// Sub-services under "Marketing" — the dataset behind /categories/search.
// 28 items so the default "digital marketing" query truthfully returns
// "28 results", matching the reference screen.
export const services: Service[] = [
  { name: "Digital Marketing Services", count: 1250, description: "Complete digital marketing solutions for your business", category: "Marketing", icon: Megaphone },
  { name: "SEO Services", count: 980, description: "Search engine optimization services to rank higher", category: "Marketing", icon: Search },
  { name: "Social Media Marketing", count: 1120, description: "Social media management and marketing services", category: "Marketing", icon: Share2 },
  { name: "PPC Advertising", count: 760, description: "Pay-per-click advertising campaign management", category: "Marketing", icon: MousePointerClick },
  { name: "Content Marketing", count: 540, description: "Content strategy and marketing services", category: "Marketing", icon: FileEdit },
  { name: "Email Marketing", count: 430, description: "Email campaign management and automation", category: "Marketing", icon: Mail },
  { name: "Online Reputation", count: 320, description: "Online reputation management and monitoring", category: "Marketing", icon: ShieldCheck },
  { name: "Influencer Marketing", count: 280, description: "Influencer outreach and marketing solutions", category: "Marketing", icon: Star },
  { name: "Marketing Automation", count: 260, description: "Marketing automation and CRM solutions", category: "Marketing", icon: Cog },
  { name: "Video Marketing", count: 250, description: "Video production and marketing services", category: "Marketing", icon: PlayCircle },
  { name: "Analytics & Reporting", count: 220, description: "Web analytics and performance reporting services", category: "Marketing", icon: BarChart3 },
  { name: "Conversion Optimization", count: 210, description: "Improve conversion rates and ROI optimization", category: "Marketing", icon: Target },
  { name: "Brand Strategy", count: 300, description: "Brand positioning and identity strategy services", category: "Marketing", icon: Megaphone },
  { name: "Affiliate Marketing", count: 190, description: "Affiliate program setup and management", category: "Marketing", icon: Share2 },
  { name: "Marketing Consultancy", count: 175, description: "Strategic marketing consultancy and advisory", category: "Marketing", icon: Users },
  { name: "Growth Hacking", count: 160, description: "Rapid growth experimentation and marketing tactics", category: "Marketing", icon: TrendingUp },
  { name: "Public Relations", count: 340, description: "PR strategy, media outreach and communications", category: "Marketing", icon: Megaphone },
  { name: "Copywriting Services", count: 200, description: "Marketing copywriting for ads, web and campaigns", category: "Marketing", icon: FileEdit },
  { name: "Market Research", count: 250, description: "Consumer and market research services", category: "Marketing", icon: Search },
  { name: "Lead Generation", count: 410, description: "B2B and B2C lead generation services", category: "Marketing", icon: Target },
  { name: "WhatsApp Marketing", count: 180, description: "WhatsApp business marketing and broadcast campaigns", category: "Marketing", icon: MessageCircle },
  { name: "SMS Marketing", count: 140, description: "SMS campaign management and automation", category: "Marketing", icon: Mail },
  { name: "Podcast Marketing", count: 90, description: "Podcast production and marketing services", category: "Marketing", icon: PlayCircle },
  { name: "Event Marketing", count: 170, description: "Event promotion and marketing services", category: "Marketing", icon: Megaphone },
  { name: "Marketing Strategy Consulting", count: 210, description: "Full-funnel marketing strategy consulting", category: "Marketing", icon: Users },
  { name: "Performance Marketing", count: 260, description: "Data-driven performance marketing campaigns", category: "Marketing", icon: BarChart3 },
  { name: "Local SEO Services", count: 220, description: "Local search optimization for UAE businesses", category: "Marketing", icon: Search },
  { name: "Marketing Analytics", count: 150, description: "Marketing data analytics and dashboards", category: "Marketing", icon: BarChart3 },
];

export const categoryChecklist = [
  "Marketing",
  "IT Services",
  "Business Setup",
  "Design & Printing",
  "Media & Advertising",
  "Real Estate",
  "Health Care",
  "Automotive",
  "Consultancy",
  "Event Management",
];

export const businessCountRanges = [
  { label: "1000+ Businesses", min: 1000, max: Infinity },
  { label: "500 - 1000 Businesses", min: 500, max: 999 },
  { label: "250 - 500 Businesses", min: 250, max: 499 },
  { label: "100 - 250 Businesses", min: 100, max: 249 },
  { label: "Less than 100 Businesses", min: 0, max: 99 },
];
