"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Megaphone,
  Plus,
  Search,
} from "lucide-react";
import { TopBar } from "@/components/site/top-bar";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { DmccAd, DuBusinessAd, TallyAd } from "@/components/site/real-ads";
import { allCategories, totalListings, type AllCategory } from "@/lib/categories-data";

const SORTS = [
  { key: "default", label: "Default", sub: "Sort by default order" },
  { key: "popular", label: "Most Popular", sub: "Sort by most popular" },
  { key: "count-desc", label: "Business Count - High to Low", sub: "Sort by highest business count" },
  { key: "count-asc", label: "Business Count - Low to High", sub: "Sort by lowest business count" },
  { key: "name-asc", label: "Category Name - A to Z", sub: "Sort alphabetically A to Z" },
  { key: "name-desc", label: "Category Name - Z to A", sub: "Sort alphabetically Z to A" },
  { key: "recent", label: "Recently Added", sub: "Sort by recently added categories" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

function sortCategories(list: AllCategory[], key: SortKey) {
  const arr = [...list];
  switch (key) {
    case "popular":
    case "count-desc":
      return arr.sort((a, b) => b.count - a.count);
    case "count-asc":
      return arr.sort((a, b) => a.count - b.count);
    case "name-asc":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case "recent":
      return arr.reverse();
    default:
      return arr;
  }
}

const PAGE_SIZE = 12;
const SIDEBAR_PREVIEW = 10;

export default function CategoriesPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const filtered = useMemo(() => {
    let list = allCategories;
    if (activeCategory) list = list.filter((c) => c.name === activeCategory);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    return sortCategories(list, sortKey);
  }, [activeCategory, query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length);

  const sidebarList = sidebarExpanded ? allCategories : allCategories.slice(0, SIDEBAR_PREVIEW);
  const currentSort = SORTS.find((s) => s.key === sortKey)!;

  function selectCategory(name: string | null) {
    setActiveCategory(name);
    setPage(1);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#0B1F13]">
      <TopBar />
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-[1320px] px-6 pb-20 pt-8 sm:px-8">
          {/* breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12.5px] text-[#5F7168]">
            <Link href="/" className="transition-colors hover:text-[#3E8130]">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-[#0B1F13]">Categories</span>
          </nav>

          {/* title row */}
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-[32px] font-extrabold tracking-tight text-[#0B1F13] sm:text-[38px]">
                {activeCategory ?? "All Categories"}
              </h1>
              <p className="mt-1.5 text-[14.5px] text-[#5F7168]">
                Explore {allCategories.length} business categories and discover the right opportunities.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (query.trim()) router.push(`/categories/search?q=${encodeURIComponent(query.trim())}`);
                }}
                className="relative"
              >
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  type="text"
                  placeholder="Search categories..."
                  className="h-11 w-full rounded-full border border-[#DDE6DC] bg-white pl-10 pr-4 text-[13.5px] font-medium text-[#0B1F13] outline-none placeholder:text-[#5F7168]/60 focus:border-[#3E8130] sm:w-[240px]"
                />
              </form>
              <a
                href="#"
                className="flex h-11 w-[170px] shrink-0 items-center justify-center gap-2 rounded-full border-[1.5px] border-[#3E8130] bg-white text-[13.5px] font-semibold text-[#194C11] transition-all hover:-translate-y-0.5 hover:bg-[#F4F9F1]"
              >
                <Megaphone className="h-[18px] w-[18px]" />
                Advertise Here
              </a>
            </div>
          </div>

          {/* body: sidebar + main + ad rail */}
          <div className="mt-8 grid gap-5 lg:grid-cols-[210px_1fr_260px] xl:gap-7">
            {/* sidebar */}
            <aside className="order-2 flex flex-col gap-5 lg:order-1">
              <div className="rounded-xl border border-[#DDE6DC] p-4">
                <p className="px-1 text-[13px] font-bold uppercase tracking-[0.06em] text-[#0B1F13]">
                  Browse Categories
                </p>
                <div className="mt-3 flex flex-col gap-0.5">
                  <button
                    onClick={() => selectCategory(null)}
                    className={
                      "flex items-center justify-between rounded-lg px-3 py-2 text-left text-[13.5px] font-semibold transition-colors " +
                      (activeCategory === null
                        ? "bg-[#F4F9F1] text-[#194C11]"
                        : "text-[#0B1F13] hover:bg-[#F6F9F4]")
                    }
                  >
                    All Categories
                    <span className="text-[12px] font-medium text-[#5F7168]">{totalListings.toLocaleString()}+</span>
                  </button>
                  {sidebarList.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => selectCategory(c.name)}
                      className={
                        "flex items-center justify-between rounded-lg px-3 py-2 text-left text-[13.5px] font-medium transition-colors " +
                        (activeCategory === c.name
                          ? "bg-[#F4F9F1] text-[#194C11]"
                          : "text-[#0B1F13]/80 hover:bg-[#F6F9F4]")
                      }
                    >
                      {c.name}
                      <span className="text-[12px] text-[#5F7168]">{c.count}+</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSidebarExpanded((v) => !v)}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#DDE6DC] py-2 text-[12.5px] font-semibold text-[#194C11] transition-colors hover:bg-[#F4F9F1]"
                >
                  {sidebarExpanded ? "View Less" : "View More"}
                  <ChevronDown className={"h-3.5 w-3.5 transition-transform " + (sidebarExpanded ? "rotate-180" : "")} />
                </button>
              </div>

              <div className="rounded-xl border border-[#DDE6DC] bg-[#F4F9F1] p-4">
                <p className="text-[13.5px] font-bold text-[#0B1F13]">Can&rsquo;t find a category?</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[#5F7168]">
                  Request a new category to help us serve you better.
                </p>
                <Link
                  href="/categories/request"
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#3E8130] bg-white py-2 text-[12.5px] font-semibold text-[#194C11] transition-colors hover:bg-[#F4F9F1]"
                >
                  Request Category
                  <Plus className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>

            {/* main */}
            <div className="order-1 min-w-0 lg:order-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-[#5F7168]">
                  {filtered.length === 0
                    ? "No categories found"
                    : `Showing ${rangeStart} to ${rangeEnd} of ${filtered.length} categories`}
                </p>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setSortOpen((v) => !v)}
                      className="flex h-9 items-center gap-2 rounded-lg border border-[#DDE6DC] px-3 text-[12.5px] font-semibold text-[#0B1F13]"
                    >
                      Sort By
                      <ChevronDown className={"h-3.5 w-3.5 transition-transform " + (sortOpen ? "rotate-180" : "")} />
                    </button>
                    {sortOpen && (
                      <div className="absolute right-0 top-11 z-20 w-64 rounded-xl border border-[#DDE6DC] bg-white p-1.5 shadow-xl">
                        {SORTS.map((s) => (
                          <button
                            key={s.key}
                            onClick={() => {
                              setSortKey(s.key);
                              setSortOpen(false);
                            }}
                            className={
                              "flex w-full flex-col rounded-lg px-3 py-2 text-left transition-colors hover:bg-[#F4F9F1] " +
                              (s.key === sortKey ? "bg-[#F4F9F1]" : "")
                            }
                          >
                            <span className="text-[13px] font-semibold text-[#0B1F13]">{s.label}</span>
                            <span className="text-[11px] text-[#5F7168]">{s.sub}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center rounded-lg border border-[#DDE6DC] p-0.5">
                    <button
                      onClick={() => setView("grid")}
                      aria-label="Grid view"
                      className={"flex h-8 w-8 items-center justify-center rounded-md " + (view === "grid" ? "bg-[#3E8130] text-white" : "text-[#5F7168]")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      aria-label="List view"
                      className={"flex h-8 w-8 items-center justify-center rounded-md " + (view === "list" ? "bg-[#3E8130] text-white" : "text-[#5F7168]")}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* grid / list */}
              <div
                className={
                  "mt-5 " +
                  (view === "grid"
                    ? "grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4"
                    : "flex flex-col gap-2.5")
                }
              >
                {pageItems.map(({ name, icon: Icon, count, description }) =>
                  view === "list" ? (
                    <a
                      key={name}
                      href="#"
                      className="group flex items-center justify-between gap-4 rounded-xl border border-[#DDE6DC] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3E8130] hover:bg-[#F4F9F1]"
                    >
                      <span className="flex min-w-0 flex-1 items-center gap-3.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F9F1] text-[#3E8130] group-hover:bg-white">
                          <Icon className="h-5 w-5" strokeWidth={1.7} />
                        </span>
                        <span className="min-w-0 leading-tight">
                          <span className="block text-[15px] font-semibold text-[#0B1F13]">{name}</span>
                          <span className="mt-0.5 block truncate text-[12.5px] text-[#5F7168]">{description}</span>
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-4">
                        <span className="text-[13px] font-semibold text-[#0B1F13]">
                          {count}+ {name === "More Categories" ? "Categories" : "Businesses"}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-[#5F7168] transition-all group-hover:translate-x-0.5 group-hover:text-[#3E8130]" />
                      </span>
                    </a>
                  ) : (
                    <a
                      key={name}
                      href="#"
                      className="group flex items-center gap-3 rounded-xl border border-[#DDE6DC] p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3E8130] hover:bg-[#F4F9F1]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F9F1] text-[#3E8130] group-hover:bg-white">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-[15px] font-semibold text-[#0B1F13]">{name}</span>
                        <span className="block text-[12px] text-[#5F7168]">
                          {count}+ {name === "More Categories" ? "Categories" : "Businesses"}
                        </span>
                      </span>
                    </a>
                  )
                )}
              </div>

              {filtered.length === 0 && (
                <div className="mt-10 rounded-xl border border-dashed border-[#DDE6DC] py-14 text-center text-[13.5px] text-[#5F7168]">
                  No categories match &ldquo;{query}&rdquo;.
                </div>
              )}

              {/* pagination */}
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

              {/* horizontal ad sits at the bottom of the main column, not the top */}
              <div className="mt-8">
                <DuBusinessAd />
              </div>
            </div>

            {/* ad rail */}
            <aside className="order-3 flex flex-col items-center gap-6">
              <DmccAd />
              <TallyAd />
            </aside>
          </div>

          {/* footer advertise CTA */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#3E8130]/30 bg-[#F4F9F1] px-6 py-6 sm:flex-row sm:px-8">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3E8130] text-white sm:flex">
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
