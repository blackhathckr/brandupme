import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Section heading, matching the mockups: a small uppercase eyebrow in accent
 * green, then a display headline where one phrase is picked out - in green on
 * light sections, gold on dark ones - and an optional lead paragraph.
 *
 * The mockups also place a small ornamental rule either side of the eyebrow on
 * light sections; `flourish` renders those.
 */
export function SectionHead({
  eyebrow,
  before,
  accent,
  after,
  sub,
  align = "center",
  onDark = false,
  flourish = false,
  className,
}: {
  eyebrow?: string;
  before: string;
  accent?: string;
  after?: string;
  sub?: string;
  align?: "left" | "center";
  onDark?: boolean;
  flourish?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          {flourish && (
            <span
              aria-hidden
              className="hidden h-px w-10 bg-gradient-to-r from-transparent to-brand-300 sm:block"
            />
          )}
          <p
            className={cn(
              "text-[11px] font-bold uppercase tracking-[0.18em]",
              onDark ? "text-brand-400" : "text-brand-600",
            )}
          >
            {eyebrow}
          </p>
          {flourish && (
            <span
              aria-hidden
              className="hidden h-px w-10 bg-gradient-to-l from-transparent to-brand-300 sm:block"
            />
          )}
        </div>
      )}

      <h2
        className={cn(
          "font-display font-bold leading-[1.12] tracking-[-0.03em]",
          "text-[clamp(1.75rem,3.6vw,2.6rem)]",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {before}
        {accent && (
          <>
            {" "}
            <span className={onDark ? "text-brand-400" : "text-green-text"}>
              {accent}
            </span>
          </>
        )}
        {after && <> {after}</>}
      </h2>

      {sub && (
        <p
          className={cn(
            "mt-4 text-[15.5px] leading-[1.7]",
            align === "center" && "mx-auto max-w-xl",
            onDark ? "text-deep-muted" : "text-ink-3",
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
