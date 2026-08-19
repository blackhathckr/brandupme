import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Gift,
  Handshake,
  Megaphone,
  ShieldCheck,
  Sparkle,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { ModalPage } from "@/components/site/modal-page";
import { Skyline } from "@/components/site/skyline";
import { SiteFooter } from "@/components/site/site-footer";

const CATEGORY_POINTS = [
  "Promote your assigned category",
  "Bring more businesses to list",
  "Help category grow and succeed",
  "Earn generous rewards",
];

const BUSINESS_POINTS = [
  "Generate quality leads for the businesses",
  "Help close deals and bring real customers",
  "Earn commission on every successful deal",
  "Unlimited earning potential",
];

const WHY_PARTNER = [
  { title: "High Earning Potential", copy: "Unlimited income opportunities.", tone: "red" as const },
  { title: "Transparent & Trusted", copy: "Clear tracking and instant updates.", tone: "green" as const },
  { title: "Lucrative Rewards", copy: "Cash rewards, bonuses & more.", tone: "red" as const },
  { title: "Timely Payouts", copy: "Fast and secure payments.", tone: "green" as const },
  { title: "Easy & Flexible", copy: "Work on your time, from anywhere.", tone: "red" as const },
  { title: "Grow Together", copy: "Be part of UAE's leading ecosystem.", tone: "green" as const },
];

const tone = {
  red: "bg-[#FDECEC] text-[#D51F1F]",
  green: "bg-[#EAF6DF] text-[#5D8F23]",
};

