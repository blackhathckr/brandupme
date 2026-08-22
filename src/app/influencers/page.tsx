import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FileEdit,
  Gift,
  Handshake,
  Heart,
  Megaphone,
  PlayCircle,
  ShieldCheck,
  Star,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  UsersRound,
} from "lucide-react";
import { ModalPage } from "@/components/site/modal-page";
import { Skyline } from "@/components/site/skyline";
import { SiteFooter } from "@/components/site/site-footer";

const WHY_JOIN = [
  { title: "Collaborate", copy: "Work with top businesses and brands across UAE.", icon: Users },
  { title: "Earn Rewards", copy: "Earn attractive rewards and incentives for every campaign.", icon: Gift },
  { title: "Grow Your Brand", copy: "Increase your reach, engagement and build your personal brand.", icon: TrendingUp },
  { title: "Exclusive Campaigns", copy: "Get early access to exciting campaigns, events and brand deals.", icon: Megaphone },
  { title: "Trusted Platform", copy: "Be part of a verified and trusted influencer community.", icon: ShieldCheck },
];

const STEPS = [
  { step: 1, title: "Apply", copy: "Sign up and submit your details to become a verified influencer.", icon: FileEdit },
  { step: 2, title: "Get Approved", copy: "Our team reviews your profile and approves your account.", icon: UserCheck },
  { step: 3, title: "Collaborate", copy: "Get matched with brands and receive campaign invitations.", icon: Handshake },
  { step: 4, title: "Create & Promote", copy: "Create amazing content and promote brands authentically.", icon: PlayCircle },
  { step: 5, title: "Earn & Grow", copy: "Earn rewards, incentives and grow your influence with every success.", icon: Trophy },
];

const WHO_CAN_JOIN = [
  "Content Creators",
  "Social Media Influencers",
  "Bloggers & Vloggers",
  "Industry Experts",
  "Anyone with a passion to inspire & influence",
];

