import { cookies, headers } from "next/headers";

/**
 * Locale handling.
 *
 * The client asked for Arabic to be planned from the start. The schema already
 * carries it - category and location names live in translation tables - and
 * this is the runtime half: resolving which locale a request wants, and giving
 * pages the text direction that goes with it.
 *
 * Arabic is right-to-left, which is a layout concern, not a translation one.
 * Getting `dir` on the html element right is what makes the existing Tailwind
 * logical properties (ms-, me-, ps-, pe-) flip correctly; retrofitting that
 * later means auditing every physical margin in the codebase, which is why it
 * is worth wiring now even before the copy exists.
 */

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "bum_locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ar";
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/**
 * Which locale to serve.
 *
 * An explicit cookie wins, because it records a choice the visitor made. Only
 * when there is none do we guess from Accept-Language - guessing over a stated
 * preference is how sites end up serving Arabic to someone who just clicked
 * "English".
 */
export async function resolveLocale(): Promise<Locale> {
  const jar = await cookies();
  const chosen = jar.get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen)) return chosen;

  const h = await headers();
  const accept = h.get("accept-language") ?? "";
  return accept.toLowerCase().includes("ar") ? "ar" : DEFAULT_LOCALE;
}

/* ── UI strings ─────────────────────────────────────────────────────────── */

/**
 * Interface copy, kept in code rather than the database.
 *
 * Content - category names, business descriptions - is translated in the
 * database because the client edits it. Interface labels are not editable, so
 * putting them in a table would mean a query on every render for strings that
 * only ever change with a deploy.
 *
 * Arabic here is a placeholder set covering the shell. The client has not
 * supplied translated copy, so anything missing falls back to English rather
 * than rendering a key.
 */
const STRINGS = {
  en: {
    "nav.directory": "Directory",
    "nav.categories": "Categories",
    "nav.partner": "Partner Programme",
    "nav.listBusiness": "List Your Business",
    "nav.signIn": "Sign in",
    "search.placeholder": "Search businesses, services or keywords",
    "search.button": "Search",
    "listing.viewProfile": "View profile",
    "listing.verified": "Verified",
    "listing.noResults": "No businesses listed here yet",
    "profile.contact": "Contact information",
    "profile.about": "About",
    "profile.services": "Our services",
    "profile.enquire": "Request a free consultation",
    "profile.locked": "Some contact details are not published on this listing.",
    "form.name": "Full name",
    "form.phone": "Mobile number",
    "form.email": "Email address",
    "form.message": "Message",
    "form.submit": "Submit enquiry",
    "related.heading": "Businesses you may also need",
  },
  ar: {
    "nav.directory": "الدليل",
    "nav.categories": "الفئات",
    "nav.partner": "برنامج الشركاء",
    "nav.listBusiness": "أضف نشاطك التجاري",
    "nav.signIn": "تسجيل الدخول",
    "search.placeholder": "ابحث عن الشركات أو الخدمات",
    "search.button": "بحث",
    "listing.viewProfile": "عرض الملف",
    "listing.verified": "موثّق",
    "listing.noResults": "لا توجد شركات مدرجة هنا بعد",
    "profile.contact": "معلومات الاتصال",
    "profile.about": "نبذة",
    "profile.services": "خدماتنا",
    "profile.enquire": "اطلب استشارة مجانية",
    "profile.locked": "بعض بيانات الاتصال غير منشورة في هذه القائمة.",
    "form.name": "الاسم الكامل",
    "form.phone": "رقم الهاتف",
    "form.email": "البريد الإلكتروني",
    "form.message": "الرسالة",
    "form.submit": "إرسال الطلب",
    "related.heading": "شركات قد تحتاجها أيضاً",
  },
} satisfies Record<Locale, Record<string, string>>;

export type StringKey = keyof (typeof STRINGS)["en"];

export function t(locale: Locale, key: StringKey): string {
  return STRINGS[locale][key] ?? STRINGS.en[key] ?? key;
}

/** Bound translator, so a component reads `tr("nav.categories")`. */
export function translator(locale: Locale) {
  return (key: StringKey) => t(locale, key);
}
