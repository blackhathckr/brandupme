import type { Metadata } from "next";
import Link from "next/link";
import { and, desc, eq, sql } from "drizzle-orm";
import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Eye,
  Inbox,
  Lock,
} from "lucide-react";
import { getDb } from "@/lib/db";
import { analyticsEvents, businessPassports, notifications } from "@/lib/db/schema";
import { requireUser } from "@/lib/auth/guard";
import { businessesOwnedBy, getLeadStats } from "@/lib/leads/inbox";
import { entitlementsFor } from "@/lib/permissions/resolve";
import { FEATURE, can } from "@/lib/permissions/features";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };
export const dynamic = "force-dynamic";

const STATUS_COPY: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draft", tone: "bg-surface-2 text-ink-3" },
  pending: { label: "Awaiting verification", tone: "bg-gold-500/20 text-ink" },
  published: { label: "Live", tone: "bg-brand-50 text-green-text" },
  suspended: { label: "Suspended", tone: "bg-red-50 text-red-700" },
  archived: { label: "Archived", tone: "bg-surface-2 text-ink-3" },
};

export default async function Page() {
  const user = await requireUser("/dashboard/");
  const owned = await businessesOwnedBy(user.id);

  if (owned.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
        <h1 className="font-display text-[18px] font-bold tracking-[-0.02em] text-ink">
          Welcome, {user.name}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-[1.7] text-ink-2">
          You do not have a business listed yet.
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

  const business = owned[0];
  const db = await getDb();

  const [stats, ent, passport, views, recent] = await Promise.all([
    getLeadStats(business.id),
    entitlementsFor(db, business.id),
    db
      .select({ slug: businessPassports.slug })
      .from(businessPassports)
      .where(eq(businessPassports.businessId, business.id))
      .limit(1),
    db
      .select({ n: sql<number>`count(*)` })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.businessId, business.id),
          eq(analyticsEvents.eventType, "PROFILE_VIEW"),
        ),
      ),
    db
      .select({
        id: notifications.id,
        title: notifications.title,
        body: notifications.body,
        href: notifications.href,
        createdAt: notifications.createdAt,
      })
      .from(notifications)
      .where(eq(notifications.businessId, business.id))
      .orderBy(desc(notifications.createdAt))
      .limit(5),
  ]);

  const status = STATUS_COPY[business.status] ?? STATUS_COPY.draft;
  const cardUrl = passport[0] ? `/p/${passport[0].slug}` : null;
  const showAnalytics = can(ent.features, FEATURE.ANALYTICS);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-[24px] font-extrabold tracking-[-0.035em] text-ink">
              {business.name}
            </h1>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.tone}`}>
              {status.label}
            </span>
          </div>
          <p className="mt-1.5 text-[13.5px] text-ink-2">
            {ent.planName ? `${ent.planName} plan` : "No active plan"}
            {ent.expiresAt &&
              ` · renews ${ent.expiresAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`}
          </p>
        </div>

        {cardUrl && (
          <Link
            href={cardUrl}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4
              text-[13px] font-semibold text-ink-2 transition-colors hover:border-brand-300 hover:text-green-text"
          >
            View public profile
            <ExternalLink className="size-3.5" strokeWidth={2.5} aria-hidden />
          </Link>
        )}
      </header>

      <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Inbox className="size-4" />} value={stats.total} label="Total enquiries" />
        <Stat icon={<BadgeCheck className="size-4" />} value={stats.unread} label="New enquiries" />
        <Stat icon={<Lock className="size-4" />} value={stats.locked} label="Locked enquiries" />
        <Stat
          icon={<Eye className="size-4" />}
          value={showAnalytics ? (views[0]?.n ?? 0) : "—"}
          label="Profile views"
          hint={showAnalytics ? undefined : "Included from AED 99"}
        />
      </ul>

      {stats.locked > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold-500/40 bg-gold-500/10 px-5 py-4">
          <p className="text-[13.5px] leading-[1.7] text-ink-2">
            <strong className="text-ink">
              {stats.locked} {stats.locked === 1 ? "enquiry is" : "enquiries are"} waiting
            </strong>{" "}
            with the customer&rsquo;s contact details hidden on your current plan.
          </p>
          <Link
            href="/dashboard/leads/"
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-4 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-500"
          >
            View enquiries
            <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden />
          </Link>
        </div>
      )}

      {recent.length > 0 && (
        <section className="rounded-2xl border border-line bg-white p-5 shadow-e1">
          <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
            Recent activity
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {recent.map((n) => (
              <li key={n.id} className="border-b border-line pb-3 last:border-0 last:pb-0">
                <p className="text-[13.5px] font-semibold text-ink">{n.title}</p>
                {n.body && <p className="mt-0.5 text-[12.5px] leading-[1.6] text-ink-2">{n.body}</p>}
                <p className="mt-1 text-[11px] text-ink-3">
                  {n.createdAt.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
  hint,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  hint?: string;
}) {
  return (
    <li className="rounded-2xl border border-line bg-white p-5 shadow-e1">
      <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-green-text">
        {icon}
      </span>
      <p className="mt-3.5 font-display text-[26px] font-extrabold leading-none tracking-[-0.04em] text-ink">
        {value}
      </p>
      <p className="mt-1.5 text-[12.5px] text-ink-2">{label}</p>
      {hint && <p className="mt-0.5 text-[11px] text-ink-3">{hint}</p>}
    </li>
  );
}
