"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { NAV, CONFIG } from "@/lib/content";
import { Button } from "@/components/ui/brand-button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/**
 * The mobile drawer is shadcn/Base UI Sheet rather than a hand-rolled panel.
 *
 * The version this replaces had scroll-lock and Escape handling but no focus
 * trap - tab walked straight out of the open menu into the page behind it,
 * which is a genuine accessibility failure. Sheet handles the trap, the inert
 * background, focus restore on close and the aria wiring.
 */
export function SiteNav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        stuck
          ? "border-b border-line bg-canvas/85 shadow-e1 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-20 items-center gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="BrandUpMe home"
        >
          <Image
            src="/brand/mark-192.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 object-contain"
          />
          <span className="font-display text-[21px] font-bold tracking-[-0.03em] text-ink">
            Brand<span className="text-brand-600">Up</span>Me
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14.5px] font-medium text-ink-2 transition-colors hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Button href="#register" size="sm" className="hidden sm:inline-flex">
            Become a partner
          </Button>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-full flex-col gap-8 border-line bg-canvas px-6 py-6 sm:max-w-sm"
            >
              <SheetTitle className="flex items-center gap-2.5">
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
              </SheetTitle>

              <nav className="flex flex-col">
                {NAV.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className="block border-b border-line py-4 font-display text-2xl font-semibold tracking-[-0.02em] text-ink"
                      >
                        {item.label}
                      </Link>
                    }
                  />
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <SheetClose
                  render={
                    <Link
                      href="#register"
                      className="flex h-14 items-center justify-center rounded-full bg-brand-600 font-semibold text-white shadow-glow-red"
                    >
                      Become a partner
                    </Link>
                  }
                />
                <a
                  href={`tel:${CONFIG.phone}`}
                  className="flex h-14 items-center justify-center rounded-full border border-line bg-surface font-semibold text-ink"
                >
                  Call {CONFIG.phoneDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
