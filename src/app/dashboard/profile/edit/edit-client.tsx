"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Eye,
  FileText,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Upload,
  Users,
} from "lucide-react";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { ProfileEditStepper } from "@/components/business/profile-edit-stepper";
import { Field, inputClass, labelClass } from "@/components/business/signup/field-kit";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TikTokIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { categoryOptions, emirates } from "@/lib/business-owner-form-data";

const WHY: Record<number, { title: string; items: string[]; icon: React.ComponentType<{ className?: string }> }> = {
  1: { title: "Why is this important?", icon: Store, items: ["Accurate business details", "Build customer trust", "Increase visibility"] },
  2: { title: "Why is this important?", icon: MapPin, items: ["Improves local visibility", "Helps in customer trust", "Accurate business location"] },
  3: { title: "Why is this important?", icon: Sparkles, items: ["Describe your business clearly", "Highlight your expertise", "Attract the right customers"] },
  4: { title: "Why is this important?", icon: Users, items: ["Increase engagement", "Build brand presence", "Drive more traffic"] },
  5: { title: "Why is this important?", icon: Eye, items: ["Show your brand identity", "Increase customer trust", "Improve engagement"] },
  6: { title: "Why is this important?", icon: ShieldCheck, items: ["Verify your business", "Increase reliability", "Gain more trust"] },
};

const DOC_TYPES = [
  { key: "trade", label: "Trade License", file: "1234567.pdf", size: "1.2 MB" },
  { key: "vat", label: "VAT Certificate", file: "vat_100225844900003.pdf", size: "890 KB" },
  { key: "registration", label: "Business Registration Certificate", file: "registration.pdf", size: "1.1 MB" },
  { key: "passport", label: "Passport / ID Proof", file: "owner_passport.pdf", size: "950 KB" },
  { key: "logo", label: "Logo Document", file: "logo.png", size: "420 KB" },
];

export function ProfileEditClient() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = Math.min(6, Math.max(1, Number(params.get("step")) || 1));
  const [step, setStep] = useState(initial);

  const [business, setBusiness] = useState({
    name: "ABC Business Setup Services",
    category: "Business Setup & Consultancy",
    subcategory: "Business Formation",
    about: "ABC Business Setup Services is a trusted business consultancy specializing in company formation, PRO services, corporate structuring, and VAT solutions in the UAE.",
    website: "https://www.abcbusiness.ae",
  });
  const [address, setAddress] = useState({
    emirate: "Dubai",
    building: "Business Bay",
    officeNo: "Office No. 510",
    area: "Business Bay",
    landmark: "",
    areaCode: "00000",
  });
  const [tagline, setTagline] = useState("Business Setup & Growth Experts in UAE");
  const [social, setSocial] = useState({
    facebook: "https://facebook.com/abcbusiness",
    instagram: "https://instagram.com/abcbusiness",
    linkedin: "https://linkedin.com/company/abc-business",
    youtube: "https://youtube.com/@abcbusiness",
    tiktok: "https://tiktok.com/@abcbusiness",
  });
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null, null]);
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]);

  function goNext() {
    if (step < 6) setStep(step + 1);
    else router.push("/dashboard/profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function goBack() {
    if (step > 1) setStep(step - 1);
    else router.push("/dashboard/profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const why = WHY[step];

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1180px]">
        <ProfileEditStepper current={step} />

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="rounded-2xl border border-[#E5EAE3] bg-white p-6 sm:p-7">
            <p className="flex items-center gap-2 text-[13px] font-bold text-[#3E8130]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3E8130] text-[11px] text-white">{step}</span>
              STEP {step} OF 6
            </p>
            <h1 className="mt-1 text-[24px] font-extrabold text-[#0B1F13]">{["Business Information", "Business Address", "Business Profile", "Website & Social Links", "Business Images", "Business Documents"][step - 1]}</h1>
            <p className="mt-1 text-[13.5px] text-[#5F7168]">
              {
                [
                  "Add and manage your business core details.",
                  "Add your business location and address details.",
                  "Tell customers about your business, services and expertise.",
                  "Add your website and social media profiles.",
                  "Upload images that represent your business.",
                  "Upload important documents to verify and build trust.",
                ][step - 1]
              }
            </p>
            <div className="mt-5 border-t border-[#E5EAE3]" />

            {step === 1 && (
              <div className="mt-6 flex flex-col gap-5">
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
            )}

            {step === 2 && (
              <div className="mt-6 flex flex-col gap-5">
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
            )}

            {step === 3 && (
              <div className="mt-6 flex flex-col gap-5">
                <Field label="Business Tagline / Short Title" required>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)} className={inputClass} />
                </Field>
                <Field label="About Your Business" required hint={`${business.about.length}/1000 characters`}>
                  <textarea value={business.about} onChange={(e) => setBusiness((b) => ({ ...b, about: e.target.value.slice(0, 1000) }))} rows={4} className={inputClass + " h-auto resize-none py-3"} />
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
            )}

            {step === 4 && (
              <div className="mt-6 flex flex-col gap-5">
                <Field label="Your Website">
                  <input value={business.website} onChange={(e) => setBusiness((b) => ({ ...b, website: e.target.value }))} className={inputClass} />
                </Field>
                <div>
                  <p className={labelClass}>Social Media Links</p>
                  <div className="mt-1.5 flex flex-col gap-3">
                    {(
                      [
                        ["facebook", FacebookIcon],
                        ["instagram", InstagramIcon],
                        ["linkedin", LinkedinIcon],
                        ["youtube", YoutubeIcon],
                        ["tiktok", TikTokIcon],
                      ] as const
                    ).map(([key, Icon]) => (
                      <div key={key} className="relative">
                        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
                        <input
                          value={social[key]}
                          onChange={(e) => setSocial((s) => ({ ...s, [key]: e.target.value }))}
                          className={inputClass + " pl-10"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="mt-6">
                <p className={labelClass}>Business Images Gallery</p>
                <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {["Logo", "Cover Image", "Office Image 1", "Office Image 2", "Team Image", "Office Image 3"].map((label, i) => (
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
            )}

            {step === 6 && (
              <div className="mt-6">
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
            )}

            <div className="mt-7 flex items-center justify-between gap-3">
              <button onClick={goBack} className="flex h-11 items-center gap-2 rounded-full border border-[#DDE6DC] px-6 text-[13.5px] font-semibold text-[#0B1F13] transition-colors hover:bg-[#F4F9F1]">
                <span aria-hidden>←</span>
                Back
              </button>
              <button
                onClick={goNext}
                className="flex h-11 items-center gap-2 rounded-full bg-[#3E8130] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425]"
              >
                {step === 6 ? (
                  <>
                    Profile Complete
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Save &amp; Next
                    <span aria-hidden>→</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
              <p className="text-[13.5px] font-bold text-[#0B1F13]">{why.title}</p>
              <div className="mt-3 flex flex-col gap-3">
                {why.items.map((t) => (
                  <p key={t} className="flex items-start gap-2 text-[12.5px] text-[#3D4B44]">
                    <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3E8130]" />
                    {t}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#E5EAE3] bg-[#F4F9F1] p-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#3E8130]">
                <why.icon className="h-6 w-6" />
              </span>
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-[#194C11]">
                <Lightbulb className="h-3.5 w-3.5" />
                Tip: complete every step for full visibility
              </p>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
