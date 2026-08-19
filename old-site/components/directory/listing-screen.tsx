import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Headphones,
  Map,
  Rocket,
  Share2,
  Star,
} from "lucide-react";
import { BusinessRow } from "./business-row";
import { CategoryIcon } from "@/components/site/category-icon";
import { PromoAd } from "@/components/site/promo-ad";
import { CATEGORY_STRIP_ADS, LISTING_SIDEBAR_ADS } from "@/lib/brand/ads";
import { BUSINESSES, CATEGORY_STATS } from "@/lib/brand/businesses";
import { EMIRATES, toSlug, type DirectoryCategory } from "@/lib/brand/categories";

/**
 * Category / sub-category / search listing.
 *
 * One template serves all three because the mockup is identical apart from the
 * heading and breadcrumb — the client's sub-category page is the same screen
 * with a narrower result set.
 */

const RATING_FILTERS = [
  { stars: 4.5, label: "(4.5 & Above)" },
  { stars: 4, label: "(4.0 & Above)" },
  { stars: 3.5, label: "(3.5 & Above)" },
  { stars: 3, label: "(3.0 & Above)" },
];

const GROW_POINTS = [
  "Premium Business Listing",
  "SEO Optimized Page",
  "Lead Generation Tools",
  "Business Analytics",
];

