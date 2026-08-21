"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TikTokIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { Field, inputClass } from "@/components/business/signup/field-kit";

export type BusinessProfileData = {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
  logo: string | null;
  images: (string | null)[];
};

const SOCIALS: { key: keyof BusinessProfileData; label: string; icon: React.ComponentType<{ className?: string }>; placeholder: string }[] = [
  { key: "facebook", label: "Facebook", icon: FacebookIcon, placeholder: "https://facebook.com/yourpage" },
  { key: "instagram", label: "Instagram", icon: InstagramIcon, placeholder: "https://instagram.com/yourpage" },
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon, placeholder: "https://linkedin.com/company/yourpage" },
  { key: "youtube", label: "YouTube", icon: YoutubeIcon, placeholder: "https://youtube.com/@yourchannel" },
  { key: "tiktok", label: "TikTok", icon: TikTokIcon, placeholder: "https://tiktok.com/@yourprofile" },
];

export function Step3BusinessProfile({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: BusinessProfileData;
  onChange: (d: Partial<BusinessProfileData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function pickLogo(file: File | undefined) {
    if (!file) return;
    onChange({ logo: URL.createObjectURL(file) });
  }

  function pickImage(idx: number, file: File | undefined) {
    if (!file) return;
    const next = [...data.images];
    next[idx] = URL.createObjectURL(file);
    onChange({ images: next });
  }


  return (
    <div>
      <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#3E8130]">Step 3 of 5</p>
      <h1 className="mt-1 text-[26px] font-extrabold text-[#0B1F13]">Business Profile</h1>
      <p className="mt-1 text-[13.5px] text-[#5F7168]">Share your business presence with accurate information and visuals.</p>
      <div className="mt-5 border-t border-[#E5EAE3]" />

      <p className="mt-6 text-[14.5px] font-bold text-[#194C11]">Social Media Links (Optional)</p>
      <p className="mt-1 text-[12.5px] text-[#5F7168]">Add your social media profiles to help customers connect with you easily.</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {SOCIALS.map(({ key, label, icon: Icon, placeholder }) => (
          <Field key={key} label={label}>
            <div className="relative">
              <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
              <input
                value={data[key] as string}
                onChange={(e) => onChange({ [key]: e.target.value } as Partial<BusinessProfileData>)}
                placeholder={placeholder}
                className={inputClass + " pl-10"}
              />
            </div>
          </Field>
        ))}
      </div>

      <p className="mt-8 text-[14.5px] font-bold text-[#194C11]">Business Branding</p>
      <p className="mt-1 text-[12.5px] text-[#5F7168]">Upload your business logo and images of your products/services.</p>

      <div className="mt-4 grid gap-6 sm:grid-cols-[auto_1fr]">
        <div>
          <p className="text-[13px] font-semibold text-[#0B1F13]">
            Company / Business Logo <span className="text-[#D51F1F]">*</span>
          </p>
          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="mt-1.5 flex h-[150px] w-[150px] flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#DDE6DC] bg-[#FAFCF9] text-center transition-colors hover:border-[#3E8130]"
          >
            {data.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logo} alt="Logo preview" className="h-full w-full rounded-xl object-cover" />
            ) : (
              <>
                <Upload className="h-5 w-5 text-[#5F7168]" />
                <span className="text-[11.5px] font-semibold text-[#194C11]">Upload Logo</span>
                <span className="px-3 text-[10px] text-[#5F7168]">PNG, JPG or SVG (Max. 2MB)</span>
              </>
            )}
          </button>
          <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => pickLogo(e.target.files?.[0])} />
          <p className="mt-1.5 max-w-[150px] text-[10.5px] text-[#5F7168]">Showcase your brand with a clear logo.</p>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-[#0B1F13]">
            Business Images (Max 5 Images) <span className="text-[#D51F1F]">*</span>
          </p>
          <div className="mt-1.5 grid grid-cols-5 gap-2.5">
            {data.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => imageInputRefs.current[i]?.click()}
                className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#DDE6DC] bg-[#FAFCF9] text-[#5F7168] transition-colors hover:border-[#3E8130]"
              >
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt={`Business image ${i + 1}`} className="h-full w-full object-cover" />
                ) : (
                  <span className="flex flex-col items-center gap-1">
                    <Upload className="h-4 w-4" />
                    <span className="text-[11px] font-semibold">{i + 1}</span>
                  </span>
                )}
                <input
                  ref={(el) => {
                    imageInputRefs.current[i] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => pickImage(i, e.target.files?.[0])}
                />
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-1">
            {["High quality images only", "Minimum size: 1200x800px", "Supported format: JPG, JPEG, PNG (Max. 5MB each)"].map((t) => (
              <p key={t} className="flex items-center gap-1.5 text-[11.5px] text-[#194C11]">
                <span className="text-[#3E8130]">✓</span>
                {t}
              </p>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-[#F4F9F1] p-3.5">
            <p className="text-[12px] font-bold text-[#194C11]">Tips for better visibility</p>
            <p className="mt-1 text-[11.5px] leading-[1.4] text-[#3D4B44]">Use your official logo for best recognition.</p>
            <p className="text-[11.5px] leading-[1.4] text-[#3D4B44]">Upload real images of your products, services, office or team.</p>
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
