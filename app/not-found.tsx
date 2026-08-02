import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getRegion, whatsappLink } from "@/lib/content";

const r = getRegion("IN");

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-deep px-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="deep-grid absolute inset-0 opacity-60" />
        <div className="absolute -top-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
      </div>

      <div className="relative">
        <Image
          src="/brand/mark-192.png"
          alt=""
          width={72}
          height={72}
          priority
          aria-hidden
          className="mx-auto size-16 object-contain"
        />

        <p className="mt-8 font-display text-[clamp(3.5rem,12vw,6rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-400">
          404
        </p>

        <h1 className="mt-4 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-bold tracking-[-0.03em] text-white">
          This page went looking for leads.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-[1.7] text-deep-muted">
          We could not find what you were after. The page may have moved, or the
          link may be out of date.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-full bg-brand-600 px-7 font-semibold text-white shadow-glow-green transition-all hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Back to home
          </Link>
          <a
            href={whatsappLink(r)}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-deep-line bg-white/5 px-7 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle className="size-4" strokeWidth={2} aria-hidden />
            Let&rsquo;s Talk
          </a>
        </div>

        <p className="mt-8 text-[13px] text-deep-muted">
          Or call {r.phoneDisplay}
        </p>
      </div>
    </div>
  );
}
