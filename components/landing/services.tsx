import Image from "next/image";
import { CalendarCheck, Check, CheckCheck, Mail, Phone } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { MorphButton } from "@/components/ui/brand-button";
import { MASCOT } from "@/lib/mascot";

/**
 * Bento layout rather than eight identical tiles. The two services that sell
 * the offer - calling and WhatsApp - get double-width cards carrying a small
 * working mock of the activity itself.
 *
 * "Show, don't tell" is a design system pillar: a sample call log argues the
 * case better than a sentence claiming we make calls.
 */

const CALL_LOG = [
  { co: "Al Faris Trading", state: "Connected", meta: "2:14", tone: "live" },
  { co: "Gulf Interiors", state: "Callback", meta: "Tue 10:00", tone: "warm" },
  { co: "Emirates Foodstuff", state: "Meeting set", meta: "Confirmed", tone: "won" },
];

const CHAT = [
  { from: "them", text: "Can you send pricing for the 6-burner range?" },
  { from: "us", text: "Sending now. What monthly volume are you planning?" },
  { from: "them", text: "Around 200 units." },
];

function CallLogDemo() {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-line bg-canvas">
      {CALL_LOG.map((r, i) => (
        <div
          key={r.co}
          className={`flex items-center gap-3 px-4 py-3 ${
            i > 0 ? "border-t border-hairline" : ""
          }`}
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-50">
            <Phone className="size-3.5 text-brand-600" strokeWidth={2} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-ink">
            {r.co}
          </span>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              r.tone === "won"
                ? "bg-[#EAF7F1] text-success-text"
                : r.tone === "warm"
                  ? "bg-gold-50 text-bronze"
                  : "bg-surface-3 text-ink-2"
            }`}
          >
            {r.state}
          </span>
          <span className="hidden w-20 shrink-0 text-right text-[11.5px] tabular-nums text-muted-foreground sm:block">
            {r.meta}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChatDemo() {
  return (
    <div className="mt-6 flex flex-col gap-2 rounded-xl border border-line bg-canvas p-4">
      {CHAT.map((m, i) => (
        <div
          key={i}
          className={`flex ${m.from === "us" ? "justify-end" : "justify-start"}`}
        >
          <span
            className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
              m.from === "us"
                ? "rounded-br-sm bg-brand-600 text-white"
                : "rounded-bl-sm bg-surface-3 text-ink-2"
            }`}
          >
            {m.text}
            {m.from === "us" && (
              <CheckCheck
                className="ml-1.5 inline size-3 align-[-1px] text-white/70"
                aria-hidden
              />
            )}
          </span>
        </div>
      ))}
      <span className="mt-1 flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
        <span className="size-1.5 animate-pulse rounded-full bg-success" />
        Qualified in 3 messages
      </span>
    </div>
  );
}

const DEMOS: Record<string, React.ReactNode> = {
  "Cold calling": <CallLogDemo />,
  "WhatsApp outreach": <ChatDemo />,
};

/* ── Micro-proof strips ───────────────────────────────────────────────────
   The two feature cards carry full mock-ups. Without something equivalent the
   remaining six were a heading, a paragraph and an icon - which read as filler
   next to them. Each now carries one small concrete artifact instead: the same
   "show, don't tell" idea at a fraction of the size.

   Deliberately uniform in height and treatment so the grid stays calm; the
   variety is in the content, not the styling. */

