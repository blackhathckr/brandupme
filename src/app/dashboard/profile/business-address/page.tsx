"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { ProfileStepPage } from "@/components/business/profile-step-page";
import { Field, inputClass } from "@/components/business/signup/field-kit";
import { emirates } from "@/lib/business-owner-form-data";

export default function BusinessAddressPage() {
  const [address, setAddress] = useState({
    emirate: "Dubai",
    building: "Business Bay",
    officeNo: "Office No. 510",
    area: "Business Bay",
    areaCode: "00000",
  });

  return (
    <ProfileStepPage
      step={2}
      title="Business Address"
      subtitle="Add your business location and address details."
      why={["Improves local visibility", "Helps in customer trust", "Accurate business location"]}
      whyIcon={MapPin}
      prevHref="/dashboard/profile/business-information"
      nextHref="/dashboard/profile/business-profile"
    >
      <div className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Select Emirate" required>
            <select value={address.emirate} onChange={(e) => setAddress((a) => ({ ...a, emirate: e.target.value }))} className={inputClass + " appearance-none"}>
              {emirates.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </Field>
          <Field label="Building Name" required>
            <input value={address.building} onChange={(e) => setAddress((a) => ({ ...a, building: e.target.value }))} className={inputClass} />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Office / Shop No." required>
            <input value={address.officeNo} onChange={(e) => setAddress((a) => ({ ...a, officeNo: e.target.value }))} className={inputClass} />
          </Field>
          <Field label="Area" required>
            <input value={address.area} onChange={(e) => setAddress((a) => ({ ...a, area: e.target.value }))} className={inputClass} />
          </Field>
          <Field label="ZIP / Postal Code" required>
            <input value={address.areaCode} onChange={(e) => setAddress((a) => ({ ...a, areaCode: e.target.value }))} className={inputClass} />
          </Field>
        </div>
        <div className="relative h-[170px] overflow-hidden rounded-xl border border-[#DDE6DC] bg-[#EAF0E7]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{ backgroundImage: "linear-gradient(#D4E0D0 1px, transparent 1px), linear-gradient(90deg, #D4E0D0 1px, transparent 1px)", backgroundSize: "26px 26px" }}
          />
          <MapPin className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-full text-[#D51F1F]" fill="#D51F1F" />
          <button className="absolute right-3 top-3 rounded-lg bg-white px-3 py-1.5 text-[11.5px] font-semibold text-[#3E8130] shadow-sm">Change Location</button>
        </div>
      </div>
    </ProfileStepPage>
  );
}
