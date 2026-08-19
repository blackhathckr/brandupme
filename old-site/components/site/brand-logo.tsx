import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The wordmark from the mockups: "Brand" in ink, "UpMe" in iris, with the
 * tagline underneath. The bar-chart glyph appears on the logged-in header only.
 */
export function BrandLogo({
  href = "/",
  withMark = false,
  className,
}: {
  href?: string;
  withMark?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group flex items-center gap-2.5", className)}>
      {withMark ? (
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-iris-600"
        >
          <span className="flex items-end gap-[2px]">
            <span className="block h-2 w-1 rounded-[1px] bg-white/70" />
            <span className="block h-3.5 w-1 rounded-[1px] bg-white" />
            <span className="block h-2.5 w-1 rounded-[1px] bg-white/80" />
          </span>
        </span>
      ) : null}
      <span className="leading-none">
        <span className="block text-[26px] font-extrabold tracking-[-0.02em]">
          <span className="text-slate-ink">Brand</span>
          <span className="text-iris-600">UpMe</span>
        </span>
        <span className="mt-1 block text-[11px] font-medium text-slate-3">
          Your Business, Our Growth
        </span>
      </span>
    </Link>
  );
}
