export const inputClass =
  "h-11 w-full rounded-[9px] border border-[#DDE6DC] bg-white px-3.5 text-[14px] text-[#0B1F13] outline-none placeholder:text-[#5F7168]/60 focus:border-[#3E8130]";

export const labelClass = "text-[13px] font-semibold text-[#0B1F13]";

export function Field({
  label,
  required,
  optional,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-[#D51F1F]">*</span>}
        {optional && <span className="font-normal text-[#5F7168]"> (Optional)</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1.5 text-[11.5px] text-[#5F7168]">{hint}</p>}
    </div>
  );
}
