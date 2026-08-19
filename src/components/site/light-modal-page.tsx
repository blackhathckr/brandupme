"use client";

import Link from "next/link";
import { X } from "lucide-react";
import CategoriesMainPage from "@/app/categories/main/page";

/**
 * A light-themed counterpart to ModalPage — for dialogs that sit on top of a
 * light page (like /categories/main) rather than the dark homepage. The
 * backdrop reuses the real, live /categories/main page (rendered inert) so it
 * always matches that page exactly — same pattern ModalPage uses for the
 * dark homepage backdrop.
 */
export function LightModalPage({
  children,
  maxWidth = 900,
  closeHref = "/categories/main",
}: {
  children: React.ReactNode;
  maxWidth?: number;
  closeHref?: string;
}) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none h-full select-none overflow-hidden">
        <CategoriesMainPage />
      </div>

      <div className="absolute inset-0 z-[60] bg-white/60 backdrop-blur-[3px]" />

      <div className="absolute inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
        <div
          className="relative w-full overflow-hidden rounded-[22px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
          style={{ maxWidth, maxHeight: "90vh" }}
        >
          <Link
            href={closeHref}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F9F1] text-[#0B1F13] transition-colors hover:bg-[#E5EAE3]"
          >
            <X className="h-4 w-4" />
          </Link>
          <div className="h-full overflow-y-auto" style={{ maxHeight: "90vh" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
