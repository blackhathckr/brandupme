import type { Variants, Transition } from "framer-motion";

/**
 * One easing curve across the whole site. Matches --ease-brand in globals.css.
 * Energy comes from motion and typography, not a busier palette.
 */
export const EASE: Transition["ease"] = [0.21, 0.47, 0.32, 0.98];

export const DUR = {
  fast: 0.14,
  base: 0.24,
  slow: 0.4,
  reveal: 0.7,
} as const;

/** Standard section entrance. Fires once, never on scroll-back. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.reveal, ease: EASE },
  },
};

/** Parent for staggered grids. 60ms between children, per the design system. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Shared viewport config. `once` matters: re-animating on scroll-back is the
 * single most common way a marketing page starts to feel cheap.
 */
export const VIEWPORT = { once: true, margin: "-80px" } as const;
