import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  Eye,
  Headphones,
  Megaphone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { CategoryIcon } from "@/components/site/category-icon";
import { CATEGORIES, EMIRATES } from "@/lib/brand/categories";
import { AdBanner } from "@/components/site/ad-banner";

/**
 * Home page, replicated from the client's mockup: hero over the Dubai skyline
 * with the offer card, the search rail, the popular-categories strip, the
 * statistics band and the five-step "How It Works" row.
 *
 * The mockup image stops after How It Works, so the sections below it are built
 * from the client's own copy elsewhere in the brief — the partner programmes he
 * asked to be visible to visitors ("he can become our client, our customer, our
 * promoter") and the Advertise Here entry point.
 */

const HERO_POINTS = [
  { icon: ShieldCheck, title: "Verified Businesses", sub: "100% Verified Listings" },
  { icon: TrendingUp, title: "Grow Your Business", sub: "Leads, Visibility & More" },
  { icon: Headphones, title: "24/7 Support", sub: "We're Here to Help" },
];

const OFFER_POINTS = [
  "Premium Business Listing",
  "SEO Optimized Business Page",
  "Digital Business Card",
  "Lead Generation & More",
];

const STATS = [
  { icon: Building2, value: "10,000+", label: "Verified Businesses", chip: "bg-iris-100 text-iris-600" },
  { icon: Users, value: "25,000+", label: "Happy Customers", chip: "bg-emerald-100 text-emerald-600" },
  { icon: TrendingUp, value: "50,000+", label: "Leads Generated", chip: "bg-amber-100 text-amber-600" },
  { icon: Eye, value: "2M+", label: "Business Page Views", chip: "bg-sky-100 text-sky-600" },
  { icon: ShieldCheck, value: "100%", label: "Verified & Trusted", chip: "bg-violet-100 text-violet-600" },
];

const STEPS = [
  { n: "1", title: "Register", body: "Create your business account in minutes.", chip: "bg-iris-600" },
  { n: "2", title: "Choose Plan", body: "Select the best plan that fits your needs.", chip: "bg-blue-600" },
  { n: "3", title: "Get Listed", body: "Your business will be live on our platform.", chip: "bg-emerald-600" },
  { n: "4", title: "Get Visible", body: "Get more visibility, leads and customers.", chip: "bg-amber-500" },
  { n: "5", title: "Grow Business", body: "Boost your sales and grow your brand.", chip: "bg-violet-600" },
];

const JOURNEYS = [
  {
    icon: Building2,
    title: "Business Owner",
    body: "List your business, receive customer inquiries, run video meetings and close deals.",
    cta: "Register Your Business",
    href: "/register/business",
    chip: "bg-iris-100 text-iris-600",
  },
  {
    icon: Megaphone,
    title: "Promoter",
    body: "Share BrandUpMe with your network and earn up to AED 500 every month.",
    cta: "Become a Promoter",
    href: "/register",
    chip: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Users,
    title: "Referral Partner",
    body: "Bring businesses from your industry onto the platform and earn up to AED 1,000 monthly.",
    cta: "Become a Partner",
    href: "/register",
    chip: "bg-amber-100 text-amber-600",
  },
  {
    icon: Sparkles,
    title: "Influencer",
    body: "Get discovered by verified businesses looking for content creators like you.",
    cta: "Join as Influencer",
    href: "/register",
    chip: "bg-rose-100 text-rose-500",
  },
];

