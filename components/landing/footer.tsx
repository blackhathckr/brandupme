import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle, Target } from "lucide-react";
import {
  NAV,
  SOCIAL,
  FOOTER_BLURB,
  whatsappLink,
  LEGAL_PAGES_PUBLISHED,
  type RegionContent,
} from "@/lib/content";
import { Button } from "@/components/ui/brand-button";
import { Reveal } from "@/components/ui/reveal";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/social-icons";

const SOCIALS = [
  { Icon: FacebookIcon, href: SOCIAL.facebook, label: "Facebook" },
  { Icon: InstagramIcon, href: SOCIAL.instagram, label: "Instagram" },
  { Icon: XIcon, href: SOCIAL.x, label: "X" },
  { Icon: YouTubeIcon, href: SOCIAL.youtube, label: "YouTube" },
  { Icon: LinkedInIcon, href: SOCIAL.linkedin, label: "LinkedIn" },
];

/** Rounded dark card floating on the light section, per the mockup. */
export function CtaBand({ r }: { r: RegionContent }) {
  return (
    <section id="contact" className="bg-surface-2 pb-16 lg:pb-24">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl bg-deep px-6 py-10 lg:px-12 lg:py-12">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="deep-grid absolute inset-0 opacity-50" />
            <div className="absolute -right-24 -top-24 size-72 rounded-full bg-brand-500/20 blur-[90px]" />
          </div>

          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <div className="flex items-center gap-5">
              <span
                aria-hidden
                className="hidden size-16 shrink-0 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/12 text-brand-400 sm:flex"
              >
                <Target className="size-8" strokeWidth={1.6} />
              </span>
              <div className="text-center sm:text-left">
                <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight tracking-[-0.03em] text-white">
                  {r.cta.headline}
                </h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-deep-muted">
                  {r.cta.sub}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 lg:items-end">
              <Button href={whatsappLink(r)} variant="primary" size="lg" icon>
                {r.cta.button}
              </Button>
              <p className="flex items-center gap-2 text-[12.5px] text-deep-muted">
                <span className="font-display font-extrabold text-brand-400">
                  {r.stats[0].value}
                </span>
                {r.stats[0].label}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ r }: { r: RegionContent }) {
  return (
    <footer className="bg-deep pt-14 text-deep-muted">
      <div className="container-page">
        <div className="grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/brand/mark-192.png"
                alt=""
                width={38}
                height={38}
                className="size-9 object-contain"
              />
              <span className="font-display text-[19px] font-bold leading-none tracking-[-0.03em] text-white">
                BrandUpMe
                <span className="ml-1 align-top text-[9px] font-semibold tracking-[0.1em] text-brand-300">
                  LLP
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13.5px] leading-[1.7]">
              {FOOTER_BLURB}
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-deep-line
                    text-deep-muted transition-colors hover:border-brand-500 hover:bg-brand-500/10 hover:text-brand-300"
                >
                  <s.Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h2 className="font-display text-[14px] font-bold tracking-[-0.01em] text-white">
              Quick Links
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] transition-colors hover:text-brand-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[14px] font-bold tracking-[-0.01em] text-white">
              Our Services
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {r.footerServices.map((l) => (
                <li key={l}>
                  <Link
                    href="#services"
                    className="text-[13.5px] transition-colors hover:text-brand-300"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[14px] font-bold tracking-[-0.01em] text-white">
              Contact Us
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-[13.5px]">
              <li>
                <a
                  href={`tel:${r.phone}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-brand-300"
                >
                  <Phone className="size-4 shrink-0 text-brand-400" strokeWidth={2} aria-hidden />
                  {r.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${r.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-brand-300"
                >
                  <Mail className="size-4 shrink-0 text-brand-400" strokeWidth={2} aria-hidden />
                  {r.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" strokeWidth={2} aria-hidden />
                {r.address}
              </li>
            </ul>

            <a
              href={whatsappLink(r)}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-brand-500/60
                bg-brand-500/10 px-4 text-[13px] font-semibold text-brand-300 transition-colors
                hover:bg-brand-500/20"
            >
              <MessageCircle className="size-4" strokeWidth={2} aria-hidden />
              Let&rsquo;s Talk
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-deep-line py-6 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {r.entity}. All rights reserved.
          </p>
          {LEGAL_PAGES_PUBLISHED && (
            <p className="flex gap-5">
              <Link href="/privacy/" className="hover:text-brand-300">
                Privacy
              </Link>
              <Link href="/terms/" className="hover:text-brand-300">
                Terms
              </Link>
              <Link href="/refund/" className="hover:text-brand-300">
                Refund Policy
              </Link>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
