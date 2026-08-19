import { AD_CREATIVES } from "@/lib/brand/ads";
import { cn } from "@/lib/utils";

/**
 * Wide footer / in-page banner slot.
 *
 * Built in CSS rather than as a flat image so the slot is responsive and the
 * layout survives whatever creative the ad manager eventually serves. The
 * "Ad" tag is deliberate — the mockups label paid placements.
 */
export function AdBanner({
  creative = "goglobal",
  className,
}: {
  creative?: keyof typeof AD_CREATIVES;
  className?: string;
}) {
  const ad = AD_CREATIVES[creative];

  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-gradient-to-r text-white shadow-p2",
        ad.field,
        className,
      )}
    >
      <span className="absolute right-3 top-3 z-10 rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/80 backdrop-blur">
        Ad
      </span>

      {/* Decorative light — stands in for the campaign photography */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 left-1/3 size-72 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative grid gap-6 p-6 lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:items-center lg:gap-10 lg:p-8">
        {/* Brand lockup */}
        <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-full text-xl"
            style={{ backgroundColor: `${ad.accent}22`, color: ad.accent }}
          >
            ◆
          </span>
          <span>
            <span className="block text-xl font-black tracking-tight">
              {ad.brand}
            </span>
            {ad.brandSub ? (
              <span
                className="block text-[11px] font-semibold tracking-[0.28em]"
                style={{ color: ad.accent }}
              >
                {ad.brandSub}
              </span>
            ) : null}
          </span>
        </div>

        {/* Message */}
        <div className="min-w-0">
          <p className="text-xl font-black leading-tight tracking-tight sm:text-2xl">
            {ad.headline.map((line, i) => (
              <span key={line} className={cn("block", i > 0 && "text-white/90")}>
                {line}
              </span>
            ))}
          </p>

          {ad.kicker ? (
            <p
              className="mt-2 text-sm font-bold"
              style={{ color: ad.accent }}
            >
              {ad.kicker}
            </p>
          ) : null}

          {ad.services ? (
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/85">
              {ad.services.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 ? (
                    <span aria-hidden className="text-white/30">
                      |
                    </span>
                  ) : null}
                  {s}
                </span>
              ))}
            </p>
          ) : null}

          {ad.features ? (
            <ul className="mt-4 hidden flex-wrap gap-x-6 gap-y-2 text-[11.5px] text-white/70 xl:flex">
              {ad.features.map((f) => (
                <li key={f.label} className="flex items-center gap-1.5">
                  <span aria-hidden style={{ color: ad.accent }}>
                    ✦
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Offer */}
        <div className="lg:text-right">
          {ad.offerLabel ? (
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: ad.accent }}
            >
              {ad.offerLabel}
            </p>
          ) : null}
          <p
            className="text-3xl font-black leading-none"
            style={{ color: ad.accent }}
          >
            {ad.offerValue}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/80">
            {ad.offerSub}
          </p>
          <span
            className="mt-3 inline-flex h-10 items-center rounded-md px-6 text-sm font-bold text-[#1A1205]"
            style={{ backgroundColor: ad.accent }}
          >
            {ad.cta}
          </span>
          <p className="mt-2 text-[11px] text-white/60">
            {ad.url}
            {ad.note ? <span className="ml-2">{ad.note}</span> : null}
          </p>
        </div>
      </div>
    </aside>
  );
}
