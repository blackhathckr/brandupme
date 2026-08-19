import Link from "next/link";
import { BadgeCheck, Eye, Heart, MapPin, Star } from "lucide-react";
import type { BusinessCard } from "@/lib/brand/businesses";

/**
 * One result row on a category or search listing, replicated from the client's
 * listing mockup: logo tile, verified pill, rating, services, location and open
 * state, summary, feature chips, and the three right-hand actions.
 */
export function BusinessRow({ business }: { business: BusinessCard }) {
  return (
    <article className="flex gap-4 border-b border-rule-2 p-5 last:border-b-0 hover:bg-paper/60">
      {/* Logo */}
      <div
        className={`grid size-[86px] shrink-0 place-items-center rounded-lg border border-rule text-[17px] font-black tracking-tight ${business.logoChip}`}
      >
        {business.logoInitials}
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        {business.verified ? (
          <span className="inline-flex items-center gap-1 rounded bg-ok-soft px-1.5 py-0.5 text-[10.5px] font-bold text-ok">
            <BadgeCheck className="size-3" aria-hidden />
            Verified
          </span>
        ) : null}

        <h3 className="mt-1.5 flex items-center gap-1.5 text-[17px] font-bold leading-tight text-slate-ink">
          <Link href={`/business/${business.slug}`} className="hover:text-iris-600">
            {business.name}
          </Link>
          {business.verified ? (
            <BadgeCheck className="size-4 shrink-0 text-iris-600" aria-hidden />
          ) : null}
        </h3>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px]">
          <span className="flex items-center gap-1 font-bold text-slate-ink">
            {business.rating}
            <span aria-hidden className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.floor(business.rating)
                      ? "size-3 fill-amber-400 text-amber-400"
                      : "size-3 fill-slate-200 text-slate-200"
                  }
                />
              ))}
            </span>
            <span className="font-medium text-slate-3">({business.reviews})</span>
          </span>
          <span aria-hidden className="text-slate-4">
            ·
          </span>
          <span className="text-slate-3">{business.services.join(", ")}</span>
        </p>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-slate-3">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5 text-slate-4" aria-hidden />
            {business.area}, {business.emirate}
          </span>
          {business.openNow ? (
            <span className="font-semibold text-ok">Open Now</span>
          ) : null}
        </p>

        <p className="mt-2 text-[13px] text-slate-2">{business.summary}</p>

        <ul className="mt-2.5 flex flex-wrap gap-2">
          {business.tags.map((tag) => (
            <li
              key={tag}
              className="rounded bg-paper px-2 py-1 text-[11px] font-medium text-slate-2"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex w-[184px] shrink-0 flex-col items-end gap-2.5">
        <button
          type="button"
          aria-label={`Save ${business.name}`}
          className="grid size-8 place-items-center rounded-lg text-slate-4 transition-colors hover:bg-paper hover:text-rose-500"
        >
          <Heart className="size-[18px]" aria-hidden />
        </button>

        <Link
          href={`/business/${business.slug}`}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-iris-600 text-[13.5px] font-semibold text-white transition-colors hover:bg-iris-700"
        >
          View Profile
        </Link>

        <Link
          href={`/business/${business.slug}#inquiry`}
          className="flex h-10 w-full items-center justify-center rounded-lg border border-rule text-[13.5px] font-semibold text-slate-2 transition-colors hover:bg-paper"
        >
          Get a Quote
        </Link>

        <Link
          href={`/business/${business.slug}`}
          className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-3 hover:text-iris-600"
        >
          <Eye className="size-3.5" aria-hidden />
          View Contact
        </Link>
      </div>
    </article>
  );
}
