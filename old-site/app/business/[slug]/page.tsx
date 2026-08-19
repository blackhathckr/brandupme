import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  Globe,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Share2,
  Star,
  Users,
  Video,
} from "lucide-react";
import { CardActions, DigitalCard } from "@/components/business/digital-card";
import { InquiryForm } from "@/components/business/inquiry-form";
import { AccountHeader } from "@/components/site/account-header";
import { SiteFooter } from "@/components/site/site-footer";
import { FEATURED_BUSINESS } from "@/lib/brand/businesses";

export const metadata: Metadata = {
  title: `${FEATURED_BUSINESS.name} | BrandUpMe`,
  description: FEATURED_BUSINESS.headline,
};

const FACT_ICONS = {
  calendar: CalendarDays,
  users: Users,
  globe: Globe,
  clock: Clock,
} as const;

const LEAD_STEPS = [
  { icon: Users, title: "Your Name & Contact Details" },
  { icon: Video, title: "Preferred Video Call Platform" },
  { icon: Send, title: "Your Message & Requirements" },
  { icon: CalendarDays, title: "Inquiry Date & Time" },
];

const NEXT_STEPS = [
  "We receive your inquiry",
  "Business owner reviews & contacts you",
  "Video call scheduled on your preferred platform",
  "Discuss & fix the meeting",
];

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = FEATURED_BUSINESS;

  return (
    <div className="min-h-dvh bg-white">
      <AccountHeader />

      <main className="container-portal py-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_512px]">
          {/* ── Left — the business ─────────────────────────────────── */}
          <div className="min-w-0 space-y-5">
            <section className="flex flex-wrap gap-6">
              <div className="grid size-[188px] shrink-0 place-items-center rounded-xl border border-rule bg-white p-4 text-[28px] font-black tracking-tight text-slate-ink shadow-p1">
                {b.logoInitials}
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="flex items-center gap-2 text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-iris-700">
                  {b.name}
                  {b.verified ? (
                    <BadgeCheck className="size-6 shrink-0 text-iris-600" aria-hidden />
                  ) : null}
                </h1>

                <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-md bg-iris-50 px-2.5 py-1 text-[12px] font-semibold text-iris-700">
                  <BadgeCheck className="size-3.5" aria-hidden />
                  {b.badgeLabel}
                </span>

                <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-slate-3">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4 text-slate-4" aria-hidden />
                    {b.emirate}
                  </span>
                  <span aria-hidden className="text-slate-4">·</span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-4 text-slate-4" aria-hidden />
                    Since {b.since}
                  </span>
                  <span aria-hidden className="text-slate-4">·</span>
                  <span>ID: {b.businessId}</span>
                  <span aria-hidden className="text-slate-4">·</span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-ink">
                    <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                    {b.rating} ({b.reviews} Reviews)
                  </span>
                </p>

                <p className="mt-3 text-[14.5px] text-slate-2">{b.headline}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="#inquiry"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-iris-600 px-5 text-[14.5px] font-semibold text-white shadow-iris transition-colors hover:bg-iris-700"
                  >
                    <Send className="size-4" aria-hidden />
                    Send Inquiry
                  </Link>
                  {[
                    { icon: Phone, label: "Call Now" },
                    { icon: MessageCircle, label: "WhatsApp" },
                    { icon: Share2, label: "Share" },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      className="inline-flex h-11 items-center gap-2 rounded-lg border border-rule bg-white px-5 text-[14.5px] font-semibold text-slate-2 transition-colors hover:bg-paper"
                    >
                      <Icon className="size-4" aria-hidden />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {b.gallery.map((caption, i) => (
                  <li
                    key={caption}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg border border-rule bg-gradient-to-br from-slate-100 to-slate-200"
                  >
                    <span className="absolute inset-0 grid place-items-center px-2 text-center text-[10.5px] font-medium text-slate-4">
                      {caption}
                    </span>
                    {i === 0 ? (
                      <span className="absolute bottom-1.5 left-1.5 rounded bg-navy/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        1 / {b.gallery.length}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>

            {/* About */}
            <section className="rounded-xl border border-rule bg-white p-6 shadow-p1">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                  <h2 className="text-[17px] font-bold text-slate-ink">About Us</h2>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-slate-2">
                    {b.about}
                  </p>
                  <button
                    type="button"
                    className="mt-3 text-[13.5px] font-semibold text-iris-600 hover:underline"
                  >
                    Read More
                  </button>
                </div>

                <dl className="space-y-4 lg:border-l lg:border-rule-2 lg:pl-8">
                  {b.facts.map((f) => {
                    const Icon = FACT_ICONS[f.icon as keyof typeof FACT_ICONS];
                    return (
                      <div key={f.label} className="flex items-center justify-between gap-4">
                        <dt className="flex items-center gap-2.5 text-[13px] text-slate-3">
                          <Icon className="size-4 shrink-0 text-slate-4" aria-hidden />
                          {f.label}
                        </dt>
                        <dd className="text-right text-[13px] font-semibold text-slate-ink">
                          {f.value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </section>

            {/* Services */}
            <section className="rounded-xl border border-rule bg-white p-6 shadow-p1">
              <h2 className="text-[17px] font-bold text-slate-ink">Our Services</h2>

              <ul className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {b.services.map((s) => (
                  <li
                    key={s.name}
                    className="rounded-lg border border-rule p-4 transition-shadow hover:shadow-p1"
                  >
                    <span
                      aria-hidden
                      className={`grid size-9 place-items-center rounded-lg ${s.chip}`}
                    >
                      <CheckCircle2 className="size-[18px]" />
                    </span>
                    <p className="mt-2.5 text-[13px] font-bold leading-tight text-slate-ink">
                      {s.name}
                    </p>
                    <p className="mt-1 text-[11.5px] leading-snug text-slate-3">{s.body}</p>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mx-auto mt-5 flex h-10 items-center justify-center rounded-lg border border-iris-200 px-8 text-[13.5px] font-semibold text-iris-700 transition-colors hover:bg-iris-50"
              >
                View All Services
              </button>
            </section>

            {/* Related + lead explainer */}
            <section className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
              <div className="rounded-xl border border-rule bg-white p-6 shadow-p1">
                <h2 className="text-[15px] font-bold text-slate-ink">
                  Explore Related Categories
                </h2>
                <ul className="mt-4 space-y-3">
                  {b.related.map((r) => (
                    <li key={r} className="flex items-start gap-2.5">
                      <CheckCircle2 aria-hidden className="mt-px size-4 shrink-0 text-ok" />
                      <span className="text-[13px] font-medium text-slate-2">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-rule bg-white p-6 shadow-p1">
                <h2 className="text-[15px] font-bold text-slate-ink">
                  Business Owner Receives Your Lead
                </h2>
                <p className="mt-1.5 text-[13px] text-slate-3">
                  When you submit an inquiry, the business owner will receive all
                  your details:
                </p>

                <ol className="mt-4 grid gap-3 sm:grid-cols-4">
                  {LEAD_STEPS.map(({ icon: Icon, title }, i) => (
                    <li key={title} className="relative rounded-lg border border-rule p-4 text-center">
                      <span
                        aria-hidden
                        className="mx-auto grid size-10 place-items-center rounded-full bg-iris-100 text-iris-600"
                      >
                        <Icon className="size-5" />
                      </span>
                      <p className="mt-2.5 text-[11.5px] font-semibold leading-snug text-slate-ink">
                        {title}
                      </p>
                      {i < LEAD_STEPS.length - 1 ? (
                        <span
                          aria-hidden
                          className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-slate-4 sm:block"
                        >
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>

          {/* ── Right — card and inquiry ────────────────────────────── */}
          <aside className="space-y-5">
            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-[17px] font-bold text-slate-ink">
                  Digital Business Card
                </h2>
                <button
                  type="button"
                  className="flex h-8 items-center gap-1.5 rounded-md border border-rule px-2.5 text-[12px] font-medium text-slate-2 transition-colors hover:bg-paper"
                >
                  <Eye className="size-3.5" aria-hidden />
                  Preview
                </button>
              </div>

              <DigitalCard cardUrl={`https://brandupme.com/card/${slug}`} />
              <CardActions />
            </section>

            <InquiryForm businessName={b.name} />

            <section className="rounded-xl border border-rule bg-white p-5 shadow-p1">
              <h2 className="text-[15px] font-bold text-slate-ink">
                What happens next?
              </h2>
              <ol className="mt-4 grid grid-cols-4 gap-2">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s} className="relative text-center">
                    <span
                      aria-hidden
                      className="mx-auto grid size-10 place-items-center rounded-lg bg-paper text-iris-600"
                    >
                      {i + 1}
                    </span>
                    <p className="mt-2 text-[10.5px] leading-snug text-slate-3">{s}</p>
                    {i < NEXT_STEPS.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute -right-1.5 top-5 -translate-y-1/2 text-slate-4"
                      >
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
