import Image from "next/image";
import { selectAd, type AdSlot as Slot } from "@/lib/ads/select";

/**
 * A sponsored placement.
 *
 * Renders nothing when no ad matches, so a page with no sold inventory has no
 * empty box in it. Always labelled "Sponsored" - undisclosed advertising on a
 * directory is both a trust problem and, in most jurisdictions, unlawful.
 *
 * rel="sponsored nofollow" keeps paid links from passing ranking signals, which
 * is what Google requires and what protects the directory's own standing.
 */
export async function AdSlot({
  countryId,
  placement,
  categoryId,
  locationId,
  seed,
  className,
}: {
  countryId: number;
  placement: Slot;
  categoryId?: number | null;
  locationId?: number | null;
  seed?: string;
  className?: string;
}) {
  const ad = await selectAd({ countryId, placement, categoryId, locationId, seed });
  if (!ad) return null;

  return (
    <aside className={className}>
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-3">
        Sponsored
      </p>
      <a
        href={`/uae/ad/${ad.id}/`}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-e1 transition-all duration-[240ms] hover:border-brand-300 hover:shadow-e2"
      >
        <Image
          src={ad.image}
          alt={ad.title}
          width={640}
          height={800}
          className="w-full object-cover"
        />
        <div className="p-4">
          <p className="font-display text-[14.5px] font-bold leading-snug tracking-[-0.02em] text-ink">
            {ad.title}
          </p>
          {ad.subtitle && (
            <p className="mt-1.5 text-[12.5px] leading-[1.6] text-ink-2">{ad.subtitle}</p>
          )}
          {ad.ctaLabel && (
            <span className="mt-3 inline-flex h-9 items-center rounded-full bg-gold-500 px-4 text-[12.5px] font-bold text-deep">
              {ad.ctaLabel}
            </span>
          )}
        </div>
      </a>
    </aside>
  );
}
