<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Build with webpack, not Turbopack

`next build` defaults to Turbopack in Next 16, which does not emit
`.next/server/middleware-manifest.json`. The Cloudflare adapter requires that
file at runtime, and without it every route returns 500 with:

    Error: Dynamic require of "/.next/server/middleware-manifest.json" is not supported

All build scripts therefore pass `--webpack`. Do not remove that flag.
