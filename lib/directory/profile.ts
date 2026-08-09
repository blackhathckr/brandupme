import { and, asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  businessAchievements,
  businessCategories,
  businessContacts,
  businessHighlights,
  businessImages,
  businessLocations,
  businessOffers,
  businessPassports,
  businessServices,
  businesses,
  categories,
  locations,
  reviews,
} from "@/lib/db/schema";
import { entitlementsFor } from "@/lib/permissions/resolve";
import { publicContact, type PublicContact } from "@/lib/permissions/visibility";
import { FEATURE, can } from "@/lib/permissions/features";

/**
 * The full public profile behind /p/<passport-slug>.
 *
 * Loads once, resolves entitlements once, and returns a shape that is already
 * safe to render. A component receiving this object cannot leak a locked field
 * because the locked fields are not in it.
 *
 * Rich profile blocks - services, offers, achievements, timeline - are gated on
 * the plan too, so a free listing is a name and a location rather than a full
 * brochure someone else is paying for.
 */

export type ProfileView = {
  id: number;
  name: string;
  slug: string;
  passportSlug: string;
  passportNumber: string;
  tagline: string | null;
  description: string | null;
  logo: string | null;
  coverImage: string | null;
  verified: boolean;
  establishedYear: number | null;
  teamSize: string | null;
  languages: string[] | null;
  workingHours: string | null;
  businessType: string | null;
  licenseNo: string | null;
  registrationNo: string | null;
  ratingAvg: number;
  ratingCount: number;
  contact: PublicContact;
  images: { url: string; alt: string | null }[];
  categories: { id: number; slug: string; name: string }[];
  locations: { id: number; slug: string; name: string; level: string }[];
  services: { id: number; name: string; description: string | null; icon: string | null }[];
  highlights: { title: string; description: string | null; icon: string | null }[];
  offers: { title: string; description: string | null; discount: string | null }[];
  achievements: { title: string; description: string | null; image: string | null }[];
  reviews: {
    id: number;
    authorName: string;
    authorTitle: string | null;
    rating: number;
    title: string | null;
    body: string | null;
    reply: string | null;
    createdAt: Date;
  }[];
  /** Drives the upgrade prompt without the component inspecting each field. */
  hasLockedFields: boolean;
  planName: string | null;
};

