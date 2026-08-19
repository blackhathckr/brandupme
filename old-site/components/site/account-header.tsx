"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, MapPin, Search } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Plans & Pricing", href: "/plans" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

/**
 * The signed-in header from the onboarding mockup: logo on the left spanning
 * both rows, search + account meta on row one, nav + the two wizard actions on
 * row two.
 *
 * `actions` lets each screen supply its own right-hand buttons — the wizard
 * shows Save & Exit / Go to Dashboard, the dashboard will show something else.
 */
export function AccountHeader({
  user = { initials: "KS", name: "Kumar Sheth", role: "Business Owner" },
  notifications = 3,
  actions,
}: {
  user?: { initials: string; name: string; role: string };
  notifications?: number;
  actions?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <header className="border-b border-rule bg-white">
      <div className="container-portal flex gap-8 py-3">
        <BrandLogo withMark href="/dashboard" className="shrink-0 self-start pt-1" />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* Row one — search and account meta */}
          <div className="flex items-center gap-5">
            <div className="hidden min-w-0 flex-1 items-center rounded-lg border border-rule bg-white shadow-p1 xl:flex">
              <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3.5">
                <Search className="size-4 shrink-0 text-slate-4" aria-hidden />
                <input
                  type="search"
                  placeholder="Search businesses, categories or services..."
                  className="h-10 w-full min-w-0 bg-transparent text-sm text-slate-ink outline-none placeholder:text-slate-4"
                />
              </div>
              <div className="flex h-10 items-center gap-2 border-l border-rule px-3.5 text-sm text-slate-2">
                <MapPin className="size-4 text-slate-4" aria-hidden />
                All Categories
                <ChevronDown className="size-4 text-slate-4" aria-hidden />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-5">
              <span className="hidden items-center gap-1.5 text-sm text-slate-2 xl:flex">
                <MapPin className="size-4 text-slate-4" aria-hidden />
                Dubai, UAE
              </span>

              <button
                type="button"
                className="relative grid size-9 place-items-center rounded-lg text-slate-2 transition-colors hover:bg-paper"
                aria-label={`${notifications} notifications`}
              >
                <Bell className="size-5" aria-hidden />
                {notifications > 0 ? (
                  <span className="absolute -top-0.5 right-0 grid size-4 place-items-center rounded-full bg-alert text-[10px] font-bold text-white">
                    {notifications}
                  </span>
                ) : null}
              </button>

              <button
                type="button"
                className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-paper"
              >
                <span className="grid size-9 place-items-center rounded-full bg-iris-600 text-[13px] font-bold text-white">
                  {user.initials}
                </span>
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block text-sm font-semibold text-slate-ink">
                    {user.name}
                  </span>
                  <span className="block text-xs text-slate-3">{user.role}</span>
                </span>
                <ChevronDown className="size-4 text-slate-4" aria-hidden />
              </button>
            </div>
          </div>

          {/* Row two — navigation and screen actions */}
          <div className="flex items-center gap-8">
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
                      "text-[14.5px] font-medium transition-colors",
                      active ? "text-iris-600" : "text-slate-2 hover:text-iris-600",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            {actions ? (
              <div className="ml-auto flex items-center gap-3">{actions}</div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
