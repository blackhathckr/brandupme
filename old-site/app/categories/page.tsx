import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Eye,
  LayoutGrid,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { CategoryIcon } from "@/components/site/category-icon";
import { PromoAd } from "@/components/site/promo-ad";
import { PublicHeader } from "@/components/site/public-header";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/top-bar";
import { CATEGORY_SIDEBAR_ADS } from "@/lib/brand/ads";
import { CATEGORIES } from "@/lib/brand/categories";

export const metadata: Metadata = {
  title: "All Business Categories | BrandUpMe",
  description:
    "Browse every business category on BrandUpMe and discover verified companies across the UAE.",
};

const HERO_STATS = [
  { icon: Users, value: "25,000+", label: "Verified Businesses" },
  { icon: Eye, value: "2M+", label: "Business Views" },
  { icon: LayoutGrid, value: "150+", label: "Business Categories" },
  { icon: ShieldCheck, value: "100%", label: "Verified & Trusted" },
];

const WHY = [
  "100% Verified Businesses",
  "Easy Search & Compare",
  "Direct Contact with Businesses",
  "Save Time & Grow Faster",
];

export default function Page() {
  return (
    <div className="min-h-dvh bg-white">
      <TopBar />
      <PublicHeader />

      <main className="container-portal py-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0">
            {/* ── Hero ────────────────────────────────────────────────── */}
            <section className="relative isolate overflow-hidden rounded-xl bg-navy p-8 text-white">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-[#0A1322] via-[#16224A]/95 to-[#3E2A6E]/70"
              />
              <div
                aria-hidden
                className="absolute -right-20 -top-16 size-80 rounded-full bg-iris-500/25 blur-3xl"
              />

              <div className="relative">
                <span className="inline-flex rounded-md bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur">
                  Explore &amp; Connect
                </span>

                <h1 className="mt-4 text-[34px] font-extrabold leading-tight tracking-[-0.025em]">
                  Explore <span className="text-iris-300">All Business Categories</span>
                </h1>

                <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/80">
                  Find verified businesses across UAE in every industry. Connect,
                  collaborate &amp; grow together.
                </p>

                <ul className="mt-7 flex max-w-2xl flex-wrap gap-px overflow-hidden rounded-lg bg-white/10">
                  {HERO_STATS.map(({ icon: Icon, value, label }) => (
                    <li
                      key={label}
                      className="flex flex-1 items-center gap-2.5 bg-white/5 px-4 py-3 backdrop-blur"
                    >
                      <Icon className="size-4 shrink-0 text-iris-300" aria-hidden />
                      <span className="leading-tight">
                        <span className="block text-[15px] font-extrabold">{value}</span>
                        <span className="block text-[11px] text-white/65">{label}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── Grid ────────────────────────────────────────────────── */}
            <section className="mt-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-[21px] font-extrabold tracking-tight text-slate-ink">
                    All Business Categories
                  </h2>
                  <p className="mt-1 text-[13.5px] text-slate-3">
                    Browse all categories and discover the best businesses in UAE
                  </p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search
                    aria-hidden
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-4"
                  />
                  <input
                    placeholder="Search in categories..."
                    className="h-10 w-full rounded-lg border border-rule bg-white pl-10 pr-9 text-sm outline-none placeholder:text-slate-4 focus:border-iris-500 focus:ring-3 focus:ring-iris-100"
                  />
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-4"
                  />
                </div>
              </div>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/categories/${c.slug}`}
                      className="group flex h-full flex-col rounded-xl border border-rule bg-white p-4 transition-all hover:border-iris-300 hover:shadow-p2"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className={`grid size-10 shrink-0 place-items-center rounded-lg ${c.chip}`}
                        >
                          <CategoryIcon name={c.icon} className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-bold leading-tight text-slate-ink">
                            {c.name}
                          </span>
                          <span className="mt-1 block text-[11.5px] text-slate-3">
                            {c.count.toLocaleString()} Companies
                          </span>
                        </span>
                      </div>

                      <span className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold text-iris-600">
                        Explore
                        <ArrowRight
                          aria-hidden
                          className="size-3.5 transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* ── AD 3 — wide bottom banner ───────────────────────────── */}
            <section className="relative mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-iris-700 via-iris-600 to-[#7B3FE4] p-7 text-white">
              <span className="absolute right-3 top-3 rounded bg-white/20 px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide">
                Ad 3
              </span>

              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-[22px] font-black leading-tight tracking-tight">
                    GROW YOUR BUSINESS
                    <span className="block">
                      WITH <span className="text-[#F5C518]">DIGITAL MARKETING</span>
                    </span>
                  </p>
                  <p className="mt-2 text-[13.5px] text-white/85">
                    Increase Visibility. Generate Leads. Boost Sales.
                  </p>
                </div>

                <ul className="flex flex-wrap gap-6 text-[11.5px] text-white/85">
                  {["SEO", "Social Media", "Google Ads", "Content Marketing", "Lead Generation"].map(
                    (s) => (
                      <li key={s} className="flex flex-col items-center gap-1.5">
                        <span aria-hidden className="text-base">
                          ◆
                        </span>
                        {s}
                      </li>
                    ),
                  )}
                </ul>

                <div className="flex items-center gap-4">
                  <span className="inline-flex h-10 items-center rounded-md bg-[#F5C518] px-5 text-[13px] font-bold text-[#1A1205]">
                    Get Free Consultation
                  </span>
                  <span className="text-[12.5px] font-semibold text-white/85">
                    +971 50 123 4567
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <aside className="space-y-5">
            {CATEGORY_SIDEBAR_ADS.map((ad) => (
              <PromoAd key={ad.id} ad={ad} size="sidebar" className="min-h-[260px]" />
            ))}

            <div className="rounded-xl border border-rule bg-white p-5 shadow-p1">
              <h2 className="text-[16px] font-bold text-slate-ink">
                Why Choose BrandUpMe?
              </h2>
              <ul className="mt-4 space-y-2.5">
                {WHY.map((w) => (
                  <li key={w} className="flex items-start gap-2.5">
                    <CheckCircle2 aria-hidden className="mt-px size-4 shrink-0 text-ok" />
                    <span className="text-[13px] font-medium text-slate-2">{w}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register/business"
                className="mt-5 flex h-11 items-center justify-center gap-2 rounded-lg border border-iris-200 text-[14px] font-bold text-iris-700 transition-colors hover:bg-iris-50"
              >
                List Your Business Today
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            <div className="rounded-xl border border-rule bg-white p-5 shadow-p1">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-iris-100 text-iris-600"
                >
                  <Building2 className="size-5" />
                </span>
                <p className="text-[13px] text-slate-3">
                  Can&apos;t find your category?{" "}
                  <Link href="/contact" className="font-semibold text-iris-600 hover:underline">
                    Tell us
                  </Link>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
