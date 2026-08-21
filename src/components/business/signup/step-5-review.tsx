"use client";

import { useState } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import { PLANS } from "@/lib/business-owner-data";

export function Step5Review({
  planKey,
  onBack,
  onProceed,
}: {
  planKey: string;
  onBack: () => void;
  onProceed: (totals: { planName: string; durationLabel: string; price: number; vat: number; total: number }) => void;
}) {
  const plan = PLANS.find((p) => p.key === planKey)!;
  const [durationIdx, setDurationIdx] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const duration = plan.durations?.[durationIdx];
  const price = duration ? duration.price : plan.price;
  const vat = Math.round(price * 0.05 * 100) / 100;
  const total = Math.round((price + vat) * 100) / 100;
  const durationLabel = duration ? duration.label : `1 Month`;

  const canProceed = agreeTerms && agreePrivacy;

  return (
    <div>
      <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#3E8130]">Step 5 of 5</p>
      <h1 className="mt-1 text-[26px] font-extrabold text-[#0B1F13]">Review Your Selected Plan</h1>
      <p className="mt-1 text-[13.5px] text-[#5F7168]">
        You&rsquo;re almost there! Review your plan details, choose duration and proceed to payment.
      </p>
      <div className="mt-5 border-t border-[#E5EAE3]" />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_260px]">
        <div>
          <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl bg-[#F4F9F1] p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3E8130] text-white">
              <plan.icon className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-[12.5px] font-semibold text-[#194C11]">You have selected</p>
              <p className="text-[22px] font-extrabold uppercase tracking-wide text-[#194C11]">{plan.name}</p>
              <p className="mt-0.5 text-[12.5px] text-[#3D4B44]">{plan.tagline}</p>
            </div>
            <span className="relative hidden h-full w-[110px] shrink-0 sm:block">
              <Image src={plan.avatar} alt="" fill sizes="110px" className="object-cover object-top" />
            </span>
          </div>

          {plan.durations && (
            <>
              <p className="mt-6 text-[14px] font-bold text-[#0B1F13]">
                1. Choose Duration <span className="text-[#D51F1F]">(Mandatory)</span>
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {plan.durations.map((d, i) => (
                  <button
                    key={d.label}
                    onClick={() => setDurationIdx(i)}
                    className={
                      "rounded-xl border-2 p-3.5 text-left transition-colors " +
                      (i === durationIdx ? "border-[#3E8130] bg-[#F4F9F1]" : "border-[#E5EAE3] hover:border-[#3E8130]/40")
                    }
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 " +
                          (i === durationIdx ? "border-[#3E8130]" : "border-[#DDE6DC]")
                        }
                      >
                        {i === durationIdx && <span className="h-2 w-2 rounded-full bg-[#3E8130]" />}
                      </span>
                      <span className="text-[13px] font-bold text-[#0B1F13]">{d.label}</span>
                    </span>
                    <p className="mt-1 text-[16px] font-extrabold text-[#0B1F13]">AED {d.price}</p>
                    <p className="text-[10.5px] text-[#5F7168]">+ Applicable VAT</p>
                  </button>
                ))}
              </div>
            </>
          )}

          <p className="mt-6 text-[14px] font-bold text-[#194C11]">{plan.name} Includes</p>
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {plan.features.map((f) => (
              <p key={f} className="flex items-start gap-1.5 text-[12.5px] text-[#3D4B44]">
                <span className="mt-0.5 text-[#3E8130]">✓</span>
                {f}
              </p>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-xl bg-[#F4F9F1] p-3.5 text-[12px] text-[#194C11]">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            You can upgrade or renew anytime from your dashboard.
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-[#E5EAE3] p-4">
            <label className="flex items-start gap-2.5 text-[12.5px] text-[#3D4B44]">
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-[#3E8130]" />
              I have read and agree to the BrandUpMe{" "}
              <a href="#" className="font-semibold text-[#3E8130] hover:underline">
                Terms &amp; Conditions
              </a>
              .
            </label>
            <label className="flex items-start gap-2.5 text-[12.5px] text-[#3D4B44]">
              <input type="checkbox" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-[#3E8130]" />
              I have read and agree to the BrandUpMe{" "}
              <a href="#" className="font-semibold text-[#3E8130] hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button onClick={onBack} className="flex h-11 items-center gap-2 rounded-full border border-[#DDE6DC] px-6 text-[13.5px] font-semibold text-[#0B1F13] transition-colors hover:bg-[#F4F9F1]">
              <span aria-hidden>←</span>
              Back
            </button>
            <button
              disabled={!canProceed}
              onClick={() => onProceed({ planName: plan.name, durationLabel, price, vat, total })}
              className="flex h-11 items-center gap-2 rounded-full bg-[#3E8130] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Proceed to Payment
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[#E5EAE3] p-5">
            <p className="text-[14px] font-bold text-[#0B1F13]">Plan Summary</p>
            <div className="mt-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3E8130] text-white">
                <plan.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[13.5px] font-bold text-[#0B1F13]">{plan.name}</p>
                <p className="text-[11.5px] text-[#5F7168]">
                  AED {plan.price} / {plan.period}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-[#EEF1EC] pt-4 text-[13px]">
              <div className="flex items-center justify-between text-[#5F7168]">
                <span>Duration</span>
                <span className="font-semibold text-[#0B1F13]">{durationLabel}</span>
              </div>
              <div className="flex items-center justify-between text-[#5F7168]">
                <span>Plan Price</span>
                <span className="font-semibold text-[#0B1F13]">AED {price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[#5F7168]">
                <span>VAT (5%)</span>
                <span className="font-semibold text-[#0B1F13]">AED {vat.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#EEF1EC] pt-4">
              <span className="text-[13.5px] font-bold text-[#0B1F13]">Total Amount</span>
              <span className="text-[20px] font-extrabold text-[#194C11]">AED {total.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#EFF4FF] p-3 text-[11.5px] text-[#2F6FE4]">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Plan will be activated immediately after successful payment.
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5EAE3] p-5">
            <p className="text-[13.5px] font-bold text-[#0B1F13]">Why Choose BrandUpMe?</p>
            <div className="mt-2.5 flex flex-col gap-1.5">
              {["Grow your business presence", "Receive valuable customer inquiries", "Build trust and credibility", "Upgrade or cancel anytime"].map((t) => (
                <p key={t} className="flex items-start gap-1.5 text-[12px] text-[#3D4B44]">
                  <span className="text-[#3E8130]">✓</span>
                  {t}
                </p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
