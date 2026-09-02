import { next } from "@vercel/functions";
import {
  isStaticAssetPath,
  resolveRoute,
  notFoundResponse
} from "./src/utils/agent-routing.js";

export default function middleware(request) {
  const { pathname } = new URL(request.url);

  if (isStaticAssetPath(pathname)) return next();
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
