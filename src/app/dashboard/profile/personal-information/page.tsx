"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { Field, inputClass } from "@/components/business/signup/field-kit";

export default function PersonalInformationPage() {
  const [name, setName] = useState("Neha Sharma");
  const [email, setEmail] = useState("neha@abcbusiness.ae");
  const [mobile, setMobile] = useState("50 123 4567");
  const [whatsapp, setWhatsapp] = useState("50 123 4567");

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[720px]">
        <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#3E8130]">My Profile</p>
        <h1 className="mt-1 text-[24px] font-extrabold text-[#0B1F13]">Personal Information</h1>
        <p className="mt-1 text-[13.5px] text-[#5F7168]">Manage your personal account details.</p>

        <div className="mt-6 rounded-2xl border border-[#E5EAE3] bg-white p-6 sm:p-7">
          <div className="flex items-center gap-4">
            <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
              <Image src="/avatar/seated.webp" alt="" fill sizes="80px" className="object-cover" />
              <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#3E8130] text-white ring-2 ring-white">
                <Camera className="h-3 w-3" />
              </button>
            </span>
            <div>
              <p className="text-[15px] font-bold text-[#0B1F13]">{name}</p>
              <p className="text-[12px] text-[#5F7168]">Business Owner</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-5">
            <Field label="Full Name" required>
              <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email Address" required>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputClass} />
              </Field>
              <Field label="Mobile Number" required>
                <div className="flex gap-2">
                  <span className="flex h-11 shrink-0 items-center gap-1.5 rounded-[9px] border border-[#DDE6DC] bg-white px-3 text-[13.5px] text-[#0B1F13]">
                    🇦🇪 +971
                  </span>
                  <input value={mobile} onChange={(e) => setMobile(e.target.value)} className={inputClass} />
                </div>
              </Field>
            </div>
            <Field label="WhatsApp Number">
              <div className="flex gap-2">
                <span className="flex h-11 shrink-0 items-center gap-1.5 rounded-[9px] border border-[#DDE6DC] bg-white px-3 text-[13.5px] text-[#0B1F13]">
                  🇦🇪 +971
                </span>
                <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputClass} />
              </div>
            </Field>
            <Field label="Designation">
              <input defaultValue="Business Owner" disabled className={inputClass + " bg-[#FAFCF9] text-[#5F7168]"} />
            </Field>
            <div>
              <p className="text-[13px] font-semibold text-[#0B1F13]">Password</p>
              <div className="mt-1.5 flex items-center justify-between rounded-[9px] border border-[#DDE6DC] px-3.5 py-2.5">
                <span className="text-[14px] tracking-widest text-[#5F7168]">••••••••</span>
                <button className="text-[12.5px] font-semibold text-[#3E8130] hover:underline">Change Password</button>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-3">
            <Link
              href="/dashboard/profile"
              className="flex h-11 items-center gap-2 rounded-full border border-[#DDE6DC] px-6 text-[13.5px] font-semibold text-[#0B1F13] transition-colors hover:bg-[#F4F9F1]"
            >
              <span aria-hidden>←</span>
              Back to Profile
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex h-11 items-center gap-2 rounded-full bg-[#3E8130] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425]"
            >
              Save Changes
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
