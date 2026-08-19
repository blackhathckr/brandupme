import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, XIcon } from "@/components/ui/social-icons";
import { footerColumns } from "@/lib/site-data";

const socials = [FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, XIcon];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#020D06] pt-14">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <Image src="/brand/mark-192.png" alt="" width={36} height={36} className="size-8 object-contain" />
              <span className="flex flex-col leading-none">
                <span className="text-[18px] font-extrabold text-white">BrandUpMe</span>
                <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#7FA88F]">
                  Connect | Grow | Succeed
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-white/45">
              UAE&rsquo;s largest business ecosystem connecting businesses, customers,
              partners and influencers to create endless opportunities.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[#E6C86C]/40 hover:text-[#E6C86C]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#E6C86C]">
                {col.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13px] text-white/55 transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#E6C86C]">Contact Us</p>
            <ul className="mt-4 flex flex-col gap-3 text-[13px] text-white/55">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-white/35" />
                info@brandupme.ae
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0 text-white/35" />
                +971 50 123 4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-white/35" />
                Dubai, UAE
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-[12px] text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} BrandUpMe. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-white">Terms &amp; Conditions</a>
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
