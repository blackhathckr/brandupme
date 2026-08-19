import { Mail, MapPin, Phone } from "lucide-react";
import { UaeFlag } from "./uae-flag";

/**
 * The dark utility strip above the header. Sampled #0A1322 from the home
 * mockup. Hidden below lg — it is decorative and the phone/email repeat in the
 * footer.
 */
export function TopBar({ withApps = false }: { withApps?: boolean }) {
  return (
    <div className="hidden bg-navy text-white lg:block">
      <div className="container-portal flex h-9 items-center justify-between text-[12.5px]">
        <p className="flex items-center gap-2 text-white/85">
          <UaeFlag />
          UAE&apos;s Smart Business Growth Platform
        </p>

        <div className="flex items-center gap-6 text-white/85">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-white/60" aria-hidden />
            Dubai, UAE
          </span>
          <a
            href="mailto:support@brandupme.com"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Mail className="size-3.5 text-white/60" aria-hidden />
            support@brandupme.com
          </a>
          <a
            href="tel:+971501234567"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Phone className="size-3.5 text-white/60" aria-hidden />
            +971 50 123 4567
          </a>
          {withApps ? (
            <span className="flex items-center gap-2 text-white/70">
              Download App:
              <span aria-hidden className="text-[13px]">
                ▶
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
