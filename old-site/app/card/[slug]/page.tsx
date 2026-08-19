import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { CardActions, DigitalCard } from "@/components/business/digital-card";
import { BrandLogo } from "@/components/site/brand-logo";
import { FEATURED_BUSINESS } from "@/lib/brand/businesses";

export const metadata: Metadata = {
  title: `${FEATURED_BUSINESS.name} — Digital Business Card`,
  description: FEATURED_BUSINESS.headline,
};

/**
 * The share target for a Digital Business Card.
 *
 * This is the URL partners, promoters and customers actually send, and every
 * open is a tracked reward activity in the client's Refer & Earn model. Kept
 * deliberately bare — one card, one call to action, no site chrome competing
 * with it on a phone.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = FEATURED_BUSINESS;

  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col px-4 py-8">
        <div className="flex justify-center">
          <BrandLogo />
        </div>

        <div className="mt-8">
          <DigitalCard cardUrl={`https://brandupme.com/card/${slug}`} />
          <CardActions />
        </div>

        <div className="mt-6 rounded-xl border border-rule bg-white p-5 text-center shadow-p1">
          <p className="text-[15px] font-bold text-slate-ink">
            Interested in {b.name}?
          </p>
          <p className="mt-1 text-[13px] text-slate-3">
            Send an inquiry and schedule a video call with the team.
          </p>

          <Link
            href={`/business/${slug}#inquiry`}
            className="mt-4 flex h-11 items-center justify-center gap-2 rounded-lg bg-iris-600 text-[15px] font-semibold text-white shadow-iris transition-colors hover:bg-iris-700"
          >
            <Send className="size-4" aria-hidden />
            Send Inquiry
          </Link>

          <Link
            href={`/business/${slug}`}
            className="mt-2.5 flex h-11 items-center justify-center gap-2 rounded-lg border border-rule text-[14.5px] font-semibold text-slate-2 transition-colors hover:bg-paper"
          >
            View Full Profile
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-auto pt-8 text-center">
          <p className="text-[12.5px] text-slate-3">
            Want a digital card for your business?
          </p>
          <Link
            href="/register/business"
            className="mt-1.5 inline-flex text-[13px] font-semibold text-iris-600 hover:underline"
          >
            Get yours from AED 10/day
          </Link>
        </div>
      </div>
    </div>
  );
}
