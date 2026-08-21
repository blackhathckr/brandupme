import {
  Calendar,
  Download,
  Globe2,
  Info,
  Mail,
  MessageSquare,
  Phone,
  Share2,
  TrendingUp,
  Video,
} from "lucide-react";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { DonutChart } from "@/components/business/donut-chart";
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon, TikTokIcon } from "@/components/ui/social-icons";

const TABS = ["Overview", "BrandUpMe Business Page", "Your Website", "SEO Performance", "Website Visitors", "Link Clicks", "Traffic Sources"];

const STATS = [
  { label: "BrandUpMe Page Views", value: "2,450", change: 18.6, icon: Globe2 },
  { label: "Unique Visitors", value: "1,820", change: 15.3, icon: Share2 },
  { label: "Your Website Clicks", value: 183, change: 22.5, icon: Globe2 },
  { label: "Social Link Clicks", value: 266, change: 16.1, icon: Share2 },
  { label: "Customer Inquiries", value: 86, change: 20.3, icon: MessageSquare },
  { label: "Video Call Requests", value: 24, change: 14.2, icon: Video },
];

const TRAFFIC = [
  { label: "SEO / Organic Search", value: 1036, pct: 42, color: "#2F6FE4" },
  { label: "Direct Web Page", value: 686, pct: 28, color: "#2F6F18" },
  { label: "Digital Business Card", value: 294, pct: 12, color: "#7C5CD1" },
  { label: "Social Media", value: 245, pct: 10, color: "#E07A1F" },
  { label: "BrandUpMe Search", value: 122, pct: 5, color: "#D1418E" },
  { label: "Other Sources", value: 67, pct: 3, color: "#B0BAB4" },
];

const CLICKS_OVERVIEW = [
  { label: "Your Website Clicks", value: 183, change: 22.5, icon: Globe2 },
  { label: "WhatsApp Clicks", value: 152, change: 17.8, icon: MessageSquare },
  { label: "Phone Clicks", value: 142, change: 19.6, icon: Phone },
  { label: "Email Clicks", value: 74, change: 12.3, icon: Mail },
  { label: "Social Media Clicks", value: 266, change: 16.1, icon: Share2 },
  { label: "Inquiry Submissions", value: 86, change: 20.3, icon: MessageSquare },
  { label: "Video Call Requests", value: 24, change: 14.2, icon: Video },
];

const SOCIAL_LINKS = [
  { label: "Instagram", value: 126, pct: 16.4, icon: InstagramIcon },
  { label: "Facebook", value: 52, pct: 10.2, icon: FacebookIcon },
  { label: "LinkedIn", value: 41, pct: 14.7, icon: LinkedinIcon },
  { label: "YouTube", value: 29, pct: 8.6, icon: YoutubeIcon },
  { label: "TikTok", value: 18, pct: 6.3, icon: TikTokIcon },
];

const TOP_PAGES = [
  { page: "Home / Overview", views: 856, change: 18.2 },
  { page: "Services / Company Formation", views: 642, change: 20.5 },
  { page: "Services / PRO Services", views: 398, change: 15.1 },
  { page: "About Us", views: 312, change: 12.7 },
  { page: "Contact Us", views: 242, change: 10.8 },
];

