"use client";

import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import { PLANS, type Plan } from "@/lib/business-owner-data";

const TONE_CLASSES: Record<string, { badge: string; ring: string; button: string }> = {
  green: { badge: "text-[#3E8130]", ring: "border-[#3E8130]", button: "bg-[#3E8130] hover:bg-[#2F6425] text-white" },
  blue: { badge: "text-[#2F6FE4]", ring: "border-[#2F6FE4]", button: "bg-[#2F6FE4] hover:bg-[#255ac0] text-white" },
  sky: { badge: "text-[#1E88C7]", ring: "border-[#1E88C7]", button: "bg-[#1E88C7] hover:bg-[#186fa1] text-white" },
  purple: { badge: "text-[#7C5CD1]", ring: "border-[#7C5CD1]", button: "bg-[#7C5CD1] hover:bg-[#6a4bb8] text-white" },
  orange: { badge: "text-[#E07A1F]", ring: "border-[#E07A1F]", button: "bg-[#E07A1F] hover:bg-[#c6690f] text-white" },
  teal: { badge: "text-[#1D8F82]", ring: "border-[#1D8F82]", button: "bg-[#1D8F82] hover:bg-[#166e64] text-white" },
  dark: { badge: "text-[#B98A2E]", ring: "border-[#101510]", button: "bg-[#101510] hover:bg-black text-white" },
};

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: () => void }) {
  const tone = TONE_CLASSES[plan.tone];
  return (
    <div
      className={
        "relative flex w-full shrink-0 flex-col rounded-2xl border bg-white p-5 sm:w-[220px] " +
        (plan.popular || plan.maxExposure ? tone.ring + " border-2" : "border-[#E5EAE3]")
      }
    >
      {(plan.popular || plan.maxExposure) && (
        <span
          className={
            "absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide " +
            (plan.maxExposure ? "bg-[#E6C86C] text-[#101510]" : "bg-[#E6C86C] text-[#101510]")
          }
        >
          {plan.maxExposure ? "Maximum Exposure · Maximum Success" : "Most Popular"}
        </span>
      )}

      <div className="flex items-center gap-2">
        <plan.icon className={"h-5 w-5 " + tone.badge} />
        <p className={"text-[14px] font-extrabold uppercase tracking-wide " + tone.badge}>{plan.name.replace(" Plan", "")}</p>
      </div>
      <p className={"text-[11px] font-bold uppercase tracking-wide " + tone.badge}>Plan</p>

      <div className="relative mt-3 aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#F4F9F1]">
        <Image src={plan.avatar} alt="" fill sizes="220px" className="object-cover object-top" />
      </div>

      <p className="mt-3 text-[20px] font-extrabold leading-none text-[#0B1F13]">
        AED {plan.price}
        <span className="text-[12px] font-medium text-[#5F7168]"> / {plan.period}</span>
      </p>
      <p className="mt-1.5 text-[11.5px] leading-[1.4] text-[#5F7168]">{plan.tagline}</p>

      <div className="mt-3 flex flex-1 flex-col gap-1.5 border-t border-[#EEF1EC] pt-3">
        {plan.features.map((f) => (
          <p key={f} className="flex items-start gap-1.5 text-[11px] leading-[1.35] text-[#3D4B44]">
            <Check className="mt-0.5 h-3 w-3 shrink-0 text-[#3E8130]" strokeWidth={3} />
            {f}
          </p>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button className="h-9 rounded-lg border border-[#DDE6DC] text-[12px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]">Learn More</button>
        <button onClick={onSelect} className={"h-9 rounded-lg text-[12.5px] font-semibold transition-colors " + tone.button}>
          Select Plan
        </button>
        {plan.durations && <p className="text-center text-[10.5px] font-semibold text-[#3E8130]">Choose Duration 10 / 15 / 30 Days</p>}
      </div>
    </div>
  );
}

export function Step5Plans({ onSelect }: { onSelect: (planKey: string) => void }) {
  return (
    <div>
      <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#3E8130]">Step 5 of 5</p>
      <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-extrabold text-[#0B1F13]">Choose the Perfect Plan for Your Business</h1>
          <p className="mt-1 text-[13.5px] text-[#5F7168]">Select a plan that fits your goals. Upgrade or downgrade anytime.</p>
        </div>
        <div className="flex items-start gap-2 rounded-xl border border-[#DDE6DC] bg-[#F4F9F1] px-3.5 py-2.5 text-[11.5px] text-[#194C11]">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          All plans include access to the BrandUpMe business ecosystem.
        </div>
      </div>

      <div className="mt-6 -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
        {PLANS.map((plan) => (
          <PlanCard key={plan.key} plan={plan} onSelect={() => onSelect(plan.key)} />
        ))}
      </div>
    </div>
  );
}
