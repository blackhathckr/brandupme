"use client";

import { useState } from "react";
import { Store } from "lucide-react";
import { ProfileStepPage } from "@/components/business/profile-step-page";
import { Field, inputClass, labelClass } from "@/components/business/signup/field-kit";
import { categoryOptions } from "@/lib/business-owner-form-data";

export default function BusinessInformationPage() {
  const [business, setBusiness] = useState({
    name: "ABC Business Setup Services",
    category: "Business Setup & Consultancy",
    subcategory: "Business Formation",
  });

  return (
    <ProfileStepPage
      step={1}
      title="Business Information"
      subtitle="Add and manage your business core details."
      why={["Accurate business details", "Build customer trust", "Increase visibility"]}
      whyIcon={Store}
      prevHref="/dashboard/profile"
      nextHref="/dashboard/profile/business-address"
    >
      <div className="flex flex-col gap-5">
        <Field label="Business Name" required>
          <input value={business.name} onChange={(e) => setBusiness((b) => ({ ...b, name: e.target.value }))} className={inputClass} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Business Category" required>
            <select value={business.category} onChange={(e) => setBusiness((b) => ({ ...b, category: e.target.value }))} className={inputClass + " appearance-none"}>
              {categoryOptions.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Sub Category" required>
            <select value={business.subcategory} onChange={(e) => setBusiness((b) => ({ ...b, subcategory: e.target.value }))} className={inputClass + " appearance-none"}>
              {(categoryOptions.find((c) => c.name === business.category)?.subcategories ?? [business.subcategory]).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Year of Establishment" required>
            <input defaultValue="2020" className={inputClass} />
          </Field>
          <Field label="Trade License Number" required>
            <input defaultValue="1234567" className={inputClass} />
          </Field>
        </div>
        <Field label="VAT Registration Number">
          <input defaultValue="100225844900003" className={inputClass} />
        </Field>
        <div>
          <p className={labelClass}>Business Contact Details</p>
          <div className="mt-1.5 grid gap-5 sm:grid-cols-2">
            <input defaultValue="info@abcbusiness.ae" className={inputClass} placeholder="Business Email" />
            <input defaultValue="+971 4 123 4567" className={inputClass} placeholder="Business Phone" />
          </div>
        </div>
      </div>
    </ProfileStepPage>
  );
}
