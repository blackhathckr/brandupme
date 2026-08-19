import { ArrowRight } from "lucide-react";
import { Skyline } from "@/components/site/skyline";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[#020F08] pb-16 pt-10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0">
        <Skyline />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgb(83_160_63/25%),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[900px] px-6 text-center sm:px-8">
        <h2 className="text-[20px] font-bold leading-snug sm:text-[26px]">
          <span className="text-white">One Business Ecosystem, </span>
          <span className="text-[#6CB854]">Endless Opportunities,</span>
          <br />
          <span className="font-serif italic font-normal text-[#E6C86C]">
            One Present Turns Into Endless Success.
          </span>
        </h2>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E6C86C]/50 px-6 py-3 text-[13.5px] font-semibold text-[#E6C86C] transition-colors hover:bg-[#E6C86C]/10"
        >
          Join the Ecosystem
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
