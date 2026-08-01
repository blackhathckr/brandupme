"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  CONFIG,
  INDUSTRY_OPTIONS,
  CITY_OPTIONS,
  ORDER_VALUE_OPTIONS,
  COMMISSION_OPTIONS,
  LEGAL_PAGES_PUBLISHED,
} from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
import { FormSelect } from "@/components/ui/form-select";
import { Checkbox } from "@/components/ui/checkbox";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Data = Record<string, string>;

const STEPS = [
  { id: 0, label: "Your business" },
  { id: 1, label: "What you sell" },
  { id: 2, label: "How to reach you" },
];

const REQUIRED: Record<number, string[]> = {
  0: ["businessName", "industry", "city"],
  1: ["products"],
  2: ["ownerName", "mobile", "email", "consent"],
};

const field =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-[15px] text-ink " +
  "transition-all duration-200 placeholder:text-muted-foreground/70 " +
  "focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-600/10";

const label =
  "mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground";

function Err({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return <p className="mt-1.5 text-[12.5px] text-danger">{children}</p>;
}

export function Register() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({ country: CONFIG.country });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const set = (k: string, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: false }));
  };

  const validate = (s: number) => {
    const next: Record<string, boolean> = {};
    for (const k of REQUIRED[s]) {
      const v = (data[k] ?? "").trim();
      if (!v) next[k] = true;
      if (k === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
        next[k] = true;
      if (k === "mobile" && v && v.replace(/\D/g, "").length < 7) next[k] = true;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => validate(step) && setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(2)) return;

    // Endpoint is deliberately unset until the client decides where leads go.
    // Blocking loudly beats failing silently.
    if (!CONFIG.formEndpoint) {
      setState("error");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target as HTMLFormElement),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <section id="register" className="py-14 lg:py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-xl rounded-2xl border border-gold-300 bg-surface p-10 text-center shadow-e3">
            <span className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-success/12">
              <Check className="size-7 text-success-text" strokeWidth={2.5} />
            </span>
            <h2 className="font-display text-3xl font-bold tracking-[-0.035em] text-ink">
              You&rsquo;re in.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-ink-2">
              Thank you. Our team will contact you within one business day to
              confirm your details and assign your representative.
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-14 lg:py-20">
      <div className="container-page">
        <SectionHead
          align="center"
          eyebrow="Business partner registration"
          before="Stop waiting for opportunities."
          italic="Create"
          after="them."
          sub="Three short steps. We will contact you within one business day."
        />

        <Reveal className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-surface p-6 shadow-e3 sm:p-9">
          {/* Progress */}
          <ol className="mb-8 flex gap-3">
            {STEPS.map((s) => (
              <li key={s.id} className="flex-1">
                <span
                  className={cn(
                    "block h-1 rounded-full transition-colors duration-300",
                    s.id < step
                      ? "bg-gold-500"
                      : s.id === step
                        ? "bg-brand-600"
                        : "bg-line",
                  )}
                />
                <span
                  className={cn(
                    "mt-2 block text-[11.5px] font-semibold",
                    s.id === step ? "text-brand-600" : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
              </li>
            ))}
          </ol>

          {/* A multi-step form is inherently interactive. If JS is off the
              fields still render but cannot advance, so offer a real route
              through rather than a dead end. */}
          <noscript>
            <div className="mb-6 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-[14px] text-ink-2">
              This form needs JavaScript. Please call{" "}
              <a href={`tel:${CONFIG.phone}`} className="font-semibold text-brand-600 underline">
                {CONFIG.phoneDisplay}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${CONFIG.email}`} className="font-semibold text-brand-600 underline">
                {CONFIG.email}
              </a>{" "}
              and we will register your business for you.
            </div>
          </noscript>

          <form onSubmit={submit} noValidate>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="flex flex-col gap-5"
              >
                {step === 0 && (
                  <>
                    <div>
                      <label className={label} htmlFor="businessName">
                        Business name *
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        className={cn(field, errors.businessName && "border-danger")}
                        placeholder="Your registered company name"
                        value={data.businessName ?? ""}
                        onChange={(e) => set("businessName", e.target.value)}
                      />
                      <Err show={!!errors.businessName}>
                        Please enter your business name.
                      </Err>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={label} htmlFor="industry">
                          Industry *
                        </label>
                        <FormSelect
                          id="industry"
                          name="industry"
                          placeholder="Select industry"
                          options={INDUSTRY_OPTIONS}
                          value={data.industry ?? ""}
                          onChange={(v) => set("industry", v)}
                          invalid={!!errors.industry}
                        />
                        <Err show={!!errors.industry}>Please select one.</Err>
                      </div>

                      <div>
                        <label className={label} htmlFor="city">
                          City *
                        </label>
                        <FormSelect
                          id="city"
                          name="city"
                          placeholder="Select city"
                          options={CITY_OPTIONS}
                          value={data.city ?? ""}
                          onChange={(v) => set("city", v)}
                          invalid={!!errors.city}
                        />
                        <Err show={!!errors.city}>Please select one.</Err>
                      </div>
                    </div>

                    <div>
                      <label className={label} htmlFor="website">
                        Website
                      </label>
                      <input
                        id="website"
                        name="website"
                        className={field}
                        placeholder="https://yourcompany.ae"
                        value={data.website ?? ""}
                        onChange={(e) => set("website", e.target.value)}
                      />
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div>
                      <label className={label} htmlFor="products">
                        What do you sell? *
                      </label>
                      <input
                        id="products"
                        name="products"
                        className={cn(field, errors.products && "border-danger")}
                        placeholder="e.g. Commercial kitchen equipment and AMC contracts"
                        value={data.products ?? ""}
                        onChange={(e) => set("products", e.target.value)}
                      />
                      <Err show={!!errors.products}>
                        Please tell us what you sell.
                      </Err>
                    </div>

                    <div>
                      <label className={label}>Average order value</label>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {ORDER_VALUE_OPTIONS.map((o) => (
                          <button
                            key={o}
                            type="button"
                            onClick={() => set("orderValue", o)}
                            className={cn(
                              "h-11 rounded-xl border text-[13px] font-semibold transition-all duration-200",
                              data.orderValue === o
                                ? "border-ink bg-ink text-white"
                                : "border-line bg-surface text-ink-2 hover:border-gold-400 hover:bg-gold-50",
                            )}
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                      <input
                        type="hidden"
                        name="orderValue"
                        value={data.orderValue ?? ""}
                      />
                    </div>

                    <div>
                      <label className={label} htmlFor="commission">
                        Preferred commission
                      </label>
                      <FormSelect
                        id="commission"
                        name="commission"
                        placeholder="To be discussed"
                        options={COMMISSION_OPTIONS}
                        value={data.commission ?? ""}
                        onChange={(v) => set("commission", v)}
                      />
                    </div>

                    <div>
                      <label className={label} htmlFor="description">
                        Your biggest sales challenge right now
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className={cn(field, "h-auto py-3 resize-y")}
                        placeholder="Who are your ideal customers? What is getting in the way?"
                        value={data.description ?? ""}
                        onChange={(e) => set("description", e.target.value)}
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className={label} htmlFor="ownerName">
                        Your name *
                      </label>
                      <input
                        id="ownerName"
                        name="ownerName"
                        className={cn(field, errors.ownerName && "border-danger")}
                        placeholder="Full name"
                        value={data.ownerName ?? ""}
                        onChange={(e) => set("ownerName", e.target.value)}
                      />
                      <Err show={!!errors.ownerName}>Please enter your name.</Err>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={label} htmlFor="mobile">
                          Mobile *
                        </label>
                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          inputMode="tel"
                          className={cn(field, errors.mobile && "border-danger")}
                          placeholder="+971 50 000 0000"
                          value={data.mobile ?? ""}
                          onChange={(e) => set("mobile", e.target.value)}
                        />
                        <Err show={!!errors.mobile}>
                          Please enter a valid number.
                        </Err>
                      </div>

                      <div>
                        <label className={label} htmlFor="whatsapp">
                          WhatsApp
                        </label>
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          inputMode="tel"
                          className={field}
                          placeholder="If different"
                          value={data.whatsapp ?? ""}
                          onChange={(e) => set("whatsapp", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={label} htmlFor="email">
                        Business email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={cn(field, errors.email && "border-danger")}
                        placeholder="you@company.ae"
                        value={data.email ?? ""}
                        onChange={(e) => set("email", e.target.value)}
                      />
                      <Err show={!!errors.email}>
                        Please enter a valid email address.
                      </Err>
                    </div>

                    <label
                      htmlFor="consent"
                      className="flex cursor-pointer items-start gap-3"
                    >
                      <Checkbox
                        id="consent"
                        name="consent"
                        className="mt-0.5 shrink-0 data-[checked]:border-brand-600 data-[checked]:bg-brand-600"
                        checked={data.consent === "yes"}
                        onCheckedChange={(c) => set("consent", c ? "yes" : "")}
                      />
                      <span className="text-[13.5px] leading-relaxed text-ink-2">
                        {LEGAL_PAGES_PUBLISHED ? (
                          <>
                            I agree to the{" "}
                            <a href="/terms/" className="text-brand-600 underline">
                              terms
                            </a>{" "}
                            and{" "}
                            <a
                              href="/privacy/"
                              className="text-brand-600 underline"
                            >
                              privacy policy
                            </a>
                            , and consent to being contacted about this enquiry. *
                          </>
                        ) : (
                          <>
                            I confirm my details are accurate and consent to
                            being contacted by BrandUpMe about this enquiry. *
                          </>
                        )}
                      </span>
                    </label>
                    <Err show={!!errors.consent}>
                      Please accept to continue.
                    </Err>

                    {/* Honeypot: bots fill this, humans never see it. */}
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="absolute left-[-9999px] size-px opacity-0"
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {state === "error" && (
              <p className="mt-5 rounded-xl border border-danger/25 bg-brand-50 px-4 py-3 text-[13.5px] text-danger">
                {CONFIG.formEndpoint
                  ? `Something went wrong. Please try again, or WhatsApp us on ${CONFIG.phoneDisplay}.`
                  : "Form endpoint is not connected yet. Set CONFIG.formEndpoint in lib/content.ts to go live."}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 text-[14px] font-semibold text-ink-2 transition-colors hover:bg-surface-2"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  Back
                </button>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={next}
                  className="ml-auto inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-[14.5px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-600"
                >
                  Continue
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="ml-auto inline-flex h-12 items-center gap-2 rounded-full bg-brand-600 px-7 text-[14.5px] font-semibold text-white shadow-glow-red transition-all hover:-translate-y-0.5 hover:bg-brand-700 disabled:opacity-60"
                >
                  {state === "sending" && (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  )}
                  Register my business
                </button>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
