import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing the BrandUpMe Business Partnership Program, including fees, commission and cancellation.",
  // Draft, not for publication. See LEGAL_PAGES_PUBLISHED in lib/content.ts
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="1 August 2026"
      intro="These terms govern your participation in the BrandUpMe Business Partnership Program. By registering, you agree to them. Where a signed partnership agreement exists between you and BrandUpMe, that agreement takes precedence over anything stated here."
      sections={[
        {
          heading: "The service",
          body: [
            "BrandUpMe provides a dedicated remote sales representative who performs business development activity on your behalf. That activity includes prospect research, cold calling, WhatsApp and email outreach, lead qualification, appointment setting, follow-up and related support.",
            "BrandUpMe provides representation and business development effort. We do not guarantee any specific number of leads, meetings, sales or revenue, and no statement on this website should be read as such a guarantee.",
          ],
        },
        {
          heading: "Partnership fee",
          body: [
            "The monthly partnership fee is AED 500 unless otherwise agreed in writing. It covers the business development activity described above. It is not a licence for software or CRM access.",
            "The fee is payable monthly in advance. [TO BE CONFIRMED] - accepted payment methods, invoicing cycle and any late payment terms.",
          ],
        },
        {
          heading: "Commission",
          body: [
            "Commission is success-based and becomes payable only when business generated through BrandUpMe is successfully completed, at the rate and on the terms agreed with you in writing before the partnership begins.",
            "[TO BE CONFIRMED] - the definition of a completed sale, the point at which commission becomes payable, and the settlement period.",
          ],
        },
        {
          heading: "Your responsibilities",
          body: [
            "You agree to provide accurate information about your business, products, pricing and capacity, and to keep it current. Our representative can only represent your business correctly if the information we hold is correct.",
            "You are responsible for fulfilling any sale that results, including delivery, service, warranty and after-sales support. BrandUpMe is not party to the contract between you and your customer.",
            "You confirm that your business holds the licences and approvals required to trade in its market, and that the products or services we are asked to represent are lawful.",
          ],
        },
        {
          heading: "How we represent you",
          body: [
            "Your representative communicates as a representative of your business, using messaging you have approved. We will not make claims on your behalf that you have not agreed to.",
            "Outreach is carried out in a professional manner and in line with applicable communication regulations in the territories where we operate.",
          ],
        },
        {
          heading: "Confidentiality",
          body: [
            "Each party will keep the other's non-public business information confidential and use it only for the purpose of the partnership. This obligation continues after the partnership ends.",
          ],
        },
        {
          heading: "Term and cancellation",
          body: [
            "The programme operates on a monthly basis with no long-term lock-in.",
            "[TO BE CONFIRMED] - the notice period required to cancel, and whether commission remains payable on opportunities introduced before cancellation but completed afterwards. This is a commercially significant point and must be confirmed by the client.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the extent permitted by law, BrandUpMe's total liability arising out of the partnership is limited to the partnership fees paid by you in the three months preceding the event giving rise to the claim. We are not liable for indirect or consequential loss, including loss of profit or anticipated savings.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of the United Arab Emirates. [TO BE CONFIRMED] - the emirate and courts having jurisdiction.",
          ],
        },
      ]}
    />
  );
}
