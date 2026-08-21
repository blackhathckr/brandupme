"use client";

import { CheckCircle2, FileText, ShieldCheck, Upload } from "lucide-react";
import { ProfileStepPage } from "@/components/business/profile-step-page";
import { labelClass } from "@/components/business/signup/field-kit";

const DOC_TYPES = [
  { key: "trade", label: "Trade License", file: "1234567.pdf", size: "1.2 MB" },
  { key: "vat", label: "VAT Certificate", file: "vat_100225844900003.pdf", size: "890 KB" },
  { key: "registration", label: "Business Registration Certificate", file: "registration.pdf", size: "1.1 MB" },
  { key: "passport", label: "Passport / ID Proof", file: "owner_passport.pdf", size: "950 KB" },
  { key: "logo", label: "Logo Document", file: "logo.png", size: "420 KB" },
];

export default function BusinessDocumentsStepPage() {
  return (
    <ProfileStepPage
      step={6}
      title="Business Documents"
      subtitle="Upload important documents to verify and build trust."
      why={["Verify your business", "Increase reliability", "Gain more trust"]}
      whyIcon={ShieldCheck}
      prevHref="/dashboard/profile/business-images"
      nextHref="/dashboard/profile"
      nextLabel="Profile Complete"
    >
      <div>
        <p className={labelClass}>Uploaded Documents</p>
        <div className="mt-2 flex flex-col gap-2.5">
          {DOC_TYPES.map((d) => (
            <div key={d.key} className="flex items-center gap-3 rounded-xl border border-[#E5EAE3] p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FDECEC] text-[#D51F1F]">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[#0B1F13]">{d.label}</p>
                <p className="text-[11px] text-[#5F7168]">
                  {d.file} · {d.size}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#EAF6DF] px-2.5 py-1 text-[11px] font-semibold text-[#2F6F18]">
                <CheckCircle2 className="h-3 w-3" />
                Verified
              </span>
            </div>
          ))}
        </div>
        <button className="mt-4 flex h-16 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#DDE6DC] text-[12.5px] font-semibold text-[#194C11] hover:border-[#3E8130]">
          <Upload className="h-4 w-4" />
          Upload More Documents
        </button>
      </div>
    </ProfileStepPage>
  );
}
