import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Globe,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { getProfileByPassport } from "@/lib/directory/profile";
import { EnquiryForm } from "@/components/portal/enquiry-form";
import { ReviewForm } from "@/components/portal/review-form";
import { PortalNav } from "@/components/portal/portal-nav";
import type { Masked } from "@/lib/permissions/visibility";

/**
 * Digital Business Card - the permanent public profile at /p/<slug>.
 *
 * This URL is printed on brochures, packaging and QR codes, so it must resolve
 * for the life of the business regardless of plan changes. Expiry downgrades
 * what is shown; it never 404s the page.
 *
 * Every contact value here has already been through the permission layer in
 * lib/directory/profile.ts. A locked field arrives as { visible: false } with a
 * generated mask and no underlying value, so there is nothing in this page's
 * payload for someone to read out of the network tab.
 */

type Props = { params: Promise<{ slug: string }> };

/**
 * Rendered per request. The D1 binding does not exist during the build, so
 * these pages cannot prerender; caching moves to ISR once an incremental cache
 * is configured in open-next.config.ts.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProfileByPassport(slug);
  if (!p) return {};

  const where = p.locations[0]?.name;
  return {
    title: `${p.name}${where ? ` | ${where}, UAE` : ""}`,
    description:
      p.tagline ??
      p.description?.slice(0, 155) ??
      `${p.name} on the BrandUpMe UAE business directory.`,
    alternates: { canonical: `/p/${p.passportSlug}/` },
    openGraph: {
      title: p.name,
      description: p.tagline ?? undefined,
      images: p.logo ? [{ url: p.logo }] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = await getProfileByPassport(slug);
  if (!p) notFound();

  return (
    <>
      <PortalNav />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-deep pb-8 pt-10 lg:pb-10 lg:pt-14">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="deep-grid absolute inset-0 opacity-60" />
            <div className="absolute -right-32 -top-24 size-[460px] rounded-full bg-brand-600/20 blur-[120px]" />
          </div>

          <div className="container-page relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white lg:size-24">
              {p.logo ? (
                <Image src={p.logo} alt="" width={96} height={96} className="size-full object-contain p-2" />
              ) : (
                <span className="font-display text-[28px] font-extrabold text-ink-3">
                  {p.name.slice(0, 1)}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <h1 className="font-display text-[clamp(1.4rem,3.2vw,2.1rem)] font-extrabold leading-tight tracking-[-0.035em] text-white">
                  {p.name}
                </h1>
                {p.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/20 px-2.5 py-1 text-[11px] font-semibold text-brand-300">
                    <BadgeCheck className="size-3.5" strokeWidth={2.5} aria-hidden />
                    Verified Business
                  </span>
                )}
              </div>

              {p.tagline && <p className="mt-2 text-[14.5px] text-deep-muted">{p.tagline}</p>}

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-deep-soft">
                {p.ratingCount > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Star className="size-3.5 fill-gold-500 text-gold-500" aria-hidden />
                    <strong className="text-white">{(p.ratingAvg / 10).toFixed(1)}</strong>
                    <span className="text-deep-muted">({p.ratingCount} reviews)</span>
                  </span>
                )}
                {p.locations[0] && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" strokeWidth={2} aria-hidden />
                    {p.locations.map((l) => l.name).join(", ")}
                  </span>
                )}
                <span className="text-[11.5px] uppercase tracking-[0.14em] text-deep-muted">
                  {p.passportNumber}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <section className="bg-surface-2 py-10 lg:py-14">
          <div className="container-page grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-5">
              {p.images.length > 0 && (
                <ul className="grid grid-cols-3 gap-3">
                  {p.images.map((img, i) => (
                    <li key={i} className="overflow-hidden rounded-xl border border-line bg-white">
                      <Image
                        src={img.url}
                        alt={img.alt ?? ""}
                        width={400}
                        height={280}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </li>
                  ))}
                </ul>
              )}

              {p.description && (
                <Card title={`About ${p.name}`}>
                  <p className="whitespace-pre-line text-[14px] leading-[1.8] text-ink-2">
                    {p.description}
                  </p>
                </Card>
              )}

              {p.services.length > 0 && (
                <Card title="Our services">
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {p.services.map((s) => (
                      <li
                        key={s.id}
                        className="rounded-xl border border-line bg-surface-2 px-3.5 py-3"
                      >
                        <p className="text-[13.5px] font-semibold text-ink">{s.name}</p>
                        {s.description && (
                          <p className="mt-1 text-[12.5px] leading-[1.6] text-ink-3">
                            {s.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              <BusinessDetails profile={p} />

              {p.reviews.length > 0 && (
                <Card title="What clients say">
                  <ul className="flex flex-col gap-4">
                    {p.reviews.map((r) => (
                      <li key={r.id} className="border-b border-line pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-0.5" aria-label={`${r.rating} out of 5`}>
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={
                                  i < r.rating
                                    ? "size-3.5 fill-gold-500 text-gold-500"
                                    : "size-3.5 text-line"
                                }
                                aria-hidden
                              />
                            ))}
                          </span>
                          <p className="text-[13px] font-semibold text-ink">{r.authorName}</p>
                        </div>
                        {r.body && (
                          <p className="mt-2 text-[13px] leading-[1.7] text-ink-2">{r.body}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>

            {/* ── Contact and enquiry ──────────────────────────────────── */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
              <Card title="Contact information">
                <ul className="flex flex-col gap-2.5">
                  <ContactRow icon={<Phone className="size-4" />} field={p.contact.phone} href={(v) => `tel:${v}`} />
                  <ContactRow
                    icon={<MessageCircle className="size-4" />}
                    field={p.contact.whatsapp}
                    href={(v) => `https://wa.me/${v.replace(/\D/g, "")}`}
                  />
                  <ContactRow icon={<Mail className="size-4" />} field={p.contact.email} href={(v) => `mailto:${v}`} />
                  <ContactRow icon={<Globe className="size-4" />} field={p.contact.website} href={(v) => v} />
                  {p.contact.address && (
                    <li className="flex items-start gap-2.5 text-[13px] text-ink-2">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-green-text" strokeWidth={2} aria-hidden />
                      {p.contact.address}
                    </li>
                  )}
                </ul>

                {p.contact.hasLockedFields && (
                  <p className="mt-4 rounded-xl border border-gold-500/40 bg-gold-500/10 px-3.5 py-3 text-[12px] leading-[1.6] text-ink-2">
                    Some contact details are not published on this listing. Send
                    an enquiry below and the business will get back to you.
                  </p>
                )}
              </Card>

              <Card title="Write a review">
                <ReviewForm passportSlug={p.passportSlug} />
              </Card>

              <Card title="Request a free consultation">
                <EnquiryForm passportSlug={p.passportSlug} businessName={p.name} />
              </Card>

              <p className="text-center text-[11px] text-ink-3">
                Official Digital Business Card by{" "}
                <Link href="/uae/" className="font-semibold text-green-text">
                  BrandUpMe UAE
                </Link>
              </p>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-e1 lg:p-6">
      <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/**
 * A locked row renders the mask as plain text with no link and no value. There
 * is no href to strip and no data attribute to read.
 */