export function ListingScreen({
  category,
  heading,
  subheading,
  breadcrumb,
  /** Set on a sub-category page so its chip reads as selected. */
  activeSub,
}: {
  category: DirectoryCategory;
  heading: string;
  subheading: string;
  breadcrumb: { label: string; href?: string }[];
  activeSub?: string;
}) {
  const services = category.subcategories ?? [];

  return (
    <main className="container-portal py-6">
      {/* ── Three-across ad strip ──────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-3">
        {CATEGORY_STRIP_ADS.map((ad) => (
          <PromoAd key={ad.id} ad={ad} />
        ))}
      </div>

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="mt-6">
        <ol className="flex flex-wrap items-center gap-2 text-[13px]">
          {breadcrumb.map((b, i) => (
            <li key={b.label} className="flex items-center gap-2">
              {i > 0 ? (
                <ChevronRight aria-hidden className="size-3.5 text-slate-4" />
              ) : null}
              {b.href ? (
                <Link href={b.href} className="text-slate-3 hover:text-iris-600">
                  {b.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-ink">{b.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-4 grid gap-6 xl:grid-cols-[248px_minmax(0,1fr)_312px]">
        {/* ── Filter rail ─────────────────────────────────────────────── */}
        <aside className="xl:sticky xl:top-6 xl:self-start">
          <div className="rounded-xl border border-rule bg-white p-5 shadow-p1">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-slate-ink">Filter Results</h2>
              <button
                type="button"
                className="text-[12.5px] font-semibold text-iris-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            <FilterGroup label="Location">
              <SelectControl options={[...EMIRATES]} />
              <SelectControl options={["All Areas", "Al Quoz", "Business Bay", "Dubai Marina", "Jumeirah"]} />
            </FilterGroup>

            {services.length ? (
              <FilterGroup label="Services">
                <CheckRow label="All Services" defaultChecked={!activeSub} />
                {services.map((s) => (
                  <CheckRow key={s} label={s} defaultChecked={s === activeSub} />
                ))}
              </FilterGroup>
            ) : null}

            <FilterGroup label="Rating">
              {RATING_FILTERS.map((r) => (
                <label
                  key={r.stars}
                  className="flex cursor-pointer items-center gap-2.5 py-1.5"
                >
                  <input
                    type="checkbox"
                    className="size-4 shrink-0 rounded border-rule accent-iris-600"
                  />
                  <span aria-hidden className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < Math.floor(r.stars)
                            ? "size-3 fill-amber-400 text-amber-400"
                            : "size-3 fill-slate-200 text-slate-200"
                        }
                      />
                    ))}
                  </span>
                  <span className="text-[12px] text-slate-3">{r.label}</span>
                </label>
              ))}
            </FilterGroup>

            <FilterGroup label="Verified Business">
              <label className="flex cursor-pointer items-center gap-2.5 py-1.5">
                <input
                  type="checkbox"
                  className="size-4 shrink-0 rounded border-rule accent-iris-600"
                />
                <span className="text-[13px] text-slate-2">Verified Only</span>
                <BadgeCheck className="size-4 text-iris-600" aria-hidden />
              </label>
            </FilterGroup>

            <button
              type="button"
              className="mt-5 h-11 w-full rounded-lg bg-iris-600 text-[14.5px] font-semibold text-white transition-colors hover:bg-iris-700"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* ── Results ─────────────────────────────────────────────────── */}
        <div className="min-w-0">
          <header className="flex flex-wrap items-start gap-5">
            <span
              aria-hidden
              className={`grid size-16 shrink-0 place-items-center rounded-full ${category.chip}`}
            >
              <CategoryIcon name={category.icon} className="size-7" />
            </span>

            <div className="min-w-0 flex-1">
              <h1 className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-slate-ink">
                {heading}
              </h1>
              <p className="mt-1 text-[13.5px] text-slate-3">{subheading}</p>

              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                <StatChip icon={Building2} value={CATEGORY_STATS.total} label="Total Businesses" tone="text-iris-600" />
                <StatChip icon={BadgeCheck} value={CATEGORY_STATS.verified} label="Verified Businesses" tone="text-ok" />
                <StatChip icon={Eye} value={CATEGORY_STATS.views} label="Total Views This Month" tone="text-sky-600" />
                <StatChip icon={Star} value={CATEGORY_STATS.rating} label="Average Rating" tone="text-amber-500" />
              </ul>
            </div>

            <div className="flex shrink-0 flex-col gap-2.5">
              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-rule bg-white px-4 text-[13.5px] font-semibold text-slate-2 transition-colors hover:bg-paper"
              >
                <Map className="size-4" aria-hidden />
                View on Map
              </button>
              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-rule bg-white px-4 text-[13.5px] font-semibold text-slate-2 transition-colors hover:bg-paper"
              >
                <Share2 className="size-4" aria-hidden />
                Share Category
              </button>
            </div>
          </header>

          {/*
            Sub-category navigation. The client's registration form captures a
            sub-category and the Banner Advertising product sells a sub-category
            page placement, so each one needs a real, linkable page — not just a
            filter checkbox.
          */}
          {services.length ? (
            <nav aria-label="Sub-categories" className="mt-6">
              <ul className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href={`/categories/${category.slug}`}
                    className={`inline-flex h-8 items-center rounded-full border px-3.5 text-[12.5px] font-medium transition-colors ${
                      activeSub
                        ? "border-rule bg-white text-slate-2 hover:bg-paper"
                        : "border-iris-600 bg-iris-600 text-white"
                    }`}
                  >
                    All {category.name.replace(/ (Companies|Services)$/, "")}
                  </Link>
                </li>
                {services.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/categories/${category.slug}/${toSlug(s)}`}
                      className={`inline-flex h-8 items-center rounded-full border px-3.5 text-[12.5px] font-medium transition-colors ${
                        s === activeSub
                          ? "border-iris-600 bg-iris-600 text-white"
                          : "border-rule bg-white text-slate-2 hover:border-iris-300 hover:bg-paper"
                      }`}
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-[13.5px] font-semibold text-slate-ink">
              {CATEGORY_STATS.total} Businesses Found
            </p>
            <label className="flex items-center gap-2.5 text-[13px] text-slate-3">
              Sort by:
              <span className="relative">
                <select className="h-9 appearance-none rounded-lg border border-rule bg-white pl-3 pr-9 text-[13px] text-slate-2 outline-none">
                  <option>Most Relevant</option>
                  <option>Highest Rated</option>
                  <option>Most Reviewed</option>
                  <option>Recently Added</option>
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-4"
                />
              </span>
            </label>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-rule bg-white shadow-p1">
            {BUSINESSES.map((b) => (
              <BusinessRow key={b.slug} business={b} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Pagination" className="flex items-center gap-1.5">
              <PageButton disabled>
                <ChevronLeft className="size-4" aria-hidden />
              </PageButton>
              {["1", "2", "3", "4", "5", "…", "25"].map((p) => (
                <PageButton key={p} active={p === "1"}>
                  {p}
                </PageButton>
              ))}
              <PageButton>
                <ChevronRight className="size-4" aria-hidden />
              </PageButton>
            </nav>

            <span className="relative">
              <select className="h-9 appearance-none rounded-lg border border-rule bg-white pl-3 pr-9 text-[13px] text-slate-2 outline-none">
                <option>Show 10 per page</option>
                <option>Show 25 per page</option>
                <option>Show 50 per page</option>
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-4"
              />
            </span>
          </div>
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="space-y-5">
          <div className="relative isolate overflow-hidden rounded-xl bg-gradient-to-br from-iris-700 via-iris-600 to-[#7B3FE4] p-5 text-white">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[15px] font-extrabold leading-tight">
                  Grow Your {category.name.replace(/ (Companies|Services)$/, "")} Business
                </p>
                <Rocket className="size-6 shrink-0 text-white/80" aria-hidden />
              </div>

              <p className="mt-2 text-[12.5px] leading-snug text-white/80">
                List your business and get more visibility, leads &amp; customers.
              </p>

              <ul className="mt-3.5 space-y-1.5">
                {GROW_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-1.5 text-[11.5px] text-white/90">
                    <span aria-hidden className="text-[#8CE6B0]">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <Link
                href="/register/business"
                className="mt-4 flex h-10 items-center justify-center gap-2 rounded-lg bg-white text-[13.5px] font-bold text-iris-700"
              >
                List Your Business
                <ArrowRight className="size-4" aria-hidden />
              </Link>

              <p className="mt-2.5 text-[11px] text-white/70">
                Starts from AED 105/month
              </p>
            </div>
          </div>

          {LISTING_SIDEBAR_ADS.map((ad) => (
            <PromoAd key={ad.id} ad={ad} size="sidebar" className="min-h-[240px]" />
          ))}

          <div className="rounded-xl border border-rule bg-white p-5 text-center shadow-p1">
            <div className="flex items-start gap-3 text-left">
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold text-slate-ink">Need Help?</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-slate-3">
                  Our support team is here to help you.
                </p>
              </div>
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-full bg-iris-100 text-iris-600"
              >
                <Headphones className="size-5" />
              </span>
            </div>
            <Link
              href="/contact"
              className="mt-4 flex h-10 items-center justify-center rounded-lg border border-iris-200 text-[14px] font-semibold text-iris-700 transition-colors hover:bg-iris-50"
            >
              Contact Support
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

/* ── Small parts ──────────────────────────────────────────────────────── */

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-rule-2 pt-4 first-of-type:border-t-0">
      <p className="mb-2.5 text-[13.5px] font-bold text-slate-ink">{label}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function SelectControl({ options }: { options: string[] }) {
  return (
    <div className="relative">
      <select className="h-10 w-full appearance-none rounded-lg border border-rule bg-white pl-3 pr-9 text-[13px] text-slate-2 outline-none">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-4"
      />
    </div>
  );
}

function CheckRow({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-0.5">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-4 shrink-0 rounded border-rule accent-iris-600"
      />
      <span className="text-[13px] text-slate-2">{label}</span>
    </label>
  );
}

function StatChip({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  tone: string;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <Icon className={`size-4 shrink-0 ${tone}`} aria-hidden />
      <span className="leading-tight">
        <span className="block text-[15px] font-extrabold text-slate-ink">{value}</span>
        <span className="block text-[11.5px] text-slate-3">{label}</span>
      </span>
    </li>
  );
}

function PageButton({
  children,
  active,
  disabled,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`grid size-9 place-items-center rounded-lg border text-[13px] font-semibold transition-colors ${
        active
          ? "border-iris-600 bg-iris-600 text-white"
          : "border-rule bg-white text-slate-2 hover:bg-paper"
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}
