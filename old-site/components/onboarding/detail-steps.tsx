"use client";

import { useState } from "react";
import {
  Building2,
  Check,
  CheckCircle2,
  FileText,
  ImagePlus,
  Info,
  Mail,
  MapPin,
  Phone,
  Upload,
  User,
} from "lucide-react";
import {
  Field,
  Panel,
  PhoneInput,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/site/form-kit";
import { CATEGORIES, EMIRATES } from "@/lib/brand/categories";
import { ADD_ON_PLANS, TESTER_DURATIONS } from "@/lib/brand/plans";
import type { Wizard } from "./wizard-state";

/* ── Step 1 ─────────────────────────────────────────────────────────── */

export function AccountTypeStep() {
  return (
    <Panel
      step="1."
      title="Confirm Your Account Type"
      description="You are registering as a business owner. This determines the details we ask for next."
    >
      <div className="flex items-start gap-4 rounded-xl border border-iris-600 bg-iris-50/40 p-5 ring-1 ring-iris-600">
        <span
          aria-hidden
          className="grid size-12 shrink-0 place-items-center rounded-full bg-iris-100 text-iris-600"
        >
          <Building2 className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-[15px] font-bold text-slate-ink">
            Business Owner
            <span className="grid size-[18px] place-items-center rounded-full bg-iris-600">
              <Check className="size-3 text-white" strokeWidth={3} />
            </span>
          </p>
          <p className="mt-1 text-[13.5px] text-slate-3">
            List your business, get leads and grow your brand. You will get a
            business webpage, a digital business card, a customer inquiry form
            and a performance dashboard.
          </p>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2.5 rounded-lg bg-paper-2 p-3.5 text-[12.5px] text-slate-3">
        <Info aria-hidden className="mt-px size-4 shrink-0 text-iris-500" />
        Registering a different way? Go back to Create Account to choose
        Promoter, Category Referral Partner, Business Selected Partner or
        Customer — each has its own registration form.
      </p>
    </Panel>
  );
}

/* ── Step 2 ─────────────────────────────────────────────────────────── */

export function BusinessInfoStep() {
  // Sub-category options follow the chosen category — the client's flow
  // captures both, and each pair has its own public listing page.
  const [categorySlug, setCategorySlug] = useState("cleaning-services");
  const selected = CATEGORIES.find((c) => c.slug === categorySlug);

  return (
    <div className="space-y-5">
      <Panel
        step="1."
        title="Business Details"
        description="Tell customers who you are. This information builds your public business page."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company Name" required htmlFor="companyName" className="sm:col-span-2">
            <TextInput
              id="companyName"
              placeholder="e.g. ABC Cleaning Services LLC"
              icon={<Building2 />}
            />
          </Field>

          <Field label="Business Category" required htmlFor="category">
            <SelectInput
              id="category"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field label="Sub-Category" required htmlFor="subcategory">
            <SelectInput id="subcategory" key={categorySlug}>
              {(selected?.subcategories ?? []).map((sub) => (
                <option key={sub}>{sub}</option>
              ))}
            </SelectInput>
          </Field>

          <Field
            label="About Company"
            required
            htmlFor="about"
            className="sm:col-span-2"
            hint="A short introduction shown at the top of your business page."
          >
            <TextArea
              id="about"
              placeholder="Describe your business, what makes it different and who you serve..."
            />
          </Field>

          <Field
            label="Company Services"
            htmlFor="services"
            className="sm:col-span-2"
            hint="Separate each service with a comma."
          >
            <TextInput
              id="services"
              placeholder="Office Cleaning, Deep Cleaning, Villa Cleaning, Carpet Cleaning"
            />
          </Field>

          <Field label="Trade Licence Number" required htmlFor="licence">
            <TextInput id="licence" placeholder="e.g. 1234567" icon={<FileText />} />
          </Field>

          <Field label="Established Year" htmlFor="established">
            <TextInput id="established" placeholder="2022" inputMode="numeric" />
          </Field>

          <Field label="Team Size" htmlFor="teamSize">
            <SelectInput id="teamSize">
              <option>1 - 10 Employees</option>
              <option>10 - 25 Employees</option>
              <option>25 - 50 Employees</option>
              <option>50 - 200 Employees</option>
              <option>200+ Employees</option>
            </SelectInput>
          </Field>

          <Field label="Languages Spoken" htmlFor="languages">
            <TextInput id="languages" placeholder="English, Arabic, Hindi" />
          </Field>
        </div>
      </Panel>

      <Panel
        step="2."
        title="Logo & Business Images"
        description="Add your logo and up to 5 images. These appear on your business page and digital card."
      >
        <div className="grid gap-4 sm:grid-cols-[220px_minmax(0,1fr)]">
          <UploadTile label="Company Logo" hint="PNG or SVG, square" icon="image" />
          <UploadTile
            label="Business Images"
            hint="Up to 5 images, JPG or PNG, max 2 MB each"
            icon="gallery"
          />
        </div>
      </Panel>
    </div>
  );
}

/* ── Step 6 ─────────────────────────────────────────────────────────── */

export function ContactPersonStep() {
  return (
    <Panel
      step="1."
      title="Contact Person Details"
      description="Who should we contact about leads, meetings and your account?"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" required htmlFor="contactName">
          <TextInput id="contactName" placeholder="Enter full name" icon={<User />} />
        </Field>

        <Field label="Designation" required htmlFor="designation">
          <TextInput id="designation" placeholder="e.g. Managing Director" />
        </Field>

        <Field label="Mobile Number" required htmlFor="contactMobile">
          <PhoneInput id="contactMobile" />
        </Field>

        <Field
          label="WhatsApp Number"
          required
          htmlFor="whatsapp"
          hint="Lead and meeting alerts are sent here."
        >
          <PhoneInput id="whatsapp" />
        </Field>

        <Field label="Email Address" required htmlFor="contactEmail">
          <TextInput
            id="contactEmail"
            type="email"
            placeholder="name@company.ae"
            icon={<Mail />}
          />
        </Field>

        <Field label="Preferred Language" htmlFor="preferredLanguage">
          <SelectInput id="preferredLanguage">
            <option>English</option>
            <option>Arabic</option>
            <option>Hindi</option>
            <option>Urdu</option>
          </SelectInput>
        </Field>

        <Field label="Alternate Contact Number" htmlFor="altPhone" className="sm:col-span-2">
          <TextInput id="altPhone" placeholder="Optional" icon={<Phone />} />
        </Field>
      </div>
    </Panel>
  );
}

/* ── Step 7 ─────────────────────────────────────────────────────────── */

export function AddressStep() {
  return (
    <div className="space-y-5">
      <Panel
        step="1."
        title="Business Address"
        description="Customers use this to find you, and it decides which emirate pages you appear on."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Emirate" required htmlFor="emirate">
            <SelectInput id="emirate">
              {EMIRATES.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </SelectInput>
          </Field>

          <Field label="Area" required htmlFor="area">
            <TextInput id="area" placeholder="e.g. Business Bay" icon={<MapPin />} />
          </Field>

          <Field label="Building / Office" htmlFor="building">
            <TextInput id="building" placeholder="Office 1204, Prism Tower" />
          </Field>

          <Field label="Street" htmlFor="street">
            <TextInput id="street" placeholder="Sheikh Zayed Road" />
          </Field>

          <Field label="PO Box" htmlFor="poBox">
            <TextInput id="poBox" placeholder="00000" inputMode="numeric" />
          </Field>

          <Field label="Google Maps Link" htmlFor="maps">
            <TextInput id="maps" placeholder="https://maps.app.goo.gl/..." />
          </Field>
        </div>
      </Panel>

      <Panel
        step="2."
        title="Website & Social Media"
        description="Shown on your business page and digital card."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Website URL" htmlFor="website">
            <TextInput id="website" placeholder="www.yourcompany.ae" />
          </Field>
          <Field label="Instagram" htmlFor="instagram">
            <TextInput id="instagram" placeholder="instagram.com/yourcompany" />
          </Field>
          <Field label="Facebook" htmlFor="facebook">
            <TextInput id="facebook" placeholder="facebook.com/yourcompany" />
          </Field>
          <Field label="LinkedIn" htmlFor="linkedin">
            <TextInput id="linkedin" placeholder="linkedin.com/company/yourcompany" />
          </Field>
        </div>
      </Panel>
    </div>
  );
}

/* ── Step 8 ─────────────────────────────────────────────────────────── */

export function DocumentsStep() {
  return (
    <Panel
      step="1."
      title="Business Documents"
      description="Required for verification. Documents are private and never shown on your public page."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <UploadTile label="Trade Licence" hint="PDF or JPG, max 5 MB" required icon="file" />
        <UploadTile label="Emirates ID (Owner)" hint="Front and back, PDF or JPG" required icon="file" />
        <UploadTile label="VAT Certificate" hint="Optional" icon="file" />
        <UploadTile label="Establishment Card" hint="Optional" icon="file" />
      </div>

      <p className="mt-4 flex items-start gap-2.5 rounded-lg bg-paper-2 p-3.5 text-[12.5px] text-slate-3">
        <Info aria-hidden className="mt-px size-4 shrink-0 text-iris-500" />
        Verification usually completes within 24–48 hours. Your business goes
        live immediately — the verified badge is applied once documents are
        approved.
      </p>
    </Panel>
  );
}

/* ── Step 9 ─────────────────────────────────────────────────────────── */

export function ReviewStep({ wizard }: { wizard: Wizard }) {
  const selectedAddOns = ADD_ON_PLANS.filter((a) => wizard.addOns.includes(a.id));
  const duration = TESTER_DURATIONS.find((d) => d.days === wizard.durationDays);

  return (
    <div className="space-y-5">
      <Panel
        step="1."
        title="Review Your Registration"
        description="Check everything is correct. You can go back and edit any step."
      >
        <dl className="divide-y divide-rule-2">
          <ReviewRow label="Account Type" value="Business Owner" step={1} wizard={wizard} />
          <ReviewRow label="Company Name" value="ABC Cleaning Services LLC" step={2} wizard={wizard} />
          <ReviewRow label="Category" value="Cleaning Services · Office Cleaning" step={2} wizard={wizard} />
          <ReviewRow
            label="Primary Plan"
            value={
              wizard.needsDuration && duration
                ? `${wizard.plan.name} · ${duration.days} Days`
                : wizard.plan.name
            }
            step={3}
            wizard={wizard}
          />
          <ReviewRow
            label="Additional Plans"
            value={
              selectedAddOns.length
                ? selectedAddOns.map((a) => a.name).join(", ")
                : "None selected"
            }
            step={5}
            wizard={wizard}
          />
          <ReviewRow label="Contact Person" value="Kumar Sheth · Managing Director" step={6} wizard={wizard} />
          <ReviewRow label="Business Address" value="Business Bay, Dubai" step={7} wizard={wizard} />
          <ReviewRow label="Documents" value="Trade Licence, Emirates ID uploaded" step={8} wizard={wizard} />
        </dl>
      </Panel>

      <Panel step="2." title="Payment Summary">
        <dl className="space-y-2.5 text-[13.5px]">
          <div className="flex items-center justify-between">
            <dt className="text-slate-3">
              {wizard.plan.name}
              {wizard.needsDuration && duration ? ` (${duration.days} Days)` : ""}
            </dt>
            <dd className="font-semibold text-slate-ink">
              {wizard.primaryTotal} AED
            </dd>
          </div>

          {selectedAddOns.map((a) => (
            <div key={a.id} className="flex items-center justify-between">
              <dt className="text-slate-3">{a.name}</dt>
              <dd className="font-semibold text-slate-ink">{a.price} AED</dd>
            </div>
          ))}

          <div className="flex items-center justify-between border-t border-rule pt-3 text-[15px]">
            <dt className="font-bold text-slate-ink">Total Payable</dt>
            <dd className="font-extrabold text-iris-700">{wizard.total} AED</dd>
          </div>
        </dl>

        <p className="mt-2 text-[11.5px] text-slate-3">
          Taxes applicable as per UAE law.
        </p>

        <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[13.5px] text-slate-2">
          <input
            type="checkbox"
            defaultChecked
            className="mt-0.5 size-4 shrink-0 rounded border-rule accent-iris-600"
          />
          <span>
            I confirm the information above is accurate and I accept the Terms
            &amp; Conditions and Privacy Policy.
          </span>
        </label>
      </Panel>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  step,
  wizard,
}: {
  label: string;
  value: string;
  step: number;
  wizard: Wizard;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-[13px] text-slate-3">{label}</dt>
      <dd className="flex items-baseline gap-3 text-right">
        <span className="text-[13.5px] font-semibold text-slate-ink">{value}</span>
        <button
          type="button"
          onClick={() => wizard.goTo(step)}
          className="text-[12.5px] font-medium text-iris-600 hover:underline"
        >
          Edit
        </button>
      </dd>
    </div>
  );
}

/* ── Shared ─────────────────────────────────────────────────────────── */

function UploadTile({
  label,
  hint,
  required,
  icon,
}: {
  label: string;
  hint: string;
  required?: boolean;
  icon: "image" | "gallery" | "file";
}) {
  const Icon = icon === "file" ? Upload : icon === "image" ? ImagePlus : ImagePlus;

  return (
    <div>
      <p className="mb-1.5 text-[13.5px] font-semibold text-slate-2">
        {label}
        {required ? <span className="ml-0.5 text-alert">*</span> : null}
      </p>
      <button
        type="button"
        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-rule bg-paper px-4 py-7 text-center transition-colors hover:border-iris-400 hover:bg-iris-50/40"
      >
        <span
          aria-hidden
          className="grid size-10 place-items-center rounded-full bg-white text-iris-600 shadow-p1"
        >
          <Icon className="size-[18px]" />
        </span>
        <span className="text-[13px] font-semibold text-iris-600">
          Click to upload
        </span>
        <span className="text-[11.5px] text-slate-3">{hint}</span>
      </button>
    </div>
  );
}

export { CheckCircle2 };
