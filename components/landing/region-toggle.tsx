"use client";

import Link from "next/link";
import { REGIONS, type Region } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Country switch.
 *
 * Implemented as LINKS between two real routes rather than client-side state,
 * because the two markets sell different things. Each needs its own indexable
 * page, its own title and its own schema - a JS-only swap would leave one
 * offering invisible to search entirely.
 *
 * It still reads as a toggle: same pill, same instant feel.
 */
export function RegionToggle({
  current,
  onDark = false,
  className,
}: {
  current: Region;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5",
        onDark
          ? "border-white/20 bg-white/10 backdrop-blur-sm"
          : "border-line bg-white shadow-e1",
        className,
      )}
    >
      {(Object.keys(REGIONS) as Region[]).map((key) => {
        const r = REGIONS[key];
        const on = key === current;
        return (
          <Link
            key={key}
            href={r.path}
            aria-current={on ? "page" : undefined}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold transition-colors duration-200",
              on
                ? "bg-brand-600 text-white"
                : onDark
                  ? "text-white/70 hover:text-white"
                  : "text-ink-3 hover:text-ink",
            )}
          >
            <span aria-hidden className="text-[13px] leading-none">
              {r.flag}
            </span>
            {r.short}
          </Link>
        );
      })}
    </div>
  );
}
