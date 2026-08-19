/**
 * Password hashing for the Workers runtime.
 *
 * bcrypt, scrypt and argon2 are native modules and do not run on Workers, so
 * this uses PBKDF2-SHA256 through Web Crypto, which is available there and in
 * Node. 210,000 iterations is OWASP's current floor for PBKDF2-SHA256.
 *
 * Stored format:  pbkdf2$<iterations>$<salt-b64>$<hash-b64>
 * The iteration count travels with the hash, so it can be raised later without
 * invalidating existing passwords - old hashes keep verifying at their own
 * count and are upgraded on next successful login.
 *
 * lib/db/seed/build-seed.ts writes the same format with node:crypto so a seeded
 * admin logs in through the normal path.
 */

const ITERATIONS = 210_000;
const KEY_BYTES = 32;
const SALT_BYTES = 16;

const b64 = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)));

const unb64 = (s: string) =>
  Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function derive(
  password: string,
  salt: Uint8Array,
  iterations: number,
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    key,
    KEY_BYTES * 8,
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await derive(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${b64(salt)}$${b64(hash)}`;
}

/**
 * Constant-time comparison. A plain `===` on the derived key leaks timing
 * information about how many leading bytes matched, which is enough to
 * reconstruct a hash byte by byte given enough attempts.
 */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function verifyPassword(
  password: string,
  stored: string | null | undefined,
): Promise<boolean> {
  if (!stored) return false;
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;

  const iterations = Number.parseInt(parts[1], 10);
  if (!Number.isFinite(iterations) || iterations < 1000) return false;

  const salt = unb64(parts[2]);
  const expected = unb64(parts[3]);
  const actual = await derive(password, salt, iterations);
  return timingSafeEqual(actual, expected);
}

/** True when the hash was made with fewer iterations than we now require. */
export function needsRehash(stored: string): boolean {
  const iterations = Number.parseInt(stored.split("$")[1] ?? "0", 10);
  return iterations < ITERATIONS;
}

/* ── Opaque tokens ──────────────────────────────────────────────────────── */

/** 256 bits of randomness, URL-safe. Used for sessions and one-time links. */
export function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return b64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Tokens are stored hashed so a database leak cannot be replayed as a login.
 * Plain SHA-256 is right here, unlike for passwords: the input already has
 * 256 bits of entropy, so there is nothing to brute-force and no need to be
 * slow.
 */
export async function hashToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token),
  );
  return b64(digest);
}
