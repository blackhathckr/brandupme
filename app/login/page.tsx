import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/portal/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your BrandUpMe business account.",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-deep px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="deep-grid absolute inset-0 opacity-50" />
        <div className="absolute left-1/2 top-1/3 size-[620px] -translate-x-1/2 rounded-full bg-brand-600/18 blur-[140px]" />
      </div>

      <div className="relative w-full max-w-md">
        <Link href="/uae/" className="mx-auto flex w-fit items-center gap-2.5">
          <Image
            src="/brand/mark-192.png"
            alt=""
            width={192}
            height={192}
            className="size-9 object-contain"
          />
          <span className="font-display text-[22px] font-bold leading-none tracking-[-0.03em] text-white">
            BrandUpMe
          </span>
        </Link>

        <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-e3 lg:p-7">
          <h1 className="font-display text-[21px] font-bold tracking-[-0.03em] text-ink">
            Welcome back
          </h1>
          <p className="mt-1.5 text-[13.5px] text-ink-2">
            Sign in to manage your listing and enquiries.
          </p>

          <div className="mt-6">
            <LoginForm next={next} />
          </div>

          <p className="mt-6 border-t border-line pt-5 text-center text-[13px] text-ink-2">
            Don&rsquo;t have an account?{" "}
            <Link href="/uae/register/" className="font-semibold text-green-text">
              Register your business
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
