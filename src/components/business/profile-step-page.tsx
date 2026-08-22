"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp } from "lucide-react";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { ProfileEditStepper } from "@/components/business/profile-edit-stepper";

export function ProfileStepPage({
  step,
  title,
  subtitle,
  why,
  whyIcon: WhyIcon,
  prevHref,
  nextHref,
  nextLabel = "Save & Next",
  children,
}: {
  step: number;
  title: string;
  subtitle: string;
  why: string[];
  whyIcon: React.ComponentType<{ className?: string }>;
  prevHref: string;
  nextHref: string;
  nextLabel?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1180px]">
        <ProfileEditStepper current={step} />

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0 rounded-2xl border border-[#E5EAE3] bg-white p-6 sm:p-7">
            <p className="flex items-center gap-2 text-[13px] font-bold text-[#3E8130]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3E8130] text-[11px] text-white">{step}</span>
              STEP {step} OF 6
            </p>
            <h1 className="mt-1 text-[24px] font-extrabold text-[#0B1F13]">{title}</h1>
            <p className="mt-1 text-[13.5px] text-[#5F7168]">{subtitle}</p>
            <div className="mt-5 border-t border-[#E5EAE3]" />

            <div className="mt-6">{children}</div>

            <div className="mt-7 flex items-center justify-between gap-3">
              <button
                onClick={() => router.push(prevHref)}
                className="flex h-11 items-center gap-2 rounded-full border border-[#DDE6DC] px-6 text-[13.5px] font-semibold text-[#0B1F13] transition-colors hover:bg-[#F4F9F1]"
              >
                <span aria-hidden>←</span>
                Back
              </button>
              <Link
                href={nextHref}
                className="flex h-11 items-center gap-2 rounded-full bg-[#3E8130] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425]"
              >
                {nextLabel}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
              <p className="text-[13.5px] font-bold text-[#0B1F13]">Why is this important?</p>
              <div className="mt-3 flex flex-col gap-3">
                {why.map((t) => (
                  <p key={t} className="flex items-start gap-2 text-[12.5px] text-[#3D4B44]">
                    <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3E8130]" />
                    {t}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#E5EAE3] bg-[#F4F9F1] p-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#3E8130]">
                <WhyIcon className="h-6 w-6" />
              </span>
              <p className="text-[12px] font-semibold text-[#194C11]">Tip: complete every step for full visibility</p>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
