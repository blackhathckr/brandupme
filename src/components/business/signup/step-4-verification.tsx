"use client";

import { useRef } from "react";
import { FileText, Info, Upload } from "lucide-react";
import { Field, inputClass } from "@/components/business/signup/field-kit";

export type VerificationData = {
  tradeLicenseNumber: string;
  fileName: string | null;
};

export function Step4Verification({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: VerificationData;
  onChange: (d: Partial<VerificationData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#3E8130]">Step 4 of 5</p>
      <h1 className="mt-1 text-[26px] font-extrabold text-[#0B1F13]">Verification</h1>
      <p className="mt-1 text-[13.5px] text-[#5F7168]">Please provide your trade license details to verify your business.</p>
      <div className="mt-5 border-t border-[#E5EAE3]" />

      <div className="mt-6 flex flex-col gap-5">
        <Field label="Trade Licence Number" required hint="Enter the valid trade licence number issued to your business.">
          <input
            value={data.tradeLicenseNumber}
            onChange={(e) => onChange({ tradeLicenseNumber: e.target.value })}
            placeholder="Enter your trade licence number"
            className={inputClass}
          />
        </Field>

        <div>
          <p className="text-[13px] font-semibold text-[#0B1F13]">
            Trade Licence Soft Copy <span className="text-[#D51F1F]">*</span>
          </p>
          <p className="mt-0.5 text-[12px] text-[#5F7168]">Upload a clear copy of your trade licence.</p>

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-2.5 flex h-[190px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#DDE6DC] bg-[#FAFCF9] transition-colors hover:border-[#3E8130]"
          >
            {data.fileName ? (
              <>
                <FileText className="h-8 w-8 text-[#3E8130]" />
                <p className="text-[13px] font-semibold text-[#194C11]">{data.fileName}</p>
                <p className="text-[11.5px] text-[#5F7168]">Click to replace</p>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-[#5F7168]" />
                <p className="text-[14px] font-semibold text-[#0B1F13]">Drag &amp; drop your file here</p>
                <p className="text-[12px] text-[#5F7168]">or</p>
                <span className="flex h-9 items-center gap-1.5 rounded-lg border border-[#DDE6DC] px-4 text-[12.5px] font-semibold text-[#0B1F13]">
                  Choose File
                </span>
                <p className="text-[11px] text-[#5F7168]">Accepted formats: PDF, JPG, JPEG | Maximum file size: 5MB</p>
              </>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => onChange({ fileName: e.target.files?.[0]?.name ?? null })}
          />
        </div>

        <div className="rounded-xl bg-[#F4F9F1] p-4">
          <p className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#194C11]">
            <Info className="h-3.5 w-3.5" />
            Important Notes
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-[12px] text-[#3D4B44]">
            <li>• The trade licence must be valid and clearly visible.</li>
            <li>• Ensure all details are readable in the uploaded document.</li>
            <li>• We use this information only for verification purposes.</li>
          </ul>
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
