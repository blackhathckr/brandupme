"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Plus, Star } from "lucide-react";
import { featuredBusinesses } from "@/lib/site-data";

export function FeaturedBusinesses() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 250, behavior: "smooth" });
  };

  return (
    <section id="businesses" className="bg-[#020F08] py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#E6C86C]">
              Featured Businesses
            </p>
            <h2 className="mt-2 text-[26px] font-bold tracking-tight text-white sm:text-[30px]">
              Top Rated Businesses You Can Trust
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="group flex items-center gap-1.5 text-[13.5px] font-semibold text-[#E6C86C] transition-colors hover:text-[#F0D890]"
            >
              View all Businesses
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-8 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredBusinesses.map((b) => (
            <a
              key={b.name}
              href="#"
              className="group w-[236px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#05160E] transition-colors hover:border-[#E6C86C]/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  sizes="236px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  aria-label="Follow"
                  className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#E6C86C] text-[#020F08] shadow"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-[14.5px] font-bold text-white">{b.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11.5px] font-medium text-[#6CB854]">
                  {b.category}
                  {b.verified && (
                    <span className="ml-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#3E8130] text-[8px] text-white">
                      ✓
                    </span>
                  )}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[12.5px] text-white/70">
                  <Star className="h-3.5 w-3.5 fill-[#E6C86C] text-[#E6C86C]" />
                  {b.rating.toFixed(1)}
                  <span className="text-white/35">({b.reviews})</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-[12px] text-white/40">
                  <MapPin className="h-3.5 w-3.5" />
                  {b.location}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
