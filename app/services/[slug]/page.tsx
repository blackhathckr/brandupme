import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { SERVICE_PAGES, getServicePage } from "@/lib/services-in";
import { PageShell } from "@/components/pages/page-shell";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/brand-button";

/**
 * Required by `output: "export"` - a dynamic route with no generateStaticParams
 * cannot be statically exported.
 * See node_modules/next/dist/docs/01-app/02-guides/static-exports.md
 */
export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}/` },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      // Omit rather than point at a missing file - a broken OG image is worse
      // than none, since the site-wide default is then used instead.
      ...(s.art && {
        images: [{ url: s.art, width: 1000, height: 1000, alt: s.metaTitle }],
      }),
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) notFound();

  return (
    <PageShell
      eyebrow={s.eyebrow}
      headline={s.headline}
      accent={s.accent}
      sub={s.sub}
    >
      {/* ── Artwork + intro ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-[460px]">
            {/* Client artwork is round by design, so the frame is too. The
                soft ring behind it stops a light circle floating on white. */}
            <div
              aria-hidden
              className="absolute inset-0 -m-3 rounded-full bg-gradient-to-br from-brand-100 to-surface-2"
            />
            {s.art ? (
              <Image
                src={s.art}
                alt={s.metaTitle}
                width={1000}
                height={1000}
                priority
                className="relative w-full rounded-full object-cover shadow-e3"
              />
            ) : (
              /* Artwork not supplied yet. A circle of the same size holding the
                 service icon keeps the layout intact instead of collapsing. */
              <div className="relative flex aspect-square w-full items-center justify-center rounded-full border border-brand-200 bg-white text-green-text shadow-e2">
                <Icon name={s.icon} className="size-24" strokeWidth={1.25} />
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
              {s.intro.heading}
            </h2>
            {s.intro.body.map((p) => (
              <p key={p} className="mt-4 text-[15.5px] leading-[1.8] text-ink-2">
                {p}
              </p>
            ))}

            <dl className="mt-8 grid grid-cols-2 gap-5">
              {s.highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-green-text">
                    <Icon name={h.icon} className="size-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <dd className="font-display text-[17px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                      {h.value}
                    </dd>
                    <dt className="mt-1 text-[11.5px] text-ink-3">{h.label}</dt>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── What you receive ────────────────────────────────────────────── */}
      <section className="bg-surface-2 py-16 lg:py-24">
        <div className="container-page">
          <SectionHead flourish eyebrow="What's included" before={s.offer.heading} sub={s.offer.sub} />

          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
            {s.offer.groups.map((g) => (
              <RevealItem key={g.title}>
                <article className="h-full rounded-2xl border border-line bg-white p-6 shadow-e1 lg:p-7">
                  <h3 className="font-display text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                    {g.title}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13.5px] leading-[1.6] text-ink-2"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-green-text"
                          strokeWidth={3}
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-deep py-16 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="deep-grid absolute inset-0 opacity-60" />
          <div className="absolute -left-40 top-1/4 size-[480px] rounded-full bg-brand-600/18 blur-[120px]" />
        </div>

        <div className="container-page relative">
          <SectionHead onDark eyebrow="How it works" before={s.process.heading} />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {s.process.steps.map((step) => (
              <Reveal as="li" key={step.n} className="relative pl-14">
                <span className="absolute left-0 top-0 flex size-11 items-center justify-center rounded-xl border border-brand-500/30 bg-brand-500/12 font-display text-[14px] font-extrabold text-brand-400">
                  {step.n}
                </span>
                <h3 className="font-display text-[16px] font-bold tracking-[-0.02em] text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-deep-muted">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Why + industries ────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
              {s.why.heading}
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {s.why.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.7] text-ink-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <Check className="size-3 text-green-text" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
              Industries we serve
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.industries.map((i) => (
                <li
                  key={i}
                  className="rounded-full border border-line bg-surface-2 px-4 py-2 text-[13px] font-medium text-ink-2
                    transition-colors duration-[240ms] hover:border-brand-300 hover:bg-brand-50 hover:text-green-text"
                >
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Closing ─────────────────────────────────────────────────────── */}
      <section className="bg-surface-2 pb-4 pt-16 lg:pt-24">
        <Reveal className="container-page mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
            {s.closing.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-[1.8] text-ink-2">
            {s.closing.body}
          </p>
          <p className="mt-6 font-display text-[17px] font-bold tracking-[-0.02em] text-green-text">
            {s.closing.tagline}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/#pricing" variant="primary" size="lg" icon>
              See our plans
            </Button>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
