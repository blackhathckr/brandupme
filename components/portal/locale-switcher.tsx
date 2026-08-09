import { Languages } from "lucide-react";
import { setLocale } from "@/lib/i18n/actions";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

/**
 * Language switch.
 *
 * A form per locale rather than a select, so it works without JavaScript and
 * each option is a real submit target. The inline script in the document head
 * applies the direction on the next paint.
 */
export function LocaleSwitcher({ current }: { current: Locale }) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      <Languages className="size-3.5 text-ink-3" strokeWidth={2} aria-hidden />
      {LOCALES.map((l) => (
        <form key={l} action={setLocale}>
          <input type="hidden" name="locale" value={l} />
          <button
            type="submit"
            aria-current={l === current ? "true" : undefined}
            className={`rounded-full px-2 py-1 text-[11.5px] font-semibold transition-colors ${
              l === current
                ? "bg-brand-50 text-green-text"
                : "text-ink-3 hover:text-green-text"
            }`}
          >
            {LOCALE_LABELS[l]}
          </button>
        </form>
      ))}
    </div>
  );
}
