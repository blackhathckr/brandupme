import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { avatarImages, joinChecklist, ownerChecklist } from "@/lib/site-data";

export function CtaTriptych() {
  return (
    <section className="bg-[#020F08] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {/* left: business owners */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#05160E] p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#E6C86C]">
              For Business Owners
            </p>
            <h3 className="mt-2 text-[19px] font-bold leading-snug text-white">
              Get More Visibility, Leads &amp; Real Growth
            </h3>
            <ul className="mt-5 flex flex-1 flex-col gap-2.5">
              {ownerChecklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/70">
                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#3E8130]/20 text-[#6CB854]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#E6C86C] py-3 text-[13.5px] font-bold text-[#020F08] transition-colors hover:bg-[#F0D890]"
            >
              Grow Your Business
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* middle: highlighted stat card */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#6CB854]/40 bg-[#05160E] p-7 text-center shadow-[0_0_50px_-10px_rgb(83_160_63/30%)]">
            <p className="text-[36px] font-extrabold leading-none text-white">10,000+</p>
            <p className="mt-2 text-[15px] font-semibold text-white/85">Businesses can&rsquo;t be wrong.</p>
            <p className="mt-2 max-w-[230px] text-[13px] leading-relaxed text-white/50">
              Be part of UAE&rsquo;s most powerful business ecosystem.
            </p>
            <div className="mt-5 flex items-center -space-x-2.5">
              {avatarImages.map((src, i) => (
                <span key={src} className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#05160E]" style={{ zIndex: avatarImages.length - i }}>
                  <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="mt-4 text-[12.5px] font-medium text-[#6CB854]">
              Join thousands of smart businesses today.
            </p>
          </div>

          {/* right: get started */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#05160E] p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6CB854]">
              Ready to Get Started?
            </p>
            <h3 className="mt-2 text-[19px] font-bold leading-snug text-white">
              Join BrandUpMe Ecosystem Today
            </h3>
            <ul className="mt-5 flex flex-1 flex-col gap-2.5">
              {joinChecklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/70">
                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#3E8130]/20 text-[#6CB854]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#3E8130] py-3 text-[13.5px] font-bold text-white transition-colors hover:bg-[#2F6425]"
            >
              Explore Opportunities
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
