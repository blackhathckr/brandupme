import Image from "next/image";
import { ChevronDown, Search, Star } from "lucide-react";
import { ecosystemRoles, popularSearches } from "@/lib/site-data";

// Hexagon layout for the 6 ecosystem-role chips, as % offsets within the
// square wheel container — matches ecosystemRoles order in site-data.
const WHEEL_POSITIONS = [
  { left: "50%", top: "6%" }, // Business Owner — top
  { left: "88%", top: "28%" }, // Promoter — upper right
  { left: "88%", top: "72%" }, // Business Referral Partner — lower right
  { left: "50%", top: "94%" }, // Influencer — bottom
  { left: "12%", top: "72%" }, // Category Partner — lower left
  { left: "12%", top: "28%" }, // Customer — upper left
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#020F08] pb-16 pt-14 sm:pb-20 sm:pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgb(83_160_63/22%),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* left column */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[12.5px] font-semibold text-white">
              <Star className="h-3.5 w-3.5 fill-[#E6C86C] text-[#E6C86C]" />
              10,000+ Businesses Growing Together
            </div>

            <h1 className="mt-5 text-[34px] font-extrabold leading-[1.15] tracking-tight sm:text-[42px] lg:text-[46px]">
              <span className="text-white">One Business Ecosystem,</span>
              <br />
              <span className="text-[#9BD44E]">Endless Opportunities,</span>
              <br />
              <span className="font-serif text-[0.85em] italic font-normal text-[#E6C86C]">
                One Present Turns Into Endless Success.
              </span>
            </h1>

            <p className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-white/60">
              BrandUpMe connects businesses, customers, partners, influencers and
              promoters — creating endless opportunities to grow, connect and
              succeed together.
            </p>

            {/* search bar */}
            <div className="mt-7 flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-black/40 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
                <input
                  type="text"
                  placeholder="Search business, service or product..."
                  className="h-12 w-full rounded-xl border-0 bg-transparent pl-11 pr-4 text-[14px] font-medium text-[#0C1F14] outline-none placeholder:text-[#5F7168]/70"
                />
              </div>
              <div className="hidden h-7 w-px bg-[#E2E8DF] lg:block" />
              <div className="relative lg:w-[150px]">
                <select
                  defaultValue="All Categories"
                  className="h-12 w-full appearance-none rounded-xl border-0 bg-transparent pl-4 pr-8 text-[13.5px] font-medium text-[#0C1F14] outline-none"
                >
                  <option>All Categories</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5F7168]" />
              </div>
              <div className="relative lg:w-[140px]">
                <select
                  defaultValue="All Emirates"
                  className="h-12 w-full appearance-none rounded-xl border-0 bg-transparent pl-4 pr-8 text-[13.5px] font-medium text-[#0C1F14] outline-none"
                >
                  <option>All Emirates</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5F7168]" />
              </div>
              <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#6CB84A] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#5CA23C]">
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[12.5px]">
              <span className="mr-1 text-white/40">Popular Searches:</span>
              {popularSearches.map((term) => (
                <a
                  key={term}
                  href="#"
                  className="rounded-full border border-white/12 px-3 py-1 text-white/65 transition-colors hover:border-[#E6C86C]/40 hover:text-[#E6C86C]"
                >
                  {term}
                </a>
              ))}
            </div>
          </div>

          {/* right column: ecosystem wheel over skyline */}
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <div className="absolute inset-0 overflow-hidden rounded-[28px]">
              <Image
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop"
                alt="Dubai skyline"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[#020F08]/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020F08] via-[#020F08]/40 to-[#020F08]/60 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(230_200_108/22%),transparent_60%)]" />
            </div>

            {/* dashed connecting ring */}
            <div className="absolute inset-[16%] rounded-full border border-dashed border-[#E6C86C]/30" />

            {/* center mark */}
            <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#020F08] shadow-[0_0_40px_10px_rgb(230_200_108/25%)]">
              <Image src="/brand/logo-mark.png" alt="BrandUpMe" width={44} height={44} className="h-10 w-10 object-contain" />
            </div>

            {/* role chips */}
            {ecosystemRoles.map(({ name, icon: Icon }, i) => (
              <div
                key={name}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                style={WHEEL_POSITIONS[i]}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E6C86C]/40 bg-[#020F08] text-[#E6C86C] shadow-lg">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="whitespace-nowrap rounded-full bg-[#020F08]/80 px-2 py-0.5 text-[10.5px] font-semibold text-white">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
