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
 * The two panels stay side by side at every width, matching the client's
 * artwork. Cropping them to fit a phone hid the faces and flags, which is the
 * whole point of the image, so they are never cropped - they scale instead.
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
        <div className="absolute left-1/2 top-1/3 size-[820px] -translate-x-1/2 rounded-full bg-brand-600/16 blur-[150px]" />
      </div>

      <div className="container-page relative flex min-h-dvh flex-col items-center justify-center py-7 lg:py-14">
        <header className="text-center">
          {/* Mark plus wordmark, same construction as the site nav so the two
              read as one brand. Larger here because this is the front door. */}
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/brand/mark-192.png"
              alt=""
              width={192}
              height={192}
              priority
              className="size-11 object-contain lg:size-14"
            />
            <span className="font-display text-[30px] font-bold leading-none tracking-[-0.03em] text-white lg:text-[40px]">
              BrandUpMe
            </span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(1.6rem,5.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white lg:mt-10">
            Smart choices.{" "}
            <span className="text-brand-400">Global impact.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[11px] uppercase tracking-[0.2em] text-deep-muted sm:text-[13px] sm:tracking-[0.24em]">
            AI driven solutions for a connected future
          </p>

          <span
            aria-hidden
            className="mx-auto mt-5 block h-px w-32 bg-gradient-to-r from-transparent via-gold-500/70 to-transparent lg:mt-7"
          />
        </header>

        <div className="mt-6 grid w-full max-w-[1180px] grid-cols-2 gap-3 sm:gap-5 lg:mt-11 lg:gap-8">
          {COUNTRIES.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              aria-label={`Continue to BrandUpMe ${c.name}`}
              /* Panel matches the artwork's own background so the fade at the
                 image edge is seamless. */
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10
                bg-[#011C03] transition-all duration-[320ms] ease-brand
                hover:-translate-y-1.5 hover:border-brand-500/45
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2
                focus-visible:ring-offset-[#01200A] sm:rounded-3xl"
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full
                  blur-3xl opacity-0 transition-opacity duration-[320ms] group-hover:opacity-100 ${c.glow}`}
              />

              <Image
                src={c.art}
                alt={c.alt}
                width={627}
                height={985}
                priority
                sizes="(min-width: 1180px) 560px, 47vw"
                className="relative w-full transition-transform duration-[520ms] ease-brand group-hover:scale-[1.03]"
              />

              {/* Pulled up over the artwork's faded edge so the two meet. */}
              <div className="relative -mt-8 px-3 pb-5 text-center sm:-mt-14 sm:px-6 sm:pb-7 lg:px-7 lg:pb-8">
                <p className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-white sm:text-[26px] lg:text-[32px]">
                  <span className="mr-1.5 align-middle text-[16px] sm:mr-2 sm:text-[22px] lg:text-[27px]">
                    {c.flag}
                  </span>
                  {c.name}
                </p>
                <p className="mx-auto mt-2.5 hidden max-w-[17rem] text-[13px] leading-[1.6] text-deep-muted sm:block">
                  {c.blurb}
                </p>

                <span
                  className={`mt-3.5 inline-flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-r px-4
                    text-[12.5px] font-bold text-deep shadow-e2 transition-transform duration-[240ms]
                    ease-brand group-hover:scale-[1.04] sm:mt-5 sm:h-12 sm:gap-2 sm:px-7 sm:text-[14.5px]
                    ${c.accent}`}
                >
                  {/* Full label needs room the phone layout does not have. */}
                  <span className="sm:hidden">Continue</span>
                  <span className="hidden sm:inline">Continue to {c.name}</span>
                  <ArrowRight
                    className="size-3.5 transition-transform duration-[240ms] ease-brand group-hover:translate-x-1 sm:size-4"
                    strokeWidth={2.75}
                    aria-hidden
                  />
                </span>

                <p className="mt-3.5 hidden text-[10.5px] uppercase tracking-[0.2em] text-deep-soft/70 sm:block">
                  Discover · Connect · Grow
                </p>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-6 text-center lg:mt-12">
          <p className="text-[10.5px] uppercase tracking-[0.24em] text-deep-muted sm:text-[12px] sm:tracking-[0.26em]">
            One vision. Two destinations.
          </p>
          <p className="mt-1.5 font-serif text-[22px] italic text-brand-400 sm:text-[26px]">
            Limitless possibilities.
          </p>
        </footer>
      </div>
    </main>
  );
}
