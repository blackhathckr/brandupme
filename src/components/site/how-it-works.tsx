import { steps } from "@/lib/site-data";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#020F08] py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#E6C86C]">
          How It Works
        </p>
        <h2 className="mt-2 text-[26px] font-bold tracking-tight text-white sm:text-[30px]">
          Simple Steps. Powerful Results.
        </h2>

        <div className="relative mt-12">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden border-t border-dashed border-white/15 sm:block"
          />
          <div className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-5 sm:gap-x-4">
            {steps.map(({ step, title, description, icon: Icon }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#E6C86C]/40 bg-[#020F08] text-[#E6C86C]">
                  <Icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <p className="mt-3 text-[14px] font-bold text-white">
                  {step}. {title}
                </p>
                <p className="mt-1.5 max-w-[160px] text-[12px] leading-relaxed text-white/45">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
