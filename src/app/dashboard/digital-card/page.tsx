"use client";

import { useState } from "react";
import {
  Copy,
  Download,
  Globe2,
  Mail,
  MessageSquare,
  Phone,
  Pencil,
  QrCode,
  Share2,
  ShieldCheck,
  Smartphone,
  Tablet,
  TrendingUp,
} from "lucide-react";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { DonutChart } from "@/components/business/donut-chart";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/social-icons";

const TABS = ["My Digital Card", "Share Card", "Card Analytics", "Card Opens", "Link Clicks", "Sharing Sources", "QR Code"];

const LINK_CLICKS = [
  { label: "Your Website", value: 73, pct: 30, color: "#2F6FE4" },
  { label: "WhatsApp", value: 61, pct: 25.1, color: "#2F6F18" },
  { label: "Phone Calls", value: 32, pct: 13.2, color: "#B87A17" },
  { label: "Instagram", value: 48, pct: 19.8, color: "#D1418E" },
  { label: "Email", value: 14, pct: 5.8, color: "#E07A1F" },
  { label: "LinkedIn", value: 8, pct: 3.3, color: "#0A66C2" },
  { label: "YouTube", value: 5, pct: 2.1, color: "#D51F1F" },
  { label: "Others", value: 2, pct: 0.8, color: "#B0BAB4" },
];

const TRAFFIC_SOURCES = [
  { label: "WhatsApp", value: 78, pct: 42.4, color: "#2F6F18" },
  { label: "Instagram", value: 46, pct: 25, color: "#D1418E" },
  { label: "Email", value: 24, pct: 13, color: "#E07A1F" },
  { label: "Facebook", value: 18, pct: 9.8, color: "#2F6FE4" },
  { label: "LinkedIn", value: 10, pct: 5.4, color: "#0A66C2" },
  { label: "QR Code", value: 6, pct: 3.3, color: "#6D5FD1" },
  { label: "Others", value: 2, pct: 1.1, color: "#B0BAB4" },
];

const RECENT_OPENS = [
  { visitor: "User from WhatsApp", source: "WhatsApp", device: "Android Mobile", location: "Dubai, UAE", time: "18 Aug 2026, 10:42 AM" },
  { visitor: "User from Instagram", source: "Instagram", device: "iPhone 14", location: "Sharjah, UAE", time: "18 Aug 2026, 09:15 AM" },
  { visitor: "User from Email", source: "Email", device: "Windows Desktop", location: "Abu Dhabi, UAE", time: "18 Aug 2026, 08:32 AM" },
  { visitor: "User from LinkedIn", source: "LinkedIn", device: "Android Mobile", location: "Dubai, UAE", time: "18 Aug 2026, 07:50 AM" },
  { visitor: "User from Facebook", source: "Facebook", device: "iPhone 13", location: "Dubai, UAE", time: "18 Aug 2026, 07:30 AM" },
];

const DEVICES = [
  { label: "Mobile", value: 142, pct: 77.2, icon: Smartphone },
  { label: "Desktop", value: 28, pct: 15.2, icon: Globe2 },
  { label: "Tablet", value: 14, pct: 7.6, icon: Tablet },
];

const TIPS = [
  "Share your card on WhatsApp — it gets the highest engagement.",
  "Add your website — drive more traffic to your business.",
  "Keep your card updated — refresh info and images regularly.",
  "Use the QR code in print materials to help offline customers reach you.",
];

