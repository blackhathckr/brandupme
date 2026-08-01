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
 * Four appearances on the homepage, each with a different job AND a different
 * scale. Four cut-outs at the same size reads as filler; four at different
 * scales reads as rhythm. Adding a fifth means removing one.
 *
 *   watermark  hero, ~6% opacity              atmosphere
 *   headset    services payoff card           personality
 *   momentum   calculator band, ~10% opacity  energy
 *   presence   closing CTA band, ~13%         brand sign-off
 *   emblem     registration success           a moment, only after submitting
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
