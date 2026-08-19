import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "How refunds and cancellations work for the BrandUpMe Business Partnership Program.",
  // Draft, not for publication. See LEGAL_PAGES_PUBLISHED in lib/content.ts
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="1 August 2026"
      intro="This policy explains how the monthly partnership fee is treated on cancellation. Because the fee pays for work performed by a person rather than access to a product, refunds are handled on the basis of activity already carried out."
      sections={[
        {
          heading: "What the fee pays for",
          body: [
            "The AED 500 monthly partnership fee covers business development activity performed by your assigned representative during that month: research, calls, messages, emails, qualification and follow-up. Once that work has been carried out, it cannot be returned.",
          ],
        },
        {
          heading: "Cancellation",
          body: [
            "The programme runs month to month. You may choose not to renew for the following month.",
            "[TO BE CONFIRMED] - the notice period required, and whether cancellation takes effect immediately or at the end of the paid month.",
          ],
        },
        {
          heading: "Refund eligibility",
          body: [
            "[TO BE CONFIRMED] - whether a refund is available if cancellation is requested before outreach begins, and if so within what window. This is the single most important item on this page and must be confirmed by the client before publication.",
            "Where a payment has been taken in error, or duplicated, the amount is refunded in full.",
          ],
        },
        {
          heading: "Commission",
          body: [
            "Commission already earned on completed business is not refundable. [TO BE CONFIRMED] - treatment of opportunities introduced during the partnership that complete after it ends.",
          ],
        },
        {
          heading: "How to request a refund",
          body: [
            "Email us with your business name, the payment reference and the reason for the request. We will acknowledge within two business days. [TO BE CONFIRMED] - the processing time and the method by which approved refunds are returned.",
          ],
        },
        {
          heading: "Service concerns",
          body: [
            "If you are not satisfied with the activity being carried out, contact us before cancelling. In most cases a change of approach, target market or messaging resolves the issue faster than ending the partnership.",
          ],
        },
      ]}
    />
  );
}
