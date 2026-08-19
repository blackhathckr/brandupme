"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Eye,
  Handshake,
  Headphones,
  Lock,
  Mail,
  Megaphone,
  Network,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import {
  Field,
  Panel,
  PhoneInput,
  PrimaryButton,
  SelectInput,
  TextInput,
} from "@/components/site/form-kit";
import { ACCOUNT_TYPES, ROLE_OPTIONS, type AccountTypeId } from "@/lib/brand/account-types";
import { cn } from "@/lib/utils";

const ICONS = {
  building2: Building2,
  megaphone: Megaphone,
  network: Network,
  handshake: Handshake,
  user: User,
} as const;

const STEPS = [
  "Choose Account Type",
  "Enter Details",
  "Verify & Secure",
  "Get Started",
];

const WHY = [
  "Get Verified & Trusted",
  "Increase Visibility",
  "Generate Quality Leads",
  "Access Powerful Tools",
  "Grow Your Business Faster",
  "Earn Rewards & Benefits",
];

export function CreateAccount() {
  const router = useRouter();
  const [selected, setSelected] = useState<AccountTypeId>("business-owner");
  const [agreed, setAgreed] = useState(true);

  const chosen = ACCOUNT_TYPES.find((t) => t.id === selected)!;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Prototype navigation. Replaced by a server action in the backend phase.
    router.push(chosen.ready ? chosen.href : `/soon?flow=${chosen.id}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/*
        Column widths track the mockup's 1475px content band: 667 / 546 / 223.
        At a 1536px viewport this resolves to roughly 655 / 537 / 232.
      */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)_232px]">
        {/* ── Column one — heading, progress, account type ────────────── */}
        <div>
          <h1 className="text-[34px] font-extrabold leading-tight tracking-[-0.02em] text-slate-ink">
            Create Your Account
          </h1>
          <p className="mt-1.5 text-[15px] text-slate-3">
            Join BrandUpMe and unlock the power to grow your business.
          </p>

          {/*
            Each item owns a fixed share of the row so a long label can never
            run under the next circle. The indicator and the connector share a
            row; the label sits beneath, clipped to that item's own column.
          */}
          <Stepper value={1} className="mt-7">
            <StepperNav className="items-start gap-0">
              {STEPS.map((label, i) => (
                <StepperItem
                  key={label}
                  step={i + 1}
                  disabled
                  className="w-1/4 min-w-0 shrink-0 flex-col items-stretch gap-0"
                >
                  <div className="flex w-full items-center">
                    <StepperTrigger className="pointer-events-none shrink-0">
                      <StepperIndicator className="size-[26px] bg-slate-4 text-[12px] font-bold text-white data-[state=active]:bg-iris-600">
                        {i + 1}
                      </StepperIndicator>
                    </StepperTrigger>
                    {i < STEPS.length - 1 ? (
                      <StepperSeparator className="mx-2 h-px min-w-0 flex-1 bg-rule" />
                    ) : null}
                  </div>
                  <StepperTitle className="mt-2.5 pr-3 text-[12.5px] font-medium leading-snug text-slate-3 group-data-[state=active]/step:font-semibold group-data-[state=active]/step:text-iris-600">
                    {label}
                  </StepperTitle>
                </StepperItem>
              ))}
            </StepperNav>
          </Stepper>

          <Panel
            className="mt-8"
            step="1."
            title="Choose Your Account Type"
            description="Select the type of account that best describes you."
          >
            <div
              role="radiogroup"
              aria-label="Account type"
              className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5"
            >
              {ACCOUNT_TYPES.map((type) => {
                const Icon = ICONS[type.icon];
                const active = selected === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSelected(type.id)}
                    className={cn(
                      "relative flex flex-col items-center rounded-xl border p-3 text-center transition-all",
                      active
                        ? "border-iris-600 bg-iris-50/40 shadow-p2 ring-1 ring-iris-600"
                        : "border-rule bg-white hover:border-iris-300 hover:shadow-p1",
                    )}
                  >
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute right-2 top-2 grid size-[18px] place-items-center rounded-full bg-iris-600"
                      >
                        <Check className="size-3 text-white" strokeWidth={3} />
                      </span>
                    ) : null}

                    <span
                      aria-hidden
                      className={cn(
                        "grid size-12 place-items-center rounded-full",
                        type.chip,
                      )}
                    >
                      <Icon className="size-6" />
                    </span>

                    <span className="mt-3 text-[12.5px] font-bold leading-tight tracking-[-0.01em] text-slate-ink">
                      {type.label}
                    </span>
                    <span className="mt-2 text-[11px] leading-snug text-balance text-slate-3">
                      {type.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-lg bg-paper-2 p-4">
              <ShieldCheck
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-iris-600"
              />
              <p className="text-[13px] leading-relaxed">
                <span className="font-semibold text-iris-700">
                  All accounts are verified &amp; protected
                </span>
                <span className="mt-0.5 block text-slate-3">
                  We ensure your data is safe and never share your information
                  with anyone.
                </span>
              </p>
            </div>
          </Panel>
        </div>

        {/* ── Column two — the details form ───────────────────────────── */}
        <Panel
          step="2."
          title="Enter Your Details"
          description="Please fill in your information to create your account."
          className="self-start"
        >
          <p className="-mt-3 mb-4 text-right text-[11.5px] text-alert">
            * Required Fields
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" required htmlFor="fullName">
              <TextInput
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                icon={<User />}
                autoComplete="name"
              />
            </Field>

            <Field label="Email Address" required htmlFor="email">
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                icon={<Mail />}
                autoComplete="email"
              />
            </Field>

            <Field label="Mobile Number" required htmlFor="mobile">
              <PhoneInput id="mobile" name="mobile" placeholder="Enter mobile number" />
            </Field>

            <Field label="Password" required htmlFor="password">
              <div className="relative">
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  icon={<Lock />}
                  className="pr-10"
                  autoComplete="new-password"
                />
                <Eye
                  aria-hidden
                  className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-4"
                />
              </div>
            </Field>

            <Field label="Confirm Password" required htmlFor="confirmPassword">
              <div className="relative">
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  icon={<Lock />}
                  className="pr-10"
                  autoComplete="new-password"
                />
                <Eye
                  aria-hidden
                  className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-4"
                />
              </div>
            </Field>

            <Field label="Select Your Role" required htmlFor="role">
              <SelectInput
                id="role"
                name="role"
                value={selected}
                onChange={(e) => setSelected(e.target.value as AccountTypeId)}
              >
                {ROLE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>

          <div className="mt-5 rounded-lg border border-iris-200 bg-iris-50/50 p-4">
            <p className="text-[13.5px] font-semibold text-iris-700">
              Referral Code (Optional)
            </p>
            <p className="mb-2.5 mt-0.5 text-[12.5px] text-slate-3">
              Enter referral code if you have one.
            </p>
            <TextInput
              name="referralCode"
              placeholder="Enter referral code"
              className="bg-white"
              icon={<UserPlus />}
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[13.5px] text-slate-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded border-rule accent-iris-600"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="font-medium text-iris-600 hover:underline">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-medium text-iris-600 hover:underline">
                Privacy Policy
              </Link>
              <span className="text-alert"> *</span>
            </span>
          </label>

          <PrimaryButton type="submit" disabled={!agreed} className="mt-5 w-full">
            Create Account
            <ArrowRight className="size-4" aria-hidden />
          </PrimaryButton>

          <p className="mt-3.5 text-center text-[13.5px] text-slate-3">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-iris-600 hover:underline">
              Login
            </Link>
          </p>
        </Panel>

        {/* ── Column three — reassurance rail ─────────────────────────── */}
        <aside className="space-y-4 self-start">
          <div className="rounded-xl border border-rule bg-white p-5 shadow-p1">
            <h2 className="text-[15px] font-bold text-slate-ink">
              Why Register with BrandUpMe?
            </h2>
            <ul className="mt-4 space-y-2.5">
              {WHY.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    aria-hidden
                    className="mt-px size-4 shrink-0 text-ok"
                  />
                  <span className="text-[13px] font-medium text-slate-2">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-rule bg-white p-5 text-center shadow-p1">
            <div className="flex items-start gap-3 text-left">
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-full bg-iris-100 text-iris-600"
              >
                <Headphones className="size-5" />
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-slate-ink">
                  Need Help?
                </h2>
                <p className="mt-0.5 text-[12.5px] leading-snug text-slate-3">
                  Our support team is here to help you.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-4 flex h-10 items-center justify-center rounded-lg border border-iris-200 text-[14px] font-semibold text-iris-700 transition-colors hover:bg-iris-50"
            >
              Contact Support
            </Link>
            <p className="mt-3 text-[13px] text-slate-2">
              Call: <span className="font-semibold">+971 50 123 4567</span>
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}
