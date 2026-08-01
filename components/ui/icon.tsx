import {
  BookOpen,
  CalendarCheck,
  Ear,
  Filter,
  Handshake,
  Lightbulb,
  Mail,
  MessageCircle,
  PhoneCall,
  Repeat,
  Search,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit map rather than a dynamic import, so the static export only ships
 * the icons actually used and TypeScript catches a bad name at build time.
 */
const ICONS = {
  BookOpen,
  CalendarCheck,
  Ear,
  Filter,
  Handshake,
  Lightbulb,
  Mail,
  MessageCircle,
  PhoneCall,
  Repeat,
  Search,
  Target,
  TrendingUp,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className,
}: {
  name: IconName | string;
  className?: string;
}) {
  const Cmp = ICONS[name as IconName] ?? Target;
  return <Cmp className={className} strokeWidth={1.75} aria-hidden />;
}
