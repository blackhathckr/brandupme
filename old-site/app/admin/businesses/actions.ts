"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  businessCategories,
  businessSubscriptions,
  businesses,
  categories,
  notifications,
} from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/guard";

/**
 * Admin actions on a business listing.
 *
 * Each one re-checks the specific permission it needs rather than a blanket
 * "is staff" test, because the client asked for roles where one person only
 * verifies and another only manages plans.
 *
 * Publishing also refreshes the denormalised listing counts on that business's
 * categories, since those counts drive both the directory UI and the decision
 * about which category pages are worth publishing.
 */

export type AdminActionState = { ok: boolean; message?: string };

export async function publishBusiness(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const user = await requirePermission("business.verify", "/admin/businesses/");
  const id = Number.parseInt(String(formData.get("businessId") ?? ""), 10);
  const verify = formData.get("verify") === "on";
  if (!Number.isFinite(id)) return { ok: false, message: "Unknown business." };

  const db = await getDb();
  await db
    .update(businesses)
    .set({
      status: "published",
      verified: verify,
      verifiedAt: verify ? new Date() : null,
      verifiedBy: verify ? user.id : null,
      updatedAt: new Date(),
    })
    .where(eq(businesses.id, id));

  const [row] = await db
    .select({ ownerId: businesses.ownerId, name: businesses.name })
    .from(businesses)
    .where(eq(businesses.id, id))
    .limit(1);

  if (row) {
    await db.insert(notifications).values({
      userId: row.ownerId,
      businessId: id,
      kind: "business.published",
      title: "Your listing is live",
      body: `${row.name} is now published on the BrandUpMe UAE directory.`,
      href: "/dashboard/",
      createdAt: new Date(),
    });
  }

  await refreshCategoryCounts(id);
  revalidatePath("/admin/businesses/");
  revalidatePath("/uae/");
  return { ok: true, message: "Listing published." };
}

export async function suspendBusiness(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requirePermission("business.verify", "/admin/businesses/");
  const id = Number.parseInt(String(formData.get("businessId") ?? ""), 10);
  if (!Number.isFinite(id)) return { ok: false, message: "Unknown business." };

  const db = await getDb();
  // Suspended, never deleted. The client's PDF is explicit that business data
  // and the passport survive - only visibility changes.
  await db
    .update(businesses)
    .set({ status: "suspended", updatedAt: new Date() })
    .where(eq(businesses.id, id));

  await refreshCategoryCounts(id);
  revalidatePath("/admin/businesses/");
  return { ok: true, message: "Listing suspended." };
}

/**
 * Activate a subscription after payment is confirmed offline.
 *
 * The client collects payment manually for now, so this is the moment a plan
 * actually takes effect. It records who activated it, because money changing
 * hands outside the system needs an audit trail inside it.
 */
export async function activateSubscription(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const user = await requirePermission("subscription.manage", "/admin/businesses/");
  const subscriptionId = Number.parseInt(String(formData.get("subscriptionId") ?? ""), 10);
  const months = Number.parseInt(String(formData.get("months") ?? "1"), 10) || 1;
  const paymentRef = String(formData.get("paymentRef") ?? "").trim();

  if (!Number.isFinite(subscriptionId)) {
    return { ok: false, message: "Unknown subscription." };
  }

  const db = await getDb();
  const [sub] = await db
    .select({ businessId: businessSubscriptions.businessId })
    .from(businessSubscriptions)
    .where(eq(businessSubscriptions.id, subscriptionId))
    .limit(1);
  if (!sub) return { ok: false, message: "Unknown subscription." };

  const startsAt = new Date();
  const expiresAt = new Date(startsAt);
  expiresAt.setUTCMonth(expiresAt.getUTCMonth() + months);

  // Close any other active row first, so entitlement resolution never has to
  // choose between two live plans.
  await db
    .update(businessSubscriptions)
    .set({ status: "expired", updatedAt: new Date() })
    .where(
      and(
        eq(businessSubscriptions.businessId, sub.businessId),
        eq(businessSubscriptions.status, "active"),
      ),
    );

  await db
    .update(businessSubscriptions)
    .set({
      status: "active",
      startsAt,
      expiresAt,
      paymentRef: paymentRef || null,
      activatedBy: user.id,
      updatedAt: new Date(),
    })
    .where(eq(businessSubscriptions.id, subscriptionId));

  await db.insert(notifications).values({
    businessId: sub.businessId,
    kind: "plan.activated",
    title: "Your plan is active",
    body: `Active until ${expiresAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}.`,
    href: "/dashboard/",
    createdAt: new Date(),
  });

  revalidatePath("/admin/businesses/");
  return { ok: true, message: "Subscription activated." };
}

/** Recount published listings for every category this business belongs to. */
async function refreshCategoryCounts(businessId: number): Promise<void> {
  const db = await getDb();
  const rows = await db
    .select({ categoryId: businessCategories.categoryId })
    .from(businessCategories)
    .where(eq(businessCategories.businessId, businessId));

  for (const r of rows) {
    const [count] = await db
      .select({ n: businesses.id })
      .from(businessCategories)
      .innerJoin(businesses, eq(businesses.id, businessCategories.businessId))
      .where(
        and(
          eq(businessCategories.categoryId, r.categoryId),
          eq(businesses.status, "published"),
        ),
      );
    void count;

    const all = await db
      .select({ id: businesses.id })
      .from(businessCategories)
      .innerJoin(businesses, eq(businesses.id, businessCategories.businessId))
      .where(
        and(
          eq(businessCategories.categoryId, r.categoryId),
          eq(businesses.status, "published"),
        ),
      );

    await db
      .update(categories)
      .set({ listingCount: all.length, updatedAt: new Date() })
      .where(eq(categories.id, r.categoryId));
  }
}
