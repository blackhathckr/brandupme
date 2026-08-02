import {
  BadgeCheck,
  BarChart3,
  ClipboardList,
  Headset,
  Megaphone,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Package,
  Palette,
  Send,
  Target,
  TrendingUp,
  Users,
  UserSearch,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit map rather than a dynamic import, so the static export only ships
 * the icons actually used and TypeScript catches a bad name at build time.
 */
const ICONS = {
  BadgeCheck,
  BarChart3,
  ClipboardList,
  Headset,
  Megaphone,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Package,
  Palette,
  Send,
  Target,
  TrendingUp,
  Users,
  UserSearch,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName | string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name as IconName] ?? Target;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
