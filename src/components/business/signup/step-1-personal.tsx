"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Field, inputClass } from "@/components/business/signup/field-kit";

export type PersonalData = {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
};

const REQS = [
  { key: "len", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { key: "upper", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { key: "num", label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { key: "special", label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function Step1Personal({
  data,
  onChange,
  onNext,
}: {
  data: PersonalData;
  onChange: (d: Partial<PersonalData>) => void;
  onNext: () => void;
}) {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const canContinue =
    data.fullName.trim() &&
    data.mobile.trim() &&
    data.email.trim() &&
    REQS.every((r) => r.test(data.password)) &&
    data.password === data.confirmPassword &&
    data.agreed;

  return (
    <div>
      <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#3E8130]">Step 1 of 5</p>
      <h1 className="mt-1 text-[26px] font-extrabold text-[#0B1F13]">Personal Information</h1>
      <p className="mt-1 text-[13.5px] text-[#5F7168]">Let&rsquo;s start with your personal details.</p>
      <div className="mt-5 border-t border-[#E5EAE3]" />

      <div className="mt-6 flex flex-col gap-5">
        <Field label="Full Name" required>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
            <input
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="Enter your full name"
              className={inputClass + " pl-10"}
            />
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Mobile Number" required>
            <div className="flex gap-2">
              <span className="flex h-11 shrink-0 items-center gap-1.5 rounded-[9px] border border-[#DDE6DC] bg-white px-3 text-[13.5px] text-[#0B1F13]">
                🇦🇪 +971
              </span>
              <input
                value={data.mobile}
                onChange={(e) => onChange({ mobile: e.target.value })}
                placeholder="50 123 4567"
                className={inputClass}
              />
            </div>
          </Field>
          <Field label="Email Address" required>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
              <input
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                type="email"
                placeholder="Enter your email address"
                className={inputClass + " pl-10"}
              />
            </div>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Create Password" required>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
              <input
                value={data.password}
                onChange={(e) => onChange({ password: e.target.value })}
                type={showPw ? "text" : "password"}
                placeholder="Enter password"
                className={inputClass + " pl-10 pr-10"}
              />
              <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5F7168]">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>
          <Field label="Confirm Password" required>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
              <input
                value={data.confirmPassword}
                onChange={(e) => onChange({ confirmPassword: e.target.value })}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className={inputClass + " pl-10 pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5F7168]"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>
        </div>

        <div className="rounded-xl bg-[#F4F9F1] p-4">
          <p className="text-[12.5px] font-bold text-[#194C11]">Password must contain:</p>
          <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {REQS.map((r) => {
              const ok = r.test(data.password);
              return (
                <p key={r.key} className={"flex items-center gap-1.5 text-[12px] " + (ok ? "text-[#194C11]" : "text-[#5F7168]")}>
                  <span className={"flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] " + (ok ? "bg-[#3E8130] text-white" : "bg-[#DDE6DC] text-transparent")}>
                    ✓
                  </span>
                  {r.label}
                </p>
              );
            })}
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-[12.5px] text-[#3D4B44]">
          <input
            type="checkbox"
            checked={data.agreed}
            onChange={(e) => onChange({ agreed: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded accent-[#3E8130]"
          />
          I agree to the BrandUpMe{" "}
          <a href="#" className="font-semibold text-[#3E8130] hover:underline">
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="font-semibold text-[#3E8130] hover:underline">
            Privacy Policy
          </a>
        </label>

        <div className="flex items-center justify-between gap-3">
          <button className="h-11 flex-1 rounded-full border border-[#DDE6DC] text-[13.5px] font-semibold text-[#0B1F13] transition-colors hover:bg-[#F4F9F1] sm:flex-none sm:px-8">
            Cancel
          </button>
          <button
            disabled={!canContinue}
            onClick={onNext}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#3E8130] text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425] disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none sm:px-8"
          >
            Continue
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
