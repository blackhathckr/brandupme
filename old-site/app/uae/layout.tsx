import { LocaleBoundary } from "@/components/portal/locale-boundary";

/**
 * Applies language and direction across the UAE directory.
 *
 * Reading the locale cookie makes these routes render per request. Every page
 * under /uae/ already does, except the partner-programme marketing page, which
 * gives up static prerendering here - an acceptable trade for one page to keep
 * the whole section consistent rather than sprinkling wrappers per route.
 */
export default function UaeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleBoundary>{children}</LocaleBoundary>;
}
