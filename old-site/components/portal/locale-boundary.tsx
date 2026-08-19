import { dirFor, resolveLocale } from "@/lib/i18n";

/**
 * Applies the visitor's language and text direction to a subtree.
 *
 * Arabic is right-to-left, and `dir` is what makes CSS logical properties -
 * the ms-/me-/ps-/pe- utilities used throughout the portal - flip. Setting it
 * on a wrapper rather than on <html> keeps the root layout static, so the
 * marketing pages stay prerendered while the portal, which is server-rendered
 * anyway, gets the direction it needs.
 *
 * The earlier attempt at this was an inline script in the document head. React
 * does not execute script tags rendered from a component, so it silently did
 * nothing - this replaces it and needs no client JavaScript at all.
 */
export async function LocaleBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await resolveLocale();
  const dir = dirFor(locale);

  // A plain wrapper: no styles of its own, so it cannot affect layout beyond
  // the direction it exists to set.
  return (
    <div lang={locale} dir={dir}>
      {children}
    </div>
  );
}
