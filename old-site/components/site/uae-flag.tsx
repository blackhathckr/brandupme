/**
 * UAE flag as inline SVG.
 *
 * The regional-indicator emoji 🇦🇪 renders as the bare letters "AE" on Windows,
 * which is what the client saw in the top bar and the phone control. Drawing it
 * keeps the mark identical on every platform.
 */
export function UaeFlag({ className = "h-3 w-[18px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      role="img"
      aria-label="United Arab Emirates"
      className={`shrink-0 rounded-[2px] ${className}`}
    >
      <rect width="24" height="16" fill="#fff" />
      <rect width="24" height="5.333" fill="#00732F" />
      <rect y="10.667" width="24" height="5.333" fill="#000" />
      <rect width="6" height="16" fill="#FF0000" />
    </svg>
  );
}
