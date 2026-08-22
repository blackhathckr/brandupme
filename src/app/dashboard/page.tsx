import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Mail,
  MessageSquare,
  Phone,
  Rocket,
  Send,
  Share2,
  UserCheck,
  UserPlus,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { DonutChart } from "@/components/business/donut-chart";
import { StatCard } from "@/components/business/stat-card";
import { StatusBadge } from "@/components/business/status-badge";
import { leadOverview, leads, websiteTrafficSources } from "@/lib/dashboard-sample-data";

const TOP_ACTIONS = [
  { label: "Visit Website", value: 183, icon: Globe2 },
  { label: "WhatsApp Clicks", value: 152, icon: MessageSquare },
  { label: "Phone Clicks", value: 142, icon: Phone },
  { label: "Email Clicks", value: 74, icon: Mail },
  { label: "Social Media Clicks", value: 266, icon: Share2 },
  { label: "Inquiry Submissions", value: 86, icon: Send },
  { label: "Video Call Requests", value: 24, icon: Video },
];

const FUNNEL = [
  { label: "Received", value: 86, icon: UserPlus, color: "text-[#2F6FE4]", bg: "bg-[#EFF4FF]" },
  { label: "Pending", value: 21, icon: Users, color: "text-[#B87A17]", bg: "bg-[#FDF3E4]" },
  { label: "Negotiation", value: 14, icon: UserCheck, color: "text-[#6D5FD1]", bg: "bg-[#F1EEFC]" },
  { label: "Closed", value: 38, icon: CheckCircle2, color: "text-[#2F6F18]", bg: "bg-[#EAF6DF]" },
  { label: "Rejected", value: 13, icon: XCircle, color: "text-[#D51F1F]", bg: "bg-[#FDECEC]" },
];

