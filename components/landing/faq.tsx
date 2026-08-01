import { FAQ } from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/**
 * shadcn/Base UI Accordion rather than the hand-rolled version. It handles
 * roving focus, aria wiring and the height transition correctly, and lets this
 * stay a Server Component - the previous version needed "use client" purely to
 * track which panel was open.
 */
export function Faq() {
  return (
    <section id="faq" className="bg-surface py-14 lg:py-20">
      <div className="container-page">
        <SectionHead
          align="center"
          eyebrow="Before you decide"
          before="Questions worth"
          italic="asking"
          sub="Everything a UAE business owner wants to know before joining the programme."
        />

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <Accordion
            defaultValue={[FAQ[0].q]}
            className="flex flex-col gap-2.5"
          >
            {FAQ.map((item) => (
              <AccordionItem
                key={item.q}
                value={item.q}
                className="rounded-xl border border-line bg-canvas px-5 transition-colors data-[panel-open]:border-gold-300 data-[panel-open]:shadow-e2"
              >
                <AccordionTrigger className="py-4 text-left font-display text-[16px] font-semibold tracking-[-0.02em] text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-[1.75] text-ink-2">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
