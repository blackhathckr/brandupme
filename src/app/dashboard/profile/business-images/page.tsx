"use client";

import { useRef, useState } from "react";
import { Eye, Upload } from "lucide-react";
import { ProfileStepPage } from "@/components/business/profile-step-page";
import { labelClass } from "@/components/business/signup/field-kit";

const SLOTS = ["Logo", "Cover Image", "Office Image 1", "Office Image 2", "Team Image", "Office Image 3"];

export default function BusinessImagesStepPage() {
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null, null]);
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <ProfileStepPage
      step={5}
      title="Business Images"
      subtitle="Upload images that represent your business."
      why={["Show your brand identity", "Increase customer trust", "Improve engagement"]}
      whyIcon={Eye}
      prevHref="/dashboard/profile/website-social-links"
      nextHref="/dashboard/profile/business-documents"
    >
      <div>
        <p className={labelClass}>Business Images Gallery</p>
        <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {SLOTS.map((label, i) => (
            <button
              key={label}
              onClick={() => imageRefs.current[i]?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border-2 border-dashed border-[#DDE6DC] bg-[#FAFCF9] text-center transition-colors hover:border-[#3E8130]"
            >
              {images[i] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[i]!} alt={label} className="h-full w-full object-cover" />
              ) : (
                <>
                  <Upload className="h-4 w-4 text-[#5F7168]" />
                  <span className="px-1 text-[10.5px] font-semibold text-[#194C11]">{label}</span>
                </>
              )}
              <input
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const next = [...images];
                  next[i] = URL.createObjectURL(f);
                  setImages(next);
                }}
              />
            </button>
          ))}
        </div>
        <button className="mt-4 flex h-24 w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#DDE6DC] text-[#5F7168] hover:border-[#3E8130]">
          <Upload className="h-5 w-5" />
          <span className="text-[12.5px] font-semibold text-[#194C11]">Upload More Images</span>
          <span className="text-[10.5px]">JPG, PNG (Max. 5MB each)</span>
        </button>
      </div>
    </ProfileStepPage>
  );
}
