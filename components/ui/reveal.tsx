"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, staggerItem, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Section entrance. Content is animated, never *hidden behind* animation -
 * Framer renders the element in the DOM either way, so a JS failure degrades
 * to visible content rather than a blank page.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const M = motion[as];
  return (
    <M
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </M>
  );
}

/** Parent for staggered grids. Pair with <RevealItem>. */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={cn(className)}>
      {children}
    </motion.div>
  );
}
