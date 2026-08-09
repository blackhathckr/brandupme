import QRCode from "qrcode";
import { getProfileByPassport } from "@/lib/directory/profile";
import { passportUrl } from "@/lib/passport";

/**
 * Permanent QR code for a Business Passport.
 *
 * SVG rather than PNG so it stays sharp when a business prints it on a banner
 * or an exhibition stand. The encoded URL is the passport URL, which never
 * changes - that is the whole reason the passport slug is independent of the
 * business name.
 *
 * Error correction is set high so the code still scans when it is printed
 * small, laminated or partly obscured.
 */
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const profile = await getProfileByPassport(slug);
  if (!profile) return new Response("Not found", { status: 404 });

  const svg = await QRCode.toString(passportUrl(profile.passportSlug), {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 1,
    width: 512,
    color: { dark: "#04170A", light: "#FFFFFF" },
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": `inline; filename="${profile.passportSlug}-qr.svg"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
