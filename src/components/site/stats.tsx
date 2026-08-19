import { stats } from "@/lib/site-data";

export function Stats() {
  return (
    <section className="px-6 pt-10 sm:px-8 sm:pt-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-wrap items-center justify-between gap-y-6 rounded-2xl bg-[#020F08] px-2 py-2 sm:px-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 px-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E6C86C]/30 text-[#E6C86C]">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
              </span>
              <div className="min-w-0 leading-tight">
                <p className="text-[20px] font-extrabold tabular-nums text-[#E6C86C]">{value}</p>
                <p className="truncate text-[11.5px] text-white/50">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
