import Image from "next/image";
import { Cloud, Globe2, Headset, Network, TrendingUp, Wallet, Wifi } from "lucide-react";

/**
 * The four ad creatives shown in the supplied concept art (RAKBANK, DMCC,
 * tally, du Business). This is a local mockup, not a published/live site, so
 * the brand references from the reference images are reproduced as-is
 * rather than genericized.
 */

export function RakbankAd({ variant = "growth" }: { variant?: "growth" | "power" }) {
  const isPower = variant === "power";
  return (
    <div>
      <div className="relative mx-auto flex w-full items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#173763] py-3 sm:aspect-[970/90] sm:py-0">
        <div className="absolute inset-y-0 right-0 w-[46%]">
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=900&auto=format&fit=crop"
            alt=""
            fill
            sizes="450px"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] to-transparent" />
        </div>

        <div className="relative flex items-center gap-4 pl-6">
          <div className="shrink-0">
            <span aria-hidden className="block h-7 w-7 rounded-[40%_60%_60%_40%/60%_40%_60%_40%] bg-[#D5262D]" />
            <p className="mt-1 text-[15px] font-extrabold leading-none text-white">RAKBANK</p>
            <p className="font-serif text-[10px] italic leading-none text-white/60">Simply Better</p>
          </div>
          <span className="hidden h-9 w-px bg-white/15 sm:block" />
          <div className="hidden sm:block">
            <p className="text-[13.5px] font-bold leading-tight text-white">
              {isPower ? (
                "Power Your Business Growth"
              ) : (
                <>
                  Business Banking That <span className="text-[#F0A93A]">Powers Growth</span>
                </>
              )}
            </p>
            <p className="mt-1 flex items-center gap-3 text-[10px] text-white/55">
              <span>Business Accounts</span>
              <span>&middot;</span>
              <span>Easy Finance</span>
              <span>&middot;</span>
              <span>{isPower ? "Global Support" : "Global Transfers"}</span>
            </p>
          </div>
        </div>

        <a
          href="#"
          className={
            "relative ml-auto mr-5 shrink-0 rounded-full px-4 py-2 text-[12px] font-bold transition-colors " +
            (isPower ? "bg-[#F0A93A] text-[#17301F] hover:bg-[#dd9a2e]" : "bg-[#D5262D] text-white hover:bg-[#b31f26]")
          }
        >
          Learn More &rarr;
        </a>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-[#657268]/60">Horizontal Ad 970 x 90</p>
    </div>
  );
}

export function DmccAd() {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div
        className="relative flex w-full flex-col overflow-hidden rounded-xl bg-[#0B1F3A] p-5"
        style={{ aspectRatio: "300 / 600" }}
      >
        <div>
          <p className="text-[26px] font-extrabold leading-none text-white">DMCC</p>
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/45">
            Dubai Multi Commodities Centre
          </p>
        </div>

        <h3 className="mt-6 text-[21px] font-extrabold leading-[1.15] text-white">
          Grow Your <span className="text-[#D9A52A]">Business</span> With DMCC
        </h3>

        <ul className="mt-5 flex flex-col gap-3">
          {[
            { label: "World-Class Infrastructure", icon: Network },
            { label: "Global Business Community", icon: Globe2 },
            { label: "Endless Opportunities", icon: TrendingUp },
          ].map(({ label, icon: Icon }) => (
            <li key={label} className="flex items-center gap-2.5 text-[12px] font-medium text-white/85">
              <Icon className="h-4 w-4 shrink-0 text-[#D9A52A]" strokeWidth={1.8} />
              {label}
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#D9A52A] px-4 py-2 text-[12px] font-bold text-[#17301F] transition-colors hover:bg-[#c99a1f]"
        >
          Learn More &rarr;
        </a>

        <div className="relative mt-auto -mx-5 -mb-5 flex-1">
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=700&auto=format&fit=crop"
            alt=""
            fill
            sizes="300px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/20 to-transparent" />
        </div>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-[#657268]/60">Vertical Banner Ad 300 x 600</p>
    </div>
  );
}

export function TallyAd() {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div
        className="relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#2D1B4E] to-[#1A1030] p-5"
        style={{ aspectRatio: "300 / 250" }}
      >
        <div>
          <p className="font-serif text-[26px] italic font-semibold leading-none text-white">tally</p>
          <p className="mt-3 text-[16px] font-bold leading-snug text-white">
            Smart Accounting for Growing Businesses
          </p>
        </div>
        <div className="flex items-end justify-between">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#7C4FE0] px-4 py-2 text-[12px] font-bold text-white transition-colors hover:bg-[#6a3fc9]"
          >
            Learn More &rarr;
          </a>
          {/* mini dashboard mock instead of a stock photo, avoids licensing a specific real product UI */}
          <div className="hidden h-14 w-20 shrink-0 rounded-md border border-white/15 bg-white/[0.06] p-1.5 sm:block">
            <div className="flex h-full items-end gap-1">
              <span className="h-[40%] flex-1 rounded-sm bg-[#7C4FE0]/60" />
              <span className="h-[70%] flex-1 rounded-sm bg-[#7C4FE0]/80" />
              <span className="h-[55%] flex-1 rounded-sm bg-[#7C4FE0]/60" />
              <span className="h-[90%] flex-1 rounded-sm bg-[#D9A52A]" />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-[#657268]/60">Square Ad 300 x 250</p>
    </div>
  );
}

export function DuBusinessAd() {
  return (
    <div className="@container">
      <div className="relative mx-auto flex w-full items-center gap-3 overflow-hidden rounded-xl border border-[#E5EAE3] bg-white px-4 py-3 @2xl:aspect-[970/90] @2xl:gap-5 @2xl:px-6 @2xl:py-0">
        <div className="flex shrink-0 items-center gap-2">
          <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0072BC] text-[13px] font-extrabold text-white">
            du
          </span>
          <span className="text-[12px] font-bold text-[#00AEEF]">Business</span>
        </div>

        <div className="hidden shrink-0 @sm:block">
          <p className="text-[14px] font-extrabold leading-tight text-[#0072BC]">STAY CONNECTED.</p>
          <p className="text-[14px] font-extrabold leading-tight text-[#0072BC]">GROW EVERYWHERE.</p>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-5 @3xl:flex">
          {[
            { label: "Business Solutions", icon: Wallet },
            { label: "High Speed Internet", icon: Wifi },
            { label: "Cloud Services", icon: Cloud },
            { label: "24/7 Support", icon: Headset },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-1.5 text-[11px] font-medium text-[#3D4B44]">
              <Icon className="h-4 w-4 text-[#00AEEF]" strokeWidth={1.8} />
              {label}
            </div>
          ))}
        </div>

        <a
          href="#"
          className="shrink-0 rounded-full bg-[#0072BC] px-4 py-2 text-[12px] font-bold text-white transition-colors hover:bg-[#005a94]"
        >
          Learn More &rarr;
        </a>

        <div className="relative hidden h-full w-[130px] shrink-0 @4xl:block">
          <Image
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=400&auto=format&fit=crop"
            alt=""
            fill
            sizes="130px"
            className="object-cover"
          />
        </div>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-[#657268]/60">Horizontal Ad 970 x 90</p>
    </div>
  );
}
