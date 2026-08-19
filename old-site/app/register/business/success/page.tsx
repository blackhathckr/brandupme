import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Globe,
  LayoutDashboard,
  Mail,
  MessageCircle,
} from "lucide-react";
import { AdBanner } from "@/components/site/ad-banner";
import { PublicHeader } from "@/components/site/public-header";
import { TopBar } from "@/components/site/top-bar";

export const metadata: Metadata = {
  title: "Registration Complete | BrandUpMe",
  description: "Your BrandUpMe business account is live.",
};

/**
 * The post-payment screen. The client's flow says the welcome email and
 * WhatsApp message carry the User ID, password, dashboard URL, business page
 * URL and digital card URL — this screen mirrors that so the two agree.
 */
const DELIVERED = [
  {
    icon: Globe,
    title: "Your Business Webpage",
    body: "brandupme.com/abc-cleaning-services",
  },
  {
    icon: CreditCard,
    title: "Your Digital Business Card",
    body: "Shareable link and QR code, ready to send",
  },
  {
    icon: LayoutDashboard,
    title: "Your Business Dashboard",
    body: "Track views, inquiries, meetings and leads",
  },
];

export default function Page() {
  return (
    <div className="min-h-dvh bg-white">
      <TopBar />
      <PublicHeader />

      <main className="container-portal py-12">
        <div className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="mx-auto grid size-20 place-items-center rounded-full bg-ok-soft"
          >
            <CheckCircle2 className="size-11 text-ok" />
          </span>

          <h1 className="mt-6 text-[34px] font-extrabold leading-tight tracking-[-0.02em] text-slate-ink">
            Registration Complete
          </h1>
          <p className="mx-auto mt-2.5 max-w-xl text-[15px] text-slate-3">
            Payment confirmed and your business is now live on BrandUpMe. Your
            login details have been sent to you.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-paper px-3.5 py-2 text-[13px] font-medium text-slate-2">
              <Mail className="size-4 text-iris-600" aria-hidden />
              Welcome email sent
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-paper px-3.5 py-2 text-[13px] font-medium text-slate-2">
              <MessageCircle className="size-4 text-ok" aria-hidden />
              WhatsApp confirmation sent
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-paper px-3.5 py-2 text-[13px] font-medium text-slate-2">
              Business ID
              <span className="font-bold text-slate-ink">BIZ-10025</span>
            </span>
          </div>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {DELIVERED.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-rule bg-white p-5 shadow-p1"
              >
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full bg-iris-100 text-iris-600"
                >
                  <Icon className="size-5" />
                </span>
                <p className="mt-3 text-[14px] font-bold text-slate-ink">
                  {title}
                </p>
                <p className="mt-1 break-words text-[12.5px] text-slate-3">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-iris-700 px-6 text-[15px] font-semibold text-white shadow-iris transition-colors hover:bg-iris-800"
            >
              Go to Dashboard
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/register"
              className="inline-flex h-11 items-center rounded-lg border border-rule bg-white px-6 text-[15px] font-semibold text-slate-2 transition-colors hover:bg-paper"
            >
              View Business Page
            </Link>
          </div>
        </div>

        <AdBanner creative="royal-palace" className="mt-12" />
      </main>
    </div>
  );
}
