import type { Metadata } from "next";
import Link from "next/link";
import { asc, eq, and, isNull, isNotNull } from "drizzle-orm";
import { BadgeCheck, Headset, Mail, MessageCircle, Phone } from "lucide-react";
import { getDb } from "@/lib/db";
import { categories, countries, locations, planFeatures, plans } from "@/lib/db/schema";
import { PortalNav } from "@/components/portal/portal-nav";
import { RegisterForm } from "@/components/portal/register-form";

/**
 * Business registration.
 *
 * Follows the client's mockup: numbered sections, the six plan cards inline,
 * and a sidebar carrying membership benefits, support contacts and a sign-in
 * box for people who already have an account.
 *
 * The plan cards are built from the database rather than hard-coded, so when
 * he changes a price or a benefit in admin this page changes with it. His PDF
 * is explicit that plan benefits must not be hardcoded into components.
 */

export const metadata: Metadata = {
  title: "List your business",
  description:
    "Join the BrandUpMe UAE business network. Register your business in minutes and our team will help complete your professional profile.",
  alternates: { canonical: "/uae/register/" },
};

export const dynamic = "force-dynamic";

const BENEFITS = [
  "Verified business listing",
  "SEO visibility",
  "Business profile page",
  "Digital Business Card",
  "Customer enquiries",
  "Social media promotion",
  "Business growth support",
];

