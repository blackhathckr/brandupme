"use client";

import { useState } from "react";
import { ArrowRight, CalendarCheck, CheckCircle2, Info, Video } from "lucide-react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import { Field, PhoneInput, TextArea, TextInput } from "@/components/site/form-kit";
import { cn } from "@/lib/utils";

/**
 * "Send Us an Inquiry" — the form on every business page.
 *
 * Three steps, matching the mockup's numbered rail: details, the mandatory
 * video-call choice, then the message. The client's Customer ↔ Client workflow
 * makes platform, date, time slot, Privacy Policy and Terms all mandatory, and
 * says submitting the inquiry is what creates the customer's account — so the
 * final step says so rather than surprising them afterwards.
 */

const STEPS = ["Your Details", "Preferred Video Call", "Your Message"];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export function InquiryForm({ businessName }: { businessName: string }) {
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState<"zoom" | "meet">("zoom");
  const [slot, setSlot] = useState("10:00 AM");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-xl border border-rule bg-white p-6 text-center shadow-p1">
        <span
          aria-hidden
          className="mx-auto grid size-14 place-items-center rounded-full bg-ok-soft"
        >
          <CheckCircle2 className="size-8 text-ok" />
        </span>
        <p className="mt-4 text-[17px] font-bold text-slate-ink">
          Inquiry Submitted Successfully
        </p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-3">
          {businessName} has received your details. Your customer account has been
          created — check your email for your login, dashboard link and the
          business digital card.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setStep(1);
          }}
          className="mt-5 text-[13.5px] font-semibold text-iris-600 hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <section
      id="inquiry"
      className="scroll-mt-24 rounded-xl border border-rule bg-white p-5 shadow-p1"
    >
      <h2 className="text-[17px] font-bold text-slate-ink">Send Us an Inquiry</h2>

      <div className="mt-4 grid gap-5 sm:grid-cols-[132px_minmax(0,1fr)]">
        {/* Step rail */}
        <Stepper value={step} onValueChange={setStep} orientation="vertical">
          <StepperNav className="gap-4">
            {STEPS.map((label, i) => (
              <StepperItem key={label} step={i + 1} className="w-full items-stretch">
                <StepperTrigger className="w-full items-start gap-2.5 text-left">
                  <StepperIndicator className="size-[22px] shrink-0 bg-slate-4 text-[11px] font-bold text-white data-[state=active]:bg-iris-600 data-[state=completed]:bg-ok">
                    {i + 1}
                  </StepperIndicator>
                  <StepperTitle className="text-[12.5px] font-semibold leading-tight text-slate-3 group-data-[state=active]/step:text-slate-ink">
                    {label}
                  </StepperTitle>
                </StepperTrigger>
              </StepperItem>
            ))}
          </StepperNav>
        </Stepper>

        {/* Panels */}
        <div className="min-w-0">
          {step === 1 ? (
            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field label="Your Name" required htmlFor="inqName">
                <TextInput id="inqName" placeholder="Enter your name" />
              </Field>
              <Field label="Email" required htmlFor="inqEmail">
                <TextInput id="inqEmail" type="email" placeholder="Enter your email" />
              </Field>
              <Field label="Phone Number" required htmlFor="inqPhone" className="sm:col-span-2">
                <PhoneInput id="inqPhone" />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-iris-200 bg-iris-50/50 p-4">
                <p className="text-[12.5px] font-semibold text-slate-2">
                  Select Your Preferred Option for Communication{" "}
                  <span className="text-iris-600">(Mandatory)</span>
                  <span className="text-alert"> *</span>
                </p>

                <div className="mt-3 flex items-start gap-3">
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-iris-600 shadow-p1"
                  >
                    <Video className="size-[18px]" />
                  </span>
                  <p className="text-[13px]">
                    <span className="font-bold text-iris-700">
                      Video Call with Company{" "}
                      <span className="font-medium text-slate-3">(Recommended)</span>
                    </span>
                    <span className="mt-0.5 block text-slate-3">
                      Connect with us before visiting our company.
                    </span>
                  </p>
                </div>

                <p className="mb-2 mt-4 text-[12.5px] font-semibold text-slate-2">
                  Select Platform <span className="text-alert">*</span>
                </p>
                <div role="radiogroup" aria-label="Platform" className="grid gap-2.5 sm:grid-cols-2">
                  {(
                    [
                      { id: "zoom", label: "Zoom Call", chip: "bg-[#2D8CFF]" },
                      { id: "meet", label: "Google Meet", chip: "bg-[#00AC47]" },
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={platform === p.id}
                      onClick={() => setPlatform(p.id)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg border bg-white p-3 text-left transition-all",
                        platform === p.id
                          ? "border-iris-600 ring-1 ring-iris-600"
                          : "border-rule hover:border-iris-300",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn("size-5 shrink-0 rounded", p.chip)}
                      />
                      <span className="flex-1 text-[13px] font-medium text-slate-ink">
                        {p.label}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-4 shrink-0 place-items-center rounded-full border-2",
                          platform === p.id ? "border-iris-600" : "border-slate-4",
                        )}
                      >
                        {platform === p.id ? (
                          <span className="size-1.5 rounded-full bg-iris-600" />
                        ) : null}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Meeting Date" required htmlFor="inqDate">
                  <TextInput id="inqDate" type="date" />
                </Field>
                <Field label="Time Slot" required>
                  <div className="grid grid-cols-4 gap-1.5">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSlot(t)}
                        className={cn(
                          "h-9 rounded-md border text-[11px] font-medium transition-colors",
                          slot === t
                            ? "border-iris-600 bg-iris-600 text-white"
                            : "border-rule bg-white text-slate-2 hover:bg-paper",
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-3.5">
              <Field label="Message / Requirement" required htmlFor="inqMessage">
                <TextArea
                  id="inqMessage"
                  placeholder="Tell us what you need, and when you need it..."
                />
              </Field>

              <label className="flex cursor-pointer items-start gap-2.5 text-[12.5px] text-slate-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 size-4 shrink-0 rounded border-rule accent-iris-600"
                />
                <span>
                  I accept the Privacy Policy <span className="text-alert">*</span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5 text-[12.5px] text-slate-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 size-4 shrink-0 rounded border-rule accent-iris-600"
                />
                <span>
                  I accept the Terms &amp; Conditions{" "}
                  <span className="text-alert">*</span>
                </span>
              </label>

              <p className="flex items-start gap-2.5 rounded-lg bg-paper-2 p-3 text-[12px] leading-snug text-slate-3">
                <CalendarCheck aria-hidden className="mt-px size-4 shrink-0 text-iris-500" />
                Submitting creates your free customer account. You will receive
                your dashboard login and this business&apos;s digital card by
                email.
              </p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => (step < 3 ? setStep(step + 1) : setSent(true))}
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-iris-700 text-[15px] font-semibold text-white shadow-iris transition-colors hover:bg-iris-800"
          >
            {step < 3 ? "Continue" : "Submit Inquiry"}
            <ArrowRight className="size-4" aria-hidden />
          </button>

          <p className="mt-3 flex items-start gap-2.5 rounded-lg bg-sky-50 p-3 text-[12px] leading-snug text-sky-800">
            <Info aria-hidden className="mt-px size-4 shrink-0 text-sky-500" />
            After you submit, the business owner will contact you on your selected
            platform to schedule the video call.
          </p>
        </div>
      </div>
    </section>
  );
}
