import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, type Db } from "@/lib/db";
import {
  businessCategories,
  businessContacts,
  businessLocations,
  businessPassports,
  businessSubscriptions,
  businesses,
  categories,
  countries,
  locations,
  notifications,
  plans,
  roles,
  userRoles,
  users,
} from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { passportNumber, passportSlug } from "@/lib/passport";

/**
 * Business registration.
 *
 * The client's flow: a business registers, his team calls to confirm, then
 * payment is collected offline and the plan activated. So registration creates
 * everything except an active subscription - the plan is recorded as
 * pending_payment and the listing sits in `pending` until an admin publishes
 * it. Nothing a stranger submits appears on the public directory unreviewed.
 *
 * The passport is issued here, at creation, rather than on approval. It is the
 * permanent identity: issuing it once and never again is what lets a printed QR
 * code outlive plan changes, renames and lapses.
 */

export const registrationSchema = z.object({
  businessName: z.string().trim().min(2, "Enter your company name").max(160),
  categorySlug: z.string().trim().min(1, "Choose a category"),
  emirateSlug: z.string().trim().min(1, "Choose an emirate"),
  address: z.string().trim().min(4, "Enter your office address").max(400),
  website: z.string().trim().url("Enter a valid URL").max(200).optional().or(z.literal("")),

  contactName: z.string().trim().min(2, "Enter the contact person").max(120),
  designation: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().min(6, "Enter a valid mobile number").max(32),
  whatsapp: z.string().trim().max(32).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid business email").max(180),

  facebookUrl: z.string().trim().max(300).optional().or(z.literal("")),
  instagramUrl: z.string().trim().max(300).optional().or(z.literal("")),
  linkedinUrl: z.string().trim().max(300).optional().or(z.literal("")),
  xUrl: z.string().trim().max(300).optional().or(z.literal("")),
  youtubeUrl: z.string().trim().max(300).optional().or(z.literal("")),

  description: z.string().trim().max(1600).optional().or(z.literal("")),
  planSlug: z.string().trim().min(1, "Choose a membership plan"),

  password: z
    .string()
    .min(10, "Use at least 10 characters")
    .max(200),
  terms: z.literal("on", { message: "Please accept the terms" }),
  /** Honeypot. */
  companyUrl: z.string().max(0).optional().or(z.literal("")),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export type RegistrationResult =
  | { ok: true; businessId: number; passportSlug: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Append -2, -3 … until the directory slug is free within the country. */
async function uniqueBusinessSlug(
  db: Db,
  countryId: number,
  name: string,
): Promise<string> {
  const base = slugifyName(name) || "business";
  for (let n = 1; n < 50; n++) {
    const candidate = n === 1 ? base : `${base}-${n}`;
    const [taken] = await db
      .select({ id: businesses.id })
      .from(businesses)
      .where(and(eq(businesses.countryId, countryId), eq(businesses.slug, candidate)))
      .limit(1);
    if (!taken) return candidate;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export async function registerBusiness(
  input: RegistrationInput,
): Promise<RegistrationResult> {
  if (input.companyUrl) {
    // Honeypot hit. Report success so a bot learns nothing.
    return { ok: true, businessId: 0, passportSlug: "" };
  }

  const db = await getDb();

  const [country] = await db
    .select({ id: countries.id, code: countries.code })
    .from(countries)
    .where(eq(countries.code, "ae"))
    .limit(1);
  if (!country) return { ok: false, error: "Registration is not available right now." };

  const [category] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(and(eq(categories.countryId, country.id), eq(categories.slug, input.categorySlug)))
    .limit(1);
  if (!category) {
    return { ok: false, error: "Choose a category.", fieldErrors: { categorySlug: "Unknown category" } };
  }

  const [emirate] = await db
    .select({ id: locations.id })
    .from(locations)
    .where(and(eq(locations.countryId, country.id), eq(locations.slug, input.emirateSlug)))
    .limit(1);
  if (!emirate) {
    return { ok: false, error: "Choose an emirate.", fieldErrors: { emirateSlug: "Unknown emirate" } };
  }

  const [plan] = await db
    .select({ id: plans.id })
    .from(plans)
    .where(and(eq(plans.countryId, country.id), eq(plans.slug, input.planSlug)))
    .limit(1);
  if (!plan) {
    return { ok: false, error: "Choose a plan.", fieldErrors: { planSlug: "Unknown plan" } };
  }

  // One account per email. Checked before anything is written so a duplicate
  // does not leave a half-created business behind.
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, input.email.toLowerCase()))
    .limit(1);
  if (existing) {
    return {
      ok: false,
      error: "An account already exists for that email. Sign in instead.",
      fieldErrors: { email: "Already registered" },
    };
  }

  const [user] = await db
    .insert(users)
    .values({
      email: input.email.toLowerCase(),
      name: input.contactName,
      phone: input.phone,
      kind: "business",
      passwordHash: await hashPassword(input.password),
    })
    .returning({ id: users.id });
  if (!user) return { ok: false, error: "Could not create your account. Please try again." };

  const slug = await uniqueBusinessSlug(db, country.id, input.businessName);

  const [business] = await db
    .insert(businesses)
    .values({
      countryId: country.id,
      ownerId: user.id,
      name: input.businessName,
      slug,
      description: input.description || null,
      // Held for review. The client's flow is register, his team calls, then
      // it goes live - so nothing self-publishes.
      status: "pending",
    })
    .returning({ id: businesses.id });
  if (!business) return { ok: false, error: "Could not create your listing. Please try again." };

  await db.insert(businessContacts).values({
    businessId: business.id,
    phone: input.phone,
    whatsapp: input.whatsapp || input.phone,
    email: input.email.toLowerCase(),
    website: input.website || null,
    address: input.address,
    facebookUrl: input.facebookUrl || null,
    instagramUrl: input.instagramUrl || null,
    linkedinUrl: input.linkedinUrl || null,
    xUrl: input.xUrl || null,
    youtubeUrl: input.youtubeUrl || null,
  });

  await db
    .insert(businessCategories)
    .values({ businessId: business.id, categoryId: category.id, isPrimary: true });
  await db
    .insert(businessLocations)
    .values({ businessId: business.id, locationId: emirate.id, isPrimary: true });

  const pSlug = passportSlug(input.businessName);
  await db.insert(businessPassports).values({
    businessId: business.id,
    passportNumber: passportNumber(country.code, business.id),
    slug: pSlug,
    issuedAt: new Date(),
  });

  // Recorded, not active. An admin activates it once payment is confirmed,
  // which is the client's stated process.
  await db.insert(businessSubscriptions).values({
    businessId: business.id,
    planId: plan.id,
    startsAt: new Date(),
    status: "pending_payment",
  });

  const [ownerRole] = await db
    .select({ id: roles.id })
    .from(roles)
    .where(eq(roles.slug, "business-owner"))
    .limit(1);
  if (ownerRole) {
    await db.insert(userRoles).values({ userId: user.id, roleId: ownerRole.id });
  }

  await db.insert(notifications).values({
    businessId: business.id,
    userId: user.id,
    kind: "business.pending",
    title: "Registration received",
    body: "Our team will contact you within 24 hours to complete your profile and confirm your plan.",
    href: "/dashboard/",
    createdAt: new Date(),
  });

  return { ok: true, businessId: business.id, passportSlug: pSlug };
}
