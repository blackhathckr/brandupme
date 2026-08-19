import { Check, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The narrower ad units: the three-across strip at the top of a category page
 * and the sidebar tiles beside a listing.
 *
 * The client asked twice for ad space to be designed in rather than bolted on,
 * so these are real slots with an "AD" tag, a click target and a fixed aspect
 * — whatever creative the ad manager eventually serves drops straight in.
 */

export type PromoAdData = {
  id: string;
  brand?: string;
  brandSub?: string;
  headline: string;
  sub?: string;
  bullets?: string[];
  cta?: string;
  phone?: string;
  offer?: string;
  offerSub?: string;
  /** Tailwind gradient classes for the panel. */
  field: string;
  /** Set for creatives printed on a light field. */
  light?: boolean;
  accent?: string;
};

export function PromoAd({
  ad,
  className,
  size = "strip",
}: {
  ad: PromoAdData;
  className?: string;
  size?: "strip" | "sidebar";
}) {
  const accent = ad.accent ?? "#F5C518";

  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-gradient-to-br shadow-p1",
        ad.field,
        ad.light ? "text-slate-ink" : "text-white",
        size === "strip" ? "min-h-[208px]" : "min-h-[184px]",
        className,
      )}
    >
      <span
        className={cn(
          "absolute right-2.5 top-2.5 z-10 rounded px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide",
          ad.light ? "bg-slate-ink/10 text-slate-2" : "bg-white/20 text-white/90",
        )}
      >
        Ad
      </span>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full blur-2xl",
          ad.light ? "bg-white/70" : "bg-white/10",
        )}
      />

      <div className="relative flex h-full flex-col p-5">
        {ad.brand ? (
          <p className="mb-2 flex items-center gap-2">
            <span
              aria-hidden
              className="grid size-6 place-items-center rounded-full text-[11px]"
              style={{
                backgroundColor: ad.light ? "#5A31CB1A" : "#FFFFFF26",
                color: ad.light ? "#5A31CB" : "#fff",
              }}
            >
              ◆
            </span>
            <span className="text-[13px] font-extrabold tracking-tight">
              {ad.brand}
            </span>
            {ad.brandSub ? (
              <span
                className={cn(
                  "text-[10px] font-semibold tracking-[0.16em]",
                  ad.light ? "text-slate-3" : "text-white/70",
                )}
              >
                {ad.brandSub}
              </span>
            ) : null}
          </p>
        ) : null}

        <p className="text-[16px] font-extrabold leading-snug tracking-tight">
          {ad.headline}
        </p>

        {ad.sub ? (
          <p
            className={cn(
              "mt-1 text-[12.5px] leading-snug",
              ad.light ? "text-slate-3" : "text-white/85",
            )}
          >
            {ad.sub}
          </p>
        ) : null}

        {ad.offer ? (
          <p className="mt-2">
            <span
              className="block text-[28px] font-black leading-none"
              style={{ color: accent }}
            >
              {ad.offer}
            </span>
            {ad.offerSub ? (
              <span
                className={cn(
                  "mt-0.5 block text-[11px] font-semibold uppercase tracking-wide",
                  ad.light ? "text-slate-3" : "text-white/80",
                )}
              >
                {ad.offerSub}
              </span>
            ) : null}
          </p>
        ) : null}

        {ad.bullets ? (
          <ul className="mt-2.5 space-y-1">
            {ad.bullets.map((b) => (
              <li
                key={b}
                className={cn(
                  "flex items-center gap-1.5 text-[11.5px]",
                  ad.light ? "text-slate-2" : "text-white/85",
                )}
              >
                <Check
                  aria-hidden
                  className="size-3 shrink-0"
                  strokeWidth={3}
                  style={{ color: ad.light ? "#079455" : accent }}
                />
                {b}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
          {ad.cta ? (
            <span
              className={cn(
                "inline-flex h-8 items-center rounded-md px-3.5 text-[12px] font-bold",
                ad.light ? "bg-iris-600 text-white" : "text-[#1A1205]",
              )}
              style={ad.light ? undefined : { backgroundColor: accent }}
            >
              {ad.cta}
            </span>
          ) : null}
          {ad.phone ? (
            <span
              className={cn(
                "flex items-center gap-1.5 text-[11.5px] font-semibold",
                ad.light ? "text-slate-2" : "text-white/85",
              )}
            >
              <Phone className="size-3" aria-hidden />
              {ad.phone}
            </span>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
