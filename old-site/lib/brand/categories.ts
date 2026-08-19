/**
 * Business categories and their sub-categories.
 *
 * Transcribed from the client's Categories page mockup, including the company
 * counts printed on each tile. Sub-categories matter beyond navigation: the
 * business registration form asks for category *and* sub-category, and the
 * Banner Advertising product sells a dedicated sub-category page placement.
 *
 * Mock data for the prototype. The real portal reads these from the existing
 * `categories` table, which is self-referencing via `parentId` and already
 * country-scoped and translation-ready — see lib/db/schema/core.ts. Shape is
 * kept close to that table so the swap is a query change.
 */

export type DirectoryCategory = {
  slug: string;
  name: string;
  /** lucide icon name, resolved by components/site/category-icon.tsx. */
  icon: string;
  count: number;
  /** Tailwind classes for the tile's icon chip. */
  chip: string;
  subcategories: string[];
};

export const CATEGORIES: DirectoryCategory[] = [
  {
    slug: "business-setup", name: "Business Setup Companies", icon: "briefcase", count: 1245, chip: "bg-iris-100 text-iris-600",
    subcategories: ["Mainland Company Setup", "Free Zone Company Setup", "Offshore Company Setup", "Trade Licence Renewal", "PRO Services", "Business Consultancy"],
  },
  {
    slug: "cleaning-services", name: "Cleaning Services", icon: "sparkles", count: 2340, chip: "bg-sky-100 text-sky-600",
    subcategories: ["Home Cleaning", "Office Cleaning", "Deep Cleaning", "Pest Control", "Move In/Move Out", "Carpet Cleaning", "Window Cleaning"],
  },
  {
    slug: "travel-tourism", name: "Travel & Tourism Companies", icon: "plane", count: 1876, chip: "bg-cyan-100 text-cyan-600",
    subcategories: ["Holiday Packages", "Flight Booking", "Visa Services", "Desert Safari", "Cruise Booking", "Corporate Travel"],
  },
  {
    slug: "hotels-hospitality", name: "Hotels & Hospitality", icon: "hotel", count: 1125, chip: "bg-amber-100 text-amber-600",
    subcategories: ["Hotels", "Hotel Apartments", "Resorts", "Guest Houses", "Banquet Halls", "Hospitality Supplies"],
  },
  {
    slug: "manufacturing", name: "Manufacturing Companies", icon: "factory", count: 2056, chip: "bg-violet-100 text-violet-600",
    subcategories: ["Food Manufacturing", "Plastic Products", "Metal Fabrication", "Packaging", "Chemicals", "Furniture Manufacturing"],
  },
  {
    slug: "trading-import-export", name: "Trading & Import Export", icon: "shopping-cart", count: 2342, chip: "bg-rose-100 text-rose-500",
    subcategories: ["General Trading", "Foodstuff Trading", "Electronics Trading", "Building Materials Trading", "Import & Export", "Wholesale Suppliers"],
  },
  {
    slug: "garments-textiles", name: "Garments & Textiles", icon: "shirt", count: 1245, chip: "bg-emerald-100 text-emerald-600",
    subcategories: ["Readymade Garments", "Textile Trading", "Uniforms & Workwear", "Tailoring Services", "Embroidery & Printing", "Fabric Suppliers"],
  },
  {
    slug: "movers-packers", name: "Movers & Packers", icon: "truck", count: 856, chip: "bg-orange-100 text-orange-600",
    subcategories: ["House Moving", "Office Relocation", "Furniture Storage", "International Moving", "Packing Services", "Furniture Assembly"],
  },
  {
    slug: "hr-recruitment", name: "HR & Recruitment Consultancy", icon: "users", count: 1038, chip: "bg-pink-100 text-pink-600",
    subcategories: ["Executive Search", "Staffing & Outsourcing", "Payroll Services", "PRO & Visa Support", "HR Consultancy", "Training & Development"],
  },
  {
    slug: "it-services", name: "IT Services & Software", icon: "laptop", count: 2367, chip: "bg-blue-100 text-blue-600",
    subcategories: ["Web Development", "Mobile App Development", "IT Support & AMC", "Cyber Security", "ERP & CRM Software", "Cloud Services"],
  },
  {
    slug: "hardware-building", name: "Hardware & Building Materials", icon: "wrench", count: 1245, chip: "bg-teal-100 text-teal-600",
    subcategories: ["Cement & Concrete", "Steel & Metals", "Paints & Coatings", "Sanitary Ware", "Electrical Materials", "Tools & Equipment"],
  },
  {
    slug: "auto-parts", name: "Auto Parts & Accessories", icon: "car", count: 1098, chip: "bg-red-100 text-red-500",
    subcategories: ["Spare Parts", "Tyres & Batteries", "Car Accessories", "Lubricants & Oils", "Auto Electricals", "Body Parts"],
  },
  {
    slug: "car-rental", name: "Car Rental Services", icon: "car-front", count: 752, chip: "bg-indigo-100 text-indigo-600",
    subcategories: ["Daily Car Rental", "Monthly Car Rental", "Luxury Car Rental", "Chauffeur Services", "Bus & Van Rental", "Airport Transfers"],
  },
  {
    slug: "documents-pro", name: "Documents Clearing & PRO Services", icon: "file-text", count: 1562, chip: "bg-rose-100 text-rose-500",
    subcategories: ["Visa Processing", "Emirates ID Services", "Attestation Services", "Typing Services", "Labour Card Services", "Document Translation"],
  },
  {
    slug: "real-estate", name: "Real Estate Companies", icon: "building-2", count: 2145, chip: "bg-sky-100 text-sky-600",
    subcategories: ["Residential Sales", "Residential Rentals", "Commercial Property", "Property Management", "Off-Plan Projects", "Property Valuation"],
  },
  {
    slug: "jewellery-gold", name: "Jewellery & Gold Trading", icon: "gem", count: 874, chip: "bg-amber-100 text-amber-600",
    subcategories: ["Gold Jewellery", "Diamond Jewellery", "Precious Stones", "Watches", "Custom Jewellery", "Gold Trading"],
  },
  {
    slug: "restaurants-catering", name: "Restaurants & Catering", icon: "utensils", count: 1987, chip: "bg-orange-100 text-orange-600",
    subcategories: ["Restaurants", "Cafes & Bakeries", "Event Catering", "Corporate Catering", "Cloud Kitchens", "Food Delivery"],
  },
  {
    slug: "clubs-events", name: "Clubs & Event Management", icon: "music", count: 532, chip: "bg-fuchsia-100 text-fuchsia-600",
    subcategories: ["Wedding Planning", "Corporate Events", "Exhibition Stands", "Event Equipment Rental", "Entertainment & DJ", "Photography & Video"],
  },
  {
    slug: "consultancy", name: "Consultancy Services", icon: "users-round", count: 1245, chip: "bg-emerald-100 text-emerald-600",
    subcategories: ["Management Consultancy", "Legal Consultancy", "Marketing Consultancy", "Engineering Consultancy", "Feasibility Studies", "ISO Certification"],
  },
  {
    slug: "healthcare", name: "Healthcare & Medical Services", icon: "heart-pulse", count: 1987, chip: "bg-red-100 text-red-500",
    subcategories: ["Clinics", "Dental Care", "Diagnostic Labs", "Home Nursing", "Physiotherapy", "Medical Equipment"],
  },
  {
    slug: "accounting-tax", name: "Accounting & Tax Services", icon: "calculator", count: 1453, chip: "bg-blue-100 text-blue-600",
    subcategories: ["Bookkeeping", "VAT Registration & Filing", "Corporate Tax", "Auditing", "Payroll Accounting", "Financial Advisory"],
  },
  {
    slug: "education-training", name: "Education & Training Institutes", icon: "graduation-cap", count: 856, chip: "bg-violet-100 text-violet-600",
    subcategories: ["Professional Training", "Language Courses", "IT & Software Training", "Nurseries & Schools", "Tuition Centres", "Driving Schools"],
  },
  {
    slug: "other", name: "Other Business Categories", icon: "ellipsis", count: 1245, chip: "bg-slate-100 text-slate-3",
    subcategories: ["Advertising & Printing", "Security Services", "Facility Management", "Landscaping", "Waste Management", "General Services"],
  },
];

/** The seven emirates, used by every location control in the portal. */
export const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Fujairah",
  "Ras Al Khaimah",
] as const;

/* ── Lookup helpers ───────────────────────────────────────────────────── */

/** "Move In/Move Out" -> "move-in-move-out". Mirrors the DB's slug column. */
export function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Resolves a sub-category slug back to its printed name. */
export function findSubcategory(category: DirectoryCategory, subSlug: string) {
  return category.subcategories.find((s) => toSlug(s) === subSlug);
}

/** Every category/sub-category pair, for generateStaticParams. */
export function allSubcategoryParams() {
  return CATEGORIES.flatMap((c) =>
    c.subcategories.map((s) => ({ slug: c.slug, sub: toSlug(s) })),
  );
}
