import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { businesses, leads } from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/guard";

/**
 * All leads across the portal.
 *
 * Staff with lead.view see full customer contact details. That is deliberate
 * and different from the business-facing inbox: BrandUpMe owns the enquiry and
 * routes it, so its own team must be able to read it. The masking exists to
 * gate what a *paying business* sees, not to hide data from the operator.
 */

export const metadata: Metadata = { title: "Leads", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  await requirePermission("lead.view", "/admin/leads/");
  const db = await getDb();

  const rows = await db
    .select({
      id: leads.id,
      reference: leads.reference,
      customerName: leads.customerName,
      customerPhone: leads.customerPhone,
      customerEmail: leads.customerEmail,
      message: leads.message,
      status: leads.status,
      source: leads.source,
      createdAt: leads.createdAt,
      businessName: businesses.name,
    })
    .from(leads)
    .leftJoin(businesses, eq(businesses.id, leads.businessId))
    .orderBy(desc(leads.createdAt))
    .limit(200);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.035em] text-ink">
          Leads
        </h1>
        <p className="mt-1.5 text-[13.5px] text-ink-2">{rows.length} most recent enquiries.</p>
      </header>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white p-12 text-center">
          <h2 className="font-display text-[16px] font-bold text-ink">No enquiries yet</h2>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-e1">
          <table className="w-full min-w-[860px] text-left">
            <thead className="border-b border-line bg-surface-2">
              <tr className="text-[11.5px] uppercase tracking-[0.1em] text-ink-3">
                <th className="px-4 py-3 font-semibold">Reference</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Business</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Received</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0 align-top">
                  <td className="px-4 py-3 text-[12px] font-semibold text-ink">{r.reference}</td>
                  <td className="px-4 py-3">
                    <p className="text-[13px] font-medium text-ink">{r.customerName}</p>
                    {r.message && (
                      <p className="mt-1 max-w-xs text-[12px] leading-[1.5] text-ink-3">
                        {r.message.slice(0, 120)}
                        {r.message.length > 120 && "…"}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[12.5px] text-ink-2">
                    <a href={`tel:${r.customerPhone}`} className="hover:text-green-text">
                      {r.customerPhone}
                    </a>
                    {r.customerEmail && (
                      <>
                        <br />
                        <a href={`mailto:${r.customerEmail}`} className="hover:text-green-text">
                          {r.customerEmail}
                        </a>
                      </>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[12.5px] text-ink-2">
                    {r.businessName ?? "Unassigned"}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-ink-3">{r.source}</td>
                  <td className="px-4 py-3 text-[12px] text-ink-3">
                    {r.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
