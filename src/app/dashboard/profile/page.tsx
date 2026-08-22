import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { DashboardShell } from "@/components/business/dashboard-shell";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TikTokIcon, YoutubeIcon } from "@/components/ui/social-icons";

const TABS = [
  { label: "Personal Information", id: "personal-information" },
  { label: "Business Information", id: "business-information" },
  { label: "Business Address", id: "business-address" },
  { label: "Business Profile", id: "business-profile" },
  { label: "Website & Social Links", id: "website-social-links" },
  { label: "Business Images", id: "business-images" },
  { label: "Business Documents", id: "business-documents" },
];

const CHECKLIST = [
  { label: "Personal Information", done: true },
  { label: "Business Information", done: true },
  { label: "Business Address", done: true },
  { label: "Business Profile", done: true },
  { label: "Website & Social Links", done: true },
  { label: "Business Images", done: true },
  { label: "Business Documents", done: false },
];

const IMAGES = [
  { label: "Logo", src: "/avatar/standing.webp" },
  { label: "Cover Image", src: "/avatar/arms.webp" },
  { label: "Office Image 1", src: "/avatar/tablet.webp" },
  { label: "Office Image 2", src: "/avatar/laptop.webp" },
  { label: "Team Image", src: "/avatar/seated.webp" },
  { label: "Office Image 3", src: "/avatar/standing.webp" },
];

const DOCS = [
  { label: "Trade License", file: "1234567.pdf", size: "1.2 MB" },
  { label: "VAT Certificate", file: "vat_100225844900003.pdf", size: "890 KB" },
  { label: "Business Registration Certificate", file: "registration.pdf", size: "1.1 MB" },
  { label: "Passport / ID Proof", file: "owner_passport.pdf", size: "950 KB" },
  { label: "Logo Document", file: "logo.png", size: "420 KB" },
];

