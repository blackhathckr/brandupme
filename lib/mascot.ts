/**
 * Mascot registry.
 *
 * TWO STYLES EXIST. Both are kept in the repo; only one is ever visible.
 *
 *   v2 (current)  public/mascot-v2/  A pure bull, like the logo. No clothing.
 *   v1            public/mascot/     A bull in a business suit, with hands.
 *
 * Mixing the two is the single fastest way to make a brand look cheap, so the
 * whole site reads from this one file. Change FAMILY below and every mascot on
 * the site switches together - nothing else needs editing.
 *
 * Images are referenced by ROLE, not by filename, which is what lets the two
 * sets swap cleanly despite having completely different file names.
 *
 * PLACEMENT RULE
 * Each appearance needs a different job AND a different scale. Same-size
 * cut-outs repeated down a page read as filler; varied ones read as rhythm.
 *
 *   watermark  hero, 22%                      atmosphere
 *   momentum   how-it-works panel, 16%        fills the fixed-height gap
 *   momentum   calculator band, 30%           energy
 *   headset    services payoff card, full     the one real character
 *   presence   closing CTA band, full         brand sign-off
 *   emblem     registration success           a moment, only after submitting
 *
 * That is five on the homepage, up from the four originally intended. If it
 * starts to feel busy, the hero watermark is the one to drop - it is the most
 * decorative and the least load-bearing.
 */

export const FAMILY: "v1" | "v2" = "v2";

type Asset = { src: string; w: number; h: number };

const V2: Record<string, Asset> = {
  emblem: { src: "/mascot-v2/head-front.webp", w: 559, h: 700 },
  watermark: { src: "/mascot-v2/head-three-quarter.webp", w: 478, h: 700 },
  headset: { src: "/mascot-v2/head-headset.webp", w: 478, h: 700 },
  presence: { src: "/mascot-v2/standing.webp", w: 526, h: 700 },
  momentum: { src: "/mascot-v2/charging.webp", w: 700, h: 619 },
};

const V1: Record<string, Asset> = {
  emblem: { src: "/mascot/celebrate.webp", w: 508, h: 700 },
  watermark: { src: "/mascot/canonical.webp", w: 375, h: 700 },
  headset: { src: "/mascot/headset.webp", w: 594, h: 700 },
  presence: { src: "/mascot/wave.webp", w: 604, h: 700 },
  momentum: { src: "/mascot/present.webp", w: 684, h: 700 },
};

/** Keyed by role, never by pose - that is what makes the two sets swappable. */
export const MASCOT = (FAMILY === "v2" ? V2 : V1) as Record<
  "emblem" | "watermark" | "headset" | "presence" | "momentum",
  Asset
>;
