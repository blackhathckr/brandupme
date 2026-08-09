import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { getDb } from "@/lib/db";
import {
  businessContacts,
  businessPassports,
  businessSubscriptions,
  businesses,
  plans,
} from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/guard";
import { AdminBusinessRow } from "@/components/portal/admin-business-row";

/**
 * Verification queue.
 *
 * Pending registrations first, because that is the queue the client's team
 * works through - a business cannot go live, and therefore cannot be billed,
 * until someone here publishes it.
 */

export const metadata: Metadata = { title: "Businesses", robots: { index: false } };
export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, string> = {
  draft: "bg-surface-2 text-ink-3",
  pending: "bg-gold-500/20 text-ink",
  published: "bg-brand-50 text-green-text",
  suspended: "bg-red-50 text-red-700",
  archived: "bg-surface-2 text-ink-3",
};

export default async function Page() {
  const user = await requirePermission("business.view", "/admin/businesses/");
  const db = await getDb();

  const rows = await db
    .select({
      id: businesses.id,
      name: businesses.name,
      slug: businesses.slug,
      status: businesses.status,
      verified: businesses.verified,
      createdAt: businesses.createdAt,
      email: businessContacts.email,
      phone: businessContacts.phone,
      address: businessContacts.address,
      passportSlug: businessPassports.slug,
      subscriptionId: businessSubscriptions.id,
      subscriptionStatus: businessSubscriptions.status,
      planName: plans.name,
      planPrice: plans.priceMinor,
    })
    .from(businesses)
    .leftJoin(businessContacts, eq(businessContacts.businessId, businesses.id))
    .leftJoin(businessPassports, eq(businessPassports.businessId, businesses.id))
    .leftJoin(businessSubscriptions, eq(businessSubscriptions.businessId, businesses.id))
    .leftJoin(plans, eq(plans.id, businessSubscriptions.planId))
    .orderBy(desc(businesses.createdAt))
    .limit(100);

  // Pending first, then everything else newest-first.
  const ordered = [...rows].sort((a, b) => {
    const rank = (s: string) => (s === "pending" ? 0 : s === "published" ? 1 : 2);
    return rank(a.status) - rank(b.status);
  });

  const pendingCount = rows.filter((r) => r.status === "pending").length;
  const canVerify = user.permissions.has("business.verify");
  const canBill = user.permissions.has("subscription.manage");

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.035em] text-ink">
          Businesses
        </h1>
        <p className="mt-1.5 text-[13.5px] text-ink-2">
          {rows.length} listed
          {pendingCount > 0 && (
            <>
              {" · "}
              <strong className="text-ink">{pendingCount} awaiting verification</strong>
            </>
          )}
        </p>
      </header>

      {ordered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
          <h2 className="font-display text-[16px] font-bold text-ink">No businesses yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-[13.5px] text-ink-2">
            Registrations will appear here for verification.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3.5">
          {ordered.map((b) => (
            <li key={`${b.id}-${b.subscriptionId ?? 0}`}>
              <article className="rounded-2xl border border-line bg-white p-5 shadow-e1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-ink">
                        {b.name}
                      </h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ${
                          STATUS_TONE[b.status] ?? STATUS_TONE.draft
                        }`}
                      >
                        {b.status}
                      </span>
                      {b.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold text-green-text">
                          <BadgeCheck className="size-3" strokeWidth={2.5} aria-hidden />
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="mt-1.5 text-[12.5px] text-ink-2">
                      {[b.email, b.phone, b.address].filter(Boolean).join(" · ") ||
                        "No contact details"}
                    </p>

                    <p className="mt-1 text-[11.5px] text-ink-3">
                      Registered{" "}
                      {b.createdAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {b.planName && (
                        <>
                          {" · "}
                          {b.planName}
                          {" · "}
                          <span
                            className={
                              b.subscriptionStatus === "active"
                                ? "font-semibold text-green-text"
                                : "font-semibold text-ink-2"
                            }
                          >
                            {b.subscriptionStatus}
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  {b.passportSlug && (
                    <Link
                      href={`/p/${b.passportSlug}`}
                      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 text-[12.5px] font-semibold text-ink-2 hover:border-brand-300 hover:text-green-text"
                    >
                      Preview
                      <ExternalLink className="size-3.5" strokeWidth={2.5} aria-hidden />
                    </Link>
                  )}
                </div>

                <AdminBusinessRow
                  businessId={b.id}
                  status={b.status}
                  verified={b.verified}
                  subscriptionId={b.subscriptionId}
                  subscriptionStatus={b.subscriptionStatus}
                  canVerify={canVerify}
                  canBill={canBill}
                />
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
