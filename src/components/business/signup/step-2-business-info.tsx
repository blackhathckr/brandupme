"use client";

import { LocateFixed, MapPin, Search } from "lucide-react";
import { Field, inputClass, labelClass } from "@/components/business/signup/field-kit";
import { categoryOptions, emirates } from "@/lib/business-owner-form-data";

export type BusinessInfoData = {
  name: string;
  category: string;
  subcategory: string;
  about: string;
  website: string;
  emirate: string;
  building: string;
  officeNo: string;
  area: string;
  landmark: string;
  areaCode: string;
  location: string;
};

export function Step2BusinessInfo({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: BusinessInfoData;
  onChange: (d: Partial<BusinessInfoData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const subOptions = categoryOptions.find((c) => c.name === data.category)?.subcategories ?? [];

  return (
    <div>
      <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#3E8130]">Step 2 of 5</p>
      <h1 className="mt-1 text-[26px] font-extrabold text-[#0B1F13]">Business Information</h1>
      <p className="mt-1 text-[13.5px] text-[#5F7168]">Tell us about your business and where it is located.</p>
      <div className="mt-5 border-t border-[#E5EAE3]" />

      <p className="mt-6 text-[14.5px] font-bold text-[#194C11]">Business Details</p>
      <div className="mt-4 flex flex-col gap-5">
        <Field label="Company / Business Name" required>
          <input
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Enter your company or business name"
            className={inputClass}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Select Category" required>
            <select
              value={data.category}
              onChange={(e) => onChange({ category: e.target.value, subcategory: "" })}
              className={inputClass + " appearance-none"}
            >
              <option value="">Select category</option>
              {categoryOptions.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Select Subcategories" required>
            <select
              value={data.subcategory}
              onChange={(e) => onChange({ subcategory: e.target.value })}
              disabled={!subOptions.length}
              className={inputClass + " appearance-none disabled:opacity-50"}
            >
              <option value="">Select subcategories</option>
              {subOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="About Your Company / Business" required hint={`${data.about.length}/1000 characters`}>
          <textarea
            value={data.about}
            onChange={(e) => onChange({ about: e.target.value.slice(0, 1000) })}
            rows={3}
            placeholder="Write a brief description about your company or business"
            className={inputClass + " h-auto resize-none py-3"}
          />
        </Field>

        <Field label="Website URL" optional>
          <input
            value={data.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="https://yourwebsite.com"
            className={inputClass}
          />
        </Field>
      </div>

      <p className="mt-8 text-[14.5px] font-bold text-[#194C11]">Business Address &amp; Location</p>
      <p className="mt-1 text-[12.5px] text-[#D51F1F]">Provide your complete business address. All fields are mandatory.</p>

      <div className="mt-4 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Select Emirate" required>
            <select value={data.emirate} onChange={(e) => onChange({ emirate: e.target.value })} className={inputClass + " appearance-none"}>
              <option value="">Select emirate</option>
              {emirates.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Building Name" required>
            <input value={data.building} onChange={(e) => onChange({ building: e.target.value })} placeholder="Enter building name" className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Office / Shop No." required>
            <input value={data.officeNo} onChange={(e) => onChange({ officeNo: e.target.value })} placeholder="Enter office or shop no." className={inputClass} />
          </Field>
          <Field label="Area" required>
            <input value={data.area} onChange={(e) => onChange({ area: e.target.value })} placeholder="Enter area" className={inputClass} />
          </Field>
          <Field label="Landmark" required>
            <input value={data.landmark} onChange={(e) => onChange({ landmark: e.target.value })} placeholder="Enter landmark" className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Area Code" required>
            <input value={data.areaCode} onChange={(e) => onChange({ areaCode: e.target.value })} placeholder="Enter area code" className={inputClass} />
          </Field>
          <div>
            <label className={labelClass}>
              Location <span className="text-[#D51F1F]">*</span>
            </label>
            <div className="mt-1.5 flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
                <input
                  value={data.location}
                  onChange={(e) => onChange({ location: e.target.value })}
                  placeholder="Search your location"
                  className={inputClass + " pl-10"}
                />
              </div>
              <button
                type="button"
                onClick={() => onChange({ location: "Current Location" })}
                className="flex h-11 shrink-0 items-center gap-1.5 rounded-[9px] border border-[#3E8130] px-3 text-[12px] font-semibold text-[#194C11] hover:bg-[#F4F9F1]"
              >
                <LocateFixed className="h-3.5 w-3.5" />
                Use My Current Location
              </button>
            </div>
          </div>
        </div>

        {/* static map placeholder */}
        <div className="relative h-[220px] w-full overflow-hidden rounded-xl border border-[#DDE6DC] bg-[#EAF0E7]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(#D4E0D0 1px, transparent 1px), linear-gradient(90deg, #D4E0D0 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 text-[12px] font-semibold text-[#0B1F13] shadow-sm">
            {data.location || "Search your location"}
            <span className="block text-[11px] font-normal text-[#5F7168]">{data.emirate || "Dubai"}, UAE</span>
          </div>
          <MapPin className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-full text-[#D51F1F]" fill="#D51F1F" />
          <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[15px] font-bold text-[#0B1F13] shadow-sm">+</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[15px] font-bold text-[#0B1F13] shadow-sm">−</span>
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-3">
        <button onClick={onBack} className="flex h-11 items-center gap-2 rounded-full border border-[#DDE6DC] px-6 text-[13.5px] font-semibold text-[#0B1F13] transition-colors hover:bg-[#F4F9F1]">
          <span aria-hidden>←</span>
          Back
        </button>
        <button
          onClick={onNext}
          className="flex h-11 items-center gap-2 rounded-full bg-[#3E8130] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425]"
        >
          Continue
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
