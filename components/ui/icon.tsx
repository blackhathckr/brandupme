import {
  BadgeCheck,
  BarChart3,
  ClipboardList,
  Eye,
  Globe,
  Handshake,
  Headset,
  Megaphone,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Package,
  Palette,
  Search,
  Send,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  UserSearch,
  Video,
  Wallet,
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
  Eye,
  Globe,
  Handshake,
  Headset,
  Megaphone,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Package,
  Palette,
  Search,
  Send,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  UserSearch,
  Video,
  Wallet,
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
