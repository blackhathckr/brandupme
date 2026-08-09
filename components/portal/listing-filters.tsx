import Link from "next/link";
import { ArrowUpDown, MapPin, Star } from "lucide-react";

/**
 * Filters for a category listing.
 *
 * Plain links rather than a JavaScript form: each filter is a real URL, so it
 * can be shared, bookmarked, opened in a new tab and crawled. A directory whose
 * filtered views have no address throws away most of its SEO.
 *
 * The rating filter is only shown once some listing actually has reviews -
 * offering "4 stars and above" on a directory with no reviews returns nothing
 * and reads as broken.
 */

export type FilterState = {
  sort?: string;
  minRating?: string;
  area?: string;
};

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "A to Z" },
];

export function ListingFilters({
  basePath,
  current,
  areas,
  hasRatings,
}: {
  basePath: string;
  current: FilterState;
  areas: { slug: string; name: string }[];
  hasRatings: boolean;
}) {
  const href = (patch: FilterState) => {
    const params = new URLSearchParams();
    const merged = { ...current, ...patch };
    for (const [k, v] of Object.entries(merged)) {
      if (v) params.set(k, v);
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-e1">
      <div>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">
          <ArrowUpDown className="size-3.5" strokeWidth={2.5} aria-hidden />
          Sort by
        </p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {SORTS.map((s) => {
            const on = (current.sort ?? "featured") === s.value;
            return (
              <li key={s.value}>
                <Link
                  href={href({ sort: s.value === "featured" ? undefined : s.value })}
                  aria-current={on ? "true" : undefined}
                  className={`inline-block rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    on
                      ? "bg-brand-600 text-white"
                      : "border border-line bg-surface-2 text-ink-2 hover:border-brand-300 hover:text-green-text"
                  }`}
                >
                  {s.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {areas.length > 0 && (
        <div className="border-t border-line pt-4">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">
            <MapPin className="size-3.5" strokeWidth={2.5} aria-hidden />
            Area
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`${basePath.replace(/\/[^/]+\/([^/]+)\/$/, `/${a.slug}/$1/`)}`}
                  className="inline-block rounded-full border border-line bg-surface-2 px-3 py-1.5
                    text-[12px] font-medium text-ink-2 transition-colors hover:border-brand-300 hover:text-green-text"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasRatings && (
        <div className="border-t border-line pt-4">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">
            <Star className="size-3.5" strokeWidth={2.5} aria-hidden />
            Rating
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {["4", "3"].map((r) => {
              const on = current.minRating === r;
              return (
                <li key={r}>
                  <Link
                    href={href({ minRating: on ? undefined : r })}
                    className={`inline-block rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                      on
                        ? "bg-brand-600 text-white"
                        : "border border-line bg-surface-2 text-ink-2 hover:border-brand-300"
                    }`}
                  >
                    {r}★ &amp; above
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
