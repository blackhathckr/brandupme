import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { resolveLocale, translator } from "@/lib/i18n";
import { LocaleSwitcher } from "./locale-switcher";

/**
 * Directory header.
 *
 * Deliberately separate from the marketing site's SiteNav: the portal is an
 * application, not a landing page. It needs a persistent search box and a
 * signed-in state, and it should not inherit the marketing nav's scroll-driven
 * transparency, which is wrong over dense listing pages.
 */
export async function PortalNav({
  action = "/uae/search/",
  query = "",
}: {
  action?: string;
  query?: string;
}) {
  const locale = await resolveLocale();
  const tr = translator(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center gap-4">
        <Link href="/uae/" className="flex shrink-0 items-center gap-2.5" aria-label="BrandUpMe UAE">
          <Image
            src="/brand/mark-192.png"
            alt=""
            width={192}
            height={192}
            className="size-8 object-contain"
          />
          <span className="font-display text-[17px] font-bold leading-none tracking-[-0.03em] text-ink">
            BrandUpMe
            <span className="ms-1.5 align-middle text-[10px] font-semibold uppercase tracking-[0.16em] text-green-text">
              UAE
            </span>
          </span>
        </Link>

        <form action={action} className="relative ms-auto hidden max-w-lg flex-1 md:block">
          <label htmlFor="portal-search" className="sr-only">
            {tr("search.placeholder")}
          </label>
          <Search
            className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-3"
            strokeWidth={2}
            aria-hidden
          />
          <input
            id="portal-search"
            name="q"
            defaultValue={query}
            placeholder={tr("search.placeholder")}
            className="h-10 w-full rounded-full border border-line bg-surface-2 ps-10 pe-4 text-[13.5px]
              text-ink outline-none transition-colors placeholder:text-ink-3
              focus-visible:border-brand-400 focus-visible:bg-white"
          />
        </form>

        <nav className="ms-auto flex items-center gap-1.5 md:ms-0">
          <div className="hidden lg:block">
            <LocaleSwitcher current={locale} />
          </div>
          <Link
            href="/uae/categories/"
            className="hidden rounded-full px-3.5 py-2 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-green-text lg:block"
          >
            {tr("nav.categories")}
          </Link>
          <Link
            href="/uae/partner-programme/"
            className="hidden rounded-full px-3.5 py-2 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-green-text xl:block"
          >
            {tr("nav.partner")}
          </Link>
          <Link
            href="/login/"
            className="hidden rounded-full px-3.5 py-2 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-green-text sm:block"
          >
            {tr("nav.signIn")}
          </Link>
          <Link
            href="/uae/register/"
            className="inline-flex h-9 items-center rounded-full bg-brand-600 px-4 text-[13px] font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {tr("nav.listBusiness")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
