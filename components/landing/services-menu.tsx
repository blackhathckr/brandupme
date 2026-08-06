"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SERVICE_PAGES } from "@/lib/services-in";
import { cn } from "@/lib/utils";

/**
 * Services dropdown.
 *
 * Without this, the service detail pages are only reachable by clicking a card
 * on the homepage - so from a service page there is no way to reach a sibling
 * service without going back. Every page in the site should be reachable from
 * every other page.
 *
 * Hover opens it on pointer devices; click and keyboard work everywhere, which
 * matters because hover alone is unusable on touch.
 */
export function ServicesMenu({
  stuck,
  active,
}: {
  stuck: boolean;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Click-outside and Escape both close it.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Small close delay so the pointer can cross the gap to the panel.
  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex items-center gap-1 py-1 text-[14px] font-medium transition-colors",
          stuck
            ? active || open
              ? "text-green-text"
              : "text-ink-2 hover:text-green-text"
            : active || open
              ? "text-white"
              : "text-white/75 hover:text-white",
        )}
      >
        Services
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={2.5}
          aria-hidden
        />
        {active && (
          <span
            aria-hidden
            className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
          />
        )}
      </button>

      {open && (
        <div
          className="absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-3"
          role="menu"
        >
          <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-e4">
            {SERVICE_PAGES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-ink-2
                  transition-colors hover:bg-brand-50 hover:text-green-text"
              >
                {s.nav}
              </Link>
            ))}

            <Link
              href="/india/#services"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-xl border-t border-line px-3 pb-1 pt-3 text-[12.5px]
                font-semibold text-green-text transition-colors hover:bg-brand-50"
            >
              View all services
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
