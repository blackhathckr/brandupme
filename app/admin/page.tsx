import type { Metadata } from "next";
import Link from "next/link";
import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { businesses, categories, leads } from "@/lib/db/schema";
import { requireStaff } from "@/lib/auth/guard";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await requireStaff("/admin/");
  const db = await getDb();

  const [[biz], [pending], [leadCount], [cats]] = await Promise.all([
    db.select({ n: sql<number>`count(*)` }).from(businesses),
    db
      .select({ n: sql<number>`count(*)` })
      .from(businesses)
      .where(sql`${businesses.status} = 'pending'`),
    db.select({ n: sql<number>`count(*)` }).from(leads),
    db.select({ n: sql<number>`count(*)` }).from(categories),
  ]);

  const stats = [
    { label: "Businesses", value: biz?.n ?? 0, href: "/admin/businesses/" },
    { label: "Awaiting verification", value: pending?.n ?? 0, href: "/admin/businesses/" },
    { label: "Total enquiries", value: leadCount?.n ?? 0, href: "/admin/leads/" },
    { label: "Categories", value: cats?.n ?? 0, href: null },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.035em] text-ink">
          Welcome, {user.name}
        </h1>
        <p className="mt-1.5 text-[13.5px] text-ink-2">
          BrandUpMe UAE business portal.
        </p>
      </header>

      <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const card = (
            <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-e1 transition-colors hover:border-brand-300">
              <p className="font-display text-[28px] font-extrabold leading-none tracking-[-0.04em] text-ink">
                {s.value}
              </p>
              <p className="mt-2 text-[12.5px] text-ink-2">{s.label}</p>
            </div>
          );
          return (
            <li key={s.label}>
              {s.href ? <Link href={s.href}>{card}</Link> : card}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
