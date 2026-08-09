import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Lock, MapPin, Phone, Star } from "lucide-react";
import type { ListingCard } from "@/lib/directory/queries";

/**
 * One business in a result list. Shared by category listings and search.
 *
 * The phone number arrives already resolved by the permission layer. When it is
 * locked, what renders is a server-generated mask with no link and no value -
 * the real digits are not in this component's props, so there is nothing to
 * pull out of the page source.
 */
export function BusinessCard({ business: b }: { business: ListingCard }) {
  const href = b.passportSlug ? `/p/${b.passportSlug}` : `/uae/`;

  return (
    <article
      className="group rounded-2xl border border-line bg-white p-4 shadow-e1 transition-all
        duration-[240ms] ease-brand hover:border-brand-300 hover:shadow-e2 sm:p-5"
    >
      <div className="flex gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface-2 sm:size-20">
          {b.logo ? (
            <Image
              src={b.logo}
              alt=""
              width={80}
              height={80}
              className="size-full object-contain p-1.5"
            />
          ) : (
            <span className="font-display text-[20px] font-extrabold text-ink-3">
              {b.name.slice(0, 1)}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
              <Link href={href} className="hover:text-green-text">
                {b.name}
              </Link>
            </h3>
            {b.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold text-green-text">
                <BadgeCheck className="size-3" strokeWidth={2.5} aria-hidden />
                Verified
              </span>
            )}
            {b.priority && (
              <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10.5px] font-semibold text-ink">
                Featured
              </span>
            )}
          </div>

          {b.ratingCount > 0 && (
            <p className="mt-1 flex items-center gap-1 text-[12.5px] text-ink-2">
              <Star className="size-3.5 fill-gold-500 text-gold-500" aria-hidden />
              <strong className="font-semibold text-ink">
                {(b.ratingAvg / 10).toFixed(1)}
              </strong>
              <span className="text-ink-3">({b.ratingCount})</span>
            </p>
          )}

          {b.areaLabel && (
            <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-ink-3">
              <MapPin className="size-3.5" strokeWidth={2} aria-hidden />
              {b.areaLabel}
            </p>
          )}

          {b.tagline && (
            <p className="mt-2 line-clamp-2 text-[13px] leading-[1.6] text-ink-2">
              {b.tagline}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {b.contact.phone.visible ? (
              <a
                href={`tel:${b.contact.phone.value}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-50 px-3.5 text-[12.5px] font-semibold text-green-text hover:bg-brand-100"
              >
                <Phone className="size-3.5" strokeWidth={2.5} aria-hidden />
                {b.contact.phone.value}
              </a>
            ) : b.contact.phone.masked ? (
              <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 text-[12.5px] font-medium text-ink-3">
                <Lock className="size-3.5" strokeWidth={2.5} aria-hidden />
                {b.contact.phone.masked}
              </span>
            ) : null}

            <Link
              href={href}
              className="inline-flex h-9 items-center rounded-full border border-line px-3.5 text-[12.5px] font-semibold text-ink-2 transition-colors hover:border-brand-300 hover:text-green-text"
            >
              View profile
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
