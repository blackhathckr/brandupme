import { ChevronDown, Headset, Mail } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden bg-[#020D06] text-[#9DB3A3] lg:block">
      <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between px-8 text-[12.5px]">
        <span className="font-medium text-[#B7C7BC]">UAE&apos;s Smart Business Ecosystem</span>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1.5 transition-colors hover:text-white">
            UAE
            <ChevronDown className="h-3 w-3" />
          </button>
          <span className="h-3 w-px bg-white/10" />
          <a href="#" className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Headset className="h-3.5 w-3.5" />
            Support
          </a>
          <span className="h-3 w-px bg-white/10" />
          <a
            href="mailto:info@brandupme.ae"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" />
            info@brandupme.ae
          </a>
        </div>
      </div>
    </div>
  );
}
