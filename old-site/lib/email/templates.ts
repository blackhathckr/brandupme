import type { EmailMessage } from "./index";

/**
 * Email bodies.
 *
 * Plain, brand-coloured HTML with a text alternative on every message. No
 * external CSS or images: mail clients strip stylesheets and block remote
 * images by default, so anything that depends on them arrives broken.
 *
 * The client said to assume a typical welcome email, so the wording here is a
 * first draft for him to approve rather than final copy.
 */

const GREEN = "#0F2D1A";
const ACCENT = "#3E8130";

function shell(heading: string, body: string, cta?: { label: string; href: string }) {
  return `<div style="margin:0;padding:24px;background:#f4f6f4;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e4e8e4">
    <div style="background:${GREEN};padding:20px 28px">
      <span style="color:#ffffff;font-size:19px;font-weight:700;letter-spacing:-0.4px">BrandUpMe</span>
    </div>
    <div style="padding:28px">
      <h1 style="margin:0 0 14px;font-size:20px;line-height:1.3;color:#14201a">${heading}</h1>
      <div style="font-size:14.5px;line-height:1.7;color:#40514a">${body}</div>
      ${
        cta
          ? `<a href="${cta.href}" style="display:inline-block;margin-top:22px;background:${ACCENT};color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-size:14px;font-weight:700">${cta.label}</a>`
          : ""
      }
    </div>
    <div style="padding:16px 28px;border-top:1px solid #eef1ee;font-size:11.5px;color:#8a968f">
      BrandUpMe UAE &middot; This message was sent because you contacted a business on brandupme.ae
    </div>
  </div>
</div>`;
}

/** Sent to the customer the moment their enquiry is stored. */
export function customerWelcome(args: {
  to: string;
  customerName: string;
  businessName?: string | null;
  reference: string;
}): EmailMessage {
  const where = args.businessName ? ` to <strong>${args.businessName}</strong>` : "";
  return {
    to: args.to,
    subject: `We received your enquiry (${args.reference})`,
    html: shell(
      `Thank you, ${args.customerName}`,
      `<p style="margin:0 0 12px">We have received your enquiry${where} and passed it on.</p>
       <p style="margin:0 0 12px">Your reference is <strong>${args.reference}</strong>. Please quote it if you contact us about this enquiry.</p>
       <p style="margin:0">The business will normally respond within one working day.</p>`,
      { label: "Browse more businesses", href: "https://brandupme.ae/uae/" },
    ),
    text: `Thank you, ${args.customerName}.

We have received your enquiry${args.businessName ? ` to ${args.businessName}` : ""} and passed it on.

Your reference is ${args.reference}. Please quote it if you contact us about this enquiry.

The business will normally respond within one working day.

BrandUpMe UAE - https://brandupme.ae`,
  };
}

/** Sent to the business when a lead arrives. Never contains the customer's
    contact details - those are gated by plan and belong behind a login. */
export function businessNewLead(args: {
  to: string;
  businessName: string;
  reference: string;
  locked: boolean;
}): EmailMessage {
  const line = args.locked
    ? "Sign in to see the enquiry. Upgrading your plan reveals the customer's contact details."
    : "Sign in to see the full enquiry and the customer's contact details.";

  return {
    to: args.to,
    subject: `New enquiry for ${args.businessName} (${args.reference})`,
    html: shell(
      "You have a new enquiry",
      `<p style="margin:0 0 12px">A customer has submitted an enquiry to <strong>${args.businessName}</strong> through BrandUpMe.</p>
       <p style="margin:0 0 12px">Reference <strong>${args.reference}</strong>.</p>
       <p style="margin:0">${line}</p>`,
      { label: "Open your dashboard", href: "https://brandupme.ae/dashboard/leads/" },
    ),
    text: `You have a new enquiry.

A customer has submitted an enquiry to ${args.businessName} through BrandUpMe.
Reference ${args.reference}.

${line}

https://brandupme.ae/dashboard/leads/`,
  };
}

/** Sent to a business owner after an admin creates their listing. */
export function claimListing(args: {
  to: string;
  businessName: string;
  claimUrl: string;
}): EmailMessage {
  return {
    to: args.to,
    subject: `Claim your BrandUpMe listing for ${args.businessName}`,
    html: shell(
      `${args.businessName} is listed on BrandUpMe`,
      `<p style="margin:0 0 12px">We have created a listing for your business on the BrandUpMe UAE business portal.</p>
       <p style="margin:0">Claim it to edit your details, add photos and see the enquiries customers send you.</p>`,
      { label: "Claim your listing", href: args.claimUrl },
    ),
    text: `${args.businessName} is listed on BrandUpMe.

We have created a listing for your business on the BrandUpMe UAE business portal.
Claim it to edit your details, add photos and see the enquiries customers send you.

${args.claimUrl}`,
  };
}
