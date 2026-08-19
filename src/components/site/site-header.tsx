"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const isActive = (href: string) => {
    const path = href.split("#")[0] || "/";
    if (path === "/") return pathname === "/";
    // match on the top-level section (e.g. "/categories") so any sub-route
    // (main, browse, search, request) keeps the nav item highlighted
    const section = "/" + path.split("/")[1];
    return pathname === path || pathname?.startsWith(section + "/");
  };

  return (
    <header
      className={
        "sticky top-0 z-50 w-full border-b transition-colors duration-300 " +
        (scrolled
          ? "border-white/10 bg-[#020F08]/95 backdrop-blur-xl"
          : "border-white/5 bg-[#020F08]")
      }
    >
      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between gap-6 px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/brand/mark-192.png" alt="" width={36} height={36} priority className="size-8 object-contain" />
          <span className="flex flex-col leading-none">
            <span className="text-[19px] font-extrabold tracking-[-0.01em] text-white">BrandUpMe</span>
            <span className="mt-1 text-[9.5px] font-medium uppercase tracking-[0.14em] text-[#7FA88F]">
              Connect | Grow | Succeed
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                "flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors " +
                (isActive(link.href) ? "text-[#E6C86C]" : "text-white/70 hover:text-white")
              }
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <Link href="/login" className="text-[13.5px] font-medium text-white/70 transition-colors hover:text-white">
            Login
          </Link>
          <Link
            href="/join-ecosystem"
            className="rounded-full border border-[#E6C86C]/50 px-5 py-2.5 text-[13.5px] font-semibold text-[#E6C86C] transition-colors hover:bg-[#E6C86C]/10"
          >
            Join Ecosystem
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white xl:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] flex flex-col gap-7 bg-[#020F08] px-6 py-7 xl:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <Image src="/brand/mark-192.png" alt="" width={32} height={32} className="size-8 object-contain" />
                <span className="text-lg font-extrabold text-white">BrandUpMe</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full bg-white/10 p-2 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    "border-b border-white/10 py-3 text-base font-semibold " +
                    (isActive(link.href) ? "text-[#E6C86C]" : "text-white")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2.5">
              <Link href="/login" className="rounded-full border border-white/15 py-3 text-center text-sm font-semibold text-white">
                Login
              </Link>
              <Link href="/join-ecosystem" className="rounded-full border border-[#E6C86C]/50 py-3 text-center text-sm font-semibold text-[#E6C86C]">
                Join Ecosystem
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
