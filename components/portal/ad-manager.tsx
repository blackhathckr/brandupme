"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Pause, Play, Plus, Trash2 } from "lucide-react";
import { createAd, deleteAd, toggleAd, type AdState } from "@/app/admin/ads/actions";

const initial: AdState = { ok: false };

type AdRow = {
  id: number;
  title: string;
  subtitle: string | null;
  image: string;
  targetUrl: string;
  placement: string;
  status: string;
  impressions: number;
  clicks: number;
  categoryName: string | null;
  locationName: string | null;
};

export function AdManager({
  ads,
  categories,
  locations,
}: {
  ads: AdRow[];
  categories: { id: number; name: string }[];
  locations: { id: number; name: string }[];
}) {
  const [createState, createAction, creating] = useActionState(createAd, initial);
  const [, toggleAction] = useActionState(toggleAd, initial);
  const [, deleteAction] = useActionState(deleteAd, initial);

  return (
    <div className="flex flex-col gap-6">
      <form
        action={createAction}
        className="rounded-2xl border border-line bg-white p-5 shadow-e1"
      >
        <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
          New placement
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field name="title" label="Title" required />
          <Field name="subtitle" label="Subtitle" />
          <Field name="ctaLabel" label="Button label" placeholder="Explore properties" />
          <Field name="targetUrl" label="Destination URL" required placeholder="https://" />

          <div>
            <label htmlFor="placement" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
              Slot
            </label>
            <select
              id="placement"
              name="placement"
              defaultValue="sidebar"
              className="h-11 w-full rounded-xl border border-line bg-white px-3 text-[13px] outline-none focus-visible:border-brand-400"
            >
              <option value="hero">Hero banner</option>
              <option value="sidebar">Sidebar</option>
              <option value="listing">Within listings</option>
              <option value="footer">Footer banner</option>
            </select>
          </div>

          <Field name="weight" label="Weight" placeholder="1" />

          <div>
            <label htmlFor="categoryId" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue=""
              className="h-11 w-full rounded-xl border border-line bg-white px-3 text-[13px] outline-none focus-visible:border-brand-400"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="locationId" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
              Emirate or city
            </label>
            <select
              id="locationId"
              name="locationId"
              defaultValue=""
              className="h-11 w-full rounded-xl border border-line bg-white px-3 text-[13px] outline-none focus-visible:border-brand-400"
            >
              <option value="">All locations</option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="file" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
              Creative image
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              className="block w-full text-[12px] text-ink-2 file:mr-3 file:rounded-full file:border-0
                file:bg-brand-50 file:px-4 file:py-2 file:text-[12px] file:font-semibold file:text-green-text"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={creating}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand-600 px-5 text-[13px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
          >
            <Plus className="size-4" strokeWidth={3} aria-hidden />
            {creating ? "Creating…" : "Create placement"}
          </button>
          {createState.message && (
            <p className={`text-[12.5px] font-medium ${createState.ok ? "text-green-text" : "text-red-600"}`}>
              {createState.message}
            </p>
          )}
        </div>
      </form>

      {ads.length > 0 && (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <li key={ad.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-e1">
                <Image
                  src={ad.image}
                  alt=""
                  width={400}
                  height={260}
                  className="aspect-[3/2] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-[14px] font-bold tracking-[-0.02em] text-ink">
                      {ad.title}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        ad.status === "active"
                          ? "bg-brand-50 text-green-text"
                          : "bg-surface-2 text-ink-3"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[11.5px] text-ink-3">
                    {ad.placement} &middot; {ad.categoryName ?? "All categories"} &middot;{" "}
                    {ad.locationName ?? "All locations"}
                  </p>
                  <p className="mt-1 text-[11.5px] text-ink-3">
                    {ad.impressions} impressions &middot; {ad.clicks} clicks
                  </p>

                  <div className="mt-auto flex gap-2 pt-3">
                    <form action={toggleAction}>
                      <input type="hidden" name="adId" value={ad.id} />
                      <button
                        type="submit"
                        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-[11.5px] font-semibold text-ink-2 hover:border-brand-300"
                      >
                        {ad.status === "active" ? (
                          <>
                            <Pause className="size-3" strokeWidth={3} aria-hidden />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="size-3" strokeWidth={3} aria-hidden />
                            Resume
                          </>
                        )}
                      </button>
                    </form>

                    <form action={deleteAction}>
                      <input type="hidden" name="adId" value={ad.id} />
                      <button
                        type="submit"
                        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 text-[11.5px] font-semibold text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="size-3" strokeWidth={3} aria-hidden />
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({
  name,
  label,
  required,
  placeholder,
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[12.5px] font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-[13px] outline-none focus-visible:border-brand-400"
      />
    </div>
  );
}
