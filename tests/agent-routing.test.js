import { describe, it, expect } from "vitest";
import {
  normalizePath,
  isStaticAssetPath,
  resolveRoute,
  isKnownRoute,
  wantsMarkdown,
  markdownVariantPath,
  notFoundResponse,
  NOT_FOUND_MARKDOWN,
  NOT_FOUND_HTML
} from "../src/utils/agent-routing.js";
import {
  STATIC_ROUTES,
  COURSE_PATHS,
  PROVINCIA_PATHS
} from "../src/utils/agent-routes.generated.js";

describe("agent-routes.generated.js", () => {
  it("contains the static routes including trust pages", () => {
    for (const route of [
      "/",
      "/cursos",
      "/equipos",
      "/hormonizacion",
      "/hormonizacion/embed",
      "/about",
      "/contact",
      "/privacy"
    ]) {
      expect(STATIC_ROUTES).toContain(route);
    }
  });

  it("contains valid course and provincia paths", () => {
    expect(COURSE_PATHS.length).toBeGreaterThan(0);
    expect(PROVINCIA_PATHS.length).toBeGreaterThan(0);
    for (const path of COURSE_PATHS) {
      expect(path).toMatch(/^\/cursos\/[a-z0-9-]+$/);
    }
    for (const path of PROVINCIA_PATHS) {
      expect(path).toMatch(/^\/hormonizacion\/[a-z0-9-]+$/);
    }
  });

  it("keeps /hormonizacion/embed out of provincia paths", () => {
    expect(PROVINCIA_PATHS).not.toContain("/hormonizacion/embed");
  });
});

describe("normalizePath", () => {
  it("keeps the root path", () => {
    expect(normalizePath("/")).toBe("/");
  });

  it("strips trailing slashes", () => {
    expect(normalizePath("/cursos/")).toBe("/cursos");
    expect(normalizePath("/cursos//")).toBe("/cursos");
  });

  it("decodes percent-encoded characters in paths", () => {
    expect(normalizePath("/cursos%20x")).toBe("/cursos x");
  });

  it("keeps reserved encoded characters intact", () => {
    expect(normalizePath("/cursos%2F")).toBe("/cursos%2F");
  });

  it("does not throw on malformed percent-encoding", () => {
    expect(normalizePath("/cursos/%E0%A4%A")).toBe("/cursos/%E0%A4%A");
  });
});

describe("isStaticAssetPath", () => {
  it.each([
    "/favicon.svg",
    "/robots.txt",
    "/sitemap.xml",
    "/llms.txt",
    "/index.html",
    "/404.html",
    "/og-image.png",
    "/hormonizacion-centros.json",
    "/hormonizacion-centros.pdf",
    "/hormonizacion-centros.xlsx",
    "/assets/index-a1b2c3.js",
    "/markdown/index.md",
    "/markdown/cursos/curso-de-testing-manual-2026.md"
  ])("treats %s as a static asset", (path) => {
    expect(isStaticAssetPath(path)).toBe(true);
  });

  it.each([
    "/",
    "/cursos",
    "/equipos",
    "/hormonizacion",
    "/about",
    "/cursos/curso-de-testing-manual-2026",
    "/some-path-that-does-not-exist"
  ])("does not treat %s as a static asset", (path) => {
    expect(isStaticAssetPath(path)).toBe(false);
  });
});

