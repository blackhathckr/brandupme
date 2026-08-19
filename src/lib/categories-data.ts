import {
  Briefcase,
  Home,
  Monitor,
  Megaphone,
  HardHat,
  HeartPulse,
  Car,
  Factory,
  UtensilsCrossed,
  Plane,
  GraduationCap,
  Landmark,
  Truck,
  Sparkles,
  Scale,
  ShoppingBag,
  ShieldCheck,
  Users,
  Palette,
  PartyPopper,
  Dumbbell,
  Sprout,
  UserPlus,
  Cog,
  Grid3x3,
  type LucideIcon,
} from "lucide-react";

export type AllCategory = {
  name: string;
  icon: LucideIcon;
  count: number;
  description: string;
};

// The exact 25-category list from the developer spec, in the same order.
export const allCategories: AllCategory[] = [
  { name: "Business Setup", icon: Briefcase, count: 1200, description: "Company formation, PRO services, licensing and business support." },
  { name: "Real Estate", icon: Home, count: 1600, description: "Property sales, rentals, real estate agents and property management." },
  { name: "IT Services", icon: Monitor, count: 1100, description: "Software development, IT consulting, support and managed services." },
  { name: "Marketing", icon: Megaphone, count: 900, description: "Digital marketing, branding, advertising and marketing solutions." },
  { name: "Construction", icon: HardHat, count: 870, description: "Building contractors, construction services and engineering." },
  { name: "Health Care", icon: HeartPulse, count: 760, description: "Hospitals, clinics, medical services and health & wellness." },
  { name: "Automotive", icon: Car, count: 650, description: "Car sales, accessories, repair, maintenance and automotive services." },
  { name: "Manufacturing", icon: Factory, count: 580, description: "Industrial manufacturing, machinery and production services." },
  { name: "Food & Beverages", icon: UtensilsCrossed, count: 540, description: "Restaurants, cafes, food suppliers and beverage companies." },
  { name: "Travel & Tourism", icon: Plane, count: 520, description: "Travel agencies, tour operators and tourism services." },
  { name: "Education", icon: GraduationCap, count: 480, description: "Schools, training institutes, e-learning and educational services." },
  { name: "Finance & Banking", icon: Landmark, count: 460, description: "Banks, financial services, investments and insurance." },
  { name: "Logistics & Transport", icon: Truck, count: 430, description: "Freight, shipping, courier and transportation services." },
  { name: "Cleaning Services", icon: Sparkles, count: 400, description: "Residential, commercial and specialized cleaning services." },
  { name: "Legal Services", icon: Scale, count: 380, description: "Law firms, legal consultants and notary services." },
  { name: "Retail & Wholesale", icon: ShoppingBag, count: 360, description: "Retail stores, wholesalers, distributors and traders." },
  { name: "Security Services", icon: ShieldCheck, count: 320, description: "Security guarding, surveillance and safety solutions." },
  { name: "Consultancy", icon: Users, count: 300, description: "Business, management and strategy consulting services." },
  { name: "Design & Printing", icon: Palette, count: 280, description: "Graphic design, printing and branding studios." },
  { name: "Event Management", icon: PartyPopper, count: 260, description: "Event planning, production and management companies." },
  { name: "Sports & Fitness", icon: Dumbbell, count: 240, description: "Gyms, fitness studios, sports clubs and coaching." },
  { name: "Agriculture", icon: Sprout, count: 230, description: "Farming, agri-trading and agricultural equipment suppliers." },
  { name: "Recruitment", icon: UserPlus, count: 220, description: "Staffing agencies, HR consultancy and recruitment services." },
  { name: "Engineering", icon: Cog, count: 210, description: "Engineering consultancy, design and technical services." },
  { name: "More Categories", icon: Grid3x3, count: 250, description: "Explore every other business category on BrandUpMe." },
];

export const totalListings = allCategories.reduce((sum, c) => sum + c.count, 0);