export default function PartnersPage() {
  return (
    <ModalPage maxWidth={860}>
      <div className="px-6 py-7 sm:px-9 sm:py-8">
        <nav className="flex items-center gap-1 text-[12.5px]">
          <Link href="/" className="flex items-center gap-0.5 font-semibold text-[#101510] transition-colors hover:text-[#6FA52B]">
            <ChevronLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#657268]/50" />
          <span className="font-medium text-[#6FA52B]">Partners</span>
        </nav>

        <h1 className="mt-4 text-[28px] font-bold leading-tight text-[#101510] sm:text-[32px]">
          Partner With BrandUpMe
        </h1>
        <p className="mt-1.5 max-w-lg text-[13.5px] leading-[1.5] text-[#657268]">
          Join BrandUpMe Partner Programs and earn exciting rewards while helping businesses grow and succeed
          across the UAE.
        </p>

        {/* reward strip — light card, not a dark bar */}
        <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-xl bg-[#F3F9EF] px-6 py-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#6FA52B]">
              <Gift className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[15px] font-bold text-[#101510]">
                Earn Rewards Up To <span className="text-[#101510]">AED 1,000</span>
              </p>
              <p className="text-[12.5px] text-[#657268]">Per Successful Business Listing</p>
            </div>
          </div>
          <a
            href="#"
            className="flex h-[42px] w-[155px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#17301F] text-[13px] font-semibold text-white transition-colors hover:bg-[#0B1F13]"
          >
            Join as Partner
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Programme 1 — Category Referral Partner (green) */}
        <div className="mt-4 rounded-2xl bg-[#EDF7E6] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DCEFD0] text-[#4a7a1a]">
                <Boxes className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-[17px] font-bold text-[#101510]">1. Category Referral Partner</h2>
                <p className="mt-1 max-w-sm text-[13px] leading-[1.5] text-[#657268]">
                  Build and grow an assigned business category and earn attractive rewards.
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {CATEGORY_POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[12.5px] text-[#3D4B34]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5D8F23]" strokeWidth={2.5} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="shrink-0 text-center sm:text-right">
              <p className="text-[13px] font-semibold text-[#101510]">Earn Rewards</p>
              <p className="text-[11px] text-[#657268]">Up To</p>
              <p className="text-[28px] font-extrabold leading-tight text-[#101510]">AED 1,000</p>
              <p className="text-[11px] text-[#657268]">Per Successful Business Listing</p>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#5D8F23] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#4a7a1a]"
              >
                Become Category Partner
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Programme 2 — Business Referral Partner (red) */}
        <div className="mt-4 rounded-2xl bg-[#FCD8D6] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FADCDC] text-[#D51F1F]">
                <Handshake className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-[17px] font-bold text-[#101510]">2. Business Referral Partner</h2>
                <p className="mt-1 max-w-sm text-[13px] leading-[1.5] text-[#657268]">
                  Get customers for selected business companies you are assigned.
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {BUSINESS_POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[12.5px] text-[#4B3D3D]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D51F1F]" strokeWidth={2.5} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="shrink-0 text-center sm:text-right">
              <p className="text-[13px] font-semibold text-[#101510]">Earn Commission</p>
              <p className="text-[11px] text-[#657268]">Up To</p>
              <p className="text-[30px] font-extrabold leading-none text-[#D51F1F]">7%</p>
              <p className="text-[11px] text-[#657268]">On Successful Deals</p>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#D51F1F] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#b31919]"
              >
                Become Business Partner
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Why Become a Partner + 300x250 house ad */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="flex gap-5 rounded-2xl border border-[#EEF1EC] p-5">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FBF2DC] text-[#D6A928] sm:flex">
              <Trophy className="h-7 w-7" />
            </span>
            <div className="flex-1">
              <h2 className="text-[15px] font-bold text-[#101510]">Why Become a Partner?</h2>
              <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                {WHY_PARTNER.map(({ title, copy, tone: t }) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${tone[t]}`}>
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[12.5px] font-semibold text-[#101510]">{title}</p>
                      <p className="text-[11px] text-[#657268]">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* house ad — dramatic self-promo, not a real client */}
          <div className="mx-auto w-full max-w-[300px]">
            <div
              className="relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#7A1010] to-[#B3271A] p-5"
              style={{ aspectRatio: "300 / 250" }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 opacity-60">
                <Skyline />
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0">
                {[
                  { top: "12%", left: "78%", size: 14, rotate: -12 },
                  { top: "22%", left: "18%", size: 10, rotate: 20 },
                  { top: "42%", left: "88%", size: 8, rotate: 8 },
                  { top: "8%", left: "45%", size: 9, rotate: -20 },
                  { top: "55%", left: "8%", size: 11, rotate: 15 },
                  { top: "30%", left: "62%", size: 7, rotate: 0 },
                ].map((s, i) => (
                  <Sparkle
                    key={i}
                    className="absolute fill-[#D6A928] text-[#D6A928] opacity-70"
                    style={{ top: s.top, left: s.left, width: s.size, height: s.size, transform: `rotate(${s.rotate}deg)` }}
                  />
                ))}
              </div>
              <p className="relative text-[19px] font-extrabold leading-tight text-white">
                Your Effort.
                <br />
                Our Rewards.
                <br />
                Limitless Earnings!
              </p>
              <a
                href="#"
                className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-[#D6A928] px-4 py-2 text-[12px] font-bold text-[#17301F] transition-colors hover:bg-[#c99a1f]"
              >
                Learn More &rarr;
              </a>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-[#657268]/60">Advertisement 300 x 250</p>
          </div>
        </div>

        {/* business network CTA — outline style */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-[#F3F9EF] px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#6FA52B] sm:flex">
              <Megaphone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[14.5px] font-bold text-[#101510]">Have a business network?</p>
              <p className="text-[13px] text-[#657268]">Partner with BrandUpMe and turn connections into rewards.</p>
            </div>
          </div>
          <a
            href="#"
            className="flex h-[42px] w-[150px] shrink-0 items-center justify-center gap-2 rounded-full border border-[#17301F] bg-white text-[13px] font-semibold text-[#17301F] transition-colors hover:bg-[#F3F9EF]"
          >
            Advertise Here
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <SiteFooter />
    </ModalPage>
  );
}