function ContactRow({
  icon,
  field,
  href,
}: {
  icon: React.ReactNode;
  field: Masked;
  href: (value: string) => string;
}) {
  if (field.visible) {
    return (
      <li>
        <a
          href={href(field.value)}
          className="flex items-center gap-2.5 text-[13px] text-ink-2 transition-colors hover:text-green-text"
          {...(field.value.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
        >
          <span className="text-green-text" aria-hidden>{icon}</span>
          <span className="truncate">{field.value}</span>
        </a>
      </li>
    );
  }

  if (!field.masked) return null;

  return (
    <li className="flex items-center gap-2.5 text-[13px] text-ink-3">
      <span className="text-ink-3" aria-hidden>{icon}</span>
      <span className="truncate">{field.masked}</span>
      <Lock className="ml-auto size-3.5 shrink-0 text-ink-3" strokeWidth={2.5} aria-hidden />
    </li>
  );
}

function BusinessDetails({
  profile: p,
}: {
  profile: Awaited<ReturnType<typeof getProfileByPassport>>;
}) {
  if (!p) return null;

  const rows: [string, string | null][] = [
    ["Business type", p.businessType],
    ["Year established", p.establishedYear ? String(p.establishedYear) : null],
    ["Team size", p.teamSize],
    ["Languages", p.languages?.join(", ") ?? null],
    ["Working hours", p.workingHours],
    ["Licence no.", p.licenseNo],
    ["Service areas", p.locations.map((l) => l.name).join(", ") || null],
  ];
  const shown = rows.filter(([, v]) => v);
  if (shown.length === 0) return null;

  return (
    <Card title="Business details">
      <dl className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {shown.map(([label, value]) => (
          <div key={label} className="flex flex-col">
            <dt className="text-[11.5px] uppercase tracking-[0.1em] text-ink-3">{label}</dt>
            <dd className="mt-0.5 text-[13.5px] text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
