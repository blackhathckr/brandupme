export function DonutChart({
  segments,
  total,
  totalLabel,
  size = 128,
  thickness = 16,
}: {
  segments: { label: string; value: number; color: string }[];
  total: number | string;
  totalLabel: string;
  size?: number;
  thickness?: number;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const sum = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  let offset = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF1EC" strokeWidth={thickness} />
        {segments.map((seg) => {
          const frac = seg.value / sum;
          const dash = frac * c;
          const el = (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[18px] font-extrabold leading-none text-[#0B1F13]">{total}</span>
        <span className="mt-1 text-[10px] text-[#5F7168]">{totalLabel}</span>
      </div>
    </div>
  );
}
