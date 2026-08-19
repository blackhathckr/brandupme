"use client";

import { useActionState } from "react";
import { Check, Send } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/p/[slug]/actions";

/**
 * Enquiry form on the business card.
 *
 * Progressive: it is a real <form> with a server action, so it submits and
 * validates without JavaScript. React only adds the pending state and inline
 * errors on top.
 */

const initial: EnquiryState = { ok: false };

export function EnquiryForm({
  passportSlug,
  businessName,
}: {
  passportSlug: string;
  businessName: string;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initial);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-brand-300 bg-brand-50 p-6 text-center">
        <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-brand-600 text-white">
          <Check className="size-5" strokeWidth={3} aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-[16px] font-bold tracking-[-0.02em] text-ink">
          Enquiry sent
        </h3>
        <p className="mt-2 text-[13.5px] leading-[1.7] text-ink-2">
          {businessName} has been notified. Your reference is{" "}
          <strong className="text-green-text">{state.reference}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3.5">
      <input type="hidden" name="passportSlug" value={passportSlug} />

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        name="name"
        label="Full name"
        required
        autoComplete="name"
        error={state.fieldErrors?.name}
      />
      <Field
        name="phone"
        label="Mobile number"
        type="tel"
        required
        placeholder="+971 50 123 4567"
        autoComplete="tel"
        error={state.fieldErrors?.phone}
      />
      <Field
        name="email"
        label="Email address"
        type="email"
        autoComplete="email"
        error={state.fieldErrors?.email}
      />
      <Field name="company" label="Company name" autoComplete="organization" />

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your requirement…"
          className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink
            outline-none transition-colors placeholder:text-ink-3 focus-visible:border-brand-400"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-[12.5px] font-medium text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-600 px-6
          text-[14px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit enquiry"}
        {!pending && <Send className="size-4" strokeWidth={2.5} aria-hidden />}
      </button>

      <p className="text-center text-[11px] text-ink-3">
        Your details are shared only with this business.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[12.5px] font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-[13.5px] text-ink
          outline-none transition-colors placeholder:text-ink-3 focus-visible:border-brand-400
          aria-[invalid=true]:border-red-500"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-[11.5px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