export default function InfluencersPage() {
  return (
    <ModalPage maxWidth={820}>
      <div className="px-6 py-7 sm:px-9 sm:py-9">
        <nav className="flex items-center gap-1 text-[12.5px]">
          <Link href="/" className="flex items-center gap-0.5 font-semibold text-[#101510] transition-colors hover:text-[#6FA52B]">
            <ChevronLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#657268]/50" />
          <span className="font-medium text-[#6FA52B]">Influencers</span>
        </nav>

        {/* hero */}
        <div className="mt-4 grid gap-6 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
          <div>
            <h1 className="text-[30px] font-bold leading-tight text-[#17301F] sm:text-[34px]">
              Influencer Program
            </h1>
            <p className="font-serif text-[19px] italic text-[#D6A928]">Inspire. Influence. Impact.</p>
            <p className="mt-2 max-w-sm text-[14px] leading-[1.55] text-[#657268]">
              Be part of a powerful network of creators and brands. Collaborate, create amazing content and earn
              while you grow your influence with BrandUpMe.
            </p>
            <a
              href="#"
              className="mt-4 inline-flex h-[42px] items-center gap-2 rounded-full bg-[#6FA52B] px-5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#5D8F23]"
            >
              Join Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* hero photo, re-cropped to drop the ring-light/tripod/social-app-icon
              cluster baked into the raw asset; "Brand Collaborations" badge is
              still baked in on the right, "10K+ Followers" and "Earn Rewards"
              are recreated as floating badges since the crop that keeps them
              also keeps the equipment/icon clutter */}
          <div className="relative mx-auto aspect-square w-full max-w-[260px]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <Image
                src="/assets/influencer-hero-crop-v2.png"
                alt="Influencer creating content for BrandUpMe partner brands — 10K+ followers, brand collaborations, earn rewards"
                fill
                sizes="260px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -left-3 -top-3 flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-2 shadow-[0_6px_16px_rgba(0,0,0,0.15)]">
              <Heart className="h-4 w-4 fill-[#6FA52B] text-[#6FA52B]" />
              <p className="text-[11px] font-bold leading-tight text-[#101510]">
                10K+
                <br />
                Followers
              </p>
            </div>
            <div className="absolute -bottom-3 -left-3 flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-2 shadow-[0_6px_16px_rgba(0,0,0,0.15)]">
              <TrendingUp className="h-4 w-4 text-[#6FA52B]" />
              <p className="text-[11px] font-bold leading-tight text-[#101510]">
                Earn
                <br />
                Rewards
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-[12px] font-medium text-[#5D8F23] sm:justify-start">
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          Verified Influencers. Real Opportunities. Endless Growth.
        </p>

        {/* why join */}
        <h2 className="mt-8 flex items-center gap-2 text-[19px] font-bold text-[#17301F]">
          <ChevronRight className="h-4 w-4 text-[#6FA52B]" />
          Why Join as an Influencer?
          <ChevronRight className="h-4 w-4 rotate-180 text-[#6FA52B]" />
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {WHY_JOIN.map(({ title, copy, icon: Icon }) => (
            <div key={title} className="flex flex-col items-center gap-2 rounded-xl border border-[#EAF6DF] p-3.5 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF7E9] text-[#6FA52B]">
                <Icon className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <p className="text-[12.5px] font-semibold leading-tight text-[#17301F]">{title}</p>
              <p className="text-[10.5px] leading-[1.3] text-[#657268]">{copy}</p>
            </div>
          ))}
        </div>

        {/* how it works */}
        <h2 className="mt-8 flex items-center gap-2 text-[19px] font-bold text-[#17301F]">
          <ChevronRight className="h-4 w-4 text-[#6FA52B]" />
          How It Works
          <ChevronRight className="h-4 w-4 rotate-180 text-[#6FA52B]" />
        </h2>
        <div className="relative mt-8">
          <div className="absolute left-0 right-0 top-7 hidden border-t border-dashed border-[#DDE9D8] sm:block" />
          <div className="relative grid grid-cols-1 gap-y-6 sm:grid-cols-5 sm:gap-x-3">
            {STEPS.map(({ step, title, copy, icon: Icon }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#6FA52B]/40 bg-white text-[#6FA52B]">
                  <Icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <p className="mt-2 text-[12.5px] font-bold text-[#17301F]">
                  {step}. {title}
                </p>
                <p className="mt-1 max-w-[140px] text-[10.5px] leading-[1.3] text-[#657268]">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* be seen / who can join / ready to grow — 3 equal columns, the third doubles as the ad slot */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl bg-[#0B2814] px-5 py-6">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgb(214_169_40/18%),transparent_60%)]" />
            <h2 className="relative text-[20px] font-extrabold leading-tight">
              <span className="block text-[#8FD14F]">Be Seen.</span>
              <span className="block text-[#C7E6A8]">Be Heard.</span>
              <span className="block text-white">Be Rewarded.</span>
            </h2>
            <p className="relative mt-2 text-[12.5px] leading-[1.4] text-white/60">
              Turn your influence into opportunities and rewards.
            </p>
            <div className="relative mt-4 flex items-center gap-2">
              {[Megaphone, PlayCircle, UsersRound, Star].map((Icon, i) => (
                <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#8FD14F]">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#EAF6DF] px-5 py-6">
            <h2 className="text-[17px] font-bold text-[#17301F]">Who Can Join?</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {WHO_CAN_JOIN.map((a) => (
                <li key={a} className="flex items-center gap-2.5 text-[12.5px] leading-[1.3] text-[#3D4B34]">
                  <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#EAF6DF] text-[#6FA52B]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="relative overflow-hidden rounded-2xl bg-[#17301F] px-5 py-6">
              <div className="absolute inset-x-0 bottom-0 opacity-40">
                <Skyline />
              </div>
              <div className="relative">
                <h3 className="text-[17px] font-bold text-white">Ready to Grow Your Influence?</h3>
                <p className="mt-1.5 text-[12px] leading-[1.4] text-white/60">
                  Join thousands of creators who are earning, growing and making an impact every day.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#101510] px-4 text-[12.5px] font-semibold text-white transition-colors hover:bg-black"
                >
                  Join Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-[#657268]/60">Advertisement 300 x 250</p>
          </div>
        </div>

        {/* final CTA bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-[#EFF7E9] px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#6FA52B] sm:flex">
              <Megaphone className="h-5 w-5" />
            </span>
            <p className="text-[13.5px] font-medium text-[#3D4B34]">
              Get exclusive opportunities, collaborate with top brands and earn rewards for your influence.
            </p>
          </div>
          <a
            href="#"
            className="flex h-[42px] w-[150px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#6FA52B] text-[13px] font-semibold text-white transition-colors hover:bg-[#5D8F23]"
          >
            Join Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <SiteFooter />
    </ModalPage>
  );
}
