/**
 * Serves uploaded images out of R2.
 *
 * A route rather than a public bucket so the bucket needs no public URL and
 * access can be revoked or gated later without moving every stored file.
 *
 * The key is rebuilt from the matched path segments, so ".." cannot escape the
 * prefix - Next has already split and decoded the path by the time it reaches
 * here.
 */
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const path = key.join("/");

  if (path.includes("..")) return new Response("Not found", { status: 404 });

  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  const { env } = await getCloudflareContext({ async: true });
  const bucket = (env as unknown as { MEDIA?: R2Bucket }).MEDIA;
  if (!bucket) return new Response("Not configured", { status: 500 });

  const object = await bucket.get(path);
  if (!object) return new Response("Not found", { status: 404 });

  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
      ETag: object.httpEtag,
    },
  });
}
