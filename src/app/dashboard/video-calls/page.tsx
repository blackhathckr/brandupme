"use client";

import { useMemo, useState } from "react";
import { Calendar, CheckCircle2, Clock, MoreHorizontal, Phone, RotateCcw, Search, Video, XCircle } from "lucide-react";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { DonutChart } from "@/components/business/donut-chart";
import { StatCard } from "@/components/business/stat-card";
import { StatusBadge } from "@/components/business/status-badge";
import { callOverview, videoCalls, type CallStatus } from "@/lib/dashboard-sample-data";

const TABS: { label: string; status: CallStatus | "All" }[] = [
  { label: "All Calls", status: "All" },
  { label: "Upcoming", status: "Upcoming" },
  { label: "Pending Requests", status: "Pending" },
  { label: "Rescheduled", status: "Rescheduled" },
  { label: "Completed", status: "Completed" },
  { label: "Rejected / Cancelled", status: "Rejected" },
];

const PURPOSE_COLORS = ["#3E8130", "#2F6FE4", "#E07A1F", "#6D5FD1", "#B0BAB4"];

export default function VideoCallsDashboardPage() {
  const [tab, setTab] = useState<CallStatus | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = videoCalls;
    if (tab !== "All") list = list.filter((c) => c.status === tab);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((c) => c.customerName.toLowerCase().includes(q) || c.purpose.toLowerCase().includes(q));
    }
    return list;
  }, [tab, query]);

  return (
    <DashboardShell>
      <div>
        <h1 className="text-[24px] font-extrabold text-[#0B1F13]">Video Calls</h1>
        <p className="mt-1 text-[13.5px] text-[#5F7168]">Manage your video call requests and schedules.</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StatCard icon={Video} iconBg="bg-[#EFF4FF]" iconColor="text-[#2F6FE4]" label="Total Requests" value={callOverview.total} change={callOverview.changeVsLastWeek.total} />
            <StatCard icon={Calendar} iconBg="bg-[#EFF4FF]" iconColor="text-[#2F6FE4]" label="Upcoming Calls" value={callOverview.upcoming} change={callOverview.changeVsLastWeek.upcoming} />
            <StatCard icon={Clock} iconBg="bg-[#FDF3E4]" iconColor="text-[#B87A17]" label="Pending Requests" value={callOverview.pending} change={callOverview.changeVsLastWeek.pending} />
            <StatCard icon={RotateCcw} iconBg="bg-[#F1EEFC]" iconColor="text-[#6D5FD1]" label="Rescheduled" value={callOverview.rescheduled} change={callOverview.changeVsLastWeek.rescheduled} />
            <StatCard icon={CheckCircle2} iconBg="bg-[#EAF6DF]" iconColor="text-[#2F6F18]" label="Completed" value={callOverview.completed} change={callOverview.changeVsLastWeek.completed} />
            <StatCard icon={XCircle} iconBg="bg-[#FDECEC]" iconColor="text-[#D51F1F]" label="Rejected / Cancelled" value={callOverview.rejected} change={callOverview.changeVsLastWeek.rejected} />
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
                  placeholder="Search calls..."
                  className="h-9 w-[180px] rounded-full border border-[#DDE6DC] bg-white pl-8 pr-3 text-[12px] outline-none focus:border-[#3E8130]"
                />
              </div>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-[12.5px]">
                <thead>
                  <tr className="text-[10.5px] uppercase tracking-wide text-[#5F7168]">
                    <th className="whitespace-nowrap pb-2 pr-4 font-semibold">Request ID</th>
                    <th className="whitespace-nowrap pb-2 pr-4 font-semibold">Customer Name</th>
                    <th className="pb-2 pr-4 font-semibold">Purpose</th>
                    <th className="whitespace-nowrap pb-2 pr-4 font-semibold">Requested On</th>
                    <th className="whitespace-nowrap pb-2 pr-4 font-semibold">Preferred Date &amp; Time</th>
                    <th className="whitespace-nowrap pb-2 pr-4 font-semibold">Status</th>
                    <th className="whitespace-nowrap pb-2 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-t border-[#EEF1EC]">
                      <td className="whitespace-nowrap py-2.5 pr-4 font-semibold text-[#3E8130]">{c.id}</td>
                      <td className="whitespace-nowrap py-2.5 pr-4 font-semibold text-[#0B1F13]">{c.customerName}</td>
                      <td className="py-2.5 pr-4 text-[#3D4B44]">{c.purpose}</td>
                      <td className="whitespace-nowrap py-2.5 pr-4 text-[#5F7168]">{c.requestedOn}</td>
                      <td className="whitespace-nowrap py-2.5 pr-4 text-[#5F7168]">{c.preferredDateTime}</td>
                      <td className="py-2.5">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-1.5 text-[#5F7168]">
                          {c.status === "Upcoming" || c.status === "Pending" ? (
                            <button className="rounded p-1 hover:bg-[#F4F9F1] hover:text-[#3E8130]">
                              <Video className="h-3.5 w-3.5" />
                            </button>
                          ) : (
                            <button className="rounded p-1 hover:bg-[#F4F9F1] hover:text-[#3E8130]">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button className="rounded p-1 hover:bg-[#F4F9F1] hover:text-[#3E8130]">
                            <Calendar className="h-3.5 w-3.5" />
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
                      <td colSpan={7} className="py-8 text-center text-[#5F7168]">
                        No calls match your filters.
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
            <p className="text-[14px] font-bold text-[#0B1F13]">Video Call Analytics (This Week)</p>
            <div className="mt-4 flex flex-col items-center gap-4">
              <DonutChart
                segments={[
                  { label: "Completed", value: callOverview.completed, color: "#2F6F18" },
                  { label: "Upcoming", value: callOverview.upcoming, color: "#2F6FE4" },
                  { label: "Pending", value: callOverview.pending, color: "#B87A17" },
                  { label: "Rescheduled", value: callOverview.rescheduled, color: "#6D5FD1" },
                  { label: "Rejected / Cancelled", value: callOverview.rejected, color: "#D51F1F" },
                ]}
                total={callOverview.total}
                totalLabel="Total"
                size={150}
                thickness={20}
              />
              {[
                ["Completed", callOverview.completed, "#2F6F18"],
                ["Upcoming", callOverview.upcoming, "#2F6FE4"],
                ["Pending", callOverview.pending, "#B87A17"],
                ["Rescheduled", callOverview.rescheduled, "#6D5FD1"],
                ["Rejected / Cancelled", callOverview.rejected, "#D51F1F"],
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
            <p className="text-[14px] font-bold text-[#0B1F13]">Top Call Purposes</p>
            <div className="mt-4 flex flex-col gap-3">
              {callOverview.purposes.map((p, i) => (
                <div key={p.label}>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-[#3D4B44]">{p.label}</span>
                    <span className="font-semibold text-[#0B1F13]">
                      {p.value} ({p.pct}%)
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EEF1EC]">
                    <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: PURPOSE_COLORS[i % PURPOSE_COLORS.length] }} />
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