function Strip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[38px] items-center gap-2 rounded-lg border border-line bg-canvas px-3 text-[11.5px]">
      {children}
    </div>
  );
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "gold";
}) {
  const tones = {
    neutral: "bg-surface-3 text-ink-2",
    green: "bg-[#EAF7F1] text-success-text",
    gold: "bg-gold-50 text-bronze",
  };
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

const MICRO: Record<string, React.ReactNode> = {
  "Email campaigns": (
    <Strip>
      <Mail className="size-3.5 shrink-0 text-brand-600" strokeWidth={2} aria-hidden />
      <span className="min-w-0 flex-1 truncate text-ink-2">
        Introduction &middot; Al Faris Trading
      </span>
      <Pill tone="green">Opened</Pill>
    </Strip>
  ),

  "Prospect research": (
    <Strip>
      <Pill>F&amp;B</Pill>
      <Pill>Dubai</Pill>
      <Pill>20+ staff</Pill>
      <span className="ml-auto shrink-0 font-display text-[13px] font-bold text-ink">
        142
      </span>
    </Strip>
  ),

  "Lead qualification": (
    <Strip>
      {["Need", "Budget", "Timeline"].map((k) => (
        <span key={k} className="flex items-center gap-1 text-ink-2">
          <Check className="size-3 text-success-text" strokeWidth={3} aria-hidden />
          {k}
        </span>
      ))}
    </Strip>
  ),

  "Appointment setting": (
    <Strip>
      <CalendarCheck
        className="size-3.5 shrink-0 text-brand-600"
        strokeWidth={2}
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate text-ink-2">
        Tue 10:00 &middot; Gulf Interiors
      </span>
      <Pill tone="gold">Booked</Pill>
    </Strip>
  ),

  "Consistent follow-up": (
    <Strip>
      <span className="flex flex-1 items-center gap-1.5">
        {[
          { d: "D1", on: true },
          { d: "D3", on: true },
          { d: "D7", on: true },
          { d: "D14", on: false },
        ].map((s, i, arr) => (
          <span key={s.d} className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${s.on ? "bg-brand-600" : "bg-line"}`}
            />
            <span className={s.on ? "text-ink-2" : "text-muted-foreground"}>
              {s.d}
            </span>
            {i < arr.length - 1 && <span className="h-px w-2 bg-line" />}
          </span>
        ))}
      </span>
    </Strip>
  ),

  "Business development": (
    <Strip>
      <svg
        viewBox="0 0 72 20"
        className="h-4 w-[72px] shrink-0"
        aria-hidden
        fill="currentColor"
      >
        {[6, 9, 8, 12, 15, 19].map((h, i) => (
          <rect
            key={i}
            x={i * 12}
            y={20 - h}
            width="7"
            height={h}
            rx="1.5"
            className={i > 3 ? "text-brand-600" : "text-gold-400"}
            fill="currentColor"
          />
        ))}
      </svg>
      <span className="ml-auto shrink-0 text-ink-2">Conversations, month on month</span>
    </Strip>
  ),
};

export function Services() {
  const featured = SERVICES.filter((s) => DEMOS[s.title]);
  const rest = SERVICES.filter((s) => !DEMOS[s.title]);

  return (
    <section id="services" className="py-14 lg:py-20">
      <div className="container-page">
        <SectionHead
          eyebrow="What your representative does"
          before="Everything a sales department does,"
          italic="handled"
          sub="Your monthly fee covers the full business development workload, performed by a person, on your behalf, every working day."
        />

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Two double-width cards carrying a live-looking sample */}
          {featured.map((s) => (
            <RevealItem key={s.title} className="sm:col-span-2">
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-e2 lg:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow-red">
                    <Icon name={s.icon} className="size-5" />
                  </span>
                  <h3 className="font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-ink-2">
                  {s.body}
                </p>
                {DEMOS[s.title]}
              </article>
            </RevealItem>
          ))}

          {/* The remaining six.
              These were flat white with a small icon, which read as unfinished
              next to the two mock-up cards and the gold payoff card. Lifted
              with a warm gradient, a ghosted index numeral, a ringed icon and
              a top hairline that fills in on hover - enough depth to belong in
              the same grid, while still ranking below the payoff card. */}
          {rest.map((s, i) => (
            <RevealItem key={s.title}>
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl
                  border border-line bg-gradient-to-br from-surface to-surface-2 p-6
                  shadow-e1 transition-all duration-[240ms] ease-brand
                  hover:-translate-y-1 hover:border-gold-300 hover:shadow-e3"
              >
                {/* Gold hairline that draws in from the left on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r
                    from-brand-600 to-gold-500 transition-transform duration-[400ms]
                    ease-brand group-hover:scale-x-100"
                />

                {/* Ghosted numeral. Editorial structure at almost no visual cost. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 top-1 select-none
                    font-display text-[68px] font-extrabold leading-none tracking-[-0.05em]
                    text-ink opacity-[0.045]"
                >
                  {String(i + 3).padStart(2, "0")}
                </span>

                <span
                  className="relative mb-4 flex size-12 items-center justify-center rounded-xl
                    bg-gradient-to-br from-brand-50 to-gold-50 text-brand-600
                    ring-1 ring-inset ring-brand-100 transition-all duration-[240ms]
                    group-hover:ring-gold-300 group-hover:text-bronze"
                >
                  <Icon name={s.icon} className="size-5" />
                </span>

                <h3 className="relative font-display text-[16.5px] font-semibold tracking-[-0.02em] text-ink">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-[13.5px] leading-[1.6] text-muted-foreground">
                  {s.body}
                </p>

                {/* mt-auto so every strip bottom-aligns regardless of how
                    long the description above it runs */}
                <div className="relative mt-auto pt-5">{MICRO[s.title]}</div>
              </article>
            </RevealItem>
          ))}

          {/* Fills the bento's last two columns rather than leaving a hole.
              The mascot appears here, at the section's payoff - deliberately
              not in every card, or it stops being noticed. */}
          <RevealItem className="sm:col-span-2">
            <article className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-100/70 to-surface p-6 lg:p-7">
              {/* Desktop: decorative, bleeding off the card corner.
                  Mobile: inline beside the CTA instead, since an absolute
                  mascot on a narrow card either collides with the button or
                  has to be hidden - and hiding it means phone visitors never
                  see the mascot at all. */}
              <Image
                src={MASCOT.headset.src}
                alt=""
                width={MASCOT.headset.w}
                height={MASCOT.headset.h}
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -right-6 hidden w-44 select-none object-contain opacity-95 sm:block lg:w-52"
              />

              <div className="relative sm:max-w-[62%]">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bronze">
                  All of it, one fee
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold leading-tight tracking-[-0.03em] text-ink">
                  One person doing all eight, every working day.
                </h3>
                <p className="mt-3 flex items-start gap-2 text-[14px] text-ink-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-success-text"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  No salary, visa, office or HR to manage
                </p>
              </div>

              <div className="relative flex items-end justify-between gap-2">
                <MorphButton href="#pricing">See what it costs</MorphButton>
                <Image
                  src={MASCOT.headset.src}
                  alt=""
                  width={MASCOT.headset.w}
                  height={MASCOT.headset.h}
                  aria-hidden
                  className="pointer-events-none -mb-6 -mr-3 w-24 shrink-0 select-none object-contain sm:hidden"
                />
              </div>
            </article>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
