"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { TopBar } from "@/components/site/top-bar";
import { SiteHeader } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Categories } from "@/components/site/categories";

/**
 * Every "clicked from the homepage header" screen in the specs (Opportunities,
 * Partners, Influencers, Join Ecosystem, Login) is defined as a centered white
 * panel with the homepage visibly dimmed behind it, on its own SEO-indexable
 * route. This renders that shared shell: a real (non-interactive) homepage
 * backdrop + dark overlay + centered scrollable panel.
 */
export function ModalPage({
  children,
  maxWidth = 820,
  closeHref = "/",
}: {
  children: React.ReactNode;
  maxWidth?: number;
  closeHref?: string;
}) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020F08]">
      {/* dimmed homepage backdrop — real content for context, not interactive */}
      <div aria-hidden className="pointer-events-none h-full select-none overflow-hidden">
        <TopBar />
        <SiteHeader />
        <Hero />
        <Stats />
        <Categories />
      </div>

      <div className="absolute inset-0 z-[60] bg-[rgba(0,12,8,0.75)] backdrop-blur-[3px]" />

      <div className="absolute inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
        <div
          className="relative w-full overflow-hidden rounded-[22px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          style={{ maxWidth, maxHeight: "88vh" }}
        >
          <Link
            href={closeHref}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0B1F13] shadow-md ring-1 ring-black/5 transition-colors hover:bg-[#F4F9F1]"
          >
            <X className="h-4 w-4" />
          </Link>
          <div className="h-full overflow-y-auto" style={{ maxHeight: "88vh" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
