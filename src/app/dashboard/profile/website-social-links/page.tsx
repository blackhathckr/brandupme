"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { ProfileStepPage } from "@/components/business/profile-step-page";
import { Field, inputClass, labelClass } from "@/components/business/signup/field-kit";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TikTokIcon, YoutubeIcon } from "@/components/ui/social-icons";

export default function WebsiteSocialLinksStepPage() {
  const [website, setWebsite] = useState("https://www.abcbusiness.ae");
  const [social, setSocial] = useState({
    facebook: "https://facebook.com/abcbusiness",
    instagram: "https://instagram.com/abcbusiness",
    linkedin: "https://linkedin.com/company/abc-business",
    youtube: "https://youtube.com/@abcbusiness",
    tiktok: "https://tiktok.com/@abcbusiness",
  });

  return (
    <ProfileStepPage
      step={4}
      title="Website & Social Links"
      subtitle="Add your website and social media profiles."
      why={["Increase engagement", "Build brand presence", "Drive more traffic"]}
      whyIcon={Users}
      prevHref="/dashboard/profile/business-profile"
      nextHref="/dashboard/profile/business-images"
    >
      <div className="flex flex-col gap-5">
        <Field label="Your Website">
          <input value={website} onChange={(e) => setWebsite(e.target.value)} className={inputClass} />
        </Field>
        <div>
          <p className={labelClass}>Social Media Links</p>
          <div className="mt-1.5 flex flex-col gap-3">
            {(
              [
                ["facebook", FacebookIcon],
                ["instagram", InstagramIcon],
                ["linkedin", LinkedinIcon],
                ["youtube", YoutubeIcon],
                ["tiktok", TikTokIcon],
              ] as const
            ).map(([key, Icon]) => (
              <div key={key} className="relative">
                <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F7168]" />
                <input value={social[key]} onChange={(e) => setSocial((s) => ({ ...s, [key]: e.target.value }))} className={inputClass + " pl-10"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfileStepPage>
  );
}
