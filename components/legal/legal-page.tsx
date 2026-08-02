import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getRegion } from "@/lib/content";

const r = getRegion("IN");

export type LegalSection = { heading: string; body: string[] };

/**
 * Shared shell for Privacy / Terms / Refund.
 *
 * Every one of these carries a visible "pending legal review" notice. The
 * commercial specifics - refund window, cancellation notice, governing
 * jurisdiction - are the client's to state, and inventing them would be worse
 * than admitting they are outstanding.
 */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-line bg-surface">
        <div className="container-page flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/brand/mark-192.png"
              alt=""
              width={36}
              height={36}
              className="size-9 object-contain"
            />
            <span className="font-display text-[19px] font-bold tracking-[-0.03em] text-ink">
              Brand<span className="text-brand-600">Up</span>Me
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13.5px] font-semibold text-ink-2 transition-colors hover:bg-surface-2"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to site
          </Link>
        </div>
      </header>

      <main className="container-page py-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.04em] text-ink">
            {title}
          </h1>
          <p className="mt-3 text-[13.5px] text-muted-foreground">
            Last updated {updated}
          </p>

          <div className="mt-6 rounded-xl border border-gold-300 bg-gold-50 px-5 py-4">
            <p className="text-[13.5px] leading-relaxed text-ink-2">
              <strong className="font-semibold">Pending legal review.</strong>{" "}
              This document is a working draft prepared for BrandUpMe&rsquo;s
              legal adviser. Sections marked{" "}
              <span className="font-semibold text-brand-600">
                [TO BE CONFIRMED]
              </span>{" "}
              require the client&rsquo;s instruction before publication.
            </p>
          </div>

          <p className="mt-8 text-[16px] leading-[1.75] text-ink-2">{intro}</p>

          <div className="mt-10 flex flex-col gap-9">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-ink">
                  {s.heading}
                </h2>
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="mt-3 text-[15.5px] leading-[1.75] text-ink-2"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
              Questions about this policy
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">
              Contact us at{" "}
              <a
                href={`mailto:${r.email}`}
                className="font-medium text-brand-600 underline"
              >
                {r.email}
              </a>{" "}
              or {r.phoneDisplay}, {r.address}.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
