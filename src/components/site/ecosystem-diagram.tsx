import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ecosystemRoles } from "@/lib/site-data";

// Flat-top hexagon: right, upper-right, upper-left, left, lower-left, lower-right —
// paired with ecosystemRoles order (Owner, Promoter, Referral Partner, Influencer,
// Category Partner, Customer).
const NODES = [
  { left: "24%", top: "13%", side: "left" as const }, // Business Owner — upper left
  { left: "76%", top: "13%", side: "right" as const }, // Promoter — upper right
  { left: "92%", top: "50%", side: "right" as const }, // Referral Partner — right
  { left: "76%", top: "87%", side: "right" as const }, // Influencer — lower right
  { left: "24%", top: "87%", side: "left" as const }, // Category Partner — lower left
  { left: "8%", top: "50%", side: "left" as const }, // Customer — left
];

export function EcosystemDiagram() {
  return (
    <section id="ecosystem" className="bg-[#020F08] py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#6CB854]">
              BrandUpMe Ecosystem
            </p>
            <h2 className="mt-2 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
              One Platform.
              <br />
              Six Powerful
              <br />
              <span className="text-[#6CB854]">Opportunities.</span>
            </h2>
            <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-white/55">
              BrandUpMe brings everyone together to create value, build
              connections and grow your business.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E6C86C]/50 px-5 py-2.5 text-[13.5px] font-semibold text-[#E6C86C] transition-colors hover:bg-[#E6C86C]/10"
            >
              Explore Ecosystem
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <div className="absolute inset-[20%] rounded-full border border-dashed border-white/15" />

            {/* spokes — center to each role node */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              {NODES.map((n, i) => (
                <line
                  key={i}
                  x1={50}
                  y1={50}
                  x2={parseFloat(n.left)}
                  y2={parseFloat(n.top)}
                  stroke="rgb(230 200 108 / 20%)"
                  strokeWidth={0.4}
                  strokeDasharray="2 2"
                />
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex h-[124px] w-[124px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-[#E6C86C]/30 bg-[#05160E] text-center shadow-[0_0_50px_10px_rgb(230_200_108/12%)]">
              <Image src="/brand/logo-mark.png" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
              <span className="text-[13px] font-bold text-white">BrandUpMe</span>
              <span className="text-[9px] text-[#7FA88F]">Connect | Grow | Succeed</span>
            </div>

            {ecosystemRoles.map(({ name, benefit, icon: Icon }, i) => {
              const n = NODES[i];
              return (
                <div
                  key={name}
                  className={
                    "absolute flex w-[180px] -translate-y-1/2 items-center gap-2.5 " +
                    (n.side === "left" ? "-translate-x-full flex-row-reverse text-right" : "text-left")
                  }
                  style={{ left: n.left, top: n.top }}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E6C86C]/30 bg-[#05160E] text-[#E6C86C]">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[13px] font-semibold text-white">{name}</span>
                    <span className="block text-[11px] text-[#6CB854]">{benefit}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