describe("resolveRoute", () => {
  it("resolves static routes", () => {
    expect(resolveRoute("/")).toEqual({ type: "static", path: "/" });
    expect(resolveRoute("/cursos/")).toEqual({
      type: "static",
      path: "/cursos"
    });
    expect(resolveRoute("/about")).toEqual({ type: "static", path: "/about" });
  });

  it("resolves /hormonizacion/embed as static before dynamic provincia matching", () => {
    expect(resolveRoute("/hormonizacion/embed").type).toBe("static");
  });

  it("resolves a valid course slug", () => {
    const coursePath = COURSE_PATHS[0];
    expect(resolveRoute(coursePath)).toEqual({
      type: "course",
      path: coursePath
    });
  });

  it("rejects an unknown course slug", () => {
    expect(resolveRoute("/cursos/curso-que-no-existe")).toEqual({
      type: "unknown",
      path: "/cursos/curso-que-no-existe"
    });
  });

  it("resolves a valid provincia slug", () => {
    const provinciaPath = PROVINCIA_PATHS[0];
    expect(resolveRoute(provinciaPath)).toEqual({
      type: "provincia",
      path: provinciaPath
    });
  });

  it("rejects an unknown provincia slug", () => {
    expect(resolveRoute("/hormonizacion/marte")).toEqual({
      type: "unknown",
      path: "/hormonizacion/marte"
    });
  });

  it("rejects unknown top-level paths", () => {
    for (const path of [
      "/some-path-that-does-not-exist",
      "/wp-admin",
      "/.env",
      "/cursos/a/b"
    ]) {
      expect(resolveRoute(path).type).toBe("unknown");
    }
  });

  it("rejects nested paths under static routes", () => {
    expect(resolveRoute("/about/extra").type).toBe("unknown");
  });
});

describe("isKnownRoute", () => {
  it("is true for known routes and false for unknown ones", () => {
    expect(isKnownRoute("/")).toBe(true);
    expect(isKnownRoute(COURSE_PATHS[0])).toBe(true);
    expect(isKnownRoute("/some-path-that-does-not-exist")).toBe(false);
  });
});

describe("wantsMarkdown", () => {
  it("detects text/markdown in Accept headers", () => {
    expect(wantsMarkdown("text/markdown")).toBe(true);
    expect(wantsMarkdown("text/markdown, text/html;q=0.9")).toBe(true);
    expect(wantsMarkdown("TEXT/MARKDOWN")).toBe(true);
  });

  it("does not trigger for HTML or other Accept headers", () => {
    expect(wantsMarkdown("text/html,application/xhtml+xml")).toBe(false);
    expect(wantsMarkdown("*/*")).toBe(false);
    expect(wantsMarkdown("")).toBe(false);
    expect(wantsMarkdown(undefined)).toBe(false);
  });
});

describe("markdownVariantPath", () => {
  it("maps the root to index.md", () => {
    expect(markdownVariantPath("/")).toBe("/markdown/index.md");
  });

  it("maps nested routes under /markdown", () => {
    expect(markdownVariantPath("/cursos")).toBe("/markdown/cursos.md");
    expect(markdownVariantPath("/cursos/curso-de-testing-manual-2026")).toBe(
      "/markdown/cursos/curso-de-testing-manual-2026.md"
    );
    expect(markdownVariantPath("/hormonizacion/buenos-aires")).toBe(
      "/markdown/hormonizacion/buenos-aires.md"
    );
  });
});

describe("notFoundResponse", () => {
  it("returns a markdown 404 for markdown-accepting agents", () => {
    const response = notFoundResponse("text/markdown");
    expect(response.status).toBe(404);
    expect(response.contentType).toBe("text/markdown; charset=utf-8");
    expect(response.body).toBe(NOT_FOUND_MARKDOWN);
  });

  it("returns an HTML 404 for browsers", () => {
    const response = notFoundResponse("text/html,application/xhtml+xml");
    expect(response.status).toBe(404);
    expect(response.contentType).toBe("text/html; charset=utf-8");
    expect(response.body).toBe(NOT_FOUND_HTML);
  });

  it("points agents at llms.txt and the sitemap", () => {
    for (const body of [NOT_FOUND_MARKDOWN, NOT_FOUND_HTML]) {
      expect(body).toContain("llms.txt");
      expect(body).toContain("sitemap.xml");
    }
    expect(NOT_FOUND_MARKDOWN).toContain(
      "https://transistemas.org/sitemap.xml"
    );
  });
});
