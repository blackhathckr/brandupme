"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, MessageCircle } from "lucide-react";
import {
  NAV_BY_REGION,
  whatsappLink,
  type RegionContent,
  type Region,
} from "@/lib/content";
import { RegionToggle } from "./region-toggle";
import { ServicesMenu } from "./services-menu";
import { SERVICE_PAGES } from "@/lib/services-in";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/**
 * Sits over the dark hero, so it starts transparent with white links and
 * swaps to a solid white bar once scrolled past. shadcn Sheet handles the
 * mobile drawer - focus trap, inert background and focus restore included.
 */
export function SiteNav({ r, region }: { r: RegionContent; region: Region }) {
  const nav = NAV_BY_REGION[region];
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_BY_REGION[region]
      .filter((n) => n.href.includes("#"))
      .map((n) => document.querySelector("#" + n.href.split("#")[1]))
      .filter(
      Boolean,
    ) as Element[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [region]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        stuck
          ? "border-b border-line bg-white/95 shadow-e1 backdrop-blur-xl"
          : "border-b border-white/10 bg-transparent",
      )}
    >
      <div className="container-page flex h-[72px] items-center gap-4">
        <Link
          href={r.path}
          className="flex shrink-0 items-center gap-2"
          aria-label="BrandUpMe home"
        >
          <Image
            src="/brand/mark-192.png"
            alt=""
            width={38}
            height={38}
            priority
            className="size-9 object-contain"
          />
          <span
            className={cn(
              "font-display text-[19px] font-bold leading-none tracking-[-0.03em] transition-colors",
              stuck ? "text-ink" : "text-white",
            )}
          >
            BrandUpMe
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 xl:flex">
          {nav.map((item) => {
            const on = active === item.href;

            // India has service detail pages, so Services becomes a dropdown.
            // The UAE has none, so it stays a plain jump link.
            if (item.label === "Services" && region === "IN") {
              return (
                <ServicesMenu key={item.href} stuck={stuck} active={on} />
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 text-[14px] font-medium transition-colors",
                  stuck
                    ? on
                      ? "text-green-text"
                      : "text-ink-2 hover:text-green-text"
                    : on
                      ? "text-white"
                      : "text-white/75 hover:text-white",
                )}
              >
                {item.label}
                {on && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 xl:ml-0">
          <RegionToggle
            current={region}
            onDark={!stuck}
            className="hidden md:inline-flex"
          />

          <a
            href={whatsappLink(r)}
            target="_blank"
            rel="noopener"
            className={cn(
              "hidden h-10 items-center gap-2 rounded-full border px-5 text-[13.5px] font-semibold",
              "transition-all duration-[240ms] ease-brand hover:-translate-y-0.5 lg:inline-flex",
              stuck
                ? "border-brand-600 bg-brand-600 text-white hover:bg-brand-700"
                : "border-brand-400/60 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
            )}
          >
            <MessageCircle className="size-4" strokeWidth={2} aria-hidden />
            Let&rsquo;s Talk
          </a>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                "flex size-10 items-center justify-center rounded-full border transition-colors xl:hidden",
                stuck
                  ? "border-line bg-white text-ink"
                  : "border-white/25 bg-white/10 text-white backdrop-blur-sm",
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-full flex-col gap-7 border-deep-line bg-deep px-6 py-6 sm:max-w-sm"
            >
              <SheetTitle className="flex items-center gap-2">
                <Image
                  src="/brand/mark-192.png"
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 object-contain"
                />
                <span className="font-display text-[19px] font-bold tracking-[-0.03em] text-white">
                  BrandUpMe
                </span>
              </SheetTitle>

              <RegionToggle current={region} onDark className="self-start" />

              <nav className="flex flex-col">
                {nav.map((item) => (
                  <div key={item.href}>
                    <SheetClose
                      render={
                        <Link
                          href={item.href}
                          className="block border-b border-deep-line py-3.5 font-display text-lg font-semibold tracking-[-0.02em] text-white"
                        >
                          {item.label}
                        </Link>
                      }
                    />

                    {/* Service pages nested under Services, so the drawer is
                        not a dead end on the one section that has children. */}
                    {item.label === "Services" && region === "IN" && (
                      <ul className="border-b border-deep-line py-1">
                        {SERVICE_PAGES.map((sp) => (
                          <li key={sp.slug}>
                            <SheetClose
                              render={
                                <Link
                                  href={`/services/${sp.slug}/`}
                                  className="block py-2 pl-4 text-[14px] text-deep-muted"
                                >
                                  {sp.nav}
                                </Link>
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={whatsappLink(r)}
                  target="_blank"
                  rel="noopener"
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-600 font-semibold text-white"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  Let&rsquo;s Talk
                </a>
                <a
                  href={`tel:${r.phone}`}
                  className="flex h-12 items-center justify-center rounded-full border border-deep-line font-semibold text-white"
                >
                  {r.phoneDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
