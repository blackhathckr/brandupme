"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Eye,
  EyeOff,
  Lock,
  LockKeyhole,
  Mail,
  Megaphone,
  Network,
  ShieldCheck,
  ShoppingCart,
  Star,
  Store,
  User,
  Users,
  UserRound,
} from "lucide-react";
import { ModalPage } from "@/components/site/modal-page";

const ACCOUNT_TYPES = [
  "Business Owner",
  "Category Referral Partner",
  "Business Referral Partner",
  "Influencer Discovery",
  "Promoter",
  "Customer",
];

const ROLE_CARDS = [
  { name: "Business Owner", icon: UserRound },
  { name: "Category Referral Partner", icon: Network },
  { name: "Business Referral Partner", icon: Briefcase },
  { name: "Influencer", icon: UserRound },
  { name: "Promoter", icon: Megaphone },
  { name: "Customer", icon: Users },
];

const FORGOT_STEPS = ["Email", "Verify Code", "Reset Password"];

type Screen = "login" | "forgot-email" | "forgot-verify" | "forgot-reset" | "forgot-success" | "create-account";

function Logo() {
  return (
    <div className="mx-auto flex h-[78px] w-[78px] items-center justify-center rounded-full border border-[#DDE5DE] bg-white shadow-sm">
      <Image src="/brand/logo-mark.png" alt="BrandUpMe" width={44} height={44} className="h-11 w-11 object-contain" />
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Back"
      className="mb-1 -ml-1.5 flex h-8 w-8 items-center justify-center rounded-full text-[#58635B] transition-colors hover:bg-[#F4F9F1]"
    >
      <ChevronLeft className="h-4 w-4" />
    </button>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <div className="mx-auto mt-4 flex max-w-[300px] items-start">
      {FORGOT_STEPS.map((label, i) => {
        const step = i + 1;
        const active = step === current;
        const done = step < current;
        return (
          <div key={label} className={"flex items-center " + (i < FORGOT_STEPS.length - 1 ? "flex-1" : "")}>
            <div className="flex shrink-0 flex-col items-center gap-1">
              <span
                className={
                  "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-colors " +
                  (active || done ? "bg-[#5D8F23] text-white" : "border border-[#DDE5DE] text-[#58635B]")
                }
              >
                {step}
              </span>
              <span className={"whitespace-nowrap text-[9.5px] font-medium " + (active ? "text-[#101510]" : "text-[#58635B]")}>
                {label}
              </span>
            </div>
            {i < FORGOT_STEPS.length - 1 && (
              <span className={"mx-1.5 mb-4 h-px flex-1 " + (done ? "bg-[#5D8F23]" : "bg-[#DDE5DE]")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SecurityStrip() {
  return (
    <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-[#DDE5DE] bg-[#FAFCF9] px-4 py-3">
      <ShieldCheck className="h-4 w-4 shrink-0 text-[#6FA52B]" />
      <div>
        <p className="text-[12px] font-bold text-[#101510]">Secure. Trusted. Reliable.</p>
        <p className="text-[11px] text-[#58635B]">Your data is protected with enterprise-grade security.</p>
      </div>
    </div>
  );
}

function passwordStrength(pw: string) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH_LABEL = ["Weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["text-[#D51F1F]", "text-[#D51F1F]", "text-[#D6A928]", "text-[#5D8F23]", "text-[#5D8F23]"];

function EcosystemLineArt() {
  return (
    <div className="relative mx-auto mt-5 h-[70px] w-full max-w-[380px] text-[#C7DDB5]">
      <svg viewBox="0 0 380 70" fill="none" className="absolute inset-0 h-full w-full">
        <path d="M30 15 Q65 8 95 40" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
        <path d="M92 15 Q140 12 185 35" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
        <path d="M288 15 Q240 12 195 35" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
        <path d="M350 15 Q318 8 288 42" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
      </svg>
      <User className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2" style={{ left: "30px", top: "14px" }} strokeWidth={1.6} />
      <User className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2" style={{ left: "92px", top: "14px" }} strokeWidth={1.6} />
      <Building2 className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2" style={{ left: "97px", top: "42px" }} strokeWidth={1.6} />
      <Store className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2" style={{ left: "190px", top: "38px" }} strokeWidth={1.6} />
      <Building2 className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2" style={{ left: "283px", top: "42px" }} strokeWidth={1.6} />
      <ShoppingCart className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2" style={{ left: "325px", top: "52px" }} strokeWidth={1.6} />
      <User className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2" style={{ left: "288px", top: "14px" }} strokeWidth={1.6} />
      <User className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2" style={{ left: "350px", top: "14px" }} strokeWidth={1.6} />
    </div>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function LoginPage() {
  const [screen, setScreen] = useState<Screen>("login");
  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeError, setCodeError] = useState(false);
  const [resendNotice, setResendNotice] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [expiry, setExpiry] = useState(165);
  const [redirectIn, setRedirectIn] = useState(3);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    if (screen !== "forgot-verify" || expiry <= 0) return;
    const t = setTimeout(() => setExpiry((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, expiry]);

  useEffect(() => {
    if (screen !== "forgot-success") return;
    if (redirectIn <= 0) {
      setScreen("login");
      return;
    }
    const t = setTimeout(() => setRedirectIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, redirectIn]);

  const maskedEmail = email.includes("@") ? email.replace(/^(.{2}).*(@.*)$/, "$1***$2") : "your email";

  function goToVerify() {
    setCooldown(30);
    setExpiry(165);
    setCode(["", "", "", "", "", ""]);
    setCodeError(false);
    setScreen("forgot-verify");
  }

  function verifyCode() {
    if (code.some((c) => c === "")) {
      setCodeError(true);
      return;
    }
    setCodeError(false);
    setScreen("forgot-reset");
  }

  function resendCode() {
    setCooldown(30);
    setExpiry(165);
    setResendNotice(true);
    setTimeout(() => setResendNotice(false), 3500);
  }

  return (
    <ModalPage maxWidth={540}>
      <div className="px-7 py-8">
        {screen === "login" && (
          <>
            <Logo />
            <h1 className="mt-4 text-center text-[28px] font-bold text-[#101510]">Welcome Back!</h1>
            <p className="mt-1 text-center text-[13.5px] text-[#58635B]">
              Login to your BrandUpMe account and access your dashboard.
            </p>

            <EcosystemLineArt />

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label className="text-[13px] font-semibold text-[#101510]">Select Account Type</label>
                <div className="relative mt-1.5">
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="h-11 w-full appearance-none rounded-[9px] border border-[#DDE5DE] bg-white px-3.5 pr-9 text-[14px] text-[#101510] outline-none focus:border-[#6FA52B]"
                  >
                    <option value="">Select Account Type</option>
                    {ACCOUNT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#58635B]" />
                </div>
                <p className="mt-1.5 text-[10.5px] leading-[1.5] text-[#58635B]/70">{ACCOUNT_TYPES.join(" | ")}</p>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#101510]">User ID (Email)</label>
                <div className="relative mt-1.5">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@domain.com"
                    className="h-11 w-full rounded-[9px] border border-[#DDE5DE] px-3.5 pr-10 text-[14px] text-[#101510] outline-none placeholder:text-[#58635B]/50 focus:border-[#6FA52B]"
                  />
                  <Mail className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#58635B]" />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#101510]">Password</label>
                <div className="relative mt-1.5">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 w-full rounded-[9px] border border-[#DDE5DE] px-3.5 pr-10 text-[14px] text-[#101510] outline-none placeholder:text-[#58635B]/50 focus:border-[#6FA52B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#58635B]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setScreen("forgot-email");
                  }}
                  className="mt-1.5 block w-full text-right text-[12.5px] font-medium text-[#5D8F23] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button className="flex h-[45px] items-center justify-center gap-2 rounded-[9px] bg-gradient-to-r from-[#6FA52B] to-[#4a7a1a] text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
                Login
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#58635B]/50">
                <span className="h-px flex-1 bg-[#DDE5DE]" />
                OR
                <span className="h-px flex-1 bg-[#DDE5DE]" />
              </div>

              <p className="text-center text-[13px] text-[#58635B]">New to BrandUpMe?</p>
              <button
                onClick={() => setScreen("create-account")}
                className="flex h-[45px] items-center justify-center gap-2 rounded-[9px] border border-[#6FA52B] text-[14px] font-semibold text-[#5D8F23] transition-colors hover:bg-[#F4F9F1]"
              >
                <Users className="h-4 w-4" />
                Create New Account
              </button>
            </div>

            <SecurityStrip />
          </>
        )}

        {screen === "forgot-email" && (
          <>
            <BackButton onClick={() => setScreen("login")} />
            <Logo />
            <h1 className="mt-4 text-center text-[26px] font-bold text-[#101510]">Forgot Password?</h1>
            <p className="mx-auto mt-1 max-w-[340px] text-center text-[13.5px] leading-[1.5] text-[#58635B]">
              Don&rsquo;t worry! It happens. Enter your email address and we&rsquo;ll help you reset your password.
            </p>

            <div className="relative mx-auto mt-4 flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#EAF6DF]" />
              <Lock className="relative h-7 w-7 text-[#5D8F23]" strokeWidth={1.8} />
            </div>

            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label className="text-[13px] font-semibold text-[#101510]">User ID (Email)</label>
                <div className="relative mt-1.5">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@domain.com"
                    className="h-11 w-full rounded-[9px] border border-[#DDE5DE] px-3.5 pr-10 text-[14px] text-[#101510] outline-none placeholder:text-[#58635B]/50 focus:border-[#6FA52B]"
                  />
                  <Mail className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#58635B]" />
                </div>
              </div>
              <button
                onClick={goToVerify}
                className="flex h-[45px] items-center justify-center gap-2 rounded-[9px] bg-gradient-to-r from-[#6FA52B] to-[#4a7a1a] text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Send Verification Code
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-[12.5px] text-[#58635B]">
                Remember your password?{" "}
                <button onClick={() => setScreen("login")} className="font-medium text-[#5D8F23] hover:underline">
                  Back to Login
                </button>
              </p>
            </div>
          </>
        )}

        {screen === "forgot-verify" && (
          <>
            <BackButton onClick={() => setScreen("forgot-email")} />
            <Logo />
            <Stepper current={2} />
            <h1 className="mt-4 text-center text-[24px] font-bold text-[#101510]">Verify Your Email</h1>
            <p className="mx-auto mt-1 max-w-[320px] text-center text-[13.5px] leading-[1.5] text-[#58635B]">
              We&rsquo;ve sent a 6-digit verification code to{" "}
              <span className="font-semibold text-[#101510]">{maskedEmail}</span>
            </p>

            <div className="relative mx-auto mt-4 flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#EAF6DF]" />
              <Mail className="relative h-6 w-6 text-[#5D8F23]" strokeWidth={1.8} />
            </div>

            <p className="mt-5 text-center text-[12.5px] font-semibold text-[#101510]">Enter 6-Digit Code</p>
            <div className="mt-2 flex justify-center gap-2">
              {code.map((c, i) => (
                <input
                  key={i}
                  value={c}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 1);
                    setCode((prev) => prev.map((p, j) => (j === i ? v : p)));
                    setCodeError(false);
                  }}
                  maxLength={1}
                  inputMode="numeric"
                  className={
                    "h-12 w-10 rounded-[9px] border text-center text-[18px] font-semibold text-[#101510] outline-none focus:border-[#6FA52B] " +
                    (codeError ? "border-[#D51F1F]" : "border-[#DDE5DE]")
                  }
                />
              ))}
            </div>
            {codeError && (
              <p className="mt-2 text-center text-[12px] font-medium text-[#D51F1F]">
                Please enter the 6-digit code
              </p>
            )}
            {resendNotice && (
              <p className="mt-2 rounded-lg bg-[#EAF6DF] px-3 py-2 text-center text-[12px] font-medium text-[#4a7a1a]">
                A new code has been sent to your email.
              </p>
            )}
            <p className="mt-2 text-center text-[11.5px] text-[#58635B]">
              Code expires in {formatTime(expiry)}
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={verifyCode}
                className="flex h-[45px] items-center justify-center gap-2 rounded-[9px] bg-gradient-to-r from-[#6FA52B] to-[#4a7a1a] text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Verify Code
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-[12.5px] text-[#58635B]">
                Didn&rsquo;t receive code?{" "}
                <button
                  disabled={cooldown > 0}
                  onClick={resendCode}
                  className="font-medium text-[#5D8F23] hover:underline disabled:text-[#58635B]/40 disabled:no-underline"
                >
                  {cooldown > 0 ? `Resend Code in ${cooldown}s` : "Resend Code"}
                </button>
              </p>
            </div>
          </>
        )}

        {screen === "forgot-reset" && (
          <>
            <BackButton onClick={() => setScreen("forgot-verify")} />
            <Logo />
            <Stepper current={3} />
            <h1 className="mt-4 text-center text-[24px] font-bold text-[#101510]">Reset Your Password</h1>
            <p className="mx-auto mt-1 max-w-[300px] text-center text-[13.5px] leading-[1.5] text-[#58635B]">
              Great! Now set a new password for your account.
            </p>

            <div className="relative mx-auto mt-4 flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#EAF6DF]" />
              <LockKeyhole className="relative h-6 w-6 text-[#5D8F23]" strokeWidth={1.8} />
            </div>

            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label className="text-[13px] font-semibold text-[#101510]">New Password</label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1.5 h-11 w-full rounded-[9px] border border-[#DDE5DE] px-3.5 text-[14px] text-[#101510] outline-none placeholder:text-[#58635B]/50 focus:border-[#6FA52B]"
                />
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex flex-1 gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={
                          "h-1 flex-1 rounded-full transition-colors " +
                          (i < passwordStrength(newPassword) ? "bg-[#5D8F23]" : "bg-[#DDE5DE]")
                        }
                      />
                    ))}
                  </div>
                  {newPassword && (
                    <span className={"text-[11px] font-semibold " + STRENGTH_COLOR[passwordStrength(newPassword)]}>
                      {STRENGTH_LABEL[passwordStrength(newPassword)]}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-[13px] font-semibold text-[#101510]">Confirm New Password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Re-enter your password"
                  className="mt-1.5 h-11 w-full rounded-[9px] border border-[#DDE5DE] px-3.5 text-[14px] text-[#101510] outline-none placeholder:text-[#58635B]/50 focus:border-[#6FA52B]"
                />
              </div>
              <button
                onClick={() => {
                  setRedirectIn(3);
                  setScreen("forgot-success");
                }}
                className="flex h-[45px] items-center justify-center gap-2 rounded-[9px] bg-gradient-to-r from-[#6FA52B] to-[#4a7a1a] text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Submit New Password
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        {screen === "forgot-success" && (
          <>
            <div className="relative mx-auto mt-4 flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[#5D8F23]" />
              <CheckCircle2 className="relative h-9 w-9 text-white" strokeWidth={1.8} />
            </div>
            <h1 className="mt-4 text-center text-[24px] font-bold text-[#101510]">Password Reset Successful!</h1>
            <p className="mx-auto mt-1.5 max-w-[320px] text-center text-[13.5px] leading-[1.5] text-[#58635B]">
              Your password has been updated successfully. You can now login with your new password.
            </p>

            <div className="mt-5 rounded-xl bg-[#EAF6DF] px-4 py-3 text-center">
              <p className="text-[12.5px] text-[#3D4B34]">
                You will be redirected to the login page in a few seconds&hellip;
              </p>
              <p className="mt-1 text-[20px] font-extrabold text-[#5D8F23]">{String(redirectIn).padStart(2, "0")}</p>
            </div>

            <button
              onClick={() => setScreen("login")}
              className="mt-5 flex h-[45px] w-full items-center justify-center gap-2 rounded-[9px] bg-gradient-to-r from-[#6FA52B] to-[#4a7a1a] text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Go to Login
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-center text-[11.5px] text-[#58635B]">Redirecting automatically&hellip;</p>
          </>
        )}

        {screen === "create-account" && (
          <>
            <BackButton onClick={() => setScreen("login")} />
            <Logo />
            <h1 className="mt-4 text-center text-[26px] font-bold text-[#101510]">Create Your Account</h1>
            <p className="mx-auto mt-1 max-w-[320px] text-center text-[13.5px] leading-[1.5] text-[#58635B]">
              Select the account type that best describes you to get started.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {ROLE_CARDS.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-[#DDE5DE] p-3 text-center transition-all hover:-translate-y-0.5 hover:border-[#6FA52B] hover:bg-[#F4F9F1]"
                >
                  <span className="relative flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#EFF7E9] text-[#5D8F23]">
                    <Icon className="h-7 w-7" strokeWidth={1.7} />
                    {name === "Influencer" && (
                      <Star className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 fill-[#5D8F23] text-[#5D8F23]" strokeWidth={2} />
                    )}
                  </span>
                  <p className="text-[12.5px] font-semibold leading-tight text-[#101510]">{name}</p>
                </button>
              ))}
            </div>
            <SecurityStrip />
          </>
        )}
      </div>
    </ModalPage>
  );
}