function Card({
  id,
  title,
  editHref,
  children,
}: {
  id: string;
  title: string;
  editHref: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24 rounded-2xl border border-[#E5EAE3] bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[14.5px] font-bold text-[#0B1F13]">{title}</p>
        <Link
          href={editHref}
          className="flex items-center gap-1.5 rounded-lg border border-[#DDE6DC] px-3 py-1.5 text-[11.5px] font-semibold text-[#0B1F13] hover:bg-[#F4F9F1]"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </Link>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Row({ label, value, verified }: { label: string; value: string; verified?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5 text-[12.5px]">
      <span className="shrink-0 text-[#5F7168]">{label}</span>
      <span className="flex min-w-0 flex-1 items-center justify-end gap-1.5 text-right font-semibold text-[#0B1F13]">
        <span className="min-w-0 break-words">{value}</span>
        {verified && (
          <span className="shrink-0 rounded bg-[#EAF6DF] px-1.5 py-0.5 text-[10px] font-bold text-[#2F6F18]">Verified</span>
        )}
      </span>
    </div>
  );
}

export default function MyProfilePage() {
  return (
    <DashboardShell>
      <h1 className="text-[24px] font-extrabold text-[#0B1F13]">My Profile</h1>
      <p className="mt-1 text-[13.5px] text-[#5F7168]">Manage your personal and business information.</p>

      <div className="mt-4 overflow-x-auto border-b border-[#E5EAE3]">
        <div className="flex min-w-max gap-6">
          {TABS.map((t, i) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className={
                "shrink-0 whitespace-nowrap border-b-2 py-2.5 text-[13px] font-semibold " +
                (i === 0 ? "border-[#3E8130] text-[#194C11]" : "border-transparent text-[#5F7168] hover:text-[#0B1F13]")
              }
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_300px]">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card id="personal-information" title="Personal Information" editHref="/dashboard/profile/personal-information">
              <div className="flex items-center gap-3">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image src="/avatar/seated.webp" alt="" fill sizes="64px" className="object-cover" />
                </span>
                <div className="min-w-0 flex-1">
                  <Row label="Full Name" value="Neha Sharma" />
                  <Row label="Email" value="neha@abcbusiness.ae" verified />
                  <Row label="Mobile" value="+971 50 123 4567" verified />
                  <Row label="Designation" value="Business Owner" />
                </div>
              </div>
            </Card>

            <Card id="business-information" title="Business Information" editHref="/dashboard/profile/business-information">
              <Row label="Business Name" value="ABC Business Setup Services" />
              <Row label="Category" value="Business Setup & Consultancy" />
              <Row label="Business Type" value="Limited Liability Company (LLC)" />
              <Row label="Year of Establishment" value="2020" />
              <Row label="Trade License No." value="1234567" />
              <Row label="Business Email" value="info@abcbusiness.ae" />
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card id="business-address" title="Business Address" editHref="/dashboard/profile/business-address">
              <p className="text-[13px] leading-relaxed text-[#3D4B44]">
                Office No. 510, Business Bay
                <br />
                Dubai, United Arab Emirates
              </p>
              <div className="mt-2 border-t border-[#EEF1EC] pt-2">
                <Row label="City" value="Dubai" />
                <Row label="Emirate" value="Dubai" />
                <Row label="Country" value="United Arab Emirates" />
                <Row label="ZIP / Postal Code" value="00000" />
              </div>
            </Card>

            <Card id="business-profile" title="Business Profile" editHref="/dashboard/profile/business-profile">
              <p className="text-[13px] font-semibold text-[#194C11]">Business Setup &amp; Growth Experts in UAE</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#3D4B44]">
                ABC Business Setup Services is a trusted business consultancy specializing in company formation, PRO
                services, corporate structuring, and VAT solutions in the UAE.
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Company Formation", "PRO Services", "VAT Registration"].map((t) => (
                  <span key={t} className="rounded-full bg-[#F4F9F1] px-2.5 py-1 text-[11px] font-medium text-[#194C11]">
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <Card id="website-social-links" title="Website & Social Links" editHref="/dashboard/profile/website-social-links">
            <p className="text-[12px] text-[#5F7168]">BrandUpMe Business Page</p>
            <a href="#" className="text-[13px] font-semibold text-[#3E8130] hover:underline">
              brandupme.ae/business/abc-business
            </a>
            <p className="mt-2 text-[12px] text-[#5F7168]">Your Website</p>
            <a href="#" className="text-[13px] font-semibold text-[#3E8130] hover:underline">
              https://www.abcbusiness.ae
            </a>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#EEF1EC] pt-3 sm:grid-cols-3">
              {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: LinkedinIcon, label: "LinkedIn" },
                { Icon: YoutubeIcon, label: "YouTube" },
                { Icon: TikTokIcon, label: "TikTok" },
              ].map(({ Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-[12px] text-[#3D4B44]">
                  <Icon className="h-3.5 w-3.5 text-[#5F7168]" />
                  {label}
                </span>
              ))}
            </div>
          </Card>

          <Card id="business-images" title="Business Images" editHref="/dashboard/profile/business-images">
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
              {IMAGES.map((img) => (
                <div key={img.label} className="flex flex-col items-center gap-1">
                  <span className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image src={img.src} alt={img.label} fill sizes="80px" className="object-cover" />
                  </span>
                  <span className="text-center text-[10px] leading-tight text-[#5F7168]">{img.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card id="business-documents" title="Business Documents" editHref="/dashboard/profile/business-documents">
            <div className="flex flex-col gap-2">
              {DOCS.map((d) => (
                <div key={d.label} className="flex items-center gap-3 rounded-lg border border-[#EEF1EC] p-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FDECEC] text-[#D51F1F]">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold text-[#0B1F13]">{d.label}</p>
                    <p className="text-[10.5px] text-[#5F7168]">
                      {d.file} · {d.size}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#EAF6DF] px-2 py-0.5 text-[10px] font-bold text-[#2F6F18]">Verified</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside>
          <div className="sticky top-[84px] rounded-2xl border border-[#E5EAE3] bg-white p-5 text-center">
            <p className="text-[14px] font-bold text-[#0B1F13]">Profile Completion</p>
            <div className="relative mx-auto mt-3 flex h-[110px] w-[110px] items-center justify-center">
              <svg viewBox="0 0 110 110" className="absolute inset-0 -rotate-90">
                <circle cx="55" cy="55" r="47" fill="none" stroke="#EEF1EC" strokeWidth="10" />
                <circle
                  cx="55"
                  cy="55"
                  r="47"
                  fill="none"
                  stroke="#3E8130"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 47 * 0.92} ${2 * Math.PI * 47}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[22px] font-extrabold text-[#0B1F13]">92%</span>
            </div>
            <p className="mt-2 text-[12px] font-semibold text-[#194C11]">Almost there!</p>
            <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#5F7168]">
              Complete your profile to get more visibility.
            </p>

            <div className="mt-4 flex flex-col gap-2 text-left">
              {CHECKLIST.map((c) => (
                <p key={c.label} className="flex items-center gap-2 text-[12px]">
                  {c.done ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#3E8130]" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[#E6A73B]" />
                  )}
                  <span className={c.done ? "text-[#0B1F13]" : "font-semibold text-[#0B1F13]"}>{c.label}</span>
                </p>
              ))}
            </div>

            <Link
              href="/dashboard/profile/business-documents"
              className="mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-[#3E8130] text-[12.5px] font-semibold text-white hover:bg-[#2F6425]"
            >
              Complete Remaining
            </Link>
          </div>
        </aside>
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#DDE6DC] bg-[#F4F9F1] p-4">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#194C11]" />
        <p className="text-[12.5px] text-[#194C11]">Keep your profile updated to increase trust, visibility and get more leads from customers.</p>
      </div>
    </DashboardShell>
  );
}