export default function WebsiteSeoPage() {
  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-extrabold text-[#0B1F13]">Website, SEO &amp; Traffic</h1>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex h-10 items-center gap-1.5 rounded-full border border-[#DDE6DC] px-4 text-[12.5px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]">
            <Calendar className="h-3.5 w-3.5" />
            12 Aug 2026 - 18 Aug 2026
          </button>
          <button className="flex h-10 items-center gap-1.5 rounded-full border border-[#DDE6DC] px-4 text-[12.5px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]">
            <Download className="h-3.5 w-3.5" />
            Download Report
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto border-b border-[#E5EAE3]">
        <div className="flex min-w-max gap-6">
          {TABS.map((t, i) => (
            <span key={t} className={"shrink-0 whitespace-nowrap border-b-2 py-2.5 text-[13px] font-semibold " + (i === 0 ? "border-[#3E8130] text-[#194C11]" : "border-transparent text-[#5F7168]/60")}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-[#E5EAE3] bg-white p-3.5">
            <s.icon className="h-4 w-4 text-[#5F7168]" />
            <p className="mt-1.5 text-[10.5px] leading-tight text-[#5F7168]">{s.label}</p>
            <p className="text-[17px] font-extrabold text-[#0B1F13]">{s.value}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[#2F6F18]">
              <TrendingUp className="h-3 w-3" />
              {s.change}% vs last 7 days
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-bold text-[#0B1F13]">BrandUpMe Business Page Performance</p>
            <button className="text-[11.5px] font-semibold text-[#3E8130] hover:underline">View Details</button>
          </div>
          <div className="mt-4 flex h-[140px] gap-3 border-b border-[#EEF1EC] pb-2">
            {[40, 62, 55, 78, 60, 90, 70].map((h, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div className="w-full rounded-t-md bg-[#3E8130]/80" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-[#5F7168]">
            {["12 Aug", "13 Aug", "14 Aug", "15 Aug", "16 Aug", "17 Aug", "18 Aug"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#EEF1EC] pt-4 sm:grid-cols-4">
            {[
              ["Page Views", "2,450"],
              ["Unique Visitors", "1,820"],
              ["Avg. Time on Page", "02:34"],
              ["Bounce Rate", "48.6%"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[10.5px] text-[#5F7168]">{label}</p>
                <p className="text-[15px] font-extrabold text-[#0B1F13]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-bold text-[#0B1F13]">Traffic Source Overview</p>
            <button className="text-[11px] font-semibold text-[#3E8130] hover:underline">View Details</button>
          </div>
          <div className="mt-4 flex justify-center">
            <DonutChart segments={TRAFFIC.map((t) => ({ label: t.label, value: t.value, color: t.color }))} total="2,450" totalLabel="Total Visitors" size={130} thickness={18} />
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            {TRAFFIC.map((t) => (
              <div key={t.label} className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-[#3D4B44]">
                  <span className="h-2 w-2 rounded-full" style={{ background: t.color }} />
                  {t.label}
                </span>
                <span className="font-semibold text-[#0B1F13]">
                  {t.value} ({t.pct}%)
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#F4F9F1] p-2.5 text-[11px] text-[#194C11]">
            <TrendingUp className="h-3.5 w-3.5 shrink-0" />
            SEO is your top traffic source this week.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-bold text-[#0B1F13]">Your Website Clicks From BrandUpMe</p>
            <button className="text-[11px] font-semibold text-[#3E8130] hover:underline">View Details</button>
          </div>
          <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-[#EEF1EC] p-3">
            <Globe2 className="h-5 w-5 shrink-0 text-[#3E8130]" />
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-semibold text-[#0B1F13]">www.abcbusiness.ae</p>
              <span className="text-[10px] font-bold text-[#2F6F18]">Active</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-[11.5px]">
            <div>
              <p className="text-[#5F7168]">Total Clicks</p>
              <p className="text-[16px] font-extrabold text-[#0B1F13]">183</p>
            </div>
            <div>
              <p className="text-[#5F7168]">Unique Clickers</p>
              <p className="text-[16px] font-extrabold text-[#0B1F13]">151</p>
            </div>
          </div>
          <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-[#F4F9F1] p-2.5 text-[10.5px] text-[#194C11]">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            BrandUpMe tracks clicks from our platform to your external website.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-bold text-[#0B1F13]">Top Clicked Social Links</p>
            <button className="text-[11px] font-semibold text-[#3E8130] hover:underline">View Details</button>
          </div>
          <div className="mt-3 flex flex-col gap-2.5">
            {SOCIAL_LINKS.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 text-[11.5px]">
                <s.icon className="h-4 w-4 shrink-0 text-[#5F7168]" />
                <span className="w-16 shrink-0 text-[#3D4B44]">{s.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEF1EC]">
                  <div className="h-full rounded-full bg-[#3E8130]" style={{ width: `${s.pct * 5}%` }} />
                </div>
                <span className="w-8 shrink-0 text-right font-semibold text-[#0B1F13]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-bold text-[#0B1F13]">Website &amp; Link Clicks Overview</p>
            <button className="text-[11px] font-semibold text-[#3E8130] hover:underline">View Details</button>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {CLICKS_OVERVIEW.map((c) => (
              <div key={c.label} className="flex items-center justify-between text-[11.5px]">
                <span className="flex items-center gap-1.5 text-[#3D4B44]">
                  <c.icon className="h-3.5 w-3.5 text-[#5F7168]" />
                  {c.label}
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#0B1F13]">
                  {c.value}
                  <span className="text-[10px] font-normal text-[#2F6F18]">↑{c.change}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-[13.5px] font-bold text-[#0B1F13]">Top Performing Pages</p>
            <button className="text-[11px] font-semibold text-[#3E8130] hover:underline">View Details</button>
          </div>
          <table className="mt-3 w-full text-left text-[12px]">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-wide text-[#5F7168]">
                <th className="pb-2 font-semibold">Page Name</th>
                <th className="pb-2 font-semibold">Page Views</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PAGES.map((p) => (
                <tr key={p.page} className="border-t border-[#EEF1EC]">
                  <td className="py-2 text-[#3D4B44]">{p.page}</td>
                  <td className="py-2 font-semibold text-[#0B1F13]">
                    {p.views} <span className="text-[10px] font-normal text-[#2F6F18]">↑{p.change}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl bg-[#F4F9F1] p-5">
          <p className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#194C11]">
            <TrendingUp className="h-4 w-4" />
            Insight for You
          </p>
          <p className="mt-1 text-[12.5px] text-[#3D4B44]">Your total traffic increased by 18.6% this week! Keep sharing your business card and optimizing your services to get more leads.</p>
          <button className="mt-3 flex h-9 items-center gap-1.5 rounded-full bg-[#3E8130] px-4 text-[11.5px] font-semibold text-white hover:bg-[#2F6425]">View Full Analytics</button>

          <div className="mt-4 flex flex-col gap-2 border-t border-[#DDE6DC] pt-4 text-[11px]">
            <p className="flex items-center justify-between">
              <span className="text-[#5F7168]">Best Source</span>
              <span className="font-semibold text-[#0B1F13]">SEO / Organic Search</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="text-[#5F7168]">Most Clicked Link</span>
              <span className="font-semibold text-[#0B1F13]">Your Website</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="text-[#5F7168]">Most Engaging Page</span>
              <span className="font-semibold text-[#0B1F13]">Home / Overview</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
