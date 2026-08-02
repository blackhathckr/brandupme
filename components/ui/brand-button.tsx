import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Brand link-buttons.
 *
 * NOTE ON GREEN: the accent green #53A03F only reaches 3.25:1 against white,
 * so a white label on it fails AA. Every solid green button therefore uses
 * brand-600 #3E8130, which measures 4.79:1. The brighter accent is reserved
 * for large display type and decorative marks.
 */

type Variant = "primary" | "gold" | "outline" | "ghost" | "onDark" | "white";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-glow-green hover:bg-brand-700 hover:-translate-y-0.5",
  gold: "bg-gold-500 text-deep shadow-glow-gold hover:bg-gold-400 hover:-translate-y-0.5",
  outline:
    "bg-white text-ink border border-line hover:border-brand-600 hover:text-green-text",
  ghost: "bg-transparent text-ink-2 hover:bg-surface-2",
  onDark:
    "bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20",
  white: "bg-white text-deep hover:bg-brand-50 hover:-translate-y-0.5",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  icon = false,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: boolean;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "transition-all duration-[240ms] ease-brand",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
      {icon && (
        <ArrowRight
          className="size-4 transition-transform duration-[240ms] ease-brand group-hover:translate-x-1"
          strokeWidth={2.25}
          aria-hidden
        />
      )}
    </Link>
  );
}
