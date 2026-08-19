/**
 * The feature keys a plan can grant.
 *
 * These are the only strings that may appear in plan_features.feature_key.
 * Values are stored as text so one column can hold booleans, counts and enums;
 * the readers below do the coercion in one place.
 *
 * Nothing in the application may branch on a plan id or a plan name. The
 * client wants to change what AED 349 includes from the admin panel, and both
 * of his PDFs say the same. Ask "does this plan grant X", never "is this the
 * 349 plan".
 */

export const FEATURE = {
  /** Appears in directory listings and search results at all. */
  LISTING: "listing",
  /** Digital Business Card and permanent passport URL. */
  PASSPORT: "passport",
  /** Services, offers, achievements and timeline blocks on the profile. */
  RICH_PROFILE: "rich_profile",
  /** Visitors can see phone, email, website and address in full. */
  CONTACT_VISIBLE: "contact_visible",
  /** Visitors get a tap-to-chat WhatsApp button. */
  WHATSAPP_VISIBLE: "whatsapp_visible",
  /** Visitors can see the business's social profile links. */
  SOCIAL_VISIBLE: "social_visible",
  /**
   * How the business may read the contact details on its own leads:
   *   none      names only, everything else masked
   *   limited   a capped number of unlocks per month, see LEAD_UNLOCK_QUOTA
   *   full      every lead, always
   */
  LEAD_ACCESS: "lead_access",
  /** Monthly unlock allowance when LEAD_ACCESS is "limited". */
  LEAD_UNLOCK_QUOTA: "lead_unlock_quota",
  /** Eligible for the Verified badge. Admin verification is also required. */
  VERIFIED_BADGE: "verified_badge",
  /** Receives leads BrandUpMe routes on from other enquiries. */
  LEAD_GENERATION: "lead_generation",
  /** Ranks above non-priority listings on category pages. */
  PRIORITY_LISTING: "priority_listing",
  /** Included creative output, recorded for the dashboard. */
  POSTERS_PER_MONTH: "posters_per_month",
  VIDEOS_PER_MONTH: "videos_per_month",
  /** Business can see its own analytics. */
  ANALYTICS: "analytics",
  /** Number of gallery images allowed on the profile. */
  IMAGE_QUOTA: "image_quota",
} as const;

export type FeatureKey = (typeof FEATURE)[keyof typeof FEATURE];

export type LeadAccess = "none" | "limited" | "full";

/** Resolved plan_features rows for one business. */
export type FeatureMap = Readonly<Record<string, string>>;

/**
 * What an unsubscribed or expired business gets.
 *
 * Deliberately not empty. The client's PDF is explicit that expiry must not
 * delete anything: the listing and the passport survive, only the paid
 * visibility goes. A business whose card stops resolving would take its
 * printed QR codes down with it.
 */
export const EXPIRED_FEATURES: FeatureMap = Object.freeze({
  [FEATURE.LISTING]: "true",
  [FEATURE.PASSPORT]: "true",
  [FEATURE.RICH_PROFILE]: "true",
  [FEATURE.CONTACT_VISIBLE]: "false",
  [FEATURE.WHATSAPP_VISIBLE]: "false",
  [FEATURE.SOCIAL_VISIBLE]: "false",
  [FEATURE.LEAD_ACCESS]: "none",
  [FEATURE.VERIFIED_BADGE]: "false",
  [FEATURE.LEAD_GENERATION]: "false",
  [FEATURE.PRIORITY_LISTING]: "false",
  [FEATURE.ANALYTICS]: "false",
  [FEATURE.IMAGE_QUOTA]: "3",
});

export function can(features: FeatureMap, key: FeatureKey): boolean {
  return features[key] === "true";
}

export function amount(features: FeatureMap, key: FeatureKey): number {
  const raw = features[key];
  if (raw === undefined) return 0;
  if (raw === "unlimited") return Number.POSITIVE_INFINITY;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : 0;
}

export function leadAccess(features: FeatureMap): LeadAccess {
  const raw = features[FEATURE.LEAD_ACCESS];
  return raw === "full" || raw === "limited" ? raw : "none";
}
