import { and, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { getDb, type Db } from "@/lib/db";
import {
  analyticsEvents,
  businessCategories,
  businessContacts,
  businesses,
  leadRecipients,
  leads,
  notifications,
} from "@/lib/db/schema";
import { entitlementsFor } from "@/lib/permissions/resolve";
import { FEATURE, can, leadAccess } from "@/lib/permissions/features";
import { leadReference } from "@/lib/passport";
import { sendEmail } from "@/lib/email";
import { businessNewLead, customerWelcome } from "@/lib/email/templates";

/**
 * Enquiry to lead.
 *
 * Order matters. The lead is written first and everything after it - routing,
 * notifications, email, analytics - is best effort. A customer who fills in a
 * form must never see an error because a notification failed; the enquiry is
 * the valuable thing and it is already saved.
 *
 * The lead is stored complete regardless of the receiving business's plan.
 * Locking happens on read, never on write, so a business that upgrades in six
 * months can see the leads it could not read today. Both of the client's PDFs
 * are explicit about this.
 */

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number")
    .max(32)
    .regex(/^[+\d][\d\s()-]*$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(180).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  /** Honeypot. Real users never fill this; bots fill everything. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type CreateLeadResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };

export async function createLead(args: {
  businessId: number | null;
  categoryId?: number | null;
  locationId?: number | null;
  serviceId?: number | null;
  countryCode: string;
  input: EnquiryInput;
  source?: string;
  ip?: string | null;
  userAgent?: string | null;
  customerId?: number | null;
}): Promise<CreateLeadResult> {
  const db = await getDb();
  const { input } = args;

  // Silently accept and discard honeypot hits. Telling a bot it was detected
  // just teaches whoever wrote it to stop filling the field.
  if (input.website) return { ok: true, reference: leadReference(args.countryCode) };

  const reference = leadReference(args.countryCode);

  const [lead] = await db
    .insert(leads)
    .values({
      reference,
      businessId: args.businessId,
      customerId: args.customerId ?? null,
      categoryId: args.categoryId ?? null,
      locationId: args.locationId ?? null,
      serviceId: args.serviceId ?? null,
      customerName: input.name,
      customerPhone: input.phone,
      customerEmail: input.email || null,
      customerCompany: input.company || null,
      message: input.message || null,
      budget: input.budget || null,
      source: args.source ?? "profile",
      ip: args.ip ?? null,
      userAgent: args.userAgent ?? null,
      status: "new",
    })
    .returning({ id: leads.id });

  if (!lead) return { ok: false, error: "Could not save your enquiry. Please try again." };

  // Everything below is best effort.
  try {
    await routeLead(db, lead.id, args.businessId, args.categoryId ?? null);
  } catch (err) {
    console.error("[lead] routing failed", err);
  }

  try {
    await notifyLead(db, lead.id, args.businessId, reference);
  } catch (err) {
    console.error("[lead] notification failed", err);
  }

  if (input.email) {
    const businessName = args.businessId
      ? (
          await db
            .select({ name: businesses.name })
            .from(businesses)
            .where(eq(businesses.id, args.businessId))
            .limit(1)
        )[0]?.name
      : null;

    await sendEmail(
      customerWelcome({
        to: input.email,
        customerName: input.name,
        businessName,
        reference,
      }),
    );
  }

  try {
    await db.insert(analyticsEvents).values({
      businessId: args.businessId,
      leadId: lead.id,
      eventType: "INQUIRY_SUBMITTED",
      source: args.source ?? "profile",
      createdAt: new Date(),
    });
  } catch {
    // Analytics must never break a conversion.
  }

  return { ok: true, reference };
}

/**
 * Decide which businesses may see this lead.
 *
 * The named business always can. Beyond that, the client confirmed leads may be
 * shared, so businesses in the same category whose plan includes lead
 * generation are added as "matched". Capped at three so a single enquiry does
 * not carpet-bomb every listing in a category.
 */
async function routeLead(
  db: Db,
  leadId: number,
  businessId: number | null,
  categoryId: number | null,
): Promise<void> {
  if (businessId) {
    await db.insert(leadRecipients).values({ leadId, businessId, routing: "primary" });
  }

  if (!categoryId) return;

  const candidates = await db
    .select({ id: businesses.id })
    .from(businessCategories)
    .innerJoin(businesses, eq(businesses.id, businessCategories.businessId))
    .where(
      and(
        eq(businessCategories.categoryId, categoryId),
        eq(businesses.status, "published"),
        businessId ? ne(businesses.id, businessId) : undefined,
      ),
    )
    .limit(25);

  let added = 0;
  for (const c of candidates) {
    if (added >= 3) break;
    const ent = await entitlementsFor(db, c.id);
    if (!can(ent.features, FEATURE.LEAD_GENERATION)) continue;
    await db
      .insert(leadRecipients)
      .values({ leadId, businessId: c.id, routing: "matched" });
    added++;
  }
}

/**
 * Dashboard notification now, email alongside it.
 *
 * The client asked for dashboard first and email later. The row is written
 * either way, so switching email on is a matter of credentials rather than
 * code, and the notification survives even when sending fails.
 */
async function notifyLead(
  db: Db,
  leadId: number,
  businessId: number | null,
  reference: string,
): Promise<void> {
  const recipients = await db
    .select({ businessId: leadRecipients.businessId })
    .from(leadRecipients)
    .where(eq(leadRecipients.leadId, leadId));

  for (const r of recipients) {
    const [biz] = await db
      .select({ id: businesses.id, name: businesses.name, ownerId: businesses.ownerId })
      .from(businesses)
      .where(eq(businesses.id, r.businessId))
      .limit(1);
    if (!biz) continue;

    const ent = await entitlementsFor(db, biz.id);
    const locked = leadAccess(ent.features) === "none";

    await db.insert(notifications).values({
      userId: biz.ownerId,
      businessId: biz.id,
      kind: "lead.new",
      title: "New enquiry received",
      body: locked
        ? `Enquiry ${reference}. Upgrade your plan to see the customer's contact details.`
        : `Enquiry ${reference} is ready to view.`,
      href: "/dashboard/leads/",
      createdAt: new Date(),
    });

    const [contact] = await db
      .select({ email: businessContacts.email })
      .from(businessContacts)
      .where(eq(businessContacts.businessId, biz.id))
      .limit(1);

    if (contact?.email) {
      await sendEmail(
        businessNewLead({
          to: contact.email,
          businessName: biz.name,
          reference,
          locked,
        }),
      );
    }
  }

  void businessId;
}
