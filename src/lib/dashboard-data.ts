import {
  BarChart3,
  Bell,
  Briefcase,
  CreditCard,
  Gift,
  Globe2,
  HelpCircle,
  Home,
  IdCard,
  Phone,
  Settings,
  ShieldQuestion,
  Target,
  Trash2,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: number;
  children?: { label: string; href: string }[];
};

export type DashboardNavGroup = {
  label?: string;
  items: DashboardNavItem[];
};

export const dashboardNav: DashboardNavGroup[] = [
  {
    items: [{ label: "Dashboard", href: "/dashboard", icon: Home }],
  },
  {
    label: "My Business",
    items: [
      {
        label: "My Profile",
        href: "/dashboard/profile",
        icon: User,
        children: [
          { label: "Personal Information", href: "/dashboard/profile#personal-information" },
          { label: "Business Information", href: "/dashboard/profile#business-information" },
          { label: "Business Address", href: "/dashboard/profile#business-address" },
          { label: "Business Profile", href: "/dashboard/profile#business-profile" },
          { label: "Website & Social Links", href: "/dashboard/profile#website-social-links" },
          { label: "Business Images", href: "/dashboard/profile#business-images" },
          { label: "Business Documents", href: "/dashboard/profile#business-documents" },
        ],
      },
      {
        label: "Website, SEO & Traffic",
        href: "/dashboard/website-seo",
        icon: Globe2,
        children: [
          { label: "Overview", href: "/dashboard/website-seo" },
          { label: "BrandUpMe Business Page", href: "/dashboard/website-seo#business-page" },
          { label: "Your Website", href: "/dashboard/website-seo#your-website" },
          { label: "SEO Performance", href: "/dashboard/website-seo#seo-performance" },
          { label: "Website Visitors", href: "/dashboard/website-seo#website-visitors" },
          { label: "Link Clicks", href: "/dashboard/website-seo#link-clicks" },
          { label: "Traffic Sources", href: "/dashboard/website-seo#traffic-sources" },
        ],
      },
      {
        label: "Digital Business Card",
        href: "/dashboard/digital-card",
        icon: IdCard,
        children: [
          { label: "My Digital Card", href: "/dashboard/digital-card" },
          { label: "Share Card", href: "/dashboard/digital-card#share-card" },
          { label: "Card Analytics", href: "/dashboard/digital-card#card-analytics" },
          { label: "Card Opens", href: "/dashboard/digital-card#card-opens" },
          { label: "Link Clicks", href: "/dashboard/digital-card#link-clicks" },
          { label: "Sharing Sources", href: "/dashboard/digital-card#sharing-sources" },
          { label: "QR Code", href: "/dashboard/digital-card#qr-code" },
        ],
      },
    ],
  },
  {
    label: "Leads & Communication",
    items: [
      { label: "Leads", href: "/dashboard/leads", icon: Target, badge: 21 },
      { label: "Video Calls", href: "/dashboard/video-calls", icon: Phone, badge: 5 },
      { label: "Deals", href: "/dashboard/deals", icon: Briefcase },
    ],
  },
  {
    label: "Analytics",
    items: [{ label: "Analytics", href: "#", icon: BarChart3 }],
  },
  {
    label: "Grow & Manage",
    items: [
      { label: "Rewards & Earn", href: "#", icon: Gift },
      { label: "Plans & Billing", href: "#", icon: CreditCard },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Account Settings", href: "#", icon: Settings },
      { label: "Delete Account", href: "#", icon: Trash2 },
    ],
  },
  {
    label: "Support & Legal",
    items: [
      { label: "Help & Support", href: "#", icon: HelpCircle },
      { label: "Terms & Conditions", href: "#", icon: ShieldQuestion },
      { label: "Privacy Policy", href: "#", icon: Bell },
    ],
  },
];

export const businessProfile = {
  name: "ABC Business",
  role: "Business Owner",
  greeting: "Good Morning, ABC Business",
  subtitle: "Welcome to your BrandUpMe Business Dashboard",
  avatar: "/avatar/seated.webp",
  notifications: 3,
};