export function HomeScreen() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-navy">
        {/* Skyline stand-in — replaced by the client's photography */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[#0A1322] via-[#182448] to-[#4A2E7A]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#2A1B4D]/80 to-transparent"
        />
        <div
          aria-hidden
          className="absolute -right-24 top-10 size-[420px] rounded-full bg-iris-500/20 blur-3xl"
        />

        <div className="container-portal relative py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            <div className="text-white">
              <span className="inline-flex items-center rounded-md bg-white/15 px-3 py-1.5 text-[12.5px] font-semibold backdrop-blur">
                Trusted by 10,000+ Businesses
              </span>

              <h1 className="mt-5 text-[44px] font-extrabold leading-[1.08] tracking-[-0.025em] lg:text-[52px]">
                Find, Connect &amp; Grow
                <span className="mt-1 block text-iris-300">
                  Your Business in UAE
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-white/80">
                The smart way to discover verified businesses, generate leads,
                and grow your brand with powerful digital tools.
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-9 gap-y-4">
                {HERO_POINTS.map(({ icon: Icon, title, sub }) => (
                  <li key={title} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-iris-600"
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[13.5px] font-bold">{title}</span>
                      <span className="block text-[12px] text-white/65">{sub}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Offer card */}
            <div className="rounded-xl bg-white p-6 shadow-p3">
              <div className="flex items-start gap-3.5">
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-iris-100 text-iris-600"
                >
                  <Rocket className="size-6" />
                </span>
                <div>
                  <p className="text-[12.5px] font-medium text-slate-3">
                    Grow Your Business
                  </p>
                  <p className="text-[19px] font-extrabold leading-tight tracking-tight text-slate-ink">
                    Get More Visibility, Leads &amp; Sales
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5">
                {OFFER_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <CheckCircle2 aria-hidden className="mt-px size-4 shrink-0 text-ok" />
                    <span className="text-[13.5px] font-medium text-slate-2">{p}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register/business"
                className="mt-5 flex h-12 items-center justify-center gap-2 rounded-lg bg-iris-600 text-[15px] font-bold text-white shadow-iris transition-colors hover:bg-iris-700"
              >
                Register Your Business
                <ArrowRight className="size-4" aria-hidden />
              </Link>

              <p className="mt-3 text-center text-[13px] text-slate-3">
                Starts from{" "}
                <span className="font-semibold text-slate-2">AED 105/month</span>
              </p>
            </div>
          </div>

          {/* Search rail */}
          <form
            action="/search"
            className="mt-10 grid gap-3 rounded-xl bg-white/95 p-3 shadow-p3 backdrop-blur lg:grid-cols-[minmax(0,1fr)_210px_210px_150px]"
          >
            <div className="flex min-w-0 items-center gap-2.5 rounded-lg border border-rule px-3.5">
              <Search className="size-4 shrink-0 text-slate-4" aria-hidden />
              <input
                name="q"
                placeholder="Search business or service..."
                className="h-11 w-full min-w-0 bg-transparent text-sm text-slate-ink outline-none placeholder:text-slate-4"
              />
            </div>

            <SelectPill label="All Categories" options={CATEGORIES.map((c) => c.name)} name="category" />
            <SelectPill label="All Emirates" options={[...EMIRATES]} name="emirate" />

            <button
              type="submit"
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-iris-600 text-[15px] font-semibold text-white transition-colors hover:bg-iris-700"
            >
              <Search className="size-4" aria-hidden />
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ── Popular categories ────────────────────────────────────────── */}
      <section className="container-portal -mt-6 relative z-10">
        <div className="rounded-xl border border-rule bg-white p-6 shadow-p2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[17px] font-bold text-slate-ink">
              Popular Business Categories
            </h2>
            <Link
              href="/categories"
              className="flex shrink-0 items-center gap-1.5 text-[13.5px] font-semibold text-iris-600 hover:underline"
            >
              View All Categories
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-11">
            {CATEGORIES.slice(0, 10).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="group flex flex-col items-center gap-2.5 text-center"
                >
                  <span
                    className={`grid size-14 place-items-center rounded-full transition-transform group-hover:scale-105 ${c.chip}`}
                  >
                    <CategoryIcon name={c.icon} className="size-6" />
                  </span>
                  <span className="text-[11.5px] font-medium leading-tight text-slate-2 group-hover:text-iris-600">
                    {c.name.replace(/ (Companies|Services|Consultancy)$/, "")}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/categories"
                className="group flex flex-col items-center gap-2.5 text-center"
              >
                <span className="grid size-14 place-items-center rounded-full bg-paper text-slate-3 transition-transform group-hover:scale-105">
                  <BarChart3 className="size-6" />
                </span>
                <span className="text-[11.5px] font-medium leading-tight text-slate-2 group-hover:text-iris-600">
                  More
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section className="container-portal mt-6">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map(({ icon: Icon, value, label, chip }) => (
            <li key={label} className="flex items-center gap-3.5 bg-white p-6">
              <span
                aria-hidden
                className={`grid size-11 shrink-0 place-items-center rounded-lg ${chip}`}
              >
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block text-[22px] font-extrabold leading-none tracking-tight text-slate-ink">
                  {value}
                </span>
                <span className="mt-1 block text-[12.5px] text-slate-3">{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section className="mt-16 bg-paper py-14">
        <div className="container-portal">
          <h2 className="text-center text-[30px] font-extrabold tracking-[-0.02em] text-slate-ink">
            How It Works
          </h2>
          <p className="mt-2 text-center text-[15px] text-slate-3">
            Simple steps to grow your business with us
          </p>

          <ol className="mt-9 grid gap-4 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="h-full rounded-xl border border-rule bg-white p-5">
                  <span
                    aria-hidden
                    className={`grid size-12 place-items-center rounded-full text-[17px] font-bold text-white ${s.chip}`}
                  >
                    {s.n}
                  </span>
                  <p className="mt-3.5 text-[15px] font-bold text-slate-ink">
                    {s.n}. {s.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-slate-3">{s.body}</p>
                </div>

                {i < STEPS.length - 1 ? (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-slate-4 lg:block"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Ways to join ──────────────────────────────────────────────── */}
      <section className="container-portal py-14">
        <h2 className="text-center text-[30px] font-extrabold tracking-[-0.02em] text-slate-ink">
          One Platform. Many Ways to Grow.
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-[15px] text-slate-3">
          Whether you own a business, promote one or create content, there is a
          place for you on BrandUpMe.
        </p>

        <ul className="mt-9 grid gap-4 lg:grid-cols-4">
          {JOURNEYS.map(({ icon: Icon, title, body, cta, href, chip }) => (
            <li
              key={title}
              className="flex flex-col rounded-xl border border-rule bg-white p-6 transition-shadow hover:shadow-p2"
            >
              <span
                aria-hidden
                className={`grid size-12 place-items-center rounded-full ${chip}`}
              >
                <Icon className="size-6" />
              </span>
              <p className="mt-4 text-[17px] font-bold text-slate-ink">{title}</p>
              <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-slate-3">
                {body}
              </p>
              <Link
                href={href}
                className="mt-4 flex items-center gap-1.5 text-[13.5px] font-semibold text-iris-600 hover:underline"
              >
                {cta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <AdBanner creative="goglobal" className="mt-10" />
      </section>
    </>
  );
}

function SelectPill({
  label,
  options,
  name,
}: {
  label: string;
  options: string[];
  name: string;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue=""
        className="h-11 w-full appearance-none rounded-lg border border-rule bg-white pl-3.5 pr-9 text-sm text-slate-2 outline-none"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-4"
      />
    </div>
  );
}
