"use client";

import { useActionState, useState } from "react";
import { Star } from "lucide-react";
import { submitReview, type ReviewState } from "@/lib/reviews/create";

const initial: ReviewState = { ok: false };

/** Star input is a radio group, so it is keyboard reachable and announces state. */
export function ReviewForm({ passportSlug }: { passportSlug: string }) {
  const [state, formAction, pending] = useActionState(submitReview, initial);
  const [rating, setRating] = useState(0);

  if (state.ok) {
    return (
      <p className="rounded-xl bg-brand-50 px-4 py-3 text-[13px] font-medium text-green-text">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3.5">
      <input type="hidden" name="passportSlug" value={passportSlug} />
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="review-website">Website</label>
        <input id="review-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className="mb-1.5 text-[12.5px] font-semibold text-ink">Your rating</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
                className="sr-only"
                required
              />
              <span className="sr-only">{n} star{n > 1 ? "s" : ""}</span>
              <Star
                className={
                  n <= rating
                    ? "size-6 fill-gold-500 text-gold-500"
                    : "size-6 text-line transition-colors hover:text-gold-500"
                }
                aria-hidden
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="authorName" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          Your name
        </label>
        <input
          id="authorName"
          name="authorName"
          required
          className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-[13.5px] outline-none focus-visible:border-brand-400"
        />
      </div>

      <div>
        <label htmlFor="body" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          Your review
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13.5px] outline-none focus-visible:border-brand-400"
        />
      </div>

      {state.message && !state.ok && (
        <p role="alert" className="text-[12.5px] font-medium text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 items-center justify-center rounded-full bg-brand-600 px-5 text-[13px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
