import { and, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { leadRecipients, leads } from "@/lib/db/schema";
import {
  currentQuotaWindow,
  entitlementsFor,
  unlocksUsedThisMonth,
} from "@/lib/permissions/resolve";
import { leadForBusiness, type PublicLead } from "@/lib/permissions/visibility";
import { leadAccess } from "@/lib/permissions/features";

/**
 * A business's lead inbox.
 *
 * Every row goes through the permission layer before it leaves this function,
 * so the dashboard receives masked values and never the real ones. The masking
 * is not a UI concern - a business that opens DevTools on its own inbox must
 * not find the phone numbers it has not paid for.
 */

export type InboxItem = {
  id: number;
  reference: string;
  message: string | null;
  budget: string | null;
  status: string;
  routing: string;
  createdAt: Date;
  viewedAt: Date | null;
  contact: PublicLead;
};

export type Inbox = {
  items: InboxItem[];
  total: number;
  page: number;
  perPage: number;
  /** Null on plans with no cap. */
  quota: { used: number; total: number } | null;
  access: "none" | "limited" | "full";
  planName: string | null;
};

export async function getInbox(
  businessId: number,
  opts: { page?: number; perPage?: number } = {},
): Promise<Inbox> {
  const db = await getDb();
  const page = Math.max(1, opts.page ?? 1);
  const perPage = Math.min(50, Math.max(1, opts.perPage ?? 20));

  const ent = await entitlementsFor(db, businessId);
  const access = leadAccess(ent.features);

  const used =
    access === "limited"
      ? await unlocksUsedThisMonth(db, businessId, currentQuotaWindow())
      : 0;

  const rows = await db
    .select({
      id: leads.id,
      reference: leads.reference,
      customerName: leads.customerName,
      customerPhone: leads.customerPhone,
      customerEmail: leads.customerEmail,
      customerCompany: leads.customerCompany,
      message: leads.message,
      budget: leads.budget,
      status: leads.status,
      createdAt: leads.createdAt,
      routing: leadRecipients.routing,
      viewedAt: leadRecipients.viewedAt,
      unlockedAt: leadRecipients.unlockedAt,
    })
    .from(leadRecipients)
    .innerJoin(leads, eq(leads.id, leadRecipients.leadId))
    .where(eq(leadRecipients.businessId, businessId))
    .orderBy(desc(leads.createdAt))
    .limit(perPage)
    .offset((page - 1) * perPage);

  const [countRow] = await db
    .select({ n: sql<number>`count(*)` })
    .from(leadRecipients)
    .where(eq(leadRecipients.businessId, businessId));

  const items: InboxItem[] = rows.map((r) => ({
    id: r.id,
    reference: r.reference,
    message: r.message,
    budget: r.budget,
    status: r.status,
    routing: r.routing,
    createdAt: r.createdAt,
    viewedAt: r.viewedAt,
    contact: leadForBusiness(
      {
        customerName: r.customerName,
        customerPhone: r.customerPhone,
        customerEmail: r.customerEmail,
        customerCompany: r.customerCompany,
      },
      ent.features,
      { alreadyUnlocked: r.unlockedAt !== null, quotaUsed: used },
    ),
  }));

  return {
    items,
    total: countRow?.n ?? 0,
    page,
    perPage,
    quota:
      access === "limited"
        ? {
            used,
            total: Number.parseInt(ent.features.lead_unlock_quota ?? "0", 10) || 0,
          }
        : null,
    access,
    planName: ent.planName,
  };
}

/** Counts for the dashboard overview. */
export async function getLeadStats(businessId: number) {
  const db = await getDb();
  const [row] = await db
    .select({
      total: sql<number>`count(*)`,
      unread: sql<number>`sum(case when ${leadRecipients.viewedAt} is null then 1 else 0 end)`,
      locked: sql<number>`sum(case when ${leadRecipients.unlockedAt} is null then 1 else 0 end)`,
    })
    .from(leadRecipients)
    .where(eq(leadRecipients.businessId, businessId));

  return {
    total: row?.total ?? 0,
    unread: row?.unread ?? 0,
    locked: row?.locked ?? 0,
  };
}

/** The businesses this user owns, for the dashboard switcher. */
export async function businessesOwnedBy(userId: number) {
  const { businesses } = await import("@/lib/db/schema");
  const db = await getDb();
  return db
    .select({
      id: businesses.id,
      name: businesses.name,
      slug: businesses.slug,
      status: businesses.status,
    })
    .from(businesses)
    .where(and(eq(businesses.ownerId, userId)))
    .orderBy(desc(businesses.createdAt));
}
