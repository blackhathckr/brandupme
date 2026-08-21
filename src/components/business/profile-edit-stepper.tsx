"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PROFILE_EDIT_STEPS } from "@/lib/business-owner-data";

export function ProfileEditStepper({ current }: { current: number }) {
  return (
    <div className="flex items-start overflow-x-auto pb-1">
      {PROFILE_EDIT_STEPS.map((s, i) => {
        const completed = s.n < current;
        const active = s.n === current;
        return (
          <div key={s.n} className="flex flex-1 items-start">
            <Link
              href={`/dashboard/profile/${s.slug}`}
              className="flex min-w-[92px] flex-col items-center gap-1.5 text-center"
            >
              <span
                className={
                  "flex h-9 w-9 items-center justify-center rounded-full text-[12.5px] font-bold " +
                  (completed ? "bg-[#3E8130] text-white" : active ? "bg-[#3E8130] text-white ring-4 ring-[#EAF6DF]" : "bg-[#EEF1EC] text-[#5F7168]")
                }
              >
                {completed ? <Check className="h-4 w-4" strokeWidth={3} /> : s.n}
              </span>
              <span className={"text-[11px] font-semibold leading-tight " + (active || completed ? "text-[#0B1F13]" : "text-[#5F7168]")}>{s.title}</span>
            </Link>
            {i < PROFILE_EDIT_STEPS.length - 1 && (
              <div className={"mt-[18px] h-0.5 flex-1 " + (completed ? "bg-[#3E8130]" : "bg-[#EEF1EC]")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
