"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { LOCALE_COOKIE, isLocale } from "./index";

/**
 * Switch language.
 *
 * Writes a cookie rather than putting the locale in the URL. A /ar/ prefix
 * would double every route in the app - including the passport URLs that are
 * printed on brochures and must never change - and would fork the sitemap.
 * A cookie keeps one canonical URL per page, which is also what the client
 * asked for when he said one website, one link.
 *
 * The trade-off: Google indexes only the default language. That is acceptable
 * while Arabic copy does not exist yet; if he later wants Arabic to rank, the
 * schema and this layer already support it and only the routing changes.
 */
export async function setLocale(formData: FormData): Promise<void> {
  const value = String(formData.get("locale") ?? "");
  if (!isLocale(value)) return;

  const jar = await cookies();
  jar.set(LOCALE_COOKIE, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: false, // read by the inline script in the document head
  });

  revalidatePath("/", "layout");
}
