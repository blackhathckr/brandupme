import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MessageCircle } from "lucide-react";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/ui/social-icons";
import {
  CONFIG,
  WHATSAPP_LINK,
  NAV,
  LEGAL_PAGES_PUBLISHED,
} from "@/lib/content";
import { MorphButton } from "@/components/ui/brand-button";
import { Reveal } from "@/components/ui/reveal";

const CONTACT = [
  {
    icon: Phone,
    label: "Call us",
    value: CONFIG.phoneDisplay,
    href: `tel:${CONFIG.phone}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONFIG.phoneDisplay,
    href: WHATSAPP_LINK,
  },
  { icon: Mail, label: "Email", value: CONFIG.email, href: `mailto:${CONFIG.email}` },
];

const SOCIALS = [
  { Icon: LinkedInIcon, href: CONFIG.social.linkedin, label: "LinkedIn" },
  { Icon: InstagramIcon, href: CONFIG.social.instagram, label: "Instagram" },
  { Icon: FacebookIcon, href: CONFIG.social.facebook, label: "Facebook" },
];

export function Contact() {
  return (
    <section id="contact" className="py-14 lg:py-20">
      <div className="container-page">
        <div className="grid gap-3 sm:grid-cols-3">
          {CONTACT.map((c) => (
            <Reveal key={c.label}>
              <a
                href={c.href}
                className="flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-6
                  transition-all duration-[240ms] ease-brand hover:-translate-y-1 hover:border-gold-300 hover:shadow-e3"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <c.icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="block truncate font-display text-[16px] font-semibold text-ink">
                    {c.value}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-gold-600 py-14 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 size-[480px] rounded-full bg-white/10 blur-3xl"
      />
      <div className="container-page relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-white">
            Focus on your business.{" "}
            <span className="font-serif font-normal italic tracking-normal text-gold-200">
              We&rsquo;ll
            </span>{" "}
            bring you the business.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[1.7] text-white/85">
            Your next customer may already need what you sell. The only question
            is who reaches them first.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MorphButton href="#register" tone="white">
              Partner with us today
            </MorphButton>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener"
              className="inline-flex h-14 items-center rounded-full border border-white/40 bg-white/10 px-7 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-night pt-16 text-night-muted">
      <div className="container-page">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/mark-192.png"
                alt=""
                width={40}
                height={40}
                className="size-10 object-contain"
              />
              <span className="font-display text-[21px] font-bold tracking-[-0.03em] text-night-fg">
                Brand<span className="text-brand-400">Up</span>Me
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[14.5px] leading-[1.7]">
              Your remote sales partner in the UAE. We prospect, we follow up,
              you close.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-xl border border-night-line text-night-muted transition-colors hover:border-gold-500 hover:text-gold-400"
                >
                  <s.Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-400">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-[14.5px] transition-colors hover:text-gold-400"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#register"
                  className="text-[14.5px] transition-colors hover:text-gold-400"
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-400">
              Get in touch
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-[14.5px]">
              <li>
                <a href={`tel:${CONFIG.phone}`} className="hover:text-gold-400">
                  {CONFIG.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONFIG.email}`} className="hover:text-gold-400">
                  {CONFIG.email}
                </a>
              </li>
              <li className="pt-1">
                {CONFIG.city}, {CONFIG.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-night-line py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} BrandUpMe. All rights reserved.
          </p>
          {/* Hidden until the client signs off the drafts. See
              LEGAL_PAGES_PUBLISHED in lib/content.ts */}
          {LEGAL_PAGES_PUBLISHED && (
            <p className="flex gap-5">
              <Link href="/privacy/" className="hover:text-gold-400">
                Privacy
              </Link>
              <Link href="/terms/" className="hover:text-gold-400">
                Terms
              </Link>
              <Link href="/refund/" className="hover:text-gold-400">
                Refund policy
              </Link>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
