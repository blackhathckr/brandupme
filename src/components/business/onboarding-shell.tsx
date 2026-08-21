import Link from "next/link";
import { ArrowRight, HeadphonesIcon, Lock } from "lucide-react";
import { TopBar } from "@/components/site/top-bar";
import { SiteHeader } from "@/components/site/site-header";
import { SignupStepper } from "@/components/business/signup-stepper";

const TRUST_STATS = [
  { label: "Verified Businesses", value: "10,000+" },
  { label: "Business Categories", value: "250+" },
  { label: "UAE Emirates", value: "7" },
];

export function OnboardingShell({
  step,
  children,
  sideTitle,
  sideItems,
  wide = false,
  topRight,
}: {
  step: number;
  children: React.ReactNode;
  sideTitle?: string;
  sideItems?: { title: string; copy: string; icon: React.ComponentType<{ className?: string }> }[];
  wide?: boolean;
  topRight?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9F6] text-[#0B1F13]">
      <TopBar />
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-[1320px] px-6 py-8 sm:px-8">
          <div className={"grid gap-6 " + (wide ? "lg:grid-cols-[240px_1fr]" : "lg:grid-cols-[240px_1fr_300px]")}>
            {/* left: stepper */}
            <aside className="order-2 lg:order-1">
              <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
                <h2 className="text-[18px] font-extrabold leading-tight text-[#0B1F13]">
                  Business Owner Account Creation
                </h2>
                <p className="mt-1.5 text-[12.5px] leading-[1.4] text-[#5F7168]">
                  Create your business account in just a few simple steps
                </p>
                <div className="mt-6">
                  <SignupStepper currentStep={step} />
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-[#DDE6DC] bg-[#F4F9F1] p-4">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#194C11]" />
                <div>
                  <p className="text-[13px] font-bold text-[#0B1F13]">Your Data is Secure</p>
                  <p className="mt-0.5 text-[11.5px] leading-[1.4] text-[#5F7168]">
                    We use advanced encryption to protect your personal and business information.
                  </p>
                </div>
              </div>
            </aside>

            {/* center: step content */}
            <div className="order-1 min-w-0 lg:order-2">
              {topRight && <div className="mb-4 flex justify-end">{topRight}</div>}
              <div className="rounded-2xl border border-[#E5EAE3] bg-white p-6 sm:p-8">{children}</div>
            </div>

            {/* right: why panel */}
            {!wide && (
            <aside className="order-3 flex flex-col gap-4">
              {sideItems && (
                <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
                  <p className="text-[14px] font-bold text-[#0B1F13]">{sideTitle}</p>
                  <div className="mt-4 flex flex-col gap-4">
                    {sideItems.map(({ title, copy, icon: Icon }) => (
                      <div key={title} className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F9F1] text-[#3E8130]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="leading-tight">
                          <p className="text-[13px] font-bold text-[#0B1F13]">{title}</p>
                          <p className="mt-0.5 text-[11.5px] leading-[1.4] text-[#5F7168]">{copy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F9F1] text-[#3E8130]">
                    <HeadphonesIcon className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-bold text-[#0B1F13]">Need Help?</p>
                    <p className="mt-0.5 text-[11.5px] leading-[1.4] text-[#5F7168]">
                      Our support team is ready to assist you.
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="mt-3.5 flex h-10 w-full items-center justify-center rounded-lg border border-[#DDE6DC] text-[12.5px] font-semibold text-[#0B1F13] transition-colors hover:bg-[#F4F9F1]"
                >
                  Contact Support
                </a>
              </div>
            </aside>
            )}
          </div>
        </div>
      </main>

      <div className="border-t border-[#E5EAE3] bg-white px-6 py-5 sm:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="text-[15px] font-extrabold leading-none text-[#0B1F13]">{s.value}</p>
                <p className="mt-1 text-[11px] text-[#5F7168]">{s.label}</p>
              </div>
            ))}
            <div className="text-center sm:text-left">
              <p className="text-[13px] font-bold leading-none text-[#0B1F13]">Secure &amp; Trusted</p>
              <p className="mt-1 text-[11px] text-[#5F7168]">100% Data Protection</p>
            </div>
          </div>
          <p className="text-[12.5px] text-[#5F7168]">
            Already have an account?{" "}
            <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-[#3E8130] hover:underline">
              Login here
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
