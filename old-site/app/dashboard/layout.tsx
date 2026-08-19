import Link from "next/link";
import Image from "next/image";
import { BarChart3, Building2, Inbox, LogOut } from "lucide-react";
import { requireUser } from "@/lib/auth/guard";
import { logout } from "@/lib/auth/actions";

/**
 * Business dashboard shell.
 *
 * The guard runs in the layout, so every page beneath it is protected by
 * construction rather than by each page remembering to check.
 */

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/dashboard/", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/leads/", label: "Enquiries", icon: Inbox },
  { href: "/dashboard/profile/", label: "Business profile", icon: Building2 },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser("/dashboard/");

  return (
    <div className="min-h-dvh bg-surface-2">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center gap-4">
          <Link href="/uae/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/brand/mark-192.png"
              alt=""
              width={192}
              height={192}
              className="size-8 object-contain"
            />
            <span className="font-display text-[16px] font-bold tracking-[-0.03em] text-ink">
              BrandUpMe
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px]
                  font-medium text-ink-2 transition-colors hover:bg-brand-50 hover:text-green-text"
              >
                <item.icon className="size-4" strokeWidth={2} aria-hidden />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-[13px] text-ink-2 sm:inline">{user.name}</span>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5
                  text-[12.5px] font-semibold text-ink-2 transition-colors hover:border-brand-300 hover:text-green-text"
              >
                <LogOut className="size-3.5" strokeWidth={2.5} aria-hidden />
                Sign out
              </button>
            </form>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="container-page flex gap-1 overflow-x-auto pb-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12.5px] font-medium text-ink-2"
            >
              <item.icon className="size-3.5" strokeWidth={2} aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="container-page py-8 lg:py-10">{children}</main>
    </div>
  );
}
