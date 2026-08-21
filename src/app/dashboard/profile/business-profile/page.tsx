"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ProfileStepPage } from "@/components/business/profile-step-page";
import { Field, inputClass, labelClass } from "@/components/business/signup/field-kit";

export default function BusinessProfileStepPage() {
  const [tagline, setTagline] = useState("Business Setup & Growth Experts in UAE");
  const [about, setAbout] = useState(
    "ABC Business Setup Services is a trusted business consultancy specializing in company formation, PRO services, corporate structuring, and VAT solutions in the UAE."
  );

  return (
    <ProfileStepPage
      step={3}
      title="Business Profile"
      subtitle="Tell customers about your business, services and expertise."
      why={["Describe your business clearly", "Highlight your expertise", "Attract the right customers"]}
      whyIcon={Sparkles}
      prevHref="/dashboard/profile/business-address"
      nextHref="/dashboard/profile/website-social-links"
    >
      <div className="flex flex-col gap-5">
        <Field label="Business Tagline / Short Title" required>
          <input value={tagline} onChange={(e) => setTagline(e.target.value)} className={inputClass} />
        </Field>
        <Field label="About Your Business" required hint={`${about.length}/1000 characters`}>
          <textarea value={about} onChange={(e) => setAbout(e.target.value.slice(0, 1000))} rows={4} className={inputClass + " h-auto resize-none py-3"} />
        </Field>
        <div>
          <p className={labelClass}>Business Services / Specialties</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {["Company Formation", "PRO Services", "VAT Registration", "Corporate Structure", "Business Consulting"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 rounded-full bg-[#F4F9F1] px-3 py-1.5 text-[12px] font-medium text-[#194C11]">
                {t} <span className="text-[#5F7168]">×</span>
              </span>
            ))}
            <button className="rounded-full border border-dashed border-[#DDE6DC] px-3 py-1.5 text-[12px] font-semibold text-[#5F7168]">+ Add More</button>
          </div>
        </div>
        <div>
          <p className={labelClass}>Business Keywords</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {["Business Setup", "Company Registration", "UAE Business", "PRO Services", "VAT Consultant"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 rounded-full bg-[#F4F9F1] px-3 py-1.5 text-[12px] font-medium text-[#194C11]">
                {t} <span className="text-[#5F7168]">×</span>
              </span>
            ))}
            <button className="rounded-full border border-dashed border-[#DDE6DC] px-3 py-1.5 text-[12px] font-semibold text-[#5F7168]">+ Add More</button>
          </div>
        </div>
      </div>
    </ProfileStepPage>
  );
}
