import { getRegion } from "@/lib/content";
import { SiteNav } from "@/components/landing/site-nav";
import { CtaBand, Footer } from "@/components/landing/footer";
import { Reveal } from "@/components/ui/reveal";

/**
 * Shell for interior pages: the site nav, a dark hero band carrying the page
 * title, then the page's own content, then the shared CTA and footer.
 *
 * Fixed to India. About Us and Why Choose Us are India-only pages per the
 * client, so there is deliberately no region prop to get wrong.
 */
export function PageShell({
  eyebrow,
  headline,
  accent,
  sub,
  children,
}: {
  eyebrow: string;
  headline: string;
  accent?: string;
  sub?: string;
  children: React.ReactNode;
}) {
  const r = getRegion("IN");

  return (
    <>
      <SiteNav r={r} region="IN" />

      <main id="top">
        <section className="relative overflow-hidden bg-deep pb-16 pt-[72px] lg:pb-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="deep-grid absolute inset-0 opacity-70" />
            <div className="absolute -right-40 -top-32 size-[520px] rounded-full bg-brand-600/22 blur-[120px]" />
            <div className="absolute -bottom-40 -left-32 size-[420px] rounded-full bg-brand-500/12 blur-[120px]" />
          </div>

          <div className="container-page relative pt-14 lg:pt-16">
            <Reveal className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-display text-[clamp(2rem,4.8vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                {headline}
                {accent && (
                  <>
                    {" "}
                    <span className="text-brand-400">{accent}</span>
                  </>
                )}
              </h1>
              {sub && (
                <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-deep-muted">
                  {sub}
                </p>
              )}
            </Reveal>
          </div>
        </section>

        {children}

        <CtaBand r={r} />
      </main>

      <Footer r={r} />
    </>
  );
}
