import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Country gateway - the first thing a visitor sees.
 *
 * The client supplied this as one square image with both countries and the
 * INDIA / UAE buttons baked in. That artwork is used for the two character
 * panels, but the headline, labels and buttons are rebuilt as real markup:
 * a flat image would be unreadable on a phone, invisible to search engines
 * and unreachable by keyboard. The panels are cropped above the baked-in
 * buttons and fade out at the cut - see the note in the split script.
 *
 * Each panel is a single link. The pill inside is styled as a button but is
 * not a button element, because an interactive control nested inside a link
 * is invalid and breaks keyboard navigation.
 */

const COUNTRIES = [
  {
    href: "/india/",
    name: "India",
    flag: "🇮🇳",
    art: "/gateway/india.webp",
    alt: "BrandUpMe India",
    blurb: "Digital marketing, creative and lead generation for Indian businesses.",
    /* Saffron, from the client's India button. */
    accent: "from-[#F0872B] to-[#E8A33D]",
    glow: "bg-[#F0872B]/22",
  },
  {
    href: "/uae/",
    name: "UAE",
    flag: "🇦🇪",
    art: "/gateway/uae.webp",
    alt: "BrandUpMe UAE",
    blurb: "Business partnership plans and a remote sales team for Dubai.",
    accent: "from-brand-500 to-brand-400",
    glow: "bg-brand-500/22",
  },
];

export function CountryGateway() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#01200A]">
      {/* Ambient depth, matching the artwork's own glow. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="deep-grid absolute inset-0 opacity-40" />
        <div className="absolute left-1/2 top-1/3 size-[720px] -translate-x-1/2 rounded-full bg-brand-600/16 blur-[140px]" />
      </div>

      <div className="container-page relative flex min-h-dvh flex-col items-center justify-center py-12 lg:py-16">
        <header className="text-center">
          <Image
            src="/brand/logo-full.png"
            alt="BrandUpMe"
            width={200}
            height={48}
            priority
            className="mx-auto h-9 w-auto lg:h-10"
          />

          <h1 className="mt-7 font-display text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
            Smart choices.{" "}
            <span className="text-brand-400">Global impact.</span>
          </h1>
          <p className="mx-auto mt-3.5 max-w-md text-[13px] uppercase tracking-[0.22em] text-deep-muted">
            AI driven solutions for a connected future
          </p>

          <span
            aria-hidden
            className="mx-auto mt-6 block h-px w-28 bg-gradient-to-r from-transparent via-gold-500/70 to-transparent"
          />
        </header>

        <div className="mt-10 grid w-full max-w-4xl gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-6">
          {COUNTRIES.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              aria-label={`Continue to BrandUpMe ${c.name}`}
              /* Panel matches the artwork's own background so the fade at the
                 image edge is seamless. */
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10
                bg-[#011C03] transition-all duration-[320ms] ease-brand
                hover:-translate-y-1.5 hover:border-brand-500/45
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2
                focus-visible:ring-offset-[#01200A]"
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full
                  blur-3xl opacity-0 transition-opacity duration-[320ms] group-hover:opacity-100 ${c.glow}`}
              />

              {/* Capped on phones so both countries are reachable without a
                  long scroll; the overlay keeps the crop edge soft wherever it
                  lands. */}
              <div className="relative max-h-[38vh] overflow-hidden sm:max-h-none">
                <Image
                  src={c.art}
                  alt={c.alt}
                  width={627}
                  height={985}
                  priority
                  sizes="(min-width: 640px) 420px, 92vw"
                  className="w-full object-cover object-top transition-transform duration-[520ms]
                    ease-brand group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b
                    from-transparent to-[#011C03]"
                />
              </div>

              {/* Pulled up over the artwork's faded edge so the two meet. */}
              <div className="relative -mt-10 px-6 pb-7 text-center sm:-mt-14 lg:px-7">
                <p className="font-display text-[26px] font-extrabold tracking-[-0.03em] text-white lg:text-[28px]">
                  <span className="mr-2 align-middle text-[22px]">{c.flag}</span>
                  {c.name}
                </p>
                <p className="mx-auto mt-2 max-w-[15rem] text-[12.5px] leading-[1.6] text-deep-muted">
                  {c.blurb}
                </p>

                <span
                  className={`mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r px-6
                    text-[13.5px] font-bold text-deep shadow-e2 transition-transform duration-[240ms]
                    ease-brand group-hover:scale-[1.04] ${c.accent}`}
                >
                  Continue to {c.name}
                  <ArrowRight
                    className="size-4 transition-transform duration-[240ms] ease-brand group-hover:translate-x-1"
                    strokeWidth={2.75}
                    aria-hidden
                  />
                </span>

                <p className="mt-3.5 text-[10.5px] uppercase tracking-[0.2em] text-deep-soft/70">
                  Discover · Connect · Grow
                </p>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-10 text-center lg:mt-12">
          <p className="text-[12px] uppercase tracking-[0.26em] text-deep-muted">
            One vision. Two destinations.
          </p>
          <p className="mt-1.5 font-serif text-[24px] italic text-brand-400">
            Limitless possibilities.
          </p>
        </footer>
      </div>
    </main>
  );
}
