import { LocaleBoundary } from "@/components/portal/locale-boundary";

/**
 * Language and direction for Digital Business Cards.
 *
 * These are the most-shared URLs in the portal - pasted into WhatsApp, printed
 * as QR codes - and are opened by customers rather than staff, so they are the
 * pages most likely to be read in Arabic.
 */
export default function PassportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleBoundary>{children}</LocaleBoundary>;
}
