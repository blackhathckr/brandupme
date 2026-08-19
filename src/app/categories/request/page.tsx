"use client";

import { useState } from "react";
import { ArrowRight, Check, FolderPlus, Lock } from "lucide-react";
import { LightModalPage } from "@/components/site/light-modal-page";

const STEPS = [
  { n: 1, title: "Submit Request", copy: "Send us your category request with details." },
  { n: 2, title: "Our Review", copy: "Our team will review your request within 3-5 business days." },
  { n: 3, title: "We'll Get Back", copy: "We'll notify you about the status via email." },
];

const GUIDELINES = [
  "Category name should be clear and relevant",
  "Avoid duplicate or very similar categories",
  "Provide accurate description for better understanding",
];

export default function RequestCategoryPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [why, setWhy] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [email, setEmail] = useState("");

  return (
    <LightModalPage maxWidth={1000}>
      <div className="px-7 py-8 sm:px-10">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[#EAF6DF]" />
          <FolderPlus className="relative h-7 w-7 text-[#3E8130]" strokeWidth={1.8} />
        </div>
        <h1 className="mt-3 text-center text-[26px] font-bold text-[#0B1F13]">Request a New Category</h1>
        <p className="mx-auto mt-1 max-w-md text-center text-[13.5px] leading-[1.5] text-[#5F7168]">
          Can&rsquo;t find the category you&rsquo;re looking for? Tell us what you need and we&rsquo;ll review it.
        </p>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="text-[13.5px] font-semibold text-[#0B1F13]">
                Category Name <span className="text-[#D51F1F]">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter category name"
                className="mt-1.5 h-11 w-full rounded-[9px] border border-[#DDE6DC] px-3.5 text-[14px] text-[#0B1F13] outline-none placeholder:text-[#5F7168]/50 focus:border-[#3E8130]"
              />
              <p className="mt-1 text-[11.5px] text-[#5F7168]/70">
                Example: Renewable Energy, Artificial Intelligence, etc.
              </p>
            </div>

            <div>
              <label className="text-[13.5px] font-semibold text-[#0B1F13]">
                Category Description <span className="text-[#D51F1F]">*</span>
              </label>
              <div className="relative mt-1.5">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 300))}
                  rows={3}
                  placeholder="Describe this category and the type of businesses it includes..."
                  className="h-24 w-full resize-none rounded-[9px] border border-[#DDE6DC] px-3.5 py-2.5 text-[14px] text-[#0B1F13] outline-none placeholder:text-[#5F7168]/50 focus:border-[#3E8130]"
                />
                <span className="absolute bottom-2 right-3 text-[10.5px] text-[#5F7168]/60">
                  {description.length}/300
                </span>
              </div>
            </div>

            <div>
              <label className="text-[13.5px] font-semibold text-[#0B1F13]">
                Why is this category important? <span className="text-[#D51F1F]">*</span>
              </label>
              <div className="relative mt-1.5">
                <textarea
                  value={why}
                  onChange={(e) => setWhy(e.target.value.slice(0, 300))}
                  rows={3}
                  placeholder="Help us understand why this category should be added..."
                  className="h-24 w-full resize-none rounded-[9px] border border-[#DDE6DC] px-3.5 py-2.5 text-[14px] text-[#0B1F13] outline-none placeholder:text-[#5F7168]/50 focus:border-[#3E8130]"
                />
                <span className="absolute bottom-2 right-3 text-[10.5px] text-[#5F7168]/60">
                  {why.length}/300
                </span>
              </div>
            </div>

            <div>
              <label className="text-[13.5px] font-semibold text-[#0B1F13]">
                Suggested Subcategories <span className="text-[#5F7168] font-normal">(Optional)</span>
              </label>
              <input
                value={subcategories}
                onChange={(e) => setSubcategories(e.target.value)}
                type="text"
                placeholder="Enter subcategories separated by commas"
                className="mt-1.5 h-11 w-full rounded-[9px] border border-[#DDE6DC] px-3.5 text-[14px] text-[#0B1F13] outline-none placeholder:text-[#5F7168]/50 focus:border-[#3E8130]"
              />
              <p className="mt-1 text-[11.5px] text-[#5F7168]/70">
                Example: Solar Energy, Wind Energy, Energy Storage
              </p>
            </div>

            <div>
              <label className="text-[13.5px] font-semibold text-[#0B1F13]">
                Your Contact Email <span className="text-[#D51F1F]">*</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email address"
                className="mt-1.5 h-11 w-full rounded-[9px] border border-[#DDE6DC] px-3.5 text-[14px] text-[#0B1F13] outline-none placeholder:text-[#5F7168]/50 focus:border-[#3E8130]"
              />
              <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-[#5F7168]">
                <Lock className="h-3 w-3" />
                We may contact you for more details regarding this request.
              </p>
            </div>
          </form>

          <div className="flex flex-col gap-5">
            <div className="rounded-xl border border-[#DDE6DC] bg-[#FAFCF9] p-5">
              <p className="text-[13.5px] font-bold text-[#0B1F13]">What happens next?</p>
              <ol className="relative mt-4 flex flex-col gap-5 border-l border-dashed border-[#3E8130]/30 pl-6">
                {STEPS.map(({ n, title, copy }) => (
                  <li key={n} className="relative">
                    <span className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full bg-[#3E8130] text-[11px] font-bold text-white">
                      {n}
                    </span>
                    <p className="text-[13px] font-semibold text-[#0B1F13]">{title}</p>
                    <p className="mt-0.5 text-[12px] leading-[1.4] text-[#5F7168]">{copy}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-[#DDE6DC] p-5">
              <p className="text-[13.5px] font-bold text-[#0B1F13]">Guidelines</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {GUIDELINES.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-[12.5px] leading-[1.4] text-[#3D4B44]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3E8130]" strokeWidth={2.5} />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse items-center justify-center gap-3 sm:flex-row">
          <a
            href="/categories/main"
            className="flex h-11 w-full items-center justify-center rounded-full border border-[#DDE6DC] text-[13.5px] font-semibold text-[#0B1F13] transition-colors hover:bg-[#F4F9F1] sm:w-[140px]"
          >
            Cancel
          </a>
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#3E8130] text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425] sm:w-[190px]">
            Submit Request
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-center text-[11.5px] text-[#5F7168]/70">
          Your information is secure and will only be used for this request.
        </p>
      </div>
    </LightModalPage>
  );
}
