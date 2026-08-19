import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Hammer } from "lucide-react";
import { PublicHeader } from "@/components/site/public-header";
import { TopBar } from "@/components/site/top-bar";

export const metadata: Metadata = {
  title: "Coming in the next batch | BrandUpMe",
};

/**
 * Placeholder so the click-through demo never dead-ends on a 404 while the
 * remaining batches are built. Every unbuilt nav target points here and names
 * the batch it ships in.
 */
const SCHEDULE: Record<string, string> = {
  promoter: "Batch 5 — Promoter registration",
  "category-referral-partner": "Batch 5 — Category Referral Partner registration",
  "business-selected-partner": "Batch 5 — Selected Business Referral Partner registration",
  customer: "Batch 5 — Customer registration",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ flow?: string }>;
}) {
  const { flow } = await searchParams;
  const label = flow ? SCHEDULE[flow] : undefined;

  return (
    <div className="min-h-dvh bg-white">
      <TopBar />
      <PublicHeader />

      <main className="container-portal grid place-items-center py-24 text-center">
        <span
          aria-hidden
          className="grid size-16 place-items-center rounded-full bg-iris-100 text-iris-600"
        >
          <Hammer className="size-8" />
        </span>

        <h1 className="mt-6 text-[30px] font-extrabold tracking-[-0.02em] text-slate-ink">
          This screen is in a later batch
        </h1>
        <p className="mt-2.5 max-w-md text-[15px] text-slate-3">
          {label
            ? `Scheduled for ${label}.`
            : "We are building the portal in reviewable batches. This screen has not shipped yet."}
        </p>

        <Link
          href="/register"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg border border-rule bg-white px-6 text-[15px] font-semibold text-slate-2 transition-colors hover:bg-paper"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Create Account
        </Link>
      </main>
    </div>
  );
}
