import Link from "next/link";
import { Building2, LayoutGrid, LogOut, Users } from "lucide-react";
import { requireStaff } from "@/lib/auth/guard";
import { logout } from "@/lib/auth/actions";

/**
 * Admin shell.
 *
 * Staff-only, guarded in the layout so every page beneath inherits it. Nav
 * items are filtered by permission, so a moderator does not see links they
 * cannot open - and the pages themselves re-check, because a hidden link is
 * presentation, not security.
 */

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin/", label: "Overview", icon: LayoutGrid, permission: null },
  { href: "/admin/businesses/", label: "Businesses", icon: Building2, permission: "business.view" },
  { href: "/admin/leads/", label: "Leads", icon: Users, permission: "lead.view" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireStaff("/admin/");
  const nav = NAV.filter((n) => !n.permission || user.permissions.has(n.permission));

  return (
    <div className="min-h-dvh bg-surface-2">
      <header className="border-b border-line bg-deep">
        <div className="container-page flex h-16 items-center gap-4">
          <Link href="/admin/" className="font-display text-[16px] font-bold tracking-[-0.03em] text-white">
            BrandUpMe
            <span className="ml-2 rounded-full bg-brand-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-300">
              Admin
            </span>
          </Link>

          <nav className="ml-6 flex items-center gap-1 overflow-x-auto">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px]
                  font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <item.icon className="size-4" strokeWidth={2} aria-hidden />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-[12.5px] text-deep-muted sm:inline">{user.name}</span>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/20 px-3.5
                  text-[12.5px] font-semibold text-white/80 transition-colors hover:border-brand-400 hover:text-white"
              >
                <LogOut className="size-3.5" strokeWidth={2.5} aria-hidden />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container-page py-8 lg:py-10">{children}</main>
    </div>
  );
}
