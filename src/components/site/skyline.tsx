const buildings: Array<[x: number, w: number, h: number]> = [
  [10, 42, 70], [60, 30, 50], [100, 52, 95], [164, 36, 60], [212, 44, 110],
  [266, 28, 45], [302, 54, 130], [366, 32, 70], [406, 60, 150], [492, 46, 100],
  [546, 34, 65], [588, 58, 120], [654, 30, 50], [692, 46, 90], [746, 36, 60],
  [790, 52, 110], [850, 28, 45], [886, 60, 135], [954, 34, 70], [996, 48, 95],
  [1052, 30, 55], [1090, 56, 115],
];

/** Abstract geometric skyline motif — an original decorative treatment, not a stock photo. */
export function Skyline() {
  return (
    <svg
      viewBox="0 0 1180 190"
      preserveAspectRatio="none"
      className="block h-[130px] w-full sm:h-[150px]"
      aria-hidden="true"
    >
      <g fill="oklch(1 0 0 / 7%)">
        {buildings.map(([x, w, h]) => (
          <rect key={x} x={x} y={190 - h} width={w} height={h} />
        ))}
        {/* tall spire — a quiet nod to Dubai's skyline, not a literal render */}
        <rect x={474} y={8} width={9} height={182} />
      </g>
      <circle cx={478.5} cy={6} r={3} fill="#E6C86C" />
      <line x1={0} y1={190} x2={1180} y2={190} stroke="oklch(1 0 0 / 12%)" strokeWidth={1} />
    </svg>
  );
}
