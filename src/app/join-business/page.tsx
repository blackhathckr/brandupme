"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, HeartHandshake, Sparkles, TrendingUp, Users } from "lucide-react";
import { OnboardingShell } from "@/components/business/onboarding-shell";
import { Step1Personal, type PersonalData } from "@/components/business/signup/step-1-personal";
import { Step2BusinessInfo, type BusinessInfoData } from "@/components/business/signup/step-2-business-info";
import { Step3BusinessProfile, type BusinessProfileData } from "@/components/business/signup/step-3-business-profile";
import { Step4Verification, type VerificationData } from "@/components/business/signup/step-4-verification";
import { Step5Plans } from "@/components/business/signup/step-5-plans";
import { Step5Review } from "@/components/business/signup/step-5-review";
import { Step5Payment } from "@/components/business/signup/step-5-payment";

const SIDE_PANELS: Record<number, { title: string; items: { title: string; copy: string; icon: React.ComponentType<{ className?: string }> }[] }> = {
  1: {
    title: "Why Join BrandUpMe?",
    items: [
      { title: "Connect", copy: "Connect with thousands of businesses and professionals.", icon: Users },
      { title: "Grow", copy: "Grow your business with smart tools and opportunities.", icon: TrendingUp },
      { title: "Succeed", copy: "Succeed in the UAE's most powerful business ecosystem.", icon: Award },
    ],
  },
  2: {
    title: "Why Complete Business Information?",
    items: [
      { title: "Better Visibility", copy: "Accurate information helps customers find your business easily.", icon: Users },
      { title: "Build Trust", copy: "Complete profiles build trust and credibility with your audience.", icon: HeartHandshake },
      { title: "More Opportunities", copy: "Increase your chances of getting leads and business opportunities.", icon: Sparkles },
      { title: "Local Reach", copy: "Your location helps local customers connect with you.", icon: TrendingUp },
    ],
  },
  3: {
    title: "Why Complete Your Business Profile?",
    items: [
      { title: "Build Trust", copy: "Complete profiles build trust and credibility with customers.", icon: HeartHandshake },
      { title: "More Engagement", copy: "Businesses with photos and social links get more engagement.", icon: Sparkles },
      { title: "Better Visibility", copy: "Stand out in search results and categories.", icon: TrendingUp },
      { title: "Stronger Connections", copy: "Help customers connect with you across different platforms.", icon: Users },
    ],
  },
  4: {
    title: "Why Verify Your Business?",
    items: [
      { title: "Build Trust", copy: "Verification helps build trust and credibility with customers.", icon: HeartHandshake },
      { title: "Higher Visibility", copy: "Verified businesses rank higher in search and get more visibility.", icon: TrendingUp },
      { title: "Better Opportunities", copy: "Get access to more leads, partnerships and opportunities.", icon: Sparkles },
      { title: "Secure Platform", copy: "We ensure a safe and trusted ecosystem for everyone.", icon: Users },
    ],
  },
};

type Stage5 = "plans" | "review" | "payment";

export default function JoinBusinessPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [stage5, setStage5] = useState<Stage5>("plans");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [totals, setTotals] = useState<{ planName: string; durationLabel: string; price: number; vat: number; total: number } | null>(null);

  const [personal, setPersonal] = useState<PersonalData>({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [business, setBusiness] = useState<BusinessInfoData>({
    name: "",
    category: "",
    subcategory: "",
    about: "",
    website: "",
    emirate: "",
    building: "",
    officeNo: "",
    area: "",
    landmark: "",
    areaCode: "",
    location: "",
  });
  const [profile, setProfile] = useState<BusinessProfileData>({
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    logo: null,
    images: [null, null, null, null, null],
  });
  const [verification, setVerification] = useState<VerificationData>({ tradeLicenseNumber: "", fileName: null });

  function goTo(n: number) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (step === 5) {
    if (stage5 === "plans") {
      return (
        <OnboardingShell step={5} wide>
          <Step5Plans
            onSelect={(key) => {
              setSelectedPlan(key);
              setStage5("review");
            }}
          />
        </OnboardingShell>
      );
    }
    if (stage5 === "review" && selectedPlan) {
      return (
        <OnboardingShell step={5} wide>
          <Step5Review
            planKey={selectedPlan}
            onBack={() => setStage5("plans")}
            onProceed={(t) => {
              setTotals(t);
              setStage5("payment");
            }}
          />
        </OnboardingShell>
      );
    }
    if (stage5 === "payment" && totals) {
      return (
        <OnboardingShell step={5} wide>
          <Step5Payment totals={totals} onBack={() => setStage5("review")} onFinish={() => router.push("/dashboard")} />
        </OnboardingShell>
      );
    }
  }

  const panel = SIDE_PANELS[step];

  return (
    <OnboardingShell step={step} sideTitle={panel?.title} sideItems={panel?.items}>
      {step === 1 && <Step1Personal data={personal} onChange={(d) => setPersonal((p) => ({ ...p, ...d }))} onNext={() => goTo(2)} />}
      {step === 2 && (
        <Step2BusinessInfo
          data={business}
          onChange={(d) => setBusiness((b) => ({ ...b, ...d }))}
          onNext={() => goTo(3)}
          onBack={() => goTo(1)}
        />
      )}
      {step === 3 && (
        <Step3BusinessProfile
          data={profile}
          onChange={(d) => setProfile((p) => ({ ...p, ...d }))}
          onNext={() => goTo(4)}
          onBack={() => goTo(2)}
        />
      )}
      {step === 4 && (
        <Step4Verification
          data={verification}
          onChange={(d) => setVerification((v) => ({ ...v, ...d }))}
          onNext={() => goTo(5)}
          onBack={() => goTo(3)}
        />
      )}
    </OnboardingShell>
  );
}
