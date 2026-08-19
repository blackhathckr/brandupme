"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogIn, Plus } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories", caret: true },
  { label: "Plans & Pricing", href: "/plans" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

/** The signed-out header used on every public page and on Create Account. */
export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-white">
      <div className="container-portal flex h-[74px] items-center justify-between gap-6">
        <BrandLogo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-1 py-6 text-[15px] font-medium transition-colors",
                  active
                    ? "text-iris-600"
                    : "text-slate-2 hover:text-iris-600",
                )}
              >
                {item.label}
                {item.caret ? (
                  <ChevronDown className="size-4 opacity-70" aria-hidden />
                ) : null}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-iris-600"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden h-11 items-center gap-2 rounded-lg border border-iris-200 px-5 text-[15px] font-semibold text-iris-700 transition-colors hover:bg-iris-50 sm:inline-flex"
          >
            <LogIn className="size-4" aria-hidden />
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-iris-600 px-5 text-[15px] font-semibold text-white shadow-iris transition-colors hover:bg-iris-700"
          >
            Register Your Business
            <Plus className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
