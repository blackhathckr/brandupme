import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { ads } from "@/lib/db/schema";
import { recordAdClick } from "@/lib/ads/select";

/**
 * Click-through for a sponsored placement.
 *
 * Going through our own route rather than linking straight out means clicks can
 * be counted for billing. The destination comes from the database, never from a
 * query parameter, so this cannot be turned into an open redirect.
 */
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const adId = Number.parseInt(id, 10);
  if (!Number.isFinite(adId)) redirect("/uae/");

  const db = await getDb();
  const [ad] = await db
    .select({ target: ads.targetUrl, status: ads.status })
    .from(ads)
    .where(eq(ads.id, adId))
    .limit(1);

  if (!ad || ad.status !== "active") redirect("/uae/");

  await recordAdClick(adId);
  redirect(ad.target);
}
