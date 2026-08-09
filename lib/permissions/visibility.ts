import {
  FEATURE,
  type FeatureMap,
  can,
  leadAccess,
} from "./features";

/**
 * Field-level masking.
 *
 * THE RULE, from both of the client's PDFs and repeated as "critical": a value
 * the viewer is not entitled to must never leave the server. Not sent and
 * hidden with CSS, not sent and skipped by the component - not sent at all.
 * The locked contact detail *is* the product; anyone who can read it from a
 * network response has taken the thing being sold.
 *
 * So these helpers return a discriminated union. When `visible` is false there
 * is no `value` property to leak, and TypeScript will not let a caller read
 * one. The mask is generated from the real value's shape but contains none of
 * its digits or characters beyond what a person would need to recognise their
 * own number.
 */

export type Masked =
  | { visible: true; value: string }
  | { visible: false; masked: string };

const HIDDEN: Masked = { visible: false, masked: "" };

/** "+971501234567" -> "+971 5X XXX XXXX" */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return "•••• ••••";
  const cc = phone.trim().startsWith("+") ? `+${digits.slice(0, 3)}` : "";
  return `${cc} 5X XXX XXXX`.trim();
}

/** "info@company.com" -> "in*****@company.com" */
export function maskEmail(email: string | null | undefined): string {
  if (!email) return "";
  const at = email.indexOf("@");
  if (at < 1) return "•••••";
  const head = email.slice(0, Math.min(2, at));
  return `${head}*****${email.slice(at)}`;
}

/** "https://acme.ae/about" -> "acme••••.ae" is misleading; hide it instead. */
export function maskWebsite(): string {
  return "Available with upgraded plan";
}

export function maskName(name: string | null | undefined): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts
    .map((p, i) => (i === 0 ? p : `${p[0]}${"•".repeat(Math.max(p.length - 1, 1))}`))
    .join(" ");
}

function field(
  allowed: boolean,
  value: string | null | undefined,
  mask: (v: string | null | undefined) => string,
): Masked {
  if (!value) return HIDDEN;
  return allowed ? { visible: true, value } : { visible: false, masked: mask(value) };
}

/* ── Public business contact ────────────────────────────────────────────── */

export type ContactInput = {
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  xUrl?: string | null;
  youtubeUrl?: string | null;
};

export type PublicContact = {
  phone: Masked;
  whatsapp: Masked;
  email: Masked;
  website: Masked;
  /** Address stays public on every plan - the client's card spec says so, and
      a directory whose listings have no location is not a directory. */
  address: string | null;
  social: {
    facebook: Masked;
    instagram: Masked;
    linkedin: Masked;
    x: Masked;
    youtube: Masked;
  };
  /** True when at least one field is withheld, so the UI can show an upgrade
      prompt without inspecting each field. */
  hasLockedFields: boolean;
};

/**
 * Build the contact block a visitor is allowed to receive.
 *
 * Call this before the data reaches a component. Never pass a raw
 * business_contacts row into JSX.
 */
export function publicContact(
  contact: ContactInput | null | undefined,
  features: FeatureMap,
): PublicContact {
  const c = contact ?? {};
  const showContact = can(features, FEATURE.CONTACT_VISIBLE);
  const showWhatsapp = showContact && can(features, FEATURE.WHATSAPP_VISIBLE);
  const showSocial = can(features, FEATURE.SOCIAL_VISIBLE);

  const social = {
    facebook: field(showSocial, c.facebookUrl, () => "Locked"),
    instagram: field(showSocial, c.instagramUrl, () => "Locked"),
    linkedin: field(showSocial, c.linkedinUrl, () => "Locked"),
    x: field(showSocial, c.xUrl, () => "Locked"),
    youtube: field(showSocial, c.youtubeUrl, () => "Locked"),
  };

  const out: PublicContact = {
    phone: field(showContact, c.phone, maskPhone),
    whatsapp: field(showWhatsapp, c.whatsapp, maskPhone),
    email: field(showContact, c.email, maskEmail),
    website: field(showContact, c.website, maskWebsite),
    address: c.address ?? null,
    social,
    hasLockedFields: false,
  };

  out.hasLockedFields = [
    out.phone,
    out.whatsapp,
    out.email,
    out.website,
    ...Object.values(social),
  ].some((f) => !f.visible && f.masked !== "");

  return out;
}

/* ── Lead contact, seen by the business ─────────────────────────────────── */

export type LeadContactInput = {
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  customerCompany?: string | null;
};

export type PublicLead = {
  name: Masked;
  phone: Masked;
  email: Masked;
  company: string | null;
  locked: boolean;
  /** Present when the plan caps unlocks, so the dashboard can show "3 of 10". */
  quota: { used: number; total: number } | null;
};

/**
 * What a business may read on one of its own leads.
 *
 * `alreadyUnlocked` is the recorded fact that this business has previously
 * spent an unlock on this lead. It wins over the current plan on purpose: a
 * business that paid to see a lead does not lose it by later downgrading.
 */
export function leadForBusiness(
  lead: LeadContactInput,
  features: FeatureMap,
  opts: { alreadyUnlocked?: boolean; quotaUsed?: number } = {},
): PublicLead {
  const access = leadAccess(features);
  const unlocked = opts.alreadyUnlocked === true || access === "full";

  const quota =
    access === "limited"
      ? {
          used: opts.quotaUsed ?? 0,
          total: Number.parseInt(features[FEATURE.LEAD_UNLOCK_QUOTA] ?? "0", 10) || 0,
        }
      : null;

  return {
    // The customer's name is always shown - a business needs to know a lead
    // exists and who it is broadly from, or the upgrade prompt is meaningless.
    name: unlocked
      ? { visible: true, value: lead.customerName }
      : { visible: false, masked: maskName(lead.customerName) },
    phone: field(unlocked, lead.customerPhone, maskPhone),
    email: field(unlocked, lead.customerEmail, maskEmail),
    company: lead.customerCompany ?? null,
    locked: !unlocked,
    quota,
  };
}

/**
 * Whether a business may spend an unlock on a lead right now.
 * Returns the reason when it may not, so the UI can say why.
 */
export function canUnlockLead(
  features: FeatureMap,
  quotaUsed: number,
): { allowed: true } | { allowed: false; reason: "plan" | "quota" } {
  const access = leadAccess(features);
  if (access === "full") return { allowed: true };
  if (access === "none") return { allowed: false, reason: "plan" };

  const total =
    Number.parseInt(features[FEATURE.LEAD_UNLOCK_QUOTA] ?? "0", 10) || 0;
  return quotaUsed < total
    ? { allowed: true }
    : { allowed: false, reason: "quota" };
}
