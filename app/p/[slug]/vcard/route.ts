import { getProfileByPassport } from "@/lib/directory/profile";
import { buildVCard } from "@/lib/passport";

/**
 * Save Contact.
 *
 * The vCard is generated from the same permission-filtered profile the page
 * renders, so a locked phone number cannot be extracted by downloading the
 * contact file instead of reading the page. The client's PDF calls this out:
 * "if a field is not permitted by the plan, do not place that field into the
 * generated contact file."
 */
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const profile = await getProfileByPassport(slug);
  if (!profile) return new Response("Not found", { status: 404 });

  const vcf = buildVCard({
    name: profile.name,
    tagline: profile.tagline,
    contact: profile.contact,
  });

  return new Response(vcf, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${profile.passportSlug}.vcf"`,
      "Cache-Control": "no-store",
    },
  });
}
