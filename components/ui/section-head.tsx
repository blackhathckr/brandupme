import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Every section headline follows the same shape: a micro eyebrow, a display
 * headline carrying exactly ONE Instrument Serif italic word, and an optional
 * lead paragraph.
 *
 * The one-italic rule is enforced by the API: there is a single `italic` slot,
 * so a second one cannot be added without editing this component.
 */
export function SectionHead({
  eyebrow,
  before,
  italic,
  after,
  sub,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  before: string;
  italic?: string;
  after?: string;
  sub?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-[11px] font-bold uppercase tracking-[0.16em]",
            // Gold fails contrast on ivory, so light grounds get bronze.
            onDark ? "text-gold-400" : "text-bronze",
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "font-display font-bold leading-[1.08] tracking-[-0.035em]",
          "text-[clamp(2rem,4.4vw,3.25rem)]",
          onDark ? "text-night-fg" : "text-ink",
        )}
      >
        {before}
        {italic && (
          <>
            {" "}
            <span
              className={cn(
                "font-serif italic font-normal tracking-normal",
                onDark ? "text-gold-400" : "text-brand-600",
              )}
            >
              {italic}
            </span>
          </>
        )}
        {after && <> {after}</>}
      </h2>

      {sub && (
        <p
          className={cn(
            "mt-5 text-[17px] leading-[1.7] max-w-2xl",
            align === "center" && "mx-auto",
            onDark ? "text-night-muted" : "text-ink-2",
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
