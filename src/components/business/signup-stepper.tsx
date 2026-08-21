"use client";

import { Check } from "lucide-react";
import {
  Stepper,
  StepperItem,
  StepperNav,
  StepperSeparator,
  useStepItem,
} from "@/components/reui/stepper";
import { SIGNUP_STEPS } from "@/lib/business-owner-data";

function StepRow({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: (typeof SIGNUP_STEPS)[number]["icon"] }) {
  const { step, state } = useStepItem();
  const completed = state === "completed";
  const active = state === "active";

  return (
    <div className="flex items-start gap-3">
      <span className="relative shrink-0">
        <span
          className={
            "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors " +
            (completed || active
              ? "border-[#3E8130] bg-[#3E8130] text-white"
              : "border-[#DDE6DC] bg-white text-[#5F7168]")
          }
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </span>
        <span
          className={
            "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10.5px] font-bold ring-2 ring-white " +
            (completed ? "bg-[#3E8130] text-white" : active ? "bg-[#3E8130] text-white" : "bg-[#DDE6DC] text-[#5F7168]")
          }
        >
          {completed ? <Check className="h-3 w-3" strokeWidth={3} /> : step}
        </span>
      </span>
      <div className="pt-1.5 leading-tight">
        <p className={"text-[14px] font-bold " + (active || completed ? "text-[#0B1F13]" : "text-[#0B1F13]/60")}>{title}</p>
        <p className={"mt-0.5 text-[12px] " + (completed ? "font-medium text-[#3E8130]" : "text-[#5F7168]")}>
          {completed ? "Completed" : subtitle}
        </p>
      </div>
    </div>
  );
}

export function SignupStepper({ currentStep }: { currentStep: number }) {
  return (
    <Stepper value={currentStep} orientation="vertical">
      <StepperNav className="gap-0">
        {SIGNUP_STEPS.map((step, i) => (
          <StepperItem key={step.n} step={step.n}>
            <StepRow title={step.title} subtitle={step.subtitle} icon={step.icon} />
            {i < SIGNUP_STEPS.length - 1 && (
              <StepperSeparator className="my-1 ml-5 !h-6 !w-0.5 bg-[#DDE6DC]" />
            )}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  );
}