const TOP_LINK_CLICKS = [
  { label: "Website", value: 73, icon: Globe2 },
  { label: "WhatsApp", value: 61, icon: MessageSquare },
  { label: "Instagram", value: 48, icon: InstagramIcon },
  { label: "Email", value: 14, icon: Mail },
  { label: "LinkedIn", value: 8, icon: LinkedinIcon },
  { label: "YouTube", value: 5, icon: YoutubeIcon },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#E5EAE3] bg-white p-5 lg:col-span-1">
          <div className="flex-1">
            <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#5F7168]">
              <Send className="h-3.5 w-3.5 text-[#3E8130]" />
              Your Current Plan
            </p>
            <p className="mt-1 text-[18px] font-extrabold text-[#0B1F13]">TESTER PLAN</p>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEF1EC]">
                <div className="h-full w-2/3 rounded-full bg-[#3E8130]" />
              </div>
              <span className="text-[11px] font-semibold text-[#5F7168]">66%</span>
            </div>
            <p className="mt-1 text-[11px] text-[#5F7168]">AED 10 / Day · 10 Days Remaining</p>
            <div className="mt-3 flex gap-2">
              <button className="h-9 flex-1 rounded-lg border border-[#DDE6DC] text-[12px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]">Renew Plan</button>
              <button className="h-9 flex-1 rounded-lg bg-[#3E8130] text-[12px] font-semibold text-white hover:bg-[#2F6425]">Upgrade Plan</button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF6DF] text-[#2F6F18]">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[12.5px] text-[#5F7168]">Business Status</p>
            <p className="text-[16px] font-extrabold text-[#2F6F18]">Active</p>
            <p className="text-[11px] text-[#5F7168]">Your business is active and visible on BrandUpMe.</p>
            <Link href="/dashboard/website-seo" className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#3E8130] hover:underline">
              View Business Page
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <DonutChart segments={[{ label: "Complete", value: 92, color: "#3E8130" }, { label: "Remaining", value: 8, color: "#EEF1EC" }]} total="92%" totalLabel="" size={72} thickness={8} />
          <div>
            <p className="text-[13px] font-bold text-[#0B1F13]">Profile Completion</p>
            <p className="text-[11px] text-[#5F7168]">Almost there! Complete your profile to get more visibility.</p>
            <Link href="/dashboard/profile" className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#3E8130] hover:underline">
              Complete Profile
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        <StatCard icon={UserPlus} iconBg="bg-[#EFF4FF]" iconColor="text-[#2F6FE4]" label="Leads Received" value={86} change={18.6} />
        <StatCard icon={Users} iconBg="bg-[#FDF3E4]" iconColor="text-[#B87A17]" label="Leads Pending" value={21} change={16.7} />
        <StatCard icon={UserCheck} iconBg="bg-[#F1EEFC]" iconColor="text-[#6D5FD1]" label="Leads in Negotiation" value={14} change={12.5} />
        <StatCard icon={CheckCircle2} iconBg="bg-[#EAF6DF]" iconColor="text-[#2F6F18]" label="Leads Closed" value={38} change={20} />
        <StatCard icon={XCircle} iconBg="bg-[#FDECEC]" iconColor="text-[#D51F1F]" label="Leads Rejected" value={13} change={-11.1} />
        <StatCard icon={Globe2} iconBg="bg-[#EFF4FF]" iconColor="text-[#2F6FE4]" label="Total Website Visitors" value="2,450" change={16.5} />
        <StatCard icon={MessageSquare} iconBg="bg-[#EAF6DF]" iconColor="text-[#2F6F18]" label="Customer Inquiries" value={86} change={20.3} />
        <StatCard icon={Video} iconBg="bg-[#F1EEFC]" iconColor="text-[#6D5FD1]" label="Video Call Requests" value={24} change={14.2} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <p className="text-[14px] font-bold text-[#0B1F13]">Traffic &amp; Source Overview</p>
          <div className="mt-4 flex items-center gap-5">
            <DonutChart
              segments={websiteTrafficSources.sources.map((s) => ({ label: s.label, value: s.value, color: s.color }))}
              total={websiteTrafficSources.total.toLocaleString()}
              totalLabel="Total Visitors"
            />
            <div className="flex flex-1 flex-col gap-1.5">
              {websiteTrafficSources.sources.map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-2 text-[11.5px]">
                  <span className="flex items-center gap-1.5 text-[#3D4B44]">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-semibold text-[#0B1F13]">
                    {s.value} <span className="text-[#5F7168]">({s.pct}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <p className="text-[14px] font-bold text-[#0B1F13]">Top Actions on Your Web Page</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {TOP_ACTIONS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between text-[12.5px]">
                <span className="flex items-center gap-2 text-[#3D4B44]">
                  <Icon className="h-3.5 w-3.5 text-[#5F7168]" />
                  {label}
                </span>
                <span className="font-semibold text-[#0B1F13]">{value}</span>
              </div>
            ))}
          </div>
          <Link href="/dashboard/website-seo" className="mt-3 flex items-center gap-1 text-[11.5px] font-semibold text-[#3E8130] hover:underline">
            View All Analytics
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <p className="text-[14px] font-bold text-[#0B1F13]">Lead Funnel Overview</p>
          <div className="mt-5 flex items-center justify-between">
            {FUNNEL.map(({ label, value, icon: Icon, color, bg }, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <span className={"flex h-11 w-11 items-center justify-center rounded-full " + bg + " " + color}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[11px] font-semibold text-[#0B1F13]">{label}</p>
                  <p className="text-[13px] font-extrabold text-[#0B1F13]">{value}</p>
                </div>
                {i < FUNNEL.length - 1 && <span className="mx-1 mb-6 text-[#DDE6DC]">···</span>}
              </div>
            ))}
          </div>
          <Link href="/dashboard/leads" className="mt-5 flex items-center gap-1 text-[11.5px] font-semibold text-[#3E8130] hover:underline">
            View All Leads
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="min-w-0 rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-bold text-[#0B1F13]">Latest Leads</p>
            <Link href="/dashboard/leads" className="flex items-center gap-1 text-[11.5px] font-semibold text-[#3E8130] hover:underline">
              View All Leads
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-[12px]">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-[#5F7168]">
                  <th className="pb-2 font-semibold">Name</th>
                  <th className="pb-2 font-semibold">Business Interest</th>
                  <th className="pb-2 font-semibold">Source</th>
                  <th className="pb-2 font-semibold">Received On</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id} className="border-t border-[#EEF1EC]">
                    <td className="py-2.5 font-semibold text-[#0B1F13]">{l.name}</td>
                    <td className="py-2.5 text-[#3D4B44]">{l.interest}</td>
                    <td className="py-2.5 text-[#3D4B44]">{l.source}</td>
                    <td className="py-2.5 text-[#5F7168]">{l.receivedOn}</td>
                    <td className="py-2.5">
                      <StatusBadge status={l.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-bold text-[#0B1F13]">Digital Business Card Overview</p>
            <Link href="/dashboard/digital-card" className="flex items-center gap-1 text-[11.5px] font-semibold text-[#3E8130] hover:underline">
              View Card Analytics
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] text-[#5F7168]">Card Shared</p>
              <p className="text-[18px] font-extrabold text-[#0B1F13]">326</p>
            </div>
            <div>
              <p className="text-[11px] text-[#5F7168]">Card Opens</p>
              <p className="text-[18px] font-extrabold text-[#0B1F13]">184</p>
            </div>
            <div>
              <p className="text-[11px] text-[#5F7168]">Link Clicks</p>
              <p className="text-[18px] font-extrabold text-[#0B1F13]">243</p>
            </div>
            <div>
              <p className="text-[11px] text-[#5F7168]">Website Clicks</p>
              <p className="text-[18px] font-extrabold text-[#0B1F13]">73</p>
            </div>
          </div>
          <p className="mt-4 text-[12px] font-bold text-[#0B1F13]">Top Link Clicks</p>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {TOP_LINK_CLICKS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between text-[11.5px]">
                <span className="flex items-center gap-1.5 text-[#3D4B44]">
                  <Icon className="h-3.5 w-3.5 text-[#5F7168]" />
                  {label}
                </span>
                <span className="font-semibold text-[#0B1F13]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#F4F9F1] px-6 py-5 sm:flex-row">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#3E8130] sm:flex">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[14px] font-bold text-[#0B1F13]">Unlock More Growth Opportunities 🚀</p>
            <p className="text-[12.5px] text-[#5F7168]">Upgrade your plan to get more visibility, generate more leads and grow your business faster.</p>
          </div>
        </div>
        <Link href="#" className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#3E8130] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#2F6425]">
          Explore Plans &amp; Upgrade
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </DashboardShell>
  );
}
