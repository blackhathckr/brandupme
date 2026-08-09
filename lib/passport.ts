import type { PublicContact } from "@/lib/permissions/visibility";

/**
 * Business Passport helpers.
 *
 * The passport is the business's permanent public identity. Its number and
 * slug are issued once and never change, because they end up printed on
 * brochures, packaging and exhibition stands. A rename of the business must not
 * break a QR code someone printed last year, so the passport slug is generated
 * independently of the business slug and never regenerated.
 */

const SITE = "https://brandupme.ae";

/** BUM-AE-000123. Zero-padded so it reads as an identifier, not a row count. */
export function passportNumber(countryCode: string, businessId: number): string {
  return `BUM-${countryCode.toUpperCase()}-${String(businessId).padStart(6, "0")}`;
}

export function passportUrl(slug: string): string {
  return `${SITE}/p/${slug}`;
}

/**
 * Slug for the passport URL.
 *
 * Takes the business name at the moment of issue and appends a short random
 * suffix, so two "Al Noor Cleaning LLC" registrations do not collide and a
 * caller cannot enumerate businesses by guessing.
 */
export function passportSlug(businessName: string, entropy?: string): string {
  const base = businessName
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  const suffix =
    entropy ??
    Array.from(crypto.getRandomValues(new Uint8Array(3)))
      .map((b) => b.toString(36))
      .join("")
      .slice(0, 4);

  return `${base || "business"}-${suffix}`;
}

/* ── vCard ──────────────────────────────────────────────────────────────── */

export type VCardInput = {
  name: string;
  tagline?: string | null;
  contact: PublicContact;
};

/**
 * Build a .vcf from the fields the viewer is allowed to see.
 *
 * A locked field must not appear in the file. The client's PDF is explicit:
 * "if a field is not permitted by the plan, do not place that field into the
 * generated contact file." Saving the contact must not be a way around the
 * paywall.
 */
export function buildVCard(input: VCardInput): string {
  const { name, tagline, contact } = input;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(name)}`,
    `ORG:${escapeVCard(name)}`,
  ];

  if (tagline) lines.push(`TITLE:${escapeVCard(tagline)}`);
  if (contact.phone.visible) lines.push(`TEL;TYPE=WORK,VOICE:${contact.phone.value}`);
  if (contact.whatsapp.visible) lines.push(`TEL;TYPE=CELL:${contact.whatsapp.value}`);
  if (contact.email.visible) lines.push(`EMAIL;TYPE=WORK:${contact.email.value}`);
  if (contact.website.visible) lines.push(`URL:${contact.website.value}`);
  if (contact.address) lines.push(`ADR;TYPE=WORK:;;${escapeVCard(contact.address)};;;;`);

  for (const [key, field] of Object.entries(contact.social)) {
    if (field.visible) lines.push(`X-SOCIALPROFILE;TYPE=${key}:${field.value}`);
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function escapeVCard(v: string): string {
  return v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/* ── Lead reference ─────────────────────────────────────────────────────── */

/** LEAD-AE-7F3K2A. Quotable by a customer chasing their enquiry. */
export function leadReference(countryCode: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1
  const rand = crypto.getRandomValues(new Uint8Array(6));
  const body = Array.from(rand, (b) => chars[b % chars.length]).join("");
  return `LEAD-${countryCode.toUpperCase()}-${body}`;
}
