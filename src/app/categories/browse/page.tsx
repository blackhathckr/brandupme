import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { TopBar } from "@/components/site/top-bar";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { DmccAd, DuBusinessAd, RakbankAd, TallyAd } from "@/components/site/real-ads";
import { allCategories } from "@/lib/categories-data";

export default function CategoriesBrowsePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#0B1F13]">
      <TopBar />
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-[1320px] px-6 pb-20 pt-8 sm:px-8">
          <nav className="flex items-center gap-1.5 text-[12.5px] text-[#5F7168]">
            <Link href="/" className="transition-colors hover:text-[#3E8130]">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-[#0B1F13]">Categories</span>
          </nav>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[32px] font-extrabold tracking-tight text-[#0B1F13] sm:text-[38px]">
                All Categories
              </h1>
              <p className="mt-1.5 text-[14.5px] text-[#5F7168]">
                Explore {allCategories.length} business categories and discover the right opportunities.
              </p>
            </div>
            <a
              href="#"
              className="flex h-11 w-[170px] shrink-0 items-center justify-center gap-2 rounded-full border-[1.5px] border-[#3E8130] bg-white text-[13.5px] font-semibold text-[#194C11] transition-all hover:-translate-y-0.5 hover:bg-[#F4F9F1]"
            >
              <Megaphone className="h-[18px] w-[18px]" />
              Advertise Here
            </a>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_260px] xl:gap-7">
            <div className="min-w-0">
              <RakbankAd />

              <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-4">
                {allCategories.map(({ name, icon: Icon, count }) => (
                  <a
                    key={name}
                    href="#"
                    className="group flex items-center gap-3 rounded-xl border border-[#DDE6DC] p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3E8130] hover:bg-[#F4F9F1]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F9F1] text-[#3E8130] group-hover:bg-white">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[14px] font-semibold text-[#0B1F13]">{name}</span>
                      <span className="block text-[11.5px] text-[#5F7168]">
                        {count}+ {name === "More Categories" ? "Categories" : "Businesses"}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <DuBusinessAd />
              </div>
            </div>

            <aside className="flex flex-col items-center gap-6">
              <DmccAd />
              <TallyAd />
            </aside>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#3E8130]/30 bg-[#F4F9F1] px-6 py-6 sm:flex-row sm:px-8">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#3E8130] sm:flex">
                <Megaphone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[15px] font-bold text-[#0B1F13]">
                  Want to reach more businesses and customers in UAE?
                </p>
                <p className="text-[13px] text-[#5F7168]">
                  Advertise with BrandUpMe and grow your brand effectively.
                </p>
              </div>
            </div>
            <a
              href="#"
              className="flex h-11 w-[160px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#3E8130] text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425]"
            >
              Advertise Here
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
