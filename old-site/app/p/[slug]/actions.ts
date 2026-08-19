"use server";

import { headers } from "next/headers";
import { enquirySchema, createLead } from "@/lib/leads/create";
import { getProfileByPassport } from "@/lib/directory/profile";

/**
 * Enquiry submission.
 *
 * The business id comes from the passport slug looked up server-side, never
 * from a hidden form field. A posted id would let anyone attach a lead to any
 * business, or enumerate ids by watching which ones succeed.
 */

export type EnquiryState = {
  ok: boolean;
  reference?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const slug = String(formData.get("passportSlug") ?? "");
  if (!slug) {
    return { ok: false, error: "Something went wrong. Please refresh and try again." };
  }

  const profile = await getProfileByPassport(slug);
  if (!profile) return { ok: false, error: "This business is no longer available." };

  const parsed = enquirySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    message: formData.get("message") ?? "",
    budget: formData.get("budget") ?? "",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors };
  }

  const h = await headers();
  const result = await createLead({
    businessId: profile.id,
    categoryId: profile.categories[0]?.id ?? null,
    locationId: profile.locations[0]?.id ?? null,
    countryCode: "ae",
    input: parsed.data,
    source: "card",
    ip: h.get("cf-connecting-ip") ?? h.get("x-forwarded-for"),
    userAgent: h.get("user-agent"),
  });

  return result.ok
    ? { ok: true, reference: result.reference }
    : { ok: false, error: result.error };
}
