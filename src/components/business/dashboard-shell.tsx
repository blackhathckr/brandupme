"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, Search } from "lucide-react";
import { dashboardNav, businessProfile } from "@/lib/dashboard-data";

function isActive(pathname: string, href: string) {
  if (href === "#") return false;
  const base = href.split("#")[0];
  if (base === "/dashboard") return pathname === "/dashboard";
  return pathname === base || pathname.startsWith(base + "/");
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-[#04170A]">
      <div className="flex h-[68px] shrink-0 items-center gap-2.5 px-5">
        <Image src="/brand/mark-192.png" alt="" width={34} height={34} className="size-[34px] object-contain" />
        <span className="leading-tight">
          <span className="block text-[15px] font-extrabold text-white">BrandUpMe</span>
          <span className="block text-[9px] font-semibold tracking-[0.1em] text-[#E6C86C]">
            CONNECT | GROW | SUCCEED
          </span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {dashboardNav.map((group, i) => (
          <div key={i} className={i === 0 ? "" : "mt-5"}>
            {group.label && (
              <p className="px-2.5 pb-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-white/35">
                {group.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className={
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-colors " +
                      (active ? "bg-[#3E8130] text-white" : "text-white/70 hover:bg-white/[0.06] hover:text-white")
                    }
                  >
                    {Icon && <Icon className="h-[17px] w-[17px] shrink-0" strokeWidth={1.8} />}
                    <span className="flex-1 leading-tight">{item.label}</span>
                    {typeof item.badge === "number" && (
                      <span
                        className={
                          "rounded-full px-1.5 py-0.5 text-[10.5px] font-bold leading-none " +
                          (active ? "bg-white text-[#194C11]" : "bg-white/10 text-white/80")
                        }
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-[13.5px] font-semibold text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <LogOut className="h-[17px] w-[17px]" strokeWidth={1.8} />
          Logout
        </Link>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9F6]">
      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[236px] lg:block">
        <SidebarContent />
      </aside>

      {/* mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[240px]">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-[236px]">
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-4 border-b border-[#E5EAE3] bg-white px-4 sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#0B1F13] lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#5F7168] hover:bg-[#F4F9F1] lg:flex">
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden shrink-0 leading-tight sm:block">
            <p className="flex items-center gap-1.5 text-[16px] font-bold text-[#0B1F13]">
              {businessProfile.greeting}
              <span aria-hidden>👋</span>
            </p>
            <p className="text-[12px] text-[#5F7168]">{businessProfile.subtitle}</p>
          </div>

          <div className="relative ml-auto hidden max-w-[360px] flex-1 md:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
            <input
              type="text"
              placeholder="Search anything..."
              className="h-10 w-full rounded-full border border-[#E5EAE3] bg-[#F7F9F6] pl-10 pr-4 text-[13px] text-[#0B1F13] outline-none placeholder:text-[#5F7168]/70 focus:border-[#3E8130]"
            />
          </div>

          <button className="relative ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#0B1F13] hover:bg-[#F4F9F1] md:ml-0">
            <Bell className="h-5 w-5" />
            {businessProfile.notifications > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D51F1F] text-[9px] font-bold text-white">
                {businessProfile.notifications}
              </span>
            )}
          </button>

          <button className="flex shrink-0 items-center gap-2">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <Image src={businessProfile.avatar} alt="" fill sizes="36px" className="object-cover" />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white bg-[#3E8130]" />
            </span>
            <span className="hidden leading-tight text-left sm:block">
              <span className="block text-[13px] font-semibold text-[#0B1F13]">{businessProfile.name}</span>
              <span className="block text-[11px] text-[#5F7168]">{businessProfile.role}</span>
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-[#5F7168] sm:block" />
          </button>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