export default function DigitalCardPage() {
  const [copied, setCopied] = useState(false);
  const cardLink = "https://brandupme.ae/biz/abc-business";

  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-extrabold text-[#0B1F13]">Digital Business Card</h1>
          <p className="mt-1 text-[13.5px] text-[#5F7168]">Create, customize, share and track your digital business card.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex h-10 items-center gap-1.5 rounded-full border border-[#DDE6DC] px-4 text-[12.5px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]">Preview Card</button>
          <button className="flex h-10 items-center gap-1.5 rounded-full bg-[#3E8130] px-4 text-[12.5px] font-semibold text-white hover:bg-[#2F6425]">
            <Pencil className="h-3.5 w-3.5" />
            Edit Card
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

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
          <p className="text-[13.5px] font-bold text-[#0B1F13]">Digital Card Preview</p>
          <div className="relative mt-3 overflow-hidden rounded-2xl bg-[#0B1F3A] p-5 text-white">
            <div className="flex items-center justify-center">
              <span className="rounded-lg bg-white px-4 py-2 text-center text-[13px] font-extrabold leading-tight text-[#0B1F3A]">
                ABC
                <br />
                <span className="text-[9px] font-semibold tracking-wide">BUSINESS SETUP</span>
              </span>
            </div>
            <p className="mt-3 text-center text-[14px] font-bold">ABC Business Setup Services</p>
            <p className="text-center text-[11px] text-white/60">Business Setup &amp; Consultancy</p>
            <p className="text-center text-[11px] text-white/60">Dubai, UAE</p>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[9.5px] text-white/70">
              <span className="flex flex-col items-center gap-1">
                <Phone className="h-4 w-4" />
                Call
              </span>
              <span className="flex flex-col items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </span>
              <span className="flex flex-col items-center gap-1">
                <Mail className="h-4 w-4" />
                Email
              </span>
              <span className="flex flex-col items-center gap-1">
                <Globe2 className="h-4 w-4" />
                Website
              </span>
            </div>
            <button className="mt-4 flex h-9 w-full items-center justify-center rounded-lg bg-[#3E8130] text-[12px] font-semibold">Send Inquiry</button>
            <button className="mt-2 flex h-9 w-full items-center justify-center rounded-lg bg-white text-[12px] font-semibold text-[#0B1F3A]">Save Contact</button>
            <div className="mt-3 flex items-center justify-center gap-3 text-white/70">
              <FacebookIcon className="h-4 w-4" />
              <InstagramIcon className="h-4 w-4" />
              <LinkedinIcon className="h-4 w-4" />
              <YoutubeIcon className="h-4 w-4" />
            </div>
          </div>

          <p className="mt-4 text-[12.5px] font-bold text-[#0B1F13]">Card Sharing</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[
              { label: "Share via WhatsApp", icon: MessageSquare },
              { label: "Share via Email", icon: Mail },
              { label: "Share via QR Code", icon: QrCode },
              { label: "Share Link", icon: Share2 },
            ].map(({ label, icon: Icon }) => (
              <button key={label} className="flex items-center gap-1.5 rounded-lg border border-[#E5EAE3] px-3 py-2 text-[11.5px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]">
                <Icon className="h-3.5 w-3.5 text-[#3E8130]" />
                {label}
              </button>
            ))}
          </div>

          <p className="mt-3 text-[11.5px] text-[#5F7168]">Your Card Link</p>
          <div className="mt-1 flex items-center gap-2">
            <input readOnly value={cardLink} className="h-9 flex-1 rounded-lg border border-[#DDE6DC] bg-[#FAFCF9] px-3 text-[12px] text-[#3D4B44]" />
            <button
              onClick={() => {
                navigator.clipboard?.writeText(cardLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="flex h-9 shrink-0 items-center gap-1 rounded-lg border border-[#DDE6DC] px-3 text-[11.5px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]"
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Card Opens", 184, "16.5%"],
              ["Unique Visitors", 151, "14.2%"],
              ["Link Clicks", 243, "19.8%"],
              ["Website Clicks", 73, "17.9%"],
            ].map(([label, value, change]) => (
              <div key={label as string} className="rounded-xl border border-[#E5EAE3] bg-white p-3.5">
                <p className="text-[11px] text-[#5F7168]">{label}</p>
                <p className="text-[19px] font-extrabold text-[#0B1F13]">{value}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-[#2F6F18]">
                  <TrendingUp className="h-3 w-3" />
                  {change}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
              <p className="text-[13.5px] font-bold text-[#0B1F13]">Link Click Analytics</p>
              <div className="mt-4 flex items-center gap-4">
                <DonutChart segments={LINK_CLICKS.map((l) => ({ label: l.label, value: l.value, color: l.color }))} total={243} totalLabel="Total Clicks" size={110} thickness={14} />
                <div className="flex flex-1 flex-col gap-1 text-[10.5px]">
                  {LINK_CLICKS.slice(0, 5).map((l) => (
                    <div key={l.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#3D4B44]">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.color }} />
                        {l.label}
                      </span>
                      <span className="font-semibold text-[#0B1F13]">{l.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
              <p className="text-[13.5px] font-bold text-[#0B1F13]">Traffic Sources (Card Opens)</p>
              <div className="mt-4 flex items-center gap-4">
                <DonutChart segments={TRAFFIC_SOURCES.map((l) => ({ label: l.label, value: l.value, color: l.color }))} total={184} totalLabel="Total Opens" size={110} thickness={14} />
                <div className="flex flex-1 flex-col gap-1 text-[10.5px]">
                  {TRAFFIC_SOURCES.slice(0, 5).map((l) => (
                    <div key={l.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#3D4B44]">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.color }} />
                        {l.label}
                      </span>
                      <span className="font-semibold text-[#0B1F13]">{l.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
              <p className="text-[13.5px] font-bold text-[#0B1F13]">Device &amp; Platform</p>
              <div className="mt-3 flex flex-col gap-3">
                {DEVICES.map((d) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between text-[11.5px]">
                      <span className="flex items-center gap-1.5 text-[#3D4B44]">
                        <d.icon className="h-3.5 w-3.5 text-[#5F7168]" />
                        {d.label}
                      </span>
                      <span className="font-semibold text-[#0B1F13]">
                        {d.value} ({d.pct}%)
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EEF1EC]">
                      <div className="h-full rounded-full bg-[#3E8130]" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-[13.5px] font-bold text-[#0B1F13]">QR Code</p>
              </div>
              <p className="text-[11.5px] text-[#5F7168]">Scan this QR code to view your digital business card.</p>
              <div className="mt-3 flex flex-col items-center gap-3">
                <div className="flex h-[110px] w-[110px] items-center justify-center rounded-xl border border-[#E5EAE3] bg-white">
                  <QrCode className="h-16 w-16 text-[#0B1F13]" />
                </div>
                <div className="flex w-full gap-2">
                  <button className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#3E8130] text-[11.5px] font-semibold text-white hover:bg-[#2F6425]">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#DDE6DC] text-[11.5px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]">
                    Print QR Code
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[13.5px] font-bold text-[#0B1F13]">Recent Card Open Activity</p>
              <button className="text-[11.5px] font-semibold text-[#3E8130] hover:underline">View All Activity</button>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-[12px]">
                <thead>
                  <tr className="text-[10.5px] uppercase tracking-wide text-[#5F7168]">
                    <th className="pb-2 font-semibold">Visitor</th>
                    <th className="pb-2 font-semibold">Source</th>
                    <th className="pb-2 font-semibold">Device</th>
                    <th className="pb-2 font-semibold">Location</th>
                    <th className="pb-2 font-semibold">Opened On</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_OPENS.map((r) => (
                    <tr key={r.visitor + r.time} className="border-t border-[#EEF1EC]">
                      <td className="py-2 text-[#3D4B44]">{r.visitor}</td>
                      <td className="py-2 text-[#3D4B44]">{r.source}</td>
                      <td className="py-2 text-[#5F7168]">{r.device}</td>
                      <td className="py-2 text-[#5F7168]">{r.location}</td>
                      <td className="py-2 text-[#5F7168]">{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
              <p className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#0B1F13]">
                <ShieldCheck className="h-4 w-4 text-[#2F6F18]" />
                Card Status
              </p>
              <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#EAF6DF] px-2.5 py-0.5 text-[11px] font-bold text-[#2F6F18]">Active</p>
              <p className="mt-2 text-[12px] text-[#5F7168]">Your digital business card is active and visible to everyone.</p>
              <div className="mt-2 flex flex-col gap-1 text-[11.5px] text-[#3D4B44]">
                <p>
                  Card Created On <span className="float-right font-semibold text-[#0B1F13]">10 May 2025, 10:30 AM</span>
                </p>
                <p>
                  Last Updated <span className="float-right font-semibold text-[#0B1F13]">18 Aug 2026, 09:20 AM</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5EAE3] bg-white p-5">
              <p className="text-[13.5px] font-bold text-[#0B1F13]">Tips to Get More Clicks</p>
              <div className="mt-2 flex flex-col gap-1.5">
                {TIPS.map((t) => (
                  <p key={t} className="flex items-start gap-1.5 text-[11.5px] text-[#3D4B44]">
                    <span className="mt-0.5 text-[#3E8130]">✓</span>
                    {t}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
