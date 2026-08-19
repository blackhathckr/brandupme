"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Megaphone,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { TopBar } from "@/components/site/top-bar";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { DmccAd, DuBusinessAd, TallyAd } from "@/components/site/real-ads";
import { businessCountRanges, categoryChecklist, services } from "@/lib/services-data";

const CATEGORY_SHOW_COUNT = 5;

const SORTS = [
  { key: "relevance", label: "Relevance" },
  { key: "count-desc", label: "Business Count - High to Low" },
  { key: "count-asc", label: "Business Count - Low to High" },
  { key: "name-asc", label: "Name - A to Z" },
] as const;
type SortKey = (typeof SORTS)[number]["key"];

const CATEGORY_TYPES = ["All Categories", "Main Categories", "Sub Categories", "Services", "Products"];

const POPULAR = ["Digital Marketing", "Real Estate", "IT Services", "Construction", "Health Care"];

const PAGE_SIZE = 12;

export default function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const initialQuery = params.get("q") ?? "digital marketing";

  const [query, setQuery] = useState(initialQuery);
  const [categoryType, setCategoryType] = useState("All Categories");
  const [countFilters, setCountFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [categoryQuery, setCategoryQuery] = useState("");
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);

  const visibleCategoryChecklist = useMemo(() => {
    const q = categoryQuery.trim().toLowerCase();
    const list = q ? categoryChecklist.filter((c) => c.toLowerCase().includes(q)) : categoryChecklist;
    return categoriesExpanded || q ? list : list.slice(0, CATEGORY_SHOW_COUNT);
  }, [categoryQuery, categoriesExpanded]);

  const results = useMemo(() => {
    let list = services;

    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length) {
      list = list.filter((s) => {
        const hay = `${s.name} ${s.category} ${s.description}`.toLowerCase();
        return words.some((w) => hay.includes(w));
      });
    }

    if (categoryFilters.length) {
      list = list.filter((s) => categoryFilters.includes(s.category));
    }

    if (countFilters.length) {
      const ranges = businessCountRanges.filter((r) => countFilters.includes(r.label));
      list = list.filter((s) => ranges.some((r) => s.count >= r.min && s.count <= r.max));
    }

    const sorted = [...list];
    if (sortKey === "count-desc") sorted.sort((a, b) => b.count - a.count);
    if (sortKey === "count-asc") sorted.sort((a, b) => a.count - b.count);
    if (sortKey === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [query, categoryFilters, countFilters, sortKey]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const rangeStart = results.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, results.length);

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setPage(1);
  }

  function resetAll() {
    setCategoryType("All Categories");
    setCountFilters([]);
    setCategoryFilters([]);
    setSortKey("relevance");
    setPage(1);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#0B1F13]">
      <TopBar />
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-[1320px] px-6 pb-20 pt-8 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-lg">
              <h1 className="text-[28px] font-extrabold tracking-tight text-[#0B1F13] sm:text-[32px]">
                Search Categories
              </h1>
              <p className="mt-1.5 text-[14px] text-[#5F7168]">
                Find the perfect business categories that match your needs and discover endless opportunities.
              </p>
            </div>
            <nav className="flex shrink-0 items-center gap-1.5 text-[12.5px] text-[#5F7168]">
              <Link href="/" className="transition-colors hover:text-[#3E8130]">
                Home
              </Link>
              <span>/</span>
              <Link href="/categories/main" className="transition-colors hover:text-[#3E8130]">
                Categories
              </Link>
              <span>/</span>
              <span className="font-medium text-[#0B1F13]">Search</span>
            </nav>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
              router.replace(`/categories/search?q=${encodeURIComponent(query)}`);
            }}
            className="mt-5 flex items-center gap-2 rounded-full border border-[#DDE6DC] bg-white p-1.5 shadow-sm"
          >
            <Search className="ml-3 h-4 w-4 shrink-0 text-[#5F7168]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="h-10 flex-1 border-0 bg-transparent px-1 text-[14px] text-[#0B1F13] outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-[#5F7168]">
                <X className="h-4 w-4" />
              </button>
            )}
            <button type="submit" className="h-10 shrink-0 rounded-full bg-[#3E8130] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#2F6425]">
              Search
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12.5px]">
            <span className="text-[#5F7168]">Popular Searches:</span>
            {POPULAR.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setQuery(p);
                  setPage(1);
                }}
                className="rounded-full bg-[#F4F9F1] px-3 py-1 font-medium text-[#194C11] transition-colors hover:bg-[#E5F1DC]"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[210px_1fr_260px] xl:gap-7">
            {/* refine sidebar */}
            <aside className="order-2 lg:order-1">
              <div className="rounded-xl border border-[#DDE6DC] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-[#0B1F13]">Refine Your Search</p>
                  <button onClick={resetAll} className="flex items-center gap-1 text-[11px] font-semibold text-[#5F7168] hover:text-[#3E8130]">
                    Reset All
                    <RotateCcw className="h-3 w-3" />
                  </button>
                </div>

                <p className="mt-4 text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#0B1F13]/70">
                  Category Type
                </p>
                <div className="mt-2 flex flex-col gap-2">
                  {CATEGORY_TYPES.map((t) => (
                    <label key={t} className="flex items-center gap-2 text-[13px] text-[#3D4B44]">
                      <input
                        type="radio"
                        name="category-type"
                        checked={categoryType === t}
                        onChange={() => setCategoryType(t)}
                        className="h-3.5 w-3.5 accent-[#3E8130]"
                      />
                      {t}
                    </label>
                  ))}
                </div>

                <p className="mt-4 text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#0B1F13]/70">
                  Business Count
                </p>
                <div className="mt-2 flex flex-col gap-2">
                  {businessCountRanges.map((r) => (
                    <label key={r.label} className="flex items-center gap-2 text-[13px] text-[#3D4B44]">
                      <input
                        type="checkbox"
                        checked={countFilters.includes(r.label)}
                        onChange={() => toggle(countFilters, r.label, setCountFilters)}
                        className="h-3.5 w-3.5 rounded accent-[#3E8130]"
                      />
                      {r.label}
                    </label>
                  ))}
                </div>

                <p className="mt-4 text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#0B1F13]/70">Sort By</p>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  className="mt-2 h-9 w-full rounded-lg border border-[#DDE6DC] px-2.5 text-[13px] text-[#0B1F13] outline-none focus:border-[#3E8130]"
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>

                <p className="mt-4 text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#0B1F13]/70">
                  Categories
                </p>
                <div className="relative mt-2">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5F7168]" />
                  <input
                    value={categoryQuery}
                    onChange={(e) => setCategoryQuery(e.target.value)}
                    type="text"
                    placeholder="Search in categories..."
                    className="h-8 w-full rounded-lg border border-[#DDE6DC] bg-white pl-8 pr-2.5 text-[12.5px] text-[#0B1F13] outline-none placeholder:text-[#5F7168]/60 focus:border-[#3E8130]"
                  />
                </div>
                <div className="mt-2.5 flex flex-col gap-2">
                  {visibleCategoryChecklist.map((c) => (
                    <label key={c} className="flex items-center gap-2 text-[13px] text-[#3D4B44]">
                      <input
                        type="checkbox"
                        checked={categoryFilters.includes(c)}
                        onChange={() => toggle(categoryFilters, c, setCategoryFilters)}
                        className="h-3.5 w-3.5 rounded accent-[#3E8130]"
                      />
                      {c}
                    </label>
                  ))}
                  {visibleCategoryChecklist.length === 0 && (
                    <p className="text-[12px] text-[#5F7168]">No categories match.</p>
                  )}
                </div>
                {!categoryQuery && categoryChecklist.length > CATEGORY_SHOW_COUNT && (
                  <button
                    onClick={() => setCategoriesExpanded((v) => !v)}
                    className="mt-2.5 flex items-center gap-1 text-[12.5px] font-semibold text-[#3E8130] hover:underline"
                  >
                    {categoriesExpanded ? "Show Less" : "Show More"}
                    <ChevronDown className={"h-3.5 w-3.5 transition-transform " + (categoriesExpanded ? "rotate-180" : "")} />
                  </button>
                )}
              </div>
            </aside>

            {/* results */}
            <div className="order-1 min-w-0 lg:order-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-[#5F7168]">
                  {results.length === 0
                    ? `No results for "${query}"`
                    : (
                      <>
                        Showing {rangeStart} to {rangeEnd} of {results.length} results for{" "}
                        <span className="font-semibold text-[#0B1F13]">&ldquo;{query}&rdquo;</span>
                      </>
                    )}
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => setView("grid")}
                    className={
                      "flex h-9 items-center gap-1.5 rounded-lg border px-3 text-[12.5px] font-semibold transition-colors " +
                      (view === "grid" ? "border-[#3E8130] bg-[#F4F9F1] text-[#194C11]" : "border-[#DDE6DC] text-[#5F7168]")
                    }
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Grid View
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={
                      "flex h-9 items-center gap-1.5 rounded-lg border px-3 text-[12.5px] font-semibold transition-colors " +
                      (view === "list" ? "border-[#3E8130] bg-[#F4F9F1] text-[#194C11]" : "border-[#DDE6DC] text-[#5F7168]")
                    }
                  >
                    <List className="h-4 w-4" />
                    List View
                  </button>
                </div>
              </div>

              <div
                className={
                  "mt-5 " +
                  (view === "grid" ? "grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4" : "flex flex-col gap-2.5")
                }
              >
                {pageItems.map(({ name, icon: Icon, count, description }) =>
                  view === "list" ? (
                    <a
                      key={name}
                      href="#"
                      className="group flex items-center justify-between gap-4 rounded-xl border border-[#DDE6DC] p-4 transition-all hover:-translate-y-0.5 hover:border-[#3E8130] hover:bg-[#F4F9F1]"
                    >
                      <span className="flex min-w-0 flex-1 items-center gap-3.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF6DF] text-[#3E8130]">
                          <Icon className="h-5 w-5" strokeWidth={1.7} />
                        </span>
                        <span className="min-w-0 leading-tight">
                          <span className="block text-[14.5px] font-semibold text-[#0B1F13]">{name}</span>
                          <span className="mt-0.5 block truncate text-[12px] text-[#5F7168]">{description}</span>
                        </span>
                      </span>
                      <span className="shrink-0 text-[12.5px] font-semibold text-[#0B1F13]">{count}+ Businesses</span>
                    </a>
                  ) : (
                    <a
                      key={name}
                      href="#"
                      className="group flex flex-col gap-2.5 rounded-xl border border-[#DDE6DC] p-4 transition-all hover:-translate-y-0.5 hover:border-[#3E8130] hover:bg-[#F4F9F1]"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF6DF] text-[#3E8130]">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <span className="block text-[14.5px] font-semibold leading-tight text-[#0B1F13]">{name}</span>
                      <span className="block text-[12px] leading-[1.4] text-[#5F7168]">{description}</span>
                      <span className="text-[12px] font-semibold text-[#3E8130]">{count}+ Businesses</span>
                    </a>
                  )
                )}
              </div>

              {results.length === 0 && (
                <div className="mt-10 rounded-xl border border-dashed border-[#DDE6DC] py-14 text-center text-[13.5px] text-[#5F7168]">
                  No services match your search or filters.
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE6DC] text-[#0B1F13] disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={
                        "flex h-9 w-9 items-center justify-center rounded-lg text-[13px] font-semibold transition-colors " +
                        (p === safePage ? "bg-[#3E8130] text-white" : "border border-[#DDE6DC] text-[#0B1F13] hover:bg-[#F4F9F1]")
                      }
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE6DC] text-[#0B1F13] disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="mt-8">
                <DuBusinessAd />
              </div>

              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#3E8130]/30 bg-[#F4F9F1] px-6 py-5 sm:flex-row">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#3E8130] sm:flex">
                    <Megaphone className="h-5 w-5" />
                  </span>
                  <p className="text-[13.5px] font-semibold text-[#0B1F13]">
                    Can&rsquo;t find what you&rsquo;re looking for?{" "}
                    <Link href="/categories/request" className="text-[#3E8130] underline-offset-2 hover:underline">
                      Request a category
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* ad rail */}
            <aside className="order-3 flex flex-col items-center gap-6">
              <DmccAd />
              <TallyAd />
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
