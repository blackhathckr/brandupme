import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Brand link-buttons.
 *
 * Deliberately NOT shadcn's Button. These are anchors with brand-specific
 * treatments (the morphing arrow chip has no shadcn equivalent), and per
 * CONVENTIONS.md we extend rather than modify `components/ui/button.tsx`.
 * shadcn's Button stays available for genuine <button> use inside forms.
 */

type Variant = "primary" | "gold" | "ink" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-glow-red hover:bg-brand-700 hover:-translate-y-0.5",
  gold: "bg-gold-500 text-ink shadow-glow-gold hover:bg-gold-400 hover:-translate-y-0.5",
  ink: "bg-ink text-white hover:bg-black hover:-translate-y-0.5",
  outline:
    "bg-surface text-ink border border-line hover:border-ink hover:bg-surface-2",
  ghost: "bg-transparent text-ink-2 hover:bg-surface-2",
  onDark:
    "bg-white/10 text-night-fg border border-white/25 backdrop-blur-sm hover:bg-white/20",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-[14.5px]",
  lg: "h-14 px-8 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "transition-all duration-[240ms] ease-brand",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

/**
 * The signature CTA. On hover the arrow chip swaps to the opposite side and
 * the fill turns brand red. One per viewport - two competing for attention
 * is worse than none.
 *
 * Built with `group` + flex-direction rather than Framer layout animation, so
 * it costs nothing at runtime and still works with JS disabled.
 */
export function MorphButton({
  href,
  children,
  className,
  tone = "ink",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "ink" | "white";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-14 items-center gap-3 rounded-full pl-6 pr-2 text-base font-semibold",
        "transition-[background-color,padding,transform] duration-[400ms] ease-brand",
        "hover:flex-row-reverse hover:pl-2 hover:pr-6 hover:-translate-y-0.5",
        tone === "ink"
          ? "bg-ink text-white hover:bg-brand-600"
          : "bg-white text-ink hover:bg-gold-500",
        className,
      )}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          "transition-transform duration-[400ms] ease-brand group-hover:rotate-45",
          tone === "ink" ? "bg-white text-ink" : "bg-ink text-white",
        )}
      >
        <ArrowUpRight className="size-4" strokeWidth={2.25} />
      </span>
    </Link>
  );
}
