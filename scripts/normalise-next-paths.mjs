import { readFileSync, writeFileSync, existsSync } from "node:fs";

/**
 * Rewrites Windows path separators in Next's build manifests.
 *
 * On Windows `next build` records file paths with backslashes:
 *
 *     ".next\\server\\middleware-manifest.json"
 *
 * The Cloudflare adapter shims those reads by matching on forward slashes
 * (`path.endsWith("/server/middleware-manifest.json")`), so on a Windows build
 * the shim never fires, the read falls through to a dynamic require, and every
 * route 500s with:
 *
 *     Dynamic require of "/.next/server/middleware-manifest.json" is not supported
 *
 * Runs between `next build` and the adapter's bundle step. A no-op on Linux and
 * macOS, where the separators are already correct - so CI stays unaffected.
 */

const TARGETS = [
  ".next/required-server-files.json",
  ".next/standalone/.next/required-server-files.json",
];

let changed = 0;

for (const file of TARGETS) {
  if (!existsSync(file)) continue;

  const before = readFileSync(file, "utf-8");
  // Only touch separators inside .next paths. A blanket replace would corrupt
  // any legitimately escaped character elsewhere in the JSON.
  const after = before.replace(/\.next(?:\\\\[^"]*)+/g, (m) =>
    m.replace(/\\\\/g, "/"),
  );

  if (after !== before) {
    writeFileSync(file, after, "utf-8");
    console.log(`  normalised ${file}`);
    changed++;
  }
}

console.log(
  changed > 0
    ? `path separators normalised in ${changed} manifest(s)`
    : "path separators already correct - nothing to do",
);
