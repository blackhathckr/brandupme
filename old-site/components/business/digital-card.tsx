import QRCode from "qrcode";
import {
  BadgeCheck,
  Download,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
} from "lucide-react";
import { FEATURED_BUSINESS } from "@/lib/brand/businesses";

/**
 * The Digital Business Card.
 *
 * The client treats this as a product in its own right — it is the whole of the
 * AED 10 Daily Pass, it is what partners and customers share, and its opens are
 * a tracked reward activity. So it is a standalone component reused by the
 * business page, the /card/[slug] share target and later the dashboard.
 *
 * The QR is generated at build time from the card URL. `qrcode` was already a
 * dependency for the existing passport route.
 */
export async function DigitalCard({
  business = FEATURED_BUSINESS,
  cardUrl,
}: {
  business?: typeof FEATURED_BUSINESS;
  cardUrl: string;
}) {
  const qr = await QRCode.toString(cardUrl, {
    type: "svg",
    margin: 0,
    color: { dark: "#0A1322", light: "#FFFFFF" },
  });

  return (
    <div className="overflow-hidden rounded-xl bg-navy text-white shadow-p3">
      <div className="relative p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-iris-500/20 blur-3xl"
        />

        <div className="relative flex gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-white text-[13px] font-black tracking-tight text-navy">
                {business.logoInitials}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 text-[15px] font-bold leading-tight">
                  <span className="truncate">{business.name}</span>
                  {business.verified ? (
                    <BadgeCheck className="size-4 shrink-0 text-iris-300" aria-hidden />
                  ) : null}
                </span>
                <span className="mt-0.5 block text-[12px] text-white/65">
                  {business.tagline}
                </span>
              </span>
            </div>

            <ul className="mt-4 space-y-2.5 text-[12.5px]">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-white/50" aria-hidden />
                {business.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-white/50" aria-hidden />
                {business.email}
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="size-4 shrink-0 text-white/50" aria-hidden />
                {business.website}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-white/50" aria-hidden />
                {business.emirate}
              </li>
            </ul>
          </div>

          {/* QR */}
          <div className="shrink-0 text-center">
            <div
              className="size-[104px] rounded-lg bg-white p-2 [&>svg]:size-full"
              dangerouslySetInnerHTML={{ __html: qr }}
            />
            <p className="mt-1.5 text-[10.5px] text-white/60">Scan to Save</p>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <ul className="grid grid-cols-4 border-t border-white/10 text-[11.5px]">
        {[
          { icon: Phone, label: "Call" },
          { icon: MessageCircle, label: "WhatsApp" },
          { icon: Navigation, label: "Directions" },
          { icon: Globe, label: "Website" },
        ].map(({ icon: Icon, label }) => (
          <li key={label}>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-1.5 py-3 text-white/85 transition-colors hover:bg-white/10"
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Share / download row printed under the card. */
export function CardActions() {
  return (
    <>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-iris-200 text-[13.5px] font-semibold text-iris-700 transition-colors hover:bg-iris-50"
        >
          <Share2 className="size-4" aria-hidden />
          Share Digital Card
        </button>
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-iris-200 text-[13.5px] font-semibold text-iris-700 transition-colors hover:bg-iris-50"
        >
          <Download className="size-4" aria-hidden />
          Download Card
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[12.5px] text-slate-3">Share on</span>
        {[
          { label: "WhatsApp", chip: "bg-[#25D366]" },
          { label: "Facebook", chip: "bg-[#1877F2]" },
          { label: "LinkedIn", chip: "bg-[#0A66C2]" },
          { label: "X", chip: "bg-black" },
          { label: "Email", chip: "bg-iris-600" },
        ].map((s) => (
          <button
            key={s.label}
            type="button"
            aria-label={`Share on ${s.label}`}
            className={`grid size-8 place-items-center rounded-lg text-[11px] font-bold text-white transition-opacity hover:opacity-90 ${s.chip}`}
          >
            {s.label[0]}
          </button>
        ))}
        <button
          type="button"
          className="h-8 rounded-lg border border-rule px-2.5 text-[12px] font-medium text-slate-2 transition-colors hover:bg-paper"
        >
          More
        </button>
      </div>
    </>
  );
}
