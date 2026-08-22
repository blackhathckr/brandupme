"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Download,
  Eye,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  UserCheck,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { DonutChart } from "@/components/business/donut-chart";
import { StatCard } from "@/components/business/stat-card";
import { StatusBadge } from "@/components/business/status-badge";
import { leadOverview, leads, type LeadStatus } from "@/lib/dashboard-sample-data";

const TABS: { label: string; status: LeadStatus | "All" }[] = [
  { label: "All Leads", status: "All" },
  { label: "New Leads", status: "New" },
  { label: "Pending Leads", status: "Pending" },
  { label: "In Negotiation", status: "In Negotiation" },
  { label: "Closed Leads", status: "Closed" },
  { label: "Rejected Leads", status: "Rejected" },
];

export default function LeadsDashboardPage() {
  const [tab, setTab] = useState<LeadStatus | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = leads;
    if (tab !== "All") list = list.filter((l) => l.status === tab);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((l) => l.name.toLowerCase().includes(q) || l.interest.toLowerCase().includes(q));
    }
    return list;
  }, [tab, query]);

  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-extrabold text-[#0B1F13]">Leads Overview</h1>
          <p className="mt-1 text-[13.5px] text-[#5F7168]">Manage, track and convert your business leads.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex h-10 items-center gap-1.5 rounded-full border border-[#DDE6DC] px-4 text-[12.5px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]">
            <Download className="h-3.5 w-3.5" />
            Export Leads
          </button>
          <button className="flex h-10 items-center gap-1.5 rounded-full bg-[#3E8130] px-4 text-[12.5px] font-semibold text-white hover:bg-[#2F6425]">
            <Plus className="h-3.5 w-3.5" />
            Add Note / Follow-Up
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard icon={UserPlus} iconBg="bg-[#EFF4FF]" iconColor="text-[#2F6FE4]" label="Total Leads" value={leadOverview.total} change={leadOverview.changeVsLastWeek.total} />
            <StatCard icon={UserPlus} iconBg="bg-[#EFF4FF]" iconColor="text-[#2F6FE4]" label="New Leads" value={leadOverview.new} change={leadOverview.changeVsLastWeek.new} />
            <StatCard icon={Users} iconBg="bg-[#FDF3E4]" iconColor="text-[#B87A17]" label="Pending Leads" value={leadOverview.pending} change={leadOverview.changeVsLastWeek.pending} />
            <StatCard icon={UserCheck} iconBg="bg-[#F1EEFC]" iconColor="text-[#6D5FD1]" label="In Negotiation" value={leadOverview.negotiation} change={leadOverview.changeVsLastWeek.negotiation} />
            <StatCard icon={CheckCircle2} iconBg="bg-[#EAF6DF]" iconColor="text-[#2F6F18]" label="Closed Leads" value={leadOverview.closed} change={leadOverview.changeVsLastWeek.closed} />
            <StatCard icon={XCircle} iconBg="bg-[#FDECEC]" iconColor="text-[#D51F1F]" label="Rejected Leads" value={leadOverview.rejected} change={leadOverview.changeVsLastWeek.rejected} />
          </div>

          <div className="mt-4 rounded-2xl border border-[#E5EAE3] bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF1EC] pb-3">
              <div className="flex flex-wrap gap-1">
                {TABS.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setTab(t.status)}
                    className={
                      "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors " +
                      (tab === t.status ? "bg-[#3E8130] text-white" : "text-[#5F7168] hover:bg-[#F4F9F1]")
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
                  placeholder="Search leads..."
                  className="h-9 w-[180px] rounded-full border border-[#DDE6DC] bg-white pl-8 pr-3 text-[12px] outline-none focus:border-[#3E8130]"
                />
              </div>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-[12.5px]">
                <thead>
                  <tr className="text-[10.5px] uppercase tracking-wide text-[#5F7168]">
                    <th className="pb-2 font-semibold">Lead ID</th>
                    <th className="pb-2 font-semibold">Name</th>
                    <th className="pb-2 font-semibold">Business Interest</th>
                    <th className="pb-2 font-semibold">Source</th>
                    <th className="pb-2 font-semibold">Contact</th>
                    <th className="pb-2 font-semibold">Received On</th>
                    <th className="pb-2 font-semibold">Status</th>
                    <th className="pb-2 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} className="border-t border-[#EEF1EC]">
                      <td className="py-2.5 font-semibold text-[#3E8130]">{l.id}</td>
                      <td className="py-2.5 font-semibold text-[#0B1F13]">{l.name}</td>
                      <td className="py-2.5 text-[#3D4B44]">{l.interest}</td>
                      <td className="py-2.5 text-[#3D4B44]">{l.source}</td>
                      <td className="py-2.5 text-[#5F7168]">
                        <p>{l.phone}</p>
                        <p>{l.email}</p>
                      </td>
                      <td className="py-2.5 text-[#5F7168]">{l.receivedOn}</td>
                      <td className="py-2.5">
                        <StatusBadge status={l.status} />
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-1.5 text-[#5F7168]">
                          <button className="rounded p-1 hover:bg-[#F4F9F1] hover:text-[#3E8130]">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1 hover:bg-[#F4F9F1] hover:text-[#3E8130]">
                            <MessageSquare className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1 hover:bg-[#F4F9F1] hover:text-[#3E8130]">
                            <Phone className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1 hover:bg-[#F4F9F1] hover:text-[#3E8130]">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-[#5F7168]">
                        No leads match your filters.
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
            <p className="text-[14px] font-bold text-[#0B1F13]">Lead Source Analytics (This Week)</p>
            <div className="mt-4 flex flex-col items-center gap-4">
              <DonutChart segments={leadOverview.sourceAnalytics.map((s) => ({ label: s.label, value: s.value, color: s.color }))} total={86} totalLabel="Total" size={150} thickness={20} />
              <div className="flex w-full flex-col gap-1.5">
                {leadOverview.sourceAnalytics.map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-[11.5px]">
                    <span className="flex items-center gap-1.5 text-[#3D4B44]">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                      {s.label}
                    </span>
                    <span className="font-semibold text-[#0B1F13]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
            <p className="text-[14px] font-bold text-[#0B1F13]">Lead Funnel</p>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { label: "Total Leads", value: 86, max: 86, color: "#3E8130" },
                { label: "New Leads", value: 7, max: 86, color: "#2F6FE4" },
                { label: "Pending Leads", value: 9, max: 86, color: "#B87A17" },
                { label: "In Negotiation", value: 3, max: 86, color: "#6D5FD1" },
                { label: "Closed Leads", value: 15, max: 86, color: "#2F6F18" },
                { label: "Rejected Leads", value: 4, max: 86, color: "#D51F1F" },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-[#3D4B44]">{r.label}</span>
                    <span className="font-semibold text-[#0B1F13]">{r.value}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EEF1EC]">
                    <div className="h-full rounded-full" style={{ width: `${(r.value / r.max) * 100}%`, background: r.color }} />
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
