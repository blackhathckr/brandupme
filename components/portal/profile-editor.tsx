"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, QrCode, Trash2, Upload } from "lucide-react";
import {
  deleteBusinessImage,
  saveProfile,
  uploadBusinessImage,
  type ProfileState,
} from "@/app/dashboard/profile/actions";

/**
 * Profile editor.
 *
 * Three independent forms rather than one: details, logo, and gallery. A single
 * form would mean re-uploading images every time a phone number changes, and a
 * failed upload would discard the text edits alongside it.
 */

const initial: ProfileState = { ok: false };

type Business = {
  id: number;
  name: string;
  tagline: string | null;
  description: string | null;
  logo: string | null;
  establishedYear: number | null;
  teamSize: string | null;
  languages: string[] | null;
  workingHours: string | null;
  businessType: string | null;
  licenseNo: string | null;
};

type Contact = Record<
  | "phone"
  | "whatsapp"
  | "email"
  | "website"
  | "address"
  | "area"
  | "facebookUrl"
  | "instagramUrl"
  | "linkedinUrl"
  | "xUrl"
  | "youtubeUrl",
  string | null
>;

export function ProfileEditor({
  business,
  contact,
  images,
  imageQuota,
  passport,
}: {
  business: Business;
  contact: Contact;
  images: { id: number; url: string }[];
  imageQuota: number;
  passport: { slug: string; number: string } | null;
}) {
  const [saveState, saveAction, saving] = useActionState(saveProfile, initial);
  const [uploadState, uploadAction, uploading] = useActionState(uploadBusinessImage, initial);
  const [deleteState, deleteAction] = useActionState(deleteBusinessImage, initial);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[24px] font-extrabold tracking-[-0.035em] text-ink">
            Business profile
          </h1>
          <p className="mt-1.5 text-[13.5px] text-ink-2">{business.name}</p>
        </div>

        {passport && (
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/p/${passport.slug}`}
              className="inline-flex h-9 items-center rounded-full border border-line bg-white px-3.5 text-[12.5px] font-semibold text-ink-2 hover:border-brand-300 hover:text-green-text"
            >
              View card
            </Link>
            <a
              href={`/p/${passport.slug}/qr`}
              download
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-[12.5px] font-semibold text-ink-2 hover:border-brand-300 hover:text-green-text"
            >
              <QrCode className="size-3.5" strokeWidth={2.5} aria-hidden />
              QR code
            </a>
            <a
              href={`/p/${passport.slug}/vcard`}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-[12.5px] font-semibold text-ink-2 hover:border-brand-300 hover:text-green-text"
            >
              <Download className="size-3.5" strokeWidth={2.5} aria-hidden />
              Contact card
            </a>
          </div>
        )}
      </header>

      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-line bg-white p-5 shadow-e1">
        <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
          Company logo
        </h2>
        <form action={uploadAction} className="mt-4 flex flex-wrap items-center gap-4">
          <input type="hidden" name="businessId" value={business.id} />
          <input type="hidden" name="kind" value="logo" />

          <div className="flex size-20 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface-2">
            {business.logo ? (
              <Image
                src={business.logo}
                alt=""
                width={80}
                height={80}
                className="size-full object-contain p-1.5"
              />
            ) : (
              <span className="font-display text-[22px] font-extrabold text-ink-3">
                {business.name.slice(0, 1)}
              </span>
            )}
          </div>

          <div>
            <input
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp"
              required
              className="block text-[12.5px] text-ink-2 file:mr-3 file:rounded-full file:border-0
                file:bg-brand-50 file:px-4 file:py-2 file:text-[12.5px] file:font-semibold file:text-green-text"
            />
            <button
              type="submit"
              disabled={uploading}
              className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-600 px-4 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
            >
              <Upload className="size-3.5" strokeWidth={2.5} aria-hidden />
              {uploading ? "Uploading…" : "Upload logo"}
            </button>
            <p className="mt-1.5 text-[11px] text-ink-3">JPG, PNG or WebP. Max 5 MB.</p>
          </div>
        </form>
        <Notice state={uploadState} />
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-line bg-white p-5 shadow-e1">
        <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
          Business photos
        </h2>
        <p className="mt-1 text-[12.5px] text-ink-3">
          {images.length} of {imageQuota} used on your plan.
        </p>

        {images.length > 0 && (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <li key={img.id} className="group relative overflow-hidden rounded-xl border border-line">
                <Image
                  src={img.url}
                  alt=""
                  width={300}
                  height={220}
                  className="aspect-[4/3] w-full object-cover"
                />
                <form action={deleteAction} className="absolute right-1.5 top-1.5">
                  <input type="hidden" name="businessId" value={business.id} />
                  <input type="hidden" name="imageId" value={img.id} />
                  <button
                    type="submit"
                    aria-label="Remove image"
                    className="flex size-7 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-e1 transition-colors hover:bg-white"
                  >
                    <Trash2 className="size-3.5" strokeWidth={2.5} aria-hidden />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        {images.length < imageQuota && (
          <form action={uploadAction} className="mt-4 flex flex-wrap items-end gap-3">
            <input type="hidden" name="businessId" value={business.id} />
            <input type="hidden" name="kind" value="gallery" />
            <input
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp"
              required
              className="block text-[12.5px] text-ink-2 file:mr-3 file:rounded-full file:border-0
                file:bg-brand-50 file:px-4 file:py-2 file:text-[12.5px] file:font-semibold file:text-green-text"
            />
            <button
              type="submit"
              disabled={uploading}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-600 px-4 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
            >
              <Upload className="size-3.5" strokeWidth={2.5} aria-hidden />
              Add photo
            </button>
          </form>
        )}
        <Notice state={deleteState} />
      </section>

      {/* ── Details ──────────────────────────────────────────────────────── */}
      <form action={saveAction} className="flex flex-col gap-5">
        <input type="hidden" name="businessId" value={business.id} />

        <section className="rounded-2xl border border-line bg-white p-5 shadow-e1">
          <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
            About your business
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field name="tagline" label="Tagline" defaultValue={business.tagline} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                defaultValue={business.description ?? ""}
                className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink
                  outline-none transition-colors focus-visible:border-brand-400"
              />
            </div>
            <Field name="businessType" label="Business type" defaultValue={business.businessType} />
            <Field
              name="establishedYear"
              label="Year established"
              defaultValue={business.establishedYear ? String(business.establishedYear) : null}
            />
            <Field name="teamSize" label="Team size" defaultValue={business.teamSize} />
            <Field
              name="languages"
              label="Languages"
              defaultValue={business.languages?.join(", ") ?? null}
              hint="Comma separated"
            />
            <Field name="workingHours" label="Working hours" defaultValue={business.workingHours} />
            <Field name="licenseNo" label="Licence number" defaultValue={business.licenseNo} />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-e1">
          <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
            Contact details
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field name="phone" label="Phone" defaultValue={contact.phone} />
            <Field name="whatsapp" label="WhatsApp" defaultValue={contact.whatsapp} />
            <Field name="email" label="Email" defaultValue={contact.email} />
            <Field name="website" label="Website" defaultValue={contact.website} />
            <div className="sm:col-span-2">
              <Field name="address" label="Address" defaultValue={contact.address} />
            </div>
            <Field name="area" label="Area" defaultValue={contact.area} hint="Business Bay, Deira…" />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-e1">
          <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
            Social links
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field name="facebookUrl" label="Facebook" defaultValue={contact.facebookUrl} />
            <Field name="instagramUrl" label="Instagram" defaultValue={contact.instagramUrl} />
            <Field name="linkedinUrl" label="LinkedIn" defaultValue={contact.linkedinUrl} />
            <Field name="xUrl" label="X (Twitter)" defaultValue={contact.xUrl} />
            <Field name="youtubeUrl" label="YouTube" defaultValue={contact.youtubeUrl} />
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center rounded-full bg-brand-600 px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <Notice state={saveState} />
        </div>
      </form>
    </div>
  );
}

function Notice({ state }: { state: ProfileState }) {
  if (!state.message) return null;
  return (
    <p
      role="status"
      className={`mt-3 text-[12.5px] font-medium ${state.ok ? "text-green-text" : "text-red-600"}`}
    >
      {state.message}
    </p>
  );
}

function Field({
  name,
  label,
  defaultValue,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[12.5px] font-semibold text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-[13.5px] text-ink
          outline-none transition-colors focus-visible:border-brand-400"
      />
      {hint && <p className="mt-1 text-[11px] text-ink-3">{hint}</p>}
    </div>
  );
}
