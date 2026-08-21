"use client";

import { useMemo, useState } from "react";
import { Briefcase, CheckCircle2, Clock, Edit3, Eye, MoveUpRight, Plus, Search, UserCheck, XCircle } from "lucide-react";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { DonutChart } from "@/components/business/donut-chart";
import { StatCard } from "@/components/business/stat-card";
import { StatusBadge } from "@/components/business/status-badge";
import { dealOverview, deals, type DealStage } from "@/lib/dashboard-sample-data";

const TABS: { label: string; stage: DealStage | "All" }[] = [
  { label: "All Deals", stage: "All" },
  { label: "Pending Deals", stage: "Pending" },
  { label: "In Negotiation", stage: "In Negotiation" },
  { label: "Closed Won", stage: "Closed Won" },
  { label: "Closed Lost", stage: "Closed Lost" },
];

const STAGE_STATUS: Record<DealStage, string> = {
  Pending: "Pending",
  "In Negotiation": "In Negotiation",
  "Closed Won": "Closed Won",
  "Closed Lost": "Closed Lost",
};

export default function DealsDashboardPage() {
  const [tab, setTab] = useState<DealStage | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = deals;
    if (tab !== "All") list = list.filter((d) => d.stage === tab);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((d) => d.customerName.toLowerCase().includes(q) || d.interest.toLowerCase().includes(q));
    }
    return list;
  }, [tab, query]);

  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-extrabold text-[#0B1F13]">Deals</h1>
          <p className="mt-1 text-[13.5px] text-[#5F7168]">Track and manage your business deals.</p>
        </div>
        <button className="flex h-10 items-center gap-1.5 rounded-full bg-[#3E8130] px-4 text-[12.5px] font-semibold text-white hover:bg-[#2F6425]">
          <Plus className="h-3.5 w-3.5" />
          Add New Deal
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            <StatCard icon={Briefcase} iconBg="bg-[#EFF4FF]" iconColor="text-[#2F6FE4]" label="Total Deals" value={dealOverview.total} change={dealOverview.changeVsLastWeek.total} />
            <StatCard icon={Clock} iconBg="bg-[#FDF3E4]" iconColor="text-[#B87A17]" label="Pending Deals" value={dealOverview.pending} change={dealOverview.changeVsLastWeek.pending} />
            <StatCard icon={UserCheck} iconBg="bg-[#F1EEFC]" iconColor="text-[#6D5FD1]" label="In Negotiation" value={dealOverview.negotiation} change={dealOverview.changeVsLastWeek.negotiation} />
            <StatCard icon={CheckCircle2} iconBg="bg-[#EAF6DF]" iconColor="text-[#2F6F18]" label="Closed Won" value={dealOverview.closedWon} change={dealOverview.changeVsLastWeek.closedWon} />
            <StatCard icon={XCircle} iconBg="bg-[#FDECEC]" iconColor="text-[#D51F1F]" label="Closed Lost" value={dealOverview.closedLost} change={dealOverview.changeVsLastWeek.closedLost} />
          </div>

          <div className="mt-3">
            <StatCard
              icon={MoveUpRight}
              iconBg="bg-[#EAF6DF]"
              iconColor="text-[#2F6F18]"
              label="Total Deal Value"
              value={`AED ${dealOverview.totalValue.toLocaleString()}`}
              change={dealOverview.changeVsLastWeek.totalValue}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-[#E5EAE3] bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF1EC] pb-3">
              <div className="flex flex-wrap gap-1">
                {TABS.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setTab(t.stage)}
                    className={
                      "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors " +
                      (tab === t.stage ? "bg-[#3E8130] text-white" : "text-[#5F7168] hover:bg-[#F4F9F1]")
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5F7168]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search deals..."
                  className="h-9 w-[180px] rounded-full border border-[#DDE6DC] bg-white pl-8 pr-3 text-[12px] outline-none focus:border-[#3E8130]"
                />
              </div>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-[12.5px]">
                <thead>
                  <tr className="text-[10.5px] uppercase tracking-wide text-[#5F7168]">
                    <th className="pb-2 font-semibold">Deal ID</th>
                    <th className="pb-2 font-semibold">Customer Name</th>
                    <th className="pb-2 font-semibold">Business Interest</th>
                    <th className="pb-2 font-semibold">Deal Value (AED)</th>
                    <th className="pb-2 font-semibold">Stage</th>
                    <th className="pb-2 font-semibold">Expected Closing Date</th>
                    <th className="pb-2 font-semibold">Owner</th>
                    <th className="pb-2 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.id} className="border-t border-[#EEF1EC]">
                      <td className="py-2.5 font-semibold text-[#3E8130]">{d.id}</td>
                      <td className="py-2.5 font-semibold text-[#0B1F13]">{d.customerName}</td>
                      <td className="py-2.5 text-[#3D4B44]">{d.interest}</td>
                      <td className="py-2.5 font-semibold text-[#0B1F13]">{d.value.toLocaleString()}</td>
                      <td className="py-2.5">
                        <StatusBadge status={STAGE_STATUS[d.stage]} />
                      </td>
                      <td className="py-2.5 text-[#5F7168]">{d.closingDate}</td>
                      <td className="py-2.5 text-[#5F7168]">{d.owner}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-1.5 text-[#5F7168]">
                          <button className="rounded p-1 hover:bg-[#F4F9F1] hover:text-[#3E8130]">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1 hover:bg-[#F4F9F1] hover:text-[#3E8130]">
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-[#5F7168]">
                        No deals match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
            <p className="text-[14px] font-bold text-[#0B1F13]">Deals Analytics (This Week)</p>
            <div className="mt-4 flex flex-col items-center gap-4">
              <DonutChart
                segments={[
                  { label: "Closed Won", value: dealOverview.closedWon, color: "#2F6F18" },
                  { label: "Pending", value: dealOverview.pending, color: "#B87A17" },
                  { label: "In Negotiation", value: dealOverview.negotiation, color: "#6D5FD1" },
                  { label: "Closed Lost", value: dealOverview.closedLost, color: "#D51F1F" },
                ]}
                total={dealOverview.total}
                totalLabel="Total"
                size={150}
                thickness={20}
              />
              {[
                ["Closed Won", dealOverview.closedWon, "#2F6F18"],
                ["Pending", dealOverview.pending, "#B87A17"],
                ["In Negotiation", dealOverview.negotiation, "#6D5FD1"],
                ["Closed Lost", dealOverview.closedLost, "#D51F1F"],
              ].map(([label, value, color]) => (
                <div key={label as string} className="flex w-full items-center justify-between text-[11.5px]">
                  <span className="flex items-center gap-1.5 text-[#3D4B44]">
                    <span className="h-2 w-2 rounded-full" style={{ background: color as string }} />
                    {label}
                  </span>
                  <span className="font-semibold text-[#0B1F13]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
            <p className="text-[14px] font-bold text-[#0B1F13]">Deals Value by Stage</p>
            <div className="mt-4 flex flex-col gap-3">
              {dealOverview.byStage.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-[#3D4B44]">{s.label}</span>
                    <span className="font-semibold text-[#0B1F13]">
                      AED {s.value.toLocaleString()} ({s.pct}%)
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EEF1EC]">
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}
