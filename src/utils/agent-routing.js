import {
  STATIC_ROUTES,
  COURSE_PATHS,
  PROVINCIA_PATHS
} from "./agent-routes.generated.js";

const STATIC_FILE_PREFIXES = ["/assets/", "/markdown/", "/_vercel", "/_vite"];

const STATIC_FILES = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/og-image.png",
  "/index.html",
  "/404.html",
  "/hormonizacion-centros.json",
  "/hormonizacion-centros.pdf",
  "/hormonizacion-centros.xlsx"
]);

const EXTENSION_RE = /\.[a-z0-9]{1,8}$/i;

export const normalizePath = (pathname = "/") => {
  let p = pathname;
  try {
    p = decodeURI(pathname);
  } catch {
    p = pathname;
  }
  if (p.length > 1) p = p.replace(/\/+$/, "") || "/";
  return p;
};

export const isStaticAssetPath = (pathname) => {
  const p = normalizePath(pathname);
  if (STATIC_FILES.has(p)) return true;
  if (STATIC_FILE_PREFIXES.some((prefix) => p.startsWith(prefix))) return true;
  return EXTENSION_RE.test(p);
};

export const resolveRoute = (pathname) => {
  const p = normalizePath(pathname);
  if (STATIC_ROUTES.includes(p)) return { type: "static", path: p };
  if (/^\/cursos\/[^/]+$/.test(p)) {
    return COURSE_PATHS.includes(p)
      ? { type: "course", path: p }
      : { type: "unknown", path: p };
  }
  if (/^\/hormonizacion\/[^/]+$/.test(p)) {
    return PROVINCIA_PATHS.includes(p)
      ? { type: "provincia", path: p }
      : { type: "unknown", path: p };
  }
  return { type: "unknown", path: p };
};

export const isKnownRoute = (pathname) => resolveRoute(pathname).type !== "unknown";

export const wantsMarkdown = (acceptHeader = "") =>
  acceptHeader.toLowerCase().includes("text/markdown");

export const markdownVariantPath = (pathname) => {
  const p = normalizePath(pathname);
  return p === "/" ? "/markdown/index.md" : `/markdown${p}.md`;
};

export const AGENT_RESOURCES = {
  sitemap: "https://transistemas.org/sitemap.xml",
  llms: "https://transistemas.org/llms.txt",
  home: "https://transistemas.org/"
};

export const NOT_FOUND_MARKDOWN = `# 404 — Not found

The page you requested does not exist on transistemas.org.

## Where to go next

- [llms.txt](https://transistemas.org/llms.txt): agent-facing site index with when-to-use guidance and how to fetch content.
- [sitemap.xml](https://transistemas.org/sitemap.xml): list of every valid URL on this site.
- [Home](https://transistemas.org/): main page (request it with \`Accept: text/markdown\` to get this site as markdown).

## Valid URL patterns

- \`/\` — home
- \`/cursos\` and \`/cursos/{slug}\` — free technology courses
- \`/equipos\` — teams
- \`/hormonizacion\` and \`/hormonizacion/{provincia-slug}\` — public-health resources
- \`/about\`, \`/contact\`, \`/privacy\` — trust pages

Anything outside these patterns returns this 404. Check the sitemap before probing further paths.
`;

export const NOT_FOUND_HTML = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, follow" />
<title>404 — Página no encontrada | Transistemas</title>
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1a1a1a;color:#fff;font-family:"Work Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;text-align:center;padding:2rem}
main{max-width:34rem}
h1{font-size:2.4rem;margin:0 0 .5rem;color:#6B2FB3}
p{color:#cccccc;line-height:1.6;margin:.4rem 0}
nav{margin-top:1.5rem;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
a{color:#6B2FB3;text-decoration:none;font-weight:600}
a:hover{color:#ff99cc}
code{color:#ffdf6b;font-size:.9em}
</style>
</head>
<body>
<main>
<h1>404</h1>
<p>La página que buscás no existe o ya no está disponible.</p>
<p>Agentes automatizados: consulten <code>/llms.txt</code> para el índice del sitio y <code>/sitemap.xml</code> para la lista de URLs válidas.</p>
<nav>
<a href="/">Inicio</a>
<a href="/cursos">Cursos</a>
<a href="/llms.txt">llms.txt</a>
<a href="/sitemap.xml">sitemap.xml</a>
</nav>
</main>
</body>
</html>
`;

export const notFoundResponse = (acceptHeader = "") => {
  const markdown = wantsMarkdown(acceptHeader);
  return {
    status: 404,
    contentType: markdown
      ? "text/markdown; charset=utf-8"
      : "text/html; charset=utf-8",
    body: markdown ? NOT_FOUND_MARKDOWN : NOT_FOUND_HTML
  };
};
