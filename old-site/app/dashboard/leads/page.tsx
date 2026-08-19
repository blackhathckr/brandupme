import type { Metadata } from "next";
import Link from "next/link";
import { Inbox as InboxIcon, Lock, Mail, Phone } from "lucide-react";
import { requireUser } from "@/lib/auth/guard";
import { businessesOwnedBy, getInbox, type InboxItem } from "@/lib/leads/inbox";
import { UnlockButton } from "@/components/portal/unlock-button";

/**
 * Lead inbox.
 *
 * Locked leads are shown, not hidden. That is the point: an enquiry the
 * business cannot read is the strongest argument for upgrading, and hiding it
 * would waste the opportunity the client built the plan ladder around.
 *
 * The masked values here were generated on the server. The real phone number
 * is not in this page's payload.
 */

export const metadata: Metadata = { title: "Enquiries", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const user = await requireUser("/dashboard/leads/");
  const owned = await businessesOwnedBy(user.id);

  if (owned.length === 0) {
    return <NoBusiness />;
  }

  const business = owned[0];
  const inbox = await getInbox(business.id, {
    page: Number.parseInt(pageParam ?? "1", 10) || 1,
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[24px] font-extrabold tracking-[-0.035em] text-ink">
            Enquiries
          </h1>
          <p className="mt-1.5 text-[13.5px] text-ink-2">
            {inbox.total} {inbox.total === 1 ? "enquiry" : "enquiries"} for{" "}
            {business.name}.
          </p>
        </div>

        {inbox.quota && (
          <div className="rounded-xl border border-line bg-white px-4 py-2.5 text-[12.5px]">
            <span className="font-semibold text-ink">
              {inbox.quota.used} of {inbox.quota.total}
            </span>
            <span className="ml-1.5 text-ink-3">unlocks used this month</span>
          </div>
        )}
      </header>

      {inbox.access === "none" && inbox.total > 0 && (
        <div className="rounded-2xl border border-gold-500/40 bg-gold-500/10 px-5 py-4">
          <p className="text-[13.5px] leading-[1.7] text-ink-2">
            Your current plan{inbox.planName ? ` (${inbox.planName})` : ""} does
            not include customer contact details. Upgrade to see who is
            enquiring and contact them directly.
          </p>
          <Link
            href="/dashboard/plan/"
            className="mt-3 inline-flex h-9 items-center rounded-full bg-brand-600 px-4 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-500"
          >
            View plans
          </Link>
        </div>
      )}

      {inbox.items.length === 0 ? (
        <EmptyInbox />
      ) : (
        <ul className="flex flex-col gap-3.5">
          {inbox.items.map((lead) => (
            <li key={lead.id}>
              <LeadRow lead={lead} businessId={business.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LeadRow({ lead, businessId }: { lead: InboxItem; businessId: number }) {
  const c = lead.contact;

  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-e1">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
              {c.name.visible ? c.name.value : c.name.masked}
            </h2>
            {c.locked && (
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[10.5px] font-semibold text-ink-3">
                <Lock className="size-3" strokeWidth={2.5} aria-hidden />
                Locked
              </span>
            )}
            {lead.routing === "matched" && (
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold text-green-text">
                Matched lead
              </span>
            )}
            {!lead.viewedAt && (
              <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10.5px] font-semibold text-ink">
                New
              </span>
            )}
          </div>

          <p className="mt-1 text-[11.5px] uppercase tracking-[0.1em] text-ink-3">
            {lead.reference} &middot;{" "}
            {lead.createdAt.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {c.locked && <UnlockButton businessId={businessId} leadId={lead.id} />}
      </div>

      {lead.message && (
        <p className="mt-3 rounded-xl bg-surface-2 px-3.5 py-3 text-[13px] leading-[1.7] text-ink-2">
          {lead.message}
        </p>
      )}

      <ul className="mt-3.5 flex flex-wrap gap-2">
        <ContactChip
          icon={<Phone className="size-3.5" />}
          field={c.phone}
          href={(v) => `tel:${v}`}
        />
        <ContactChip
          icon={<Mail className="size-3.5" />}
          field={c.email}
          href={(v) => `mailto:${v}`}
        />
        {c.company && (
          <li className="inline-flex h-8 items-center rounded-full border border-line bg-surface-2 px-3 text-[12px] text-ink-2">
            {c.company}
          </li>
        )}
      </ul>
    </article>
  );
}

function ContactChip({
  icon,
  field,
  href,
}: {
  icon: React.ReactNode;
  field: { visible: true; value: string } | { visible: false; masked: string };
  href: (v: string) => string;
}) {
  if (field.visible) {
    return (
      <li>
        <a
          href={href(field.value)}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-brand-50 px-3 text-[12px] font-semibold text-green-text hover:bg-brand-100"
        >
          {icon}
          {field.value}
        </a>
      </li>
    );
  }
  if (!field.masked) return null;
  return (
    <li className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 text-[12px] text-ink-3">
      {icon}
      {field.masked}
      <Lock className="size-3" strokeWidth={2.5} aria-hidden />
    </li>
  );
}

function EmptyInbox() {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface-2 text-ink-3">
        <InboxIcon className="size-5" strokeWidth={2} aria-hidden />
      </span>
      <h2 className="mt-4 font-display text-[16px] font-bold tracking-[-0.02em] text-ink">
        No enquiries yet
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-[1.7] text-ink-2">
        When a customer contacts you through your listing or Digital Business
        Card, it will appear here.
      </p>
    </div>
  );
}

function NoBusiness() {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
      <h1 className="font-display text-[18px] font-bold tracking-[-0.02em] text-ink">
        No business linked to your account
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-[1.7] text-ink-2">
        Register your business to start receiving enquiries.
      </p>
      <Link
        href="/uae/register/"
        className="mt-6 inline-flex h-11 items-center rounded-full bg-brand-600 px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-500"
      >
        List your business
      </Link>
    </div>
  );
}
