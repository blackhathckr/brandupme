/**
 * The five account types on the Create Account screen.
 *
 * Copy is transcribed verbatim from the client's mockup. Each type routes to
 * its own registration flow — the client was explicit that the flows must not
 * share one form: "make sure they should show those information only which is
 * assigned for them to create account, dont use same account creation pattern
 * for everyone."
 *
 * NOTE: Influencer is missing from this mockup but must self-register and pay
 * AED 50/month. Flagged for the client; add a sixth card once confirmed.
 */

export type AccountTypeId =
  | "business-owner"
  | "promoter"
  | "category-referral-partner"
  | "business-selected-partner"
  | "customer";

export type AccountType = {
  id: AccountTypeId;
  label: string;
  description: string;
  /** lucide icon name resolved by the picker. */
  icon: "building2" | "megaphone" | "network" | "handshake" | "user";
  /** Tailwind classes for the icon chip — one accent per card, per the mockup. */
  chip: string;
  /** Where "Create Account" sends this type. */
  href: string;
  /** Batch in which this flow ships, so the demo can say so honestly. */
  ready: boolean;
};

export const ACCOUNT_TYPES: AccountType[] = [
  {
    id: "business-owner",
    label: "Business Owner",
    description: "List your business, get leads and grow your brand.",
    icon: "building2",
    chip: "bg-iris-100 text-iris-600",
    href: "/register/business",
    ready: true,
  },
  {
    id: "promoter",
    label: "Promoter",
    description: "Promote businesses and earn rewards through referrals.",
    icon: "megaphone",
    chip: "bg-emerald-100 text-emerald-600",
    href: "/register/promoter",
    ready: false,
  },
  {
    id: "category-referral-partner",
    label: "Category Referral Partner",
    description:
      "Refer businesses in your category and earn attractive rewards.",
    icon: "network",
    chip: "bg-amber-100 text-amber-600",
    href: "/register/category-partner",
    ready: false,
  },
  {
    id: "business-selected-partner",
    label: "Business Selected Partner",
    description: "Partner with selected businesses and grow together.",
    icon: "handshake",
    chip: "bg-sky-100 text-sky-600",
    href: "/register/selected-partner",
    ready: false,
  },
  {
    id: "customer",
    label: "Customer",
    description: "Explore businesses and connect with trusted companies.",
    icon: "user",
    chip: "bg-rose-100 text-rose-500",
    href: "/register/customer",
    ready: false,
  },
];

/** The dropdown on the details form — mirrors the cards. */
export const ROLE_OPTIONS = ACCOUNT_TYPES.map((t) => ({
  value: t.id,
  label: t.label,
}));
