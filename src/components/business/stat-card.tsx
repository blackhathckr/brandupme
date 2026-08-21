import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  sub,
  change,
}: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string | number;
  sub?: string;
  change?: number;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#E5EAE3] bg-white p-4">
      <span className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-full " + iconBg + " " + iconColor}>
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="text-[11.5px] leading-tight text-[#5F7168]">{label}</p>
        <p className="text-[20px] font-extrabold leading-tight text-[#0B1F13]">{value}</p>
        {(sub || typeof change === "number") && (
          <p className="mt-0.5 flex items-center gap-1 text-[10.5px]">
            {typeof change === "number" && (
              <span className={"flex items-center " + (change >= 0 ? "text-[#2F6F18]" : "text-[#D51F1F]")}>
                {change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(change)}%
              </span>
            )}
            {sub && <span className="text-[#5F7168]">{sub}</span>}
          </p>
        )}
      </div>
    </div>
  );
}
