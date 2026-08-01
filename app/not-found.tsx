import Link from "next/link";
import Image from "next/image";
import { CONFIG, WHATSAPP_LINK } from "@/lib/content";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <Image
        src="/mascot/wave.webp"
        alt=""
        width={604}
        height={700}
        priority
        aria-hidden
        className="w-40 select-none object-contain sm:w-48"
      />

      <p className="mt-8 font-display text-[clamp(3.5rem,12vw,6rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-600">
        404
      </p>

      <h1 className="mt-4 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-[-0.035em] text-ink">
        This page went looking for customers.
      </h1>

      <p className="mt-4 max-w-md text-[16px] leading-[1.7] text-ink-2">
        We could not find what you were after. The page may have moved, or the
        link may be out of date.
      </p>

      <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-full bg-brand-600 px-7 font-semibold text-white shadow-glow-red transition-all hover:-translate-y-0.5 hover:bg-brand-700"
        >
          Back to home
        </Link>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener"
          className="inline-flex h-12 items-center rounded-full border border-line bg-surface px-7 font-semibold text-ink transition-colors hover:bg-surface-2"
        >
          Talk to us
        </a>
      </div>

      <p className="mt-8 text-[13.5px] text-muted-foreground">
        Or call {CONFIG.phoneDisplay}
      </p>
    </div>
  );
}
