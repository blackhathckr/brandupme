import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { getRegion } from "@/lib/content";

const r = getRegion("IN");

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BrandUpMe collects, uses and protects the information you provide through the Business Partnership Program.",
  // Draft, not for publication. See LEGAL_PAGES_PUBLISHED in lib/content.ts
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 August 2026"
      intro="This policy explains what information BrandUpMe collects when you register for the Business Partnership Program or contact us, how we use it, and the choices you have. We collect only what we need to assess your business and deliver the service."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you complete the registration form we collect your business name, contact person, mobile number, WhatsApp number, email address, website, industry, city, the products or services you sell, your average order value, commission preference and any description you provide.",
            "If you contact us by phone, email or WhatsApp, we keep a record of that correspondence so we can respond and maintain continuity of service.",
            "We collect basic technical information automatically, such as pages visited and approximate location derived from your IP address, in order to understand how the site is used. [TO BE CONFIRMED] - the specific analytics provider will be listed here once configured.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "To assess whether your business is a fit for the Business Partnership Program, and to contact you about your enquiry.",
            "To deliver the service: your assigned representative uses your business information to represent you accurately to prospective customers.",
            "To send you service-related communications about your partnership. We do not sell your information, and we do not send marketing unrelated to the service you enquired about.",
          ],
        },
        {
          heading: "Information about your customers",
          body: [
            "In the course of providing the service we handle contact information for prospects and customers approached on your behalf. That information is processed solely to deliver business development activity for you, and is not shared with, or reused for, any other partner.",
          ],
        },
        {
          heading: "Sharing and disclosure",
          body: [
            "We do not sell personal information. We share it only with service providers who help us operate the business, such as hosting and communication platforms, and only to the extent needed to perform their function.",
            "We may disclose information where required by applicable law of the United Arab Emirates, or to establish or defend a legal claim.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "We keep registration and correspondence records for as long as your partnership is active, and afterwards for the period required to meet legal and accounting obligations. [TO BE CONFIRMED] - the exact retention period will be stated here on legal advice.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You may request a copy of the information we hold about you, ask us to correct anything inaccurate, or ask us to delete it where we are not required to keep it. Write to us at the address below and we will respond within a reasonable period.",
          ],
        },
        {
          heading: "Data security",
          body: [
            "We apply reasonable technical and organisational measures to protect the information you give us. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            `We may update this policy from time to time. The date at the top of this page shows when it was last revised. Material changes will be communicated to active partners. Questions may be sent to ${r.email}.`,
          ],
        },
      ]}
    />
  );
}
