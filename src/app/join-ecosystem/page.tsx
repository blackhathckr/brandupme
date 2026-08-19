"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  Check,
  Handshake,
  Megaphone,
  Network,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  UserRound,
} from "lucide-react";
import { ModalPage } from "@/components/site/modal-page";

const ROLES = [
  { key: "owner", name: "Business Owner", icon: UserRound, copy: "Get discovered, generate leads, promote your business and grow visibility." },
  { key: "category", name: "Category Referral Partner", icon: Network, copy: "Build your assigned category and earn rewards." },
  { key: "business", name: "Business Referral Partner", icon: Briefcase, copy: "Bring customers to assigned businesses and earn up to 7% commission." },
  { key: "influencer", name: "Influencer", icon: UserRound, copy: "Discover businesses, collaborate on campaigns and grow your influence." },
  { key: "promoter", name: "Promoter", icon: Megaphone, copy: "Promote BrandUpMe and earn rewards through promotional activities." },
  { key: "customer", name: "Customer", icon: Users, copy: "Discover businesses, access opportunities and earn rewards." },
];

const DCG = [
  { title: "Discover", icon: Users, copy: "Find businesses, services, products and opportunities." },
  { title: "Connect", icon: Handshake, copy: "Connect with the right people and grow together." },
  { title: "Grow", icon: TrendingUp, copy: "Create opportunities, increase visibility and earn rewards." },
];

export default function JoinEcosystemPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ModalPage maxWidth={880}>
      <div className="px-6 py-7 sm:px-9 sm:py-8">
        <div className="grid gap-6 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF7E9] px-3 py-1 text-[11px] font-semibold text-[#2F6F18]">
              <Sparkles className="h-3 w-3" />
              Be Part of Something Bigger
            </div>
            <h1 className="mt-3 text-[32px] font-bold leading-[1.1] text-[#111714] sm:text-[38px]">
              Join the <span className="text-[#2F6F18]">BrandUpMe</span> Ecosystem
            </h1>
            <p className="mt-2 font-serif text-[19px] italic leading-tight text-[#D9A52A]">
              One Business Ecosystem.
              <br />
              Endless Opportunities.
            </p>
            <p className="mt-3 max-w-sm text-[13.5px] leading-[1.5] text-[#58635B]">
              Choose your role and become part of UAE&rsquo;s most powerful business network.
            </p>
          </div>

          {/* supplied hero composite — model + Burj Khalifa, cropped to exclude the baked-in Discover/Connect/Grow badges (rendered separately below) */}
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[320px] overflow-hidden rounded-2xl">
            <Image
              src="/assets/join-ecosystem-hero-crop.png"
              alt="Join the BrandUpMe ecosystem — connecting businesses across the UAE"
              fill
              sizes="320px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* discover / connect / grow */}
        <div className="mt-6 flex items-center justify-between gap-2 rounded-xl border border-[#D9E4D3] bg-[#FBFCFA] p-3">
          {DCG.map(({ title, icon: Icon, copy }, i) => (
            <div key={title} className="flex flex-1 items-center gap-2">
              <div className="flex flex-1 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF7E9] text-[#2F6F18]">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-[#111714]">{title}</p>
                  <p className="hidden text-[10px] leading-snug text-[#58635B] sm:block">{copy}</p>
                </div>
              </div>
              {i < DCG.length - 1 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#D9E4D3]" />}
            </div>
          ))}
        </div>

        {/* participation */}
        <div className="mt-7 flex items-center gap-3">
          <span className="flex flex-1 items-center gap-1.5">
            <span className="h-px flex-1 bg-[#D9E4D3]" />
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9A52A]" />
          </span>
          <h2 className="shrink-0 text-[15px] font-bold text-[#111714]">Choose How You Want to Participate</h2>
          <span className="flex flex-1 items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9A52A]" />
            <span className="h-px flex-1 bg-[#D9E4D3]" />
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {ROLES.map(({ key, name, icon: Icon, copy }) => {
            const isSelected = selected === key;
            return (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={
                  "flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all duration-150 hover:-translate-y-0.5 " +
                  (isSelected
                    ? "border-2 border-[#2F6F18] bg-[#EFF7E9]"
                    : "border-[#D9E4D3] bg-white hover:border-[#2F6F18]/40 hover:bg-[#F4F9F0]")
                }
              >
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF7E9] text-[#2F6F18]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                  {key === "influencer" && (
                    <Star className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-[#2F6F18] text-[#2F6F18]" strokeWidth={2} />
                  )}
                  {isSelected && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2F6F18] text-white">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                  )}
                </span>
                <p className="text-[11.5px] font-semibold leading-tight text-[#111714]">{name}</p>
                <p className="text-[9.5px] leading-[1.3] text-[#58635B]">{copy}</p>
              </button>
            );
          })}
        </div>

      </div>

      {/* security strip + register — one combined bottom bar */}
      <div className="flex flex-col items-center justify-between gap-4 bg-[#06331F] px-6 py-5 sm:flex-row sm:px-9">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#EFF7E9]">
            <ShieldCheck className="h-[18px] w-[18px]" />
          </span>
          <div>
            <p className="text-[13px] font-bold text-white">Secure. Trusted. Reliable.</p>
            <p className="text-[11.5px] text-white/60">Your data is protected with enterprise-grade security.</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <p className="hidden text-[11.5px] text-white/50 sm:block">It&rsquo;s free and easy to get started!</p>
          <a
            href="#"
            className="flex h-[46px] items-center justify-center gap-2 rounded-[10px] bg-[#D9A52A] px-6 text-[14px] font-semibold text-[#17301F] transition-colors hover:bg-[#c99a1f]"
          >
            Register Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </ModalPage>
  );
}
