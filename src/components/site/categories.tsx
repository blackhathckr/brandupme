import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/site-data";

export function Categories() {
  return (
    <section id="categories" className="bg-[#020F08] py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#E6C86C]">
              Explore Top Categories
            </p>
            <h2 className="mt-2 text-[26px] font-bold tracking-tight text-white sm:text-[30px]">
              Find Businesses in Every Industry
            </h2>
          </div>
          <Link
            href="/categories/main"
            className="group flex items-center gap-1.5 text-[13.5px] font-semibold text-[#E6C86C] transition-colors hover:text-[#F0D890]"
          >
            View all Categories
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-7">
          {categories.map(({ name, icon: Icon, count }) => (
            <Link
              key={name}
              href="/categories/main"
              className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-[#05160E] px-3 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#E6C86C]/40 hover:bg-[#0A2013]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6C86C]/30 text-[#E6C86C] transition-colors group-hover:bg-[#E6C86C]/10">
                <Icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="text-[13px] font-semibold leading-tight text-white">{name}</span>
              <span className="text-[11px] text-white/45">{count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
