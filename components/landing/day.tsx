import { DAY } from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

/**
 * The second night band. Makes an abstract service concrete: this is what the
 * AED 500 actually buys, hour by hour.
 */
export function Day() {
  return (
    <section className="relative overflow-hidden bg-night py-14 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 size-[520px] rounded-full bg-gold-600/12 blur-3xl"
      />

      <div className="container-page relative">
        <SectionHead
          onDark
          align="center"
          eyebrow="What AED 500 actually buys"
          before="A day with your"
          italic="representative"
          sub="Not a subscription to a tool. A person working your pipeline, every working day."
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-night-line bg-night-line sm:grid-cols-2 lg:grid-cols-3">
          {DAY.map((d) => (
            <RevealItem key={d.time} className="bg-night-2">
              <article className="h-full p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-gold-500/12 text-gold-400">
                    <Icon name={d.icon} className="size-[18px]" />
                  </span>
                  <span className="font-display text-[15px] font-bold tabular-nums tracking-[-0.02em] text-gold-400">
                    {d.time}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[17px] font-semibold tracking-[-0.02em] text-night-fg">
                  {d.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-night-muted">
                  {d.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
