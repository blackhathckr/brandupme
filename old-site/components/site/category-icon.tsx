import {
  Briefcase,
  Building2,
  Calculator,
  Car,
  CarFront,
  Ellipsis,
  Factory,
  FileText,
  Gem,
  GraduationCap,
  HeartPulse,
  Hotel,
  Laptop,
  Music,
  Plane,
  ShoppingCart,
  Shirt,
  Sparkles,
  Truck,
  Users,
  UsersRound,
  Utensils,
  Wrench,
} from "lucide-react";

/**
 * Resolves the icon key stored on a category row to a component.
 *
 * Categories carry an icon *name* rather than a component so the list can come
 * from the database — the existing `categories` table already has an `icon`
 * text column for exactly this.
 */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  sparkles: Sparkles,
  plane: Plane,
  hotel: Hotel,
  factory: Factory,
  "shopping-cart": ShoppingCart,
  shirt: Shirt,
  truck: Truck,
  users: Users,
  laptop: Laptop,
  wrench: Wrench,
  car: Car,
  "car-front": CarFront,
  "file-text": FileText,
  "building-2": Building2,
  gem: Gem,
  utensils: Utensils,
  music: Music,
  "users-round": UsersRound,
  "heart-pulse": HeartPulse,
  calculator: Calculator,
  "graduation-cap": GraduationCap,
  ellipsis: Ellipsis,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Briefcase;
  return <Icon className={className} />;
}
