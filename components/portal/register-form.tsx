"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { register, type RegisterState } from "@/lib/auth/actions";

/**
 * Registration form.
 *
 * Numbered sections matching the client's mockup - business information,
 * contact details, social links, description, then the plan cards. It is one
 * form rather than a multi-step wizard: a wizard loses everything on a failed
 * submit unless state is persisted, and this is short enough not to need one.
 * The numbered headings give the same sense of progress.
 */

type PlanCard = {
  slug: string;
  name: string;
  price: string;
  purpose: string | null;
  badge: string | null;
  featured: boolean;
  highlights: string[];
};

const initial: RegisterState = { ok: false };

export function RegisterForm({
  categories,
  emirates,
  plans,
}: {
  categories: { slug: string; name: string }[];
  emirates: { slug: string; name: string }[];
  plans: PlanCard[];
}) {
  const [state, formAction, pending] = useActionState(register, initial);
  const [selectedPlan, setSelectedPlan] = useState(
    plans.find((p) => p.featured)?.slug ?? plans[0]?.slug ?? "",
  );

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-brand-300 bg-white p-8 text-center shadow-e2">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <Check className="size-6" strokeWidth={3} aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-[20px] font-bold tracking-[-0.03em] text-ink">
          Registration received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-[1.75] text-ink-2">
          Our team will contact you within 24 hours to complete your profile and
          confirm your plan. Your listing goes live after verification.
        </p>
        <Link
          href="/dashboard/"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-brand-600 px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-500"
        >
          Go to your dashboard
        </Link>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="planSlug" value={selectedPlan} />

      {/* Honeypot */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="companyUrl">Company URL</label>
        <input id="companyUrl" name="companyUrl" tabIndex={-1} autoComplete="off" />
      </div>

      <Section n={1} title="Business information">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="businessName" label="Company name" required error={err.businessName} />
          <Select
            name="categorySlug"
            label="Business category"
            required
            error={err.categorySlug}
            options={categories.map((c) => ({ value: c.slug, label: c.name }))}
            placeholder="Select category"
          />
          <Select
            name="emirateSlug"
            label="Emirate"
            required
            error={err.emirateSlug}
            options={emirates.map((e) => ({ value: e.slug, label: e.name }))}
            placeholder="Select emirate"
          />
          <Field name="website" label="Website" placeholder="https://" error={err.website} />
          <div className="sm:col-span-2">
            <Field name="address" label="Office address" required error={err.address} />
          </div>
        </div>
      </Section>

      <Section n={2} title="Contact information">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="contactName" label="Contact person" required error={err.contactName} autoComplete="name" />
          <Field name="designation" label="Designation" error={err.designation} />
          <Field
            name="phone"
            label="Mobile number"
            type="tel"
            required
            placeholder="+971 50 123 4567"
            error={err.phone}
            autoComplete="tel"
          />
          <Field name="whatsapp" label="WhatsApp number" type="tel" error={err.whatsapp} />
          <div className="sm:col-span-2">
            <Field
              name="email"
              label="Business email"
              type="email"
              required
              error={err.email}
              autoComplete="email"
            />
          </div>
        </div>
      </Section>

      <Section n={3} title="Social media" hint="Optional">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="facebookUrl" label="Facebook" error={err.facebookUrl} />
          <Field name="instagramUrl" label="Instagram" error={err.instagramUrl} />
          <Field name="linkedinUrl" label="LinkedIn" error={err.linkedinUrl} />
          <Field name="xUrl" label="X (Twitter)" error={err.xUrl} />
          <Field name="youtubeUrl" label="YouTube" error={err.youtubeUrl} />
        </div>
      </Section>

      <Section n={4} title="Tell us about your business">
        <label htmlFor="description" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          maxLength={1600}
          placeholder="Briefly describe your products or services…"
          className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink
            outline-none transition-colors placeholder:text-ink-3 focus-visible:border-brand-400"
        />
      </Section>

      <Section n={5} title="Choose your membership plan">
        <fieldset>
          <legend className="sr-only">Membership plan</legend>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {plans.map((p) => {
              const on = p.slug === selectedPlan;
              return (
                <label
                  key={p.slug}
                  className={`relative flex cursor-pointer flex-col rounded-2xl border p-4 transition-all duration-[200ms] ${
                    on
                      ? "border-brand-500 bg-brand-50 shadow-e2"
                      : "border-line bg-white hover:border-brand-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="planChoice"
                    value={p.slug}
                    checked={on}
                    onChange={() => setSelectedPlan(p.slug)}
                    className="sr-only"
                  />
                  {p.badge && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-deep">
                      {p.badge}
                    </span>
                  )}
                  <span className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-ink">
                    {p.price}
                  </span>
                  <span className="mt-0.5 text-[13px] font-semibold text-ink">{p.name}</span>
                  {p.purpose && (
                    <span className="mt-1 text-[11.5px] text-ink-3">{p.purpose}</span>
                  )}
                  <ul className="mt-3 flex flex-1 flex-col gap-1.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-1.5 text-[11.5px] leading-[1.5] text-ink-2">
                        <Check className="mt-0.5 size-3 shrink-0 text-green-text" strokeWidth={3} aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {on && (
                    <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-bold text-green-text">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                      Selected
                    </span>
                  )}
                </label>
              );
            })}
          </div>
          {err.planSlug && <p className="mt-2 text-[11.5px] text-red-600">{err.planSlug}</p>}
        </fieldset>
      </Section>

      <Section n={6} title="Create your account">
        <Field
          name="password"
          label="Choose a password"
          type="password"
          required
          error={err.password}
          autoComplete="new-password"
          hint="At least 10 characters."
        />
      </Section>

      <div className="rounded-2xl border border-line bg-white p-5 shadow-e1">
        <label className="flex items-start gap-2.5 text-[12.5px] leading-[1.6] text-ink-2">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 size-4 shrink-0 rounded border-line accent-brand-600"
          />
          <span>
            I agree to the Terms &amp; Conditions and Privacy Policy.
            {err.terms && <span className="ml-1 text-red-600">{err.terms}</span>}
          </span>
        </label>

        {state.error && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3.5 py-2.5 text-[12.5px] font-medium text-red-700">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full
            bg-brand-600 px-6 text-[14.5px] font-bold text-white transition-colors
            hover:bg-brand-500 disabled:opacity-60"
        >
          {pending ? "Registering…" : "Register my business"}
          {!pending && <ChevronRight className="size-4" strokeWidth={3} aria-hidden />}
        </button>

        <p className="mt-3 text-center text-[11.5px] text-ink-3">
          No payment required until our team confirms your registration.
        </p>
      </div>
    </form>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

function Section({
  n,
  title,
  hint,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-e1 lg:p-6">
      <h2 className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-600 font-display text-[12.5px] font-extrabold text-white">
          {n}
        </span>
        <span className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
          {title}
        </span>
        {hint && <span className="text-[11.5px] text-ink-3">({hint})</span>}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
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
  hint,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  hint?: string;
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
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-[13.5px] text-ink
          outline-none transition-colors placeholder:text-ink-3 focus-visible:border-brand-400
          aria-[invalid=true]:border-red-500"
      />
      {error ? (
        <p id={`${name}-error`} className="mt-1 text-[11.5px] text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="mt-1 text-[11.5px] text-ink-3">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  name,
  label,
  options,
  placeholder,
  required,
  error,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[12.5px] font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        className="h-11 w-full rounded-xl border border-line bg-white px-3 text-[13.5px] text-ink
          outline-none transition-colors focus-visible:border-brand-400
          aria-[invalid=true]:border-red-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-[11.5px] text-red-600">{error}</p>}
    </div>
  );
}
