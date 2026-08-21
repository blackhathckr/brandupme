"use client";

import { useEffect, useState } from "react";
import {
  Banknote,
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  FileText,
  Fingerprint,
  Info,
  Landmark,
  Lock,
  PartyPopper,
  ShieldCheck,
} from "lucide-react";
import { PAYMENT_METHODS, type PaymentMethod } from "@/lib/business-owner-data";
import { inputClass, labelClass } from "@/components/business/signup/field-kit";

type Totals = { planName: string; durationLabel: string; price: number; vat: number; total: number };

const METHOD_ICON: Record<PaymentMethod, React.ComponentType<{ className?: string }>> = {
  card: CreditCard,
  apple: Fingerprint,
  google: Fingerprint,
  bank: Landmark,
};

function OrderSummary({ totals }: { totals: Totals }) {
  return (
    <aside className="rounded-2xl border border-[#E5EAE3] p-5">
      <p className="text-[14px] font-bold text-[#0B1F13]">Order Summary</p>
      <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-[#F4F9F1] p-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3E8130] text-white">
          <CheckCircle2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[13px] font-bold text-[#0B1F13]">{totals.planName}</p>
          <p className="text-[11px] text-[#5F7168]">{totals.durationLabel}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t border-[#EEF1EC] pt-4 text-[13px]">
        <div className="flex items-center justify-between text-[#5F7168]">
          <span>Duration</span>
          <span className="font-semibold text-[#0B1F13]">{totals.durationLabel}</span>
        </div>
        <div className="flex items-center justify-between text-[#5F7168]">
          <span>Plan Price</span>
          <span className="font-semibold text-[#0B1F13]">AED {totals.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-[#5F7168]">
          <span>VAT (5%)</span>
          <span className="font-semibold text-[#0B1F13]">AED {totals.vat.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-[#EEF1EC] pt-4">
        <span className="text-[13.5px] font-bold text-[#0B1F13]">Total Amount</span>
        <span className="text-[20px] font-extrabold text-[#194C11]">AED {totals.total.toFixed(2)}</span>
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#EFF4FF] p-3 text-[11.5px] text-[#2F6FE4]">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Plan will be activated immediately after successful payment.
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#F4F9F1] p-3 text-[11.5px] text-[#194C11]">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        100% Secure Payment. Your payment is safe with us.
      </div>
    </aside>
  );
}

function ProcessingModal({ method, brand }: { method: "apple" | "google"; brand: string }) {
  return (
    <div className="mx-auto max-w-[300px] rounded-2xl bg-[#1B1F1D] p-5 text-white shadow-2xl">
      <div className="flex items-center justify-between text-[13px] font-semibold">
        <span className="flex items-center gap-1.5">{method === "apple" ? "" : "G"}Pay</span>
        <span className="text-white/50">Cancel</span>
      </div>
      <p className="mt-4 text-[12px] text-white/60">BrandUpMe</p>
      <p className="text-[13px] font-semibold">{brand}</p>
      <p className="mt-3 text-[26px] font-extrabold">AED 105.00</p>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-[12px]">
        <span>Pay with</span>
        <span className="font-semibold">Visa •••• 4242</span>
      </div>
      <div className="mt-5 flex flex-col items-center gap-2 text-white/70">
        <Fingerprint className="h-8 w-8" />
        <p className="text-[11.5px]">{method === "apple" ? "Confirm with Side Button" : "Confirm with your fingerprint"}</p>
      </div>
    </div>
  );
}

export function Step5Payment({
  totals,
  onBack,
  onFinish,
}: {
  totals: Totals;
  onBack: () => void;
  onFinish: () => void;
}) {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [stage, setStage] = useState<"select" | "processing" | "success">("select");
  const [bankConfirmed, setBankConfirmed] = useState(false);

  useEffect(() => {
    if (stage !== "processing") return;
    const t = setTimeout(() => setStage("success"), 2200);
    return () => clearTimeout(t);
  }, [stage]);

  function pay() {
    if (method === "apple" || method === "google") {
      setStage("processing");
    } else {
      setStage("success");
    }
  }

  if (stage === "success") {
    const now = "20 May 2026, 10:30 AM";
    return (
      <div className="py-4 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6DF] text-[#3E8130]">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-4 text-[24px] font-extrabold text-[#0B1F13]">Payment Successful!</h1>
        <p className="mt-1 text-[13.5px] text-[#5F7168]">
          Your {totals.planName} has been activated. Thank you for choosing BrandUpMe. Welcome to the ecosystem.
        </p>

        <div className="mx-auto mt-6 grid max-w-[720px] gap-4 text-left sm:grid-cols-2">
          <div className="rounded-xl border border-[#E5EAE3] p-4">
            <p className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#0B1F13]">
              <PartyPopper className="h-3.5 w-3.5 text-[#3E8130]" />
              Plan Activated
            </p>
            <p className="mt-2 text-[13px] font-semibold text-[#194C11]">{totals.planName}</p>
            <div className="mt-2 flex flex-col gap-1 text-[12px] text-[#5F7168]">
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-medium text-[#0B1F13]">{totals.durationLabel}</span>
              </div>
              <div className="flex justify-between">
                <span>Activation Date</span>
                <span className="font-medium text-[#0B1F13]">{now}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment ID</span>
                <span className="font-medium text-[#0B1F13]">PAY-20260520-12345</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-semibold text-[#3E8130]">Active</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5EAE3] p-4">
            <p className="text-[12.5px] font-bold text-[#0B1F13]">What&rsquo;s Next?</p>
            <div className="mt-2 flex flex-col gap-1.5 text-[12px] text-[#3D4B44]">
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3E8130]" />
                Your business page is now live
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3E8130]" />
                You can start receiving customer inquiries
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3E8130]" />
                Access your dashboard to manage your business
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3E8130]" />
                You can upgrade or renew anytime
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 flex max-w-[720px] flex-col gap-2.5 sm:flex-row">
          <button
            onClick={onFinish}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#3E8130] text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425]"
          >
            Go to Dashboard
          </button>
          <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#DDE6DC] text-[13.5px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]">
            <Download className="h-4 w-4" />
            Download Invoice
          </button>
        </div>
      </div>
    );
  }

  if (stage === "processing") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <ProcessingModal method={method as "apple" | "google"} brand={`${totals.planName} — ${totals.durationLabel}`} />
        <p className="flex items-center gap-1.5 text-[12.5px] text-[#5F7168]">
          <Lock className="h-3.5 w-3.5" />
          Your payment is being processed securely...
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#3E8130]">Step 5 of 5</p>
      <h1 className="mt-1 text-[26px] font-extrabold text-[#0B1F13]">Secure Payment</h1>
      <p className="mt-1 text-[13.5px] text-[#5F7168]">Complete your payment to activate your {totals.planName}.</p>
      <div className="mt-5 border-t border-[#E5EAE3]" />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_260px]">
        <div>
          <div className="flex items-start gap-2.5 rounded-xl bg-[#F4F9F1] p-3.5 text-[12.5px] text-[#194C11]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-bold">Your payment is secure and encrypted</p>
              <p className="text-[11.5px] font-normal text-[#3D4B44]">We use industry-standard security to protect your transactions.</p>
            </div>
          </div>

          <p className="mt-6 text-[14px] font-bold text-[#0B1F13]">1. Choose Payment Method</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PAYMENT_METHODS.map((m) => {
              const Icon = METHOD_ICON[m.key];
              const active = method === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setMethod(m.key)}
                  className={
                    "relative rounded-xl border-2 p-3.5 text-left transition-colors " +
                    (active ? "border-[#3E8130] bg-[#F4F9F1]" : "border-[#E5EAE3] hover:border-[#3E8130]/40")
                  }
                >
                  {active && (
                    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#3E8130] text-white">
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                  )}
                  <Icon className="h-5 w-5 text-[#0B1F13]" />
                  <p className="mt-2 text-[12.5px] font-bold text-[#0B1F13]">{m.label}</p>
                  <p className="text-[10.5px] text-[#5F7168]">{m.sub}</p>
                </button>
              );
            })}
          </div>

          {method === "card" && (
            <>
              <p className="mt-6 text-[14px] font-bold text-[#0B1F13]">2. Card Details</p>
              <div className="mt-3 flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Card Number</label>
                  <input placeholder="1234 5678 9012 3456" className={inputClass + " mt-1.5"} />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <label className={labelClass}>Cardholder Name</label>
                    <input placeholder="Enter cardholder name" className={inputClass + " mt-1.5"} />
                  </div>
                  <div>
                    <label className={labelClass}>Expiry Date</label>
                    <input placeholder="MM / YY" className={inputClass + " mt-1.5"} />
                  </div>
                  <div>
                    <label className={labelClass}>CVV</label>
                    <input placeholder="123" className={inputClass + " mt-1.5"} />
                  </div>
                </div>
                <div className="rounded-lg bg-[#F4F9F1] px-3.5 py-2.5 text-center text-[11.5px] text-[#194C11]">
                  🔒 We do not store your card details.
                </div>
              </div>
            </>
          )}

          {method === "apple" && (
            <div className="mt-6 rounded-xl border border-[#E5EAE3] p-6 text-center">
              <p className="text-[13.5px] text-[#3D4B44]">Click the button below to pay securely with Apple Pay.</p>
              <button
                onClick={pay}
                className="mt-4 inline-flex h-12 items-center gap-2 rounded-lg bg-black px-8 text-[15px] font-semibold text-white"
              >
                 Pay
              </button>
            </div>
          )}

          {method === "google" && (
            <div className="mt-6 rounded-xl border border-[#E5EAE3] p-6 text-center">
              <p className="text-[13.5px] text-[#3D4B44]">Click the button below to pay securely with Google Pay.</p>
              <button
                onClick={pay}
                className="mt-4 inline-flex h-12 items-center gap-2 rounded-lg bg-[#0B1F13] px-8 text-[15px] font-semibold text-white"
              >
                G Pay
              </button>
            </div>
          )}

          {method === "bank" && !bankConfirmed && (
            <div className="mt-6 rounded-xl border border-[#E5EAE3] p-5">
              <p className="text-[13px] font-bold text-[#0B1F13]">Bank Transfer Details</p>
              <p className="text-[11.5px] text-[#5F7168]">Please transfer the exact amount to the account below.</p>
              <div className="mt-3 rounded-lg bg-[#F4F9F1] p-3">
                <p className="text-[11px] text-[#5F7168]">Amount to Transfer</p>
                <p className="text-[20px] font-extrabold text-[#194C11]">AED {totals.total.toFixed(2)}</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-[12.5px]">
                {[
                  ["Bank Name", "Emirates NBD"],
                  ["Account Name", "BrandUpMe FZ-LLC"],
                  ["Account Number", "1234567890123456"],
                  ["IBAN", "AE123456789012345678901"],
                  ["Swift Code", "EBILAEADXXX"],
                  ["Reference / Note", "BM-SIGNUP-12345"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-[#EEF1EC] p-2.5">
                    <p className="text-[10.5px] text-[#5F7168]">{label}</p>
                    <p className="flex items-center gap-1 font-semibold text-[#0B1F13]">
                      {value}
                      <Copy className="h-3 w-3 text-[#5F7168]" />
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 rounded-lg bg-[#FDF3E4] p-2.5 text-[11px] text-[#8A5A0F]">
                Please make the payment within 30 minutes. Your plan will be activated after payment confirmation.
              </p>
              <button
                onClick={() => setBankConfirmed(true)}
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#3E8130] text-[13.5px] font-semibold text-white hover:bg-[#2F6425]"
              >
                <Banknote className="h-4 w-4" />
                I Have Made the Payment
              </button>
            </div>
          )}

          {method === "bank" && bankConfirmed && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E5EAE3] bg-[#F4F9F1] p-5">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[#194C11]" />
              <div>
                <p className="text-[13px] font-bold text-[#194C11]">Payment confirmation received</p>
                <p className="mt-1 text-[12px] text-[#3D4B44]">
                  We&rsquo;ll verify your transfer and activate your plan shortly. Continue to finish setting up your account.
                </p>
                <button onClick={pay} className="mt-3 flex h-10 items-center gap-2 rounded-full bg-[#3E8130] px-5 text-[12.5px] font-semibold text-white hover:bg-[#2F6425]">
                  Continue
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <button onClick={onBack} className="flex h-11 items-center gap-2 rounded-full border border-[#DDE6DC] px-6 text-[13.5px] font-semibold text-[#0B1F13] transition-colors hover:bg-[#F4F9F1]">
              <span aria-hidden>←</span>
              Back
            </button>
            {(method === "card") && (
              <button
                onClick={pay}
                className="flex h-11 items-center gap-2 rounded-full bg-[#3E8130] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425]"
              >
                <Lock className="h-4 w-4" />
                Pay Now &middot; AED {totals.total.toFixed(2)}
              </button>
            )}
          </div>
          <p className="mt-3 text-center text-[11.5px] text-[#5F7168] lg:text-left">
            By proceeding, you agree to our{" "}
            <a href="#" className="font-semibold text-[#3E8130] hover:underline">
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold text-[#3E8130] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <OrderSummary totals={totals} />
      </div>
    </div>
  );
}
