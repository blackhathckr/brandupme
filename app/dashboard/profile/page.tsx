import type { Metadata } from "next";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { businessContacts, businessImages, businessPassports, businesses } from "@/lib/db/schema";
import { requireUser } from "@/lib/auth/guard";
import { businessesOwnedBy } from "@/lib/leads/inbox";
import { entitlementsFor } from "@/lib/permissions/resolve";
import { FEATURE, amount } from "@/lib/permissions/features";
import { ProfileEditor } from "@/components/portal/profile-editor";

export const metadata: Metadata = { title: "Business profile", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await requireUser("/dashboard/profile/");
  const owned = await businessesOwnedBy(user.id);

  if (owned.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
        <h1 className="font-display text-[18px] font-bold text-ink">No business yet</h1>
        <Link
          href="/uae/register/"
          className="mt-5 inline-flex h-11 items-center rounded-full bg-brand-600 px-6 text-[14px] font-bold text-white"
        >
          List your business
        </Link>
      </div>
    );
  }

  const db = await getDb();
  const id = owned[0].id;

  const [[business], [contact], images, [passport], ent] = await Promise.all([
    db.select().from(businesses).where(eq(businesses.id, id)).limit(1),
    db.select().from(businessContacts).where(eq(businessContacts.businessId, id)).limit(1),
    db
      .select({ id: businessImages.id, url: businessImages.url })
      .from(businessImages)
      .where(eq(businessImages.businessId, id))
      .orderBy(asc(businessImages.sortOrder)),
    db
      .select({ slug: businessPassports.slug, number: businessPassports.passportNumber })
      .from(businessPassports)
      .where(eq(businessPassports.businessId, id))
      .limit(1),
    entitlementsFor(db, id),
  ]);

  if (!business) return null;

  return (
    <ProfileEditor
      business={{
        id: business.id,
        name: business.name,
        tagline: business.tagline,
        description: business.description,
        logo: business.logo,
        establishedYear: business.establishedYear,
        teamSize: business.teamSize,
        languages: business.languages ?? null,
        workingHours: business.workingHours,
        businessType: business.businessType,
        licenseNo: business.licenseNo,
      }}
      contact={{
        phone: contact?.phone ?? null,
        whatsapp: contact?.whatsapp ?? null,
        email: contact?.email ?? null,
        website: contact?.website ?? null,
        address: contact?.address ?? null,
        area: contact?.area ?? null,
        facebookUrl: contact?.facebookUrl ?? null,
        instagramUrl: contact?.instagramUrl ?? null,
        linkedinUrl: contact?.linkedinUrl ?? null,
        xUrl: contact?.xUrl ?? null,
        youtubeUrl: contact?.youtubeUrl ?? null,
      }}
      images={images.filter((i) => i.url !== business.logo)}
      imageQuota={amount(ent.features, FEATURE.IMAGE_QUOTA)}
      passport={passport ?? null}
    />
  );
}