export default async function Page() {
  const db = await getDb();

  const [country] = await db
    .select({ id: countries.id })
    .from(countries)
    .where(eq(countries.code, "ae"))
    .limit(1);

  if (!country) {
    return (
      <>
        <PortalNav />
        <main className="container-page py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-ink">
            Registration is not available
          </h1>
          <p className="mt-3 text-[15px] text-ink-2">Run the database seed first.</p>
        </main>
      </>
    );
  }

  const [subCategories, emirates, planRows, featureRows] = await Promise.all([
    db
      .select({ slug: categories.slug, name: categories.name })
      .from(categories)
      .where(
        and(
          eq(categories.countryId, country.id),
          eq(categories.status, "active"),
          isNotNull(categories.parentId),
        ),
      )
      .orderBy(asc(categories.name)),
    db
      .select({ slug: locations.slug, name: locations.name })
      .from(locations)
      .where(
        and(
          eq(locations.countryId, country.id),
          isNull(locations.parentId),
          eq(locations.status, "active"),
        ),
      )
      .orderBy(asc(locations.sortOrder)),
    db
      .select({
        id: plans.id,
        slug: plans.slug,
        name: plans.name,
        priceMinor: plans.priceMinor,
        purpose: plans.purpose,
        badge: plans.badge,
        featured: plans.featured,
      })
      .from(plans)
      .where(and(eq(plans.countryId, country.id), eq(plans.status, "active")))
      .orderBy(asc(plans.sortOrder)),
    db
      .select({
        planId: planFeatures.planId,
        key: planFeatures.featureKey,
        value: planFeatures.featureValue,
      })
      .from(planFeatures),
  ]);

  const featuresByPlan = new Map<number, Record<string, string>>();
  for (const f of featureRows) {
    const m = featuresByPlan.get(f.planId) ?? {};
    m[f.key] = f.value;
    featuresByPlan.set(f.planId, m);
  }

  const planCards = planRows.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.priceMinor === 0 ? "Free" : `AED ${(p.priceMinor / 100).toLocaleString()}`,
    purpose: p.purpose,
    badge: p.badge,
    featured: p.featured,
    highlights: describePlan(featuresByPlan.get(p.id) ?? {}),
  }));

  return (
    <>
      <PortalNav />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-deep py-12 lg:py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="deep-grid absolute inset-0 opacity-60" />
            <div className="absolute -right-40 -top-28 size-[520px] rounded-full bg-brand-600/22 blur-[120px]" />
          </div>

          <div className="container-page relative max-w-2xl">
            <h1 className="font-display text-[clamp(1.8rem,4.2vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
              Join the UAE&rsquo;s{" "}
              <span className="text-brand-400">trusted business network</span>
            </h1>
            <p className="mt-4 text-[15px] leading-[1.75] text-deep-muted">
              Register your business in a couple of minutes. Our team will
              contact you to help complete your professional business profile.
            </p>
          </div>
        </section>

        {/* ── Form and sidebar ─────────────────────────────────────────── */}
        <section className="bg-surface-2 py-10 lg:py-14">
          <div className="container-page grid gap-6 lg:grid-cols-[1fr_320px]">
            <RegisterForm
              categories={subCategories}
              emirates={emirates}
              plans={planCards}
            />

            <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-line bg-white p-5 shadow-e1">
                <h2 className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
                  Membership benefits
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[13px] text-ink-2">
                      <BadgeCheck
                        className="mt-0.5 size-4 shrink-0 text-green-text"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-white p-5 shadow-e1">
                <h2 className="flex items-center gap-2 font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
                  <Headset className="size-4 text-green-text" strokeWidth={2} aria-hidden />
                  Need help?
                </h2>
                {/* PENDING - the client has not supplied real UAE contact
                    details. These are placeholders and must not go live. */}
                <ul className="mt-4 flex flex-col gap-2.5 text-[13px] text-ink-2">
                  <li className="flex items-center gap-2.5">
                    <Phone className="size-4 shrink-0 text-ink-3" strokeWidth={2} aria-hidden />
                    Call support
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MessageCircle className="size-4 shrink-0 text-ink-3" strokeWidth={2} aria-hidden />
                    WhatsApp support
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail className="size-4 shrink-0 text-ink-3" strokeWidth={2} aria-hidden />
                    Email support
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-white p-5 shadow-e1">
                <h2 className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
                  Already registered?
                </h2>
                <p className="mt-2 text-[13px] leading-[1.6] text-ink-2">
                  Sign in to manage your listing and see your enquiries.
                </p>
                <Link
                  href="/login/"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full
                    bg-brand-600 px-5 text-[13.5px] font-bold text-white transition-colors hover:bg-brand-500"
                >
                  Sign in
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* ── Reassurance band, from the client's mockup ───────────────── */}
        <section className="bg-deep py-10 lg:py-12">
          <div className="container-page">
            <h2 className="font-display text-[clamp(1.2rem,2.4vw,1.7rem)] font-bold tracking-[-0.03em] text-white">
              We&rsquo;ll complete your{" "}
              <span className="text-gold-500">business profile</span> for you
            </h2>
            <p className="mt-2.5 max-w-2xl text-[14px] leading-[1.7] text-deep-muted">
              Our onboarding team takes care of the rest.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "We collect your logo",
                "We verify your details",
                "We optimise your profile",
                "We publish your listing",
                "Dedicated onboarding support",
              ].map((s) => (
                <li
                  key={s}
                  className="rounded-xl border border-deep-line bg-white/[0.04] px-4 py-3 text-[12.5px] text-deep-soft"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

/**
 * Turn raw feature rows into the two or three lines a plan card shows.
 *
 * Derived from plan_features rather than written per plan, so a benefit change
 * in admin is reflected here without anyone editing this file.
 */
function describePlan(f: Record<string, string>): string[] {
  const out: string[] = ["Business listing"];

  if (f.rich_profile === "true") out.push("Full business profile");
  if (f.contact_visible === "true") out.push("Contact details visible");
  else out.push("Contact details hidden");

  if (f.lead_access === "full") out.push("All customer enquiries");
  else if (f.lead_access === "limited")
    out.push(`${f.lead_unlock_quota ?? 0} lead unlocks per month`);

  if (f.verified_badge === "true") out.push("Verified badge");
  if (f.priority_listing === "true") out.push("Priority listing");
  if (f.posters_per_month) out.push(`${f.posters_per_month} posters per month`);
  if (f.videos_per_month) out.push(`${f.videos_per_month} video ads per month`);

  return out;
}
