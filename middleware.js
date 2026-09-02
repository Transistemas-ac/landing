import { next, rewrite } from "@vercel/functions";
import {
  isStaticAssetPath,
  normalizePath,
  resolveRoute,
  wantsMarkdown,
  notFoundResponse
} from "./src/utils/agent-routing.js";

export default function middleware(request) {
  const { pathname } = new URL(request.url);

  if (isStaticAssetPath(pathname)) return next();

  // Vercel serves /index.html for / before consulting rewrites, and its CDN
  // ignores Vary — so the root markdown variant must be served from middleware,
  // which runs before the cache.
  if (normalizePath(pathname) === "/" && wantsMarkdown(request.headers.get("accept") || "")) {
    return rewrite(new URL("/markdown/index.md", request.url));
  }

  if (resolveRoute(pathname).type !== "unknown") return next();

  const { status, contentType, body } = notFoundResponse(
    request.headers.get("accept") || ""
  );

  return new Response(body, {
    status,
    headers: {
      "content-type": contentType,
      vary: "Accept, Accept-Encoding",
      "cache-control": "public, max-age=0, must-revalidate"
    }
  });
}

export const config = {
  matcher: ["/((?!_vercel).*)"]
};
