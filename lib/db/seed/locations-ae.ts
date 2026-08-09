/**
 * UAE location tree, exactly as the client supplied it.
 *
 * Seven emirates, each with its cities. Stored as a tree in `locations` rather
 * than emirate/city columns, so India's states and cities drop into the same
 * table later with no migration.
 */

export type EmirateSeed = { name: string; cities: string[] };

export const AE_EMIRATES: EmirateSeed[] = [
  {
    name: "Dubai",
    cities: [
      "Dubai City",
      "Jebel Ali",
      "Dubai Marina",
      "Business Bay",
      "Deira",
      "Bur Dubai",
      "Al Quoz",
      "Dubai Silicon Oasis",
      "Jumeirah",
      "Dubai Investment Park",
      "Dubai South",
    ],
  },
  {
    name: "Abu Dhabi",
    cities: [
      "Abu Dhabi City",
      "Al Ain",
      "Ruwais",
      "Mussafah",
      "Khalifa City",
      "Yas Island",
      "Saadiyat Island",
    ],
  },
  {
    name: "Sharjah",
    cities: ["Sharjah City", "Khor Fakkan", "Kalba", "Dibba Al Hisn"],
  },
  {
    name: "Ajman",
    cities: ["Ajman City", "Masfout", "Al Manama"],
  },
  {
    name: "Fujairah",
    cities: ["Fujairah City", "Dibba", "Al Bidyah"],
  },
  {
    name: "Ras Al Khaimah",
    cities: ["Ras Al Khaimah City", "Al Hamra", "Mina Al Arab"],
  },
  {
    name: "Umm Al Quwain",
    cities: ["Umm Al Quwain City", "Falaj Al Mualla"],
  },
];

/**
 * The six UAE partnership plans and what each grants.
 *
 * Feature values come from the lock/unlock table in the client's Business
 * Portal PDF. AED 349's "LIMITED" lead access is expressed as a quota, which
 * he asked to be configurable - the number here is a starting value the admin
 * panel can change without a deploy.
 *
 * A free tier is included because the client asked for "free and then upgrade".
 * It grants a listing and nothing else, which is what makes the AED 99 step up
 * worth taking.
 */
export const AE_PLAN_SEED = [
  {
    slug: "free",
    name: "Free Listing",
    priceMinor: 0,
    purpose: "Get discovered",
    sortOrder: 0,
    features: {
      listing: "true",
      passport: "true",
      rich_profile: "false",
      contact_visible: "false",
      whatsapp_visible: "false",
      social_visible: "false",
      lead_access: "none",
      verified_badge: "false",
      lead_generation: "false",
      priority_listing: "false",
      analytics: "false",
      image_quota: "1",
    },
  },
  {
    slug: "basic-listing",
    name: "Basic Listing Partner",
    priceMinor: 9900,
    purpose: "Be found by customers",
    sortOrder: 1,
    features: {
      listing: "true",
      passport: "true",
      rich_profile: "true",
      contact_visible: "false",
      whatsapp_visible: "false",
      social_visible: "false",
      lead_access: "none",
      verified_badge: "false",
      lead_generation: "false",
      priority_listing: "false",
      analytics: "true",
      image_quota: "3",
    },
  },
  {
    slug: "digital-presence",
    name: "Digital Presence Partner",
    priceMinor: 14900,
    purpose: "Build your online presence",
    sortOrder: 2,
    features: {
      listing: "true",
      passport: "true",
      rich_profile: "true",
      contact_visible: "false",
      whatsapp_visible: "false",
      social_visible: "false",
      lead_access: "none",
      verified_badge: "false",
      lead_generation: "false",
      priority_listing: "false",
      analytics: "true",
      posters_per_month: "10",
      image_quota: "3",
    },
  },
  {
    slug: "local-growth",
    name: "Local Growth Partner",
    priceMinor: 19900,
    purpose: "Reach your local market",
    sortOrder: 3,
    features: {
      listing: "true",
      passport: "true",
      rich_profile: "true",
      contact_visible: "false",
      whatsapp_visible: "false",
      social_visible: "false",
      lead_access: "none",
      verified_badge: "false",
      lead_generation: "false",
      priority_listing: "false",
      analytics: "true",
      posters_per_month: "10",
      image_quota: "3",
    },
  },
  {
    slug: "verified-brand",
    name: "Verified Brand Partner",
    priceMinor: 34900,
    purpose: "Be trusted and contactable",
    badge: "Most Trusted",
    sortOrder: 4,
    features: {
      listing: "true",
      passport: "true",
      rich_profile: "true",
      contact_visible: "true",
      whatsapp_visible: "true",
      social_visible: "true",
      lead_access: "limited",
      lead_unlock_quota: "10",
      verified_badge: "true",
      lead_generation: "false",
      priority_listing: "true",
      analytics: "true",
      posters_per_month: "10",
      image_quota: "3",
    },
  },
  {
    slug: "growth-partner",
    name: "Growth Partner",
    priceMinor: 50000,
    purpose: "Get business opportunities",
    sortOrder: 5,
    features: {
      listing: "true",
      passport: "true",
      rich_profile: "true",
      contact_visible: "true",
      whatsapp_visible: "true",
      social_visible: "true",
      lead_access: "full",
      verified_badge: "true",
      lead_generation: "true",
      priority_listing: "true",
      analytics: "true",
      posters_per_month: "10",
      image_quota: "3",
    },
  },
  {
    slug: "growth-accelerator",
    name: "Business Growth Accelerator",
    priceMinor: 100000,
    purpose: "Outsourced marketing and sales support",
    badge: "Most Popular",
    featured: true,
    sortOrder: 6,
    features: {
      listing: "true",
      passport: "true",
      rich_profile: "true",
      contact_visible: "true",
      whatsapp_visible: "true",
      social_visible: "true",
      lead_access: "full",
      verified_badge: "true",
      lead_generation: "true",
      priority_listing: "true",
      analytics: "true",
      posters_per_month: "24",
      videos_per_month: "4",
      image_quota: "6",
    },
  },
] as const;