export async function getProfileByPassport(
  passportSlug: string,
): Promise<ProfileView | null> {
  const db = await getDb();

  const [row] = await db
    .select({
      b: businesses,
      passportSlug: businessPassports.slug,
      passportNumber: businessPassports.passportNumber,
    })
    .from(businessPassports)
    .innerJoin(businesses, eq(businesses.id, businessPassports.businessId))
    .where(
      and(
        eq(businessPassports.slug, passportSlug),
        eq(businessPassports.status, "active"),
      ),
    )
    .limit(1);

  // A suspended or archived listing must not resolve, but an expired
  // subscription must - the client's PDF is explicit that expiry never takes
  // the passport down, or every printed QR code dies with it.
  if (!row || (row.b.status !== "published" && row.b.status !== "pending")) {
    return null;
  }

  const id = row.b.id;
  const ent = await entitlementsFor(db, id);
  const rich = can(ent.features, FEATURE.RICH_PROFILE);

  const [
    contact,
    images,
    cats,
    locs,
    services,
    highlights,
    offers,
    achievements,
    reviewRows,
  ] = await Promise.all([
    db.select().from(businessContacts).where(eq(businessContacts.businessId, id)).limit(1),
    db
      .select({ url: businessImages.url, alt: businessImages.alt })
      .from(businessImages)
      .where(and(eq(businessImages.businessId, id), eq(businessImages.imageType, "gallery")))
      .orderBy(asc(businessImages.sortOrder))
      // The client's card spec says exactly three.
      .limit(3),
    db
      .select({ id: categories.id, slug: categories.slug, name: categories.name })
      .from(businessCategories)
      .innerJoin(categories, eq(categories.id, businessCategories.categoryId))
      .where(eq(businessCategories.businessId, id))
      .orderBy(desc(businessCategories.isPrimary)),
    db
      .select({
        id: locations.id,
        slug: locations.slug,
        name: locations.name,
        level: locations.level,
      })
      .from(businessLocations)
      .innerJoin(locations, eq(locations.id, businessLocations.locationId))
      .where(eq(businessLocations.businessId, id))
      .orderBy(desc(businessLocations.isPrimary)),
    rich
      ? db
          .select({
            id: businessServices.id,
            name: businessServices.name,
            description: businessServices.description,
            icon: businessServices.icon,
          })
          .from(businessServices)
          .where(
            and(eq(businessServices.businessId, id), eq(businessServices.status, "active")),
          )
          .orderBy(asc(businessServices.sortOrder))
      : Promise.resolve([]),
    rich
      ? db
          .select({
            title: businessHighlights.title,
            description: businessHighlights.description,
            icon: businessHighlights.icon,
          })
          .from(businessHighlights)
          .where(eq(businessHighlights.businessId, id))
          .orderBy(asc(businessHighlights.sortOrder))
      : Promise.resolve([]),
    rich
      ? db
          .select({
            title: businessOffers.title,
            description: businessOffers.description,
            discount: businessOffers.discount,
          })
          .from(businessOffers)
          .where(and(eq(businessOffers.businessId, id), eq(businessOffers.status, "active")))
      : Promise.resolve([]),
    rich
      ? db
          .select({
            title: businessAchievements.title,
            description: businessAchievements.description,
            image: businessAchievements.image,
          })
          .from(businessAchievements)
          .where(eq(businessAchievements.businessId, id))
          .orderBy(asc(businessAchievements.sortOrder))
      : Promise.resolve([]),
    db
      .select({
        id: reviews.id,
        authorName: reviews.authorName,
        authorTitle: reviews.authorTitle,
        rating: reviews.rating,
        title: reviews.title,
        body: reviews.body,
        reply: reviews.reply,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .where(and(eq(reviews.businessId, id), eq(reviews.status, "published")))
      .orderBy(desc(reviews.createdAt))
      .limit(10),
  ]);

  const safeContact = publicContact(contact[0], ent.features);

  return {
    id,
    name: row.b.name,
    slug: row.b.slug,
    passportSlug: row.passportSlug,
    passportNumber: row.passportNumber,
    tagline: row.b.tagline,
    description: row.b.description,
    logo: row.b.logo,
    coverImage: row.b.coverImage,
    verified: row.b.verified && can(ent.features, FEATURE.VERIFIED_BADGE),
    establishedYear: row.b.establishedYear,
    teamSize: row.b.teamSize,
    languages: row.b.languages ?? null,
    workingHours: row.b.workingHours,
    businessType: row.b.businessType,
    licenseNo: row.b.licenseNo,
    registrationNo: row.b.registrationNo,
    ratingAvg: row.b.ratingAvg,
    ratingCount: row.b.ratingCount,
    contact: safeContact,
    images,
    categories: cats,
    locations: locs,
    services,
    highlights,
    offers,
    achievements,
    reviews: reviewRows,
    hasLockedFields: safeContact.hasLockedFields,
    planName: ent.planName,
  };
}

/** Same profile, resolved from the directory slug rather than the passport. */
export async function getProfileByBusinessSlug(
  countryId: number,
  slug: string,
): Promise<ProfileView | null> {
  const db = await getDb();
  const [row] = await db
    .select({ passportSlug: businessPassports.slug })
    .from(businesses)
    .innerJoin(businessPassports, eq(businessPassports.businessId, businesses.id))
    .where(and(eq(businesses.countryId, countryId), eq(businesses.slug, slug)))
    .limit(1);
  return row ? getProfileByPassport(row.passportSlug) : null;
}
