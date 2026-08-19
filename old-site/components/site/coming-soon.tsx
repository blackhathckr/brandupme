import Link from "next/link";
import { ArrowLeft, Hammer } from "lucide-react";
import { PublicHeader } from "./public-header";
import { SiteFooter } from "./site-footer";
import { TopBar } from "./top-bar";

/**
 * Honest placeholder for screens scheduled in a later batch.
 *
 * Every nav target resolves to a real page so the client can click through the
 * whole site without hitting a 404 — the page says which batch it lands in
 * rather than pretending to be finished.
 */
export function ComingSoon({
  title,
  batch,
  detail,
}: {
  title: string;
  batch: string;
  detail?: string;
}) {
  return (
    <div className="min-h-dvh bg-white">
      <TopBar />
      <PublicHeader />

      <main className="container-portal grid place-items-center py-24 text-center">
        <span
          aria-hidden
          className="grid size-16 place-items-center rounded-full bg-iris-100 text-iris-600"
        >
          <Hammer className="size-8" />
        </span>

        <h1 className="mt-6 text-[30px] font-extrabold tracking-[-0.02em] text-slate-ink">
          {title}
        </h1>
        <p className="mt-2 max-w-md text-[15px] text-slate-3">
          {detail ?? "This screen has not shipped yet."} Scheduled for{" "}
          <span className="font-semibold text-iris-600">{batch}</span>.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg border border-rule bg-white px-6 text-[15px] font-semibold text-slate-2 transition-colors hover:bg-paper"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Home
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
