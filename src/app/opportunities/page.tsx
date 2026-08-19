import Link from "next/link";
import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Gift,
  Handshake,
  Heart,
  Megaphone,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserStar,
  UsersRound,
} from "lucide-react";
import { ModalPage } from "@/components/site/modal-page";
import { RakbankAd } from "@/components/site/real-ads";

const OPPORTUNITIES = [
  { title: "Promoter Opportunities", copy: "Join as a BrandUpMe Promoter and earn rewards.", icon: UserStar },
  { title: "Category Referral Partner", copy: "Build and grow an assigned business category and earn commission.", icon: Network },
  { title: "Business Referral Partner", copy: "Help selected businesses get customers and earn commission.", icon: Handshake },
  { title: "Influencer Opportunities", copy: "Connect with listed businesses for content and collaboration opportunities.", icon: Megaphone },
  { title: "Exclusive Business Offers", copy: "Discover special offers from listed businesses.", icon: Gift },
  { title: "Lead Opportunities", copy: "Find businesses looking for customers, services or business connections.", icon: Target },
  { title: "Collaboration Opportunities", copy: "Discover businesses, partners and professionals for collaboration.", icon: UsersRound },
  { title: "Reward Opportunities", copy: "See activities that can earn points, cashback or commission.", icon: Award },
];

const TRUST_BADGES = [
  { title: "Trusted Ecosystem", copy: "Verified & Reliable", icon: ShieldCheck },
  { title: "Endless Opportunities", copy: "To Grow & Earn", icon: Sparkles },
  { title: "Right Connections", copy: "Right People", icon: Handshake },
  { title: "Together Stronger", copy: "For UAE Business", icon: Heart },
];

export default function OpportunitiesPage() {
  return (
    <ModalPage maxWidth={840}>
      <div className="px-6 py-7 sm:px-9 sm:py-8">
        <nav className="flex items-center gap-1 text-[12.5px]">
          <Link href="/" className="flex items-center gap-0.5 font-semibold text-[#101510] transition-colors hover:text-[#6FA52B]">
            <ChevronLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#657268]/50" />
          <span className="font-medium text-[#6FA52B]">Opportunities</span>
        </nav>

        <div className="mt-4 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B1F13] text-white">
            <Trophy className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <div>
            <h1 className="text-[28px] font-bold leading-tight text-[#101510] sm:text-[32px]">Opportunities</h1>
            <p className="mt-1 max-w-lg text-[13.5px] leading-[1.5] text-[#657268]">
              Discover new ways to connect, collaborate and grow through the UAE business ecosystem.
            </p>
          </div>
        </div>

        {/* single 970x90 horizontal ad — the only ad on this screen */}
        <div className="mt-6">
          <RakbankAd variant="power" />
        </div>

        {/* section header with accent mark */}
        <div className="mt-6 flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-[#6FA52B]" />
          <h2 className="text-[17px] font-bold text-[#101510]">Explore Your Opportunities</h2>
        </div>

        {/* 8 opportunity cards — 2 columns */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OPPORTUNITIES.map(({ title, copy, icon: Icon }) => (
            <a
              key={title}
              href="#"
              className="group flex items-center gap-3.5 rounded-xl border border-[#E5EAE3] bg-white p-4 transition-all hover:border-[#6FA52B]/50 hover:bg-[#F7FBF5]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF6DF] text-[#4a7a1a]">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14.5px] font-bold text-[#101510]">{title}</p>
                <p className="mt-0.5 text-[12.5px] leading-[1.35] text-[#657268]">{copy}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#657268]/40 transition-colors group-hover:text-[#6FA52B]" />
            </a>
          ))}
        </div>

        {/* footer advertise CTA */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-[#EFF7E9] px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#6FA52B] sm:flex">
              <Megaphone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[14.5px] font-bold text-[#101510]">
                Want to promote your business or reach more opportunities?
              </p>
              <p className="text-[13px] text-[#657268]">Advertise with BrandUpMe and grow faster together.</p>
            </div>
          </div>
          <a
            href="#"
            className="flex h-[42px] w-[150px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#17301F] text-[13px] font-semibold text-white transition-colors hover:bg-[#0B1F13]"
          >
            Advertise Here
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* trust badges row */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TRUST_BADGES.map(({ title, copy, icon: Icon }) => (
            <div key={title} className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-[#6FA52B]" />
              <div className="leading-tight">
                <p className="text-[12px] font-semibold text-[#101510]">{title}</p>
                <p className="text-[10.5px] text-[#657268]">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalPage>
  );
}
