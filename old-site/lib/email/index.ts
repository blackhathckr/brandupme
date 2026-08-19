/**
 * Transactional email, behind a provider interface.
 *
 * No credentials exist yet, so the default adapter logs and returns success.
 * That is deliberate: registration and enquiry flows must work end to end
 * today, and swapping in a real sender must not mean touching every call site.
 *
 * To go live, set RESEND_API_KEY and EMAIL_FROM. Nothing else changes.
 * Resend's free tier covers 3,000 emails a month, which is far beyond what this
 * portal will send at launch. Cloudflare's own Email Sending is an alternative
 * but is still beta and requires the Workers Paid plan.
 */

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type EmailResult =
  | { sent: true; id: string }
  | { sent: false; reason: string };

interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<EmailResult>;
}

/**
 * Used until credentials are supplied. Records the attempt so the flow can be
 * tested and nothing silently disappears, but never pretends a real message
 * left the building - callers can see `provider: "noop"` in the result id.
 */
const noopProvider: EmailProvider = {
  name: "noop",
  async send(message) {
    console.info(
      `[email:noop] would send "${message.subject}" to ${message.to}`,
    );
    return { sent: true, id: `noop-${Date.now()}` };
  },
};

function resendProvider(apiKey: string, from: string): EmailProvider {
  return {
    name: "resend",
    async send(message) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: message.to,
          subject: message.subject,
          html: message.html,
          text: message.text,
          ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        }),
      });

      if (!res.ok) {
        // Never throw. A failed welcome email must not roll back a lead that
        // was already saved - the enquiry is worth more than the notification.
        return { sent: false, reason: `resend ${res.status}: ${await res.text()}` };
      }
      const body = (await res.json()) as { id?: string };
      return { sent: true, id: body.id ?? "unknown" };
    },
  };
}

export function getEmailProvider(env?: Record<string, string | undefined>): EmailProvider {
  const source = env ?? (process.env as Record<string, string | undefined>);
  const key = source.RESEND_API_KEY;
  const from = source.EMAIL_FROM ?? "BrandUpMe <noreply@brandupme.ae>";
  return key ? resendProvider(key, from) : noopProvider;
}

export async function sendEmail(
  message: EmailMessage,
  env?: Record<string, string | undefined>,
): Promise<EmailResult> {
  try {
    return await getEmailProvider(env).send(message);
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : String(err) };
  }
}
