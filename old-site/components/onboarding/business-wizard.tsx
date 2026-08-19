"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Headphones } from "lucide-react";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import { AccountHeader } from "@/components/site/account-header";
import { AdBanner } from "@/components/site/ad-banner";
import { GhostButton, PrimaryButton } from "@/components/site/form-kit";
import {
  AccountTypeStep,
  AddressStep,
  BusinessInfoStep,
  ContactPersonStep,
  DocumentsStep,
  ReviewStep,
} from "./detail-steps";
import { PlanStep } from "./plan-step";
import { SummaryRail } from "./summary-rail";
import { WIZARD_STEPS, useWizard } from "./wizard-state";

const HEADINGS: Record<number, { title: string; sub: string }> = {
  1: {
    title: "Account Type",
    sub: "Confirm how you are registering. Each account type has its own form.",
  },
  2: {
    title: "Business Information",
    sub: "Tell us about your business. This builds your public business page.",
  },
  3: {
    title: "Choose Your Plan",
    sub: "Select the plan that best fits your business needs. You can upgrade or downgrade anytime.",
  },
  6: {
    title: "Contact Person Details",
    sub: "Who should we contact about leads, meetings and your account?",
  },
  7: {
    title: "Business Address",
    sub: "Where customers can find you, and which emirate pages you appear on.",
  },
  8: {
    title: "Business Documents",
    sub: "Upload the documents we need to verify your business.",
  },
  9: {
    title: "Review & Submit",
    sub: "Check your details, confirm the total and complete your registration.",
  },
};

export function BusinessWizard() {
  const router = useRouter();
  const wizard = useWizard();
  const heading = HEADINGS[wizard.step] ?? HEADINGS[3];
  const isLast = wizard.step === WIZARD_STEPS.length;

  function handleContinue() {
    if (isLast) {
      router.push("/register/business/success");
      return;
    }
    wizard.next();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-dvh bg-white">
      <AccountHeader
        actions={
          <>
            <Link
              href="/register"
              className="inline-flex h-10 items-center rounded-lg border border-iris-200 px-4 text-[14px] font-semibold text-iris-700 transition-colors hover:bg-iris-50"
            >
              Save &amp; Exit
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center rounded-lg bg-iris-700 px-4 text-[14px] font-semibold text-white transition-colors hover:bg-iris-800"
            >
              Go to Dashboard
            </Link>
          </>
        }
      />

      <main className="container-portal py-8">
        <div className="grid gap-8 xl:grid-cols-[268px_minmax(0,1fr)_312px]">
          {/* ── Left rail — the nine steps ───────────────────────────── */}
          <div className="xl:sticky xl:top-6 xl:self-start">
            <h1 className="text-[21px] font-extrabold leading-tight tracking-[-0.01em] text-slate-ink">
              Create Your Business Account
            </h1>
            <p className="mt-1.5 text-[13px] leading-snug text-slate-3">
              Join BrandUpMe and grow your business with powerful tools and
              verified visibility.
            </p>

            <Stepper
              value={wizard.step}
              onValueChange={wizard.goTo}
              orientation="vertical"
              indicators={{ completed: <Check className="size-3.5" strokeWidth={3} /> }}
              className="mt-6"
            >
              <StepperNav className="w-full gap-0">
                {WIZARD_STEPS.map((s, i) => (
                  <StepperItem
                    key={s.title}
                    step={i + 1}
                    className="w-full items-stretch"
                  >
                    <StepperTrigger className="w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-paper group-data-[state=active]/step:bg-iris-50">
                      <StepperIndicator className="mt-px size-[26px] shrink-0 bg-slate-2 text-[12px] font-bold text-white data-[state=active]:bg-iris-700 data-[state=completed]:bg-ok">
                        {i + 1}
                      </StepperIndicator>

                      <span className="min-w-0 flex-1">
                        <StepperTitle className="text-[13.5px] font-semibold text-slate-ink group-data-[state=active]/step:text-iris-700">
                          {s.title}
                        </StepperTitle>
                        <StepperDescription className="mt-0.5 text-[12px] leading-snug text-slate-3">
                          {s.description}
                        </StepperDescription>
                      </span>
                    </StepperTrigger>
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>

            <div className="mt-6 rounded-xl border border-rule bg-white p-4 shadow-p1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[14px] font-bold text-slate-ink">Need Help?</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-slate-3">
                    Our support team is here to help you.
                  </p>
                </div>
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-iris-100 text-iris-600"
                >
                  <Headphones className="size-[18px]" />
                </span>
              </div>
              <Link
                href="/contact"
                className="mt-3.5 flex h-9 items-center justify-center rounded-lg border border-iris-200 text-[13.5px] font-semibold text-iris-700 transition-colors hover:bg-iris-50"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* ── Centre — the active step ─────────────────────────────── */}
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-slate-3">
              Step {wizard.step} of {WIZARD_STEPS.length}
            </p>
            <h2 className="mt-1 text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-slate-ink">
              {heading.title}
            </h2>
            <p className="mb-6 mt-1.5 text-[13.5px] text-slate-3">{heading.sub}</p>

            {wizard.step === 1 ? <AccountTypeStep /> : null}
            {wizard.step === 2 ? <BusinessInfoStep /> : null}
            {wizard.step === 3 ? <PlanStep wizard={wizard} /> : null}
            {wizard.step === 6 ? <ContactPersonStep /> : null}
            {wizard.step === 7 ? <AddressStep /> : null}
            {wizard.step === 8 ? <DocumentsStep /> : null}
            {wizard.step === 9 ? <ReviewStep wizard={wizard} /> : null}

            <div className="mt-6 flex items-center gap-4">
              <GhostButton
                type="button"
                onClick={wizard.back}
                disabled={wizard.step === 1}
                className="disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back
              </GhostButton>

              <PrimaryButton
                type="button"
                onClick={handleContinue}
                className="flex-1"
              >
                {isLast
                  ? `Pay ${wizard.total} AED & Complete Registration`
                  : "Save & Continue"}
                <ArrowRight className="size-4" aria-hidden />
              </PrimaryButton>
            </div>
          </div>

          {/* ── Right rail — live selection summary ──────────────────── */}
          <div className="xl:sticky xl:top-6 xl:self-start">
            <SummaryRail wizard={wizard} />
          </div>
        </div>
      </main>

      <div className="container-portal pb-10">
        <AdBanner creative="goglobal" />
      </div>
    </div>
  );
}
