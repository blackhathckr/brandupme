import Link from "next/link";
import { ArrowRight, Mail, MapPin, Megaphone, Phone } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { CATEGORIES } from "@/lib/brand/categories";

/**
 * Global footer.
 *
 * Carries the "Advertise Here" call to action, which the client asked to appear
 * on the home page and in the footer of every page — it is the entry point to
 * the Banner Advertising flow for businesses that do not want a listing.
 */

const COLUMNS = [
  {
    title: "For Businesses",
    links: [
      { label: "Register Your Business", href: "/register" },
      { label: "Plans & Pricing", href: "/plans" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Advertise Here", href: "/advertise" },
      { label: "Business Login", href: "/login" },
    ],
  },
  {
    title: "Partner Programmes",
    links: [
      { label: "Become a Promoter", href: "/register" },
      { label: "Category Referral Partner", href: "/register" },
      { label: "Selected Business Partner", href: "/register" },
      { label: "Influencer Programme", href: "/register" },
      { label: "Refer & Earn", href: "/how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-rule bg-navy text-white">
      {/* Advertise Here band */}
      <div className="border-b border-white/10">
        <div className="container-portal flex flex-col items-start gap-5 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="grid size-12 shrink-0 place-items-center rounded-xl bg-iris-600"
            >
              <Megaphone className="size-6" />
            </span>
            <div>
              <p className="text-[19px] font-extrabold tracking-tight">
                Advertise Here
              </p>
              <p className="mt-0.5 text-[13.5px] text-white/70">
                Promote your business across the portal from AED 19. No listing
                or business plan required.
              </p>
            </div>
          </div>

          <Link
            href="/advertise"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-white px-6 text-[15px] font-bold text-navy transition-colors hover:bg-white/90"
          >
            Get Started
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="container-portal grid gap-10 py-12 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div>
          <div className="rounded-lg bg-white px-4 py-3">
            <BrandLogo />
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-white/70">
            UAE&apos;s smart business growth platform. Discover verified
            businesses, generate leads and grow your brand with powerful digital
            tools.
          </p>

          <ul className="mt-5 space-y-2.5 text-[13.5px] text-white/80">
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-white/50" aria-hidden />
              Dubai, United Arab Emirates
            </li>
            <li>
              <a
                href="mailto:support@brandupme.com"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-white/50" aria-hidden />
                support@brandupme.com
              </a>
            </li>
            <li>
              <a
                href="tel:+971501234567"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-white/50" aria-hidden />
                +971 50 123 4567
              </a>
            </li>
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-[14px] font-bold">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-white/70 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-[14px] font-bold">Top Categories</h2>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-[13.5px] text-white/70 transition-colors hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-portal flex flex-col items-center justify-between gap-3 py-5 text-[12.5px] text-white/60 sm:flex-row">
          <p>© 2026 BrandUpMe. All rights reserved.</p>
          <p className="flex items-center gap-5">
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/refund" className="transition-colors hover:text-white">
              Refund Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
