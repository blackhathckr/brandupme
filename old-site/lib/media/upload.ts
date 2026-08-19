import { del, put } from "@vercel/blob";

/**
 * Image uploads to Vercel Blob.
 *
 * Files are validated by sniffing the magic bytes, not by trusting the
 * Content-Type header or the file extension - both are attacker-controlled. A
 * .jpg that is actually an HTML document, served back from a domain a browser
 * trusts, is stored XSS.
 *
 * Keys are random, not derived from the uploaded filename. A user-supplied name
 * invites path traversal and collisions between two businesses both uploading
 * "logo.png". `addRandomSuffix` would also do it, but an explicit UUID keeps
 * the stored path predictable for deletion.
 */

const MAX_BYTES = 5 * 1024 * 1024;

/** Magic-byte signatures for the formats we accept. */
const SIGNATURES: { type: string; ext: string; test: (b: Uint8Array) => boolean }[] = [
  {
    type: "image/jpeg",
    ext: "jpg",
    test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  {
    type: "image/png",
    ext: "png",
    test: (b) =>
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  {
    type: "image/webp",
    ext: "webp",
    test: (b) =>
      b[0] === 0x52 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x46 &&
      b[8] === 0x57 &&
      b[9] === 0x45 &&
      b[10] === 0x42 &&
      b[11] === 0x50,
  },
];

export type UploadResult =
  | { ok: true; url: string; key: string }
  | { ok: false; error: string };

export async function uploadImage(
  file: File,
  prefix: string,
): Promise<UploadResult> {
  if (file.size === 0) return { ok: false, error: "That file is empty." };
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Images must be 5 MB or smaller." };
  }

  const buffer = await file.arrayBuffer();
  const head = new Uint8Array(buffer.slice(0, 16));
  const match = SIGNATURES.find((s) => s.test(head));

  if (!match) {
    return { ok: false, error: "Upload a JPG, PNG or WebP image." };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { ok: false, error: "Uploads are not configured." };
  }

  try {
    const key = `${prefix}/${crypto.randomUUID()}.${match.ext}`;
    const blob = await put(key, buffer, {
      access: "public",
      contentType: match.type,
      addRandomSuffix: false,
      cacheControlMaxAge: 31_536_000,
    });
    return { ok: true, url: blob.url, key: blob.pathname };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Upload failed.",
    };
  }
}

export async function deleteImage(url: string): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await del(url);
  } catch {
    // A blob that cannot be deleted must not block the database row being
    // removed - an orphaned file is a smaller problem than a stuck UI.
  }
}
