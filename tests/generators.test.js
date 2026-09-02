import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import {
  getSiteRoutes,
  slugify,
  SITE_URL,
  STATIC_PATHS,
  TRUST_PATHS
} from "../src/utils/site-routes.js";
import {
  COURSE_PATHS,
  PROVINCIA_PATHS
} from "../src/utils/agent-routes.generated.js";

const read = (path) => readFileSync(path, "utf-8");

describe("slugify", () => {
  it("strips accents and lowercases", () => {
    expect(slugify("Córdoba")).toBe("cordoba");
    expect(slugify("Tierra del Fuego")).toBe("tierra-del-fuego");
    expect(slugify("Curso de Diseño UX/UI")).toBe("curso-de-diseno-uxui");
  });
});

describe("site routes", () => {
  let routes;

  it("discovers courses, provincias and trust paths", async () => {
    routes = await getSiteRoutes();
    expect(routes.coursePages.length).toBeGreaterThan(0);
    expect(routes.provinciaPages.length).toBeGreaterThan(0);
    for (const course of routes.coursePages) {
      expect(course.path).toMatch(/^\/cursos\/[a-z0-9-]+$/);
      expect(course.title).toBeTruthy();
      expect(course.fechaInicio).toBeTruthy();
    }
    for (const provincia of routes.provinciaPages) {
      expect(provincia.path).toBe(`/hormonizacion/${slugify(provincia.provincia)}`);
      expect(provincia.centros.length).toBeGreaterThan(0);
    }
  });
});

describe("llms.txt", () => {
  const content = read("public/llms.txt");

  it("follows the llmstxt.org format (H1 then blockquote)", () => {
    expect(content.startsWith("# Transistemas\n")).toBe(true);
    expect(content).toMatch(/\n> .+\n/);
  });

  it("contains a when-to-use section with concrete use cases", () => {
    expect(content).toContain("## When to use this site");
    expect(content).toContain("## Pages");
    expect(content).toMatch(/free (technology )?courses/i);
    expect(content).toMatch(/hire|services/i);
    expect(content).toMatch(/hormonizaci/i);
  });

  it("explains markdown negotiation and lists machine resources", () => {
    expect(content).toContain("Accept: text/markdown");
    expect(content).toContain(`${SITE_URL}/sitemap.xml`);
    expect(content).toContain("equipo@transistemas.org");
  });

  it("links every static page including trust pages", () => {
    for (const path of STATIC_PATHS) {
      if (path === "/hormonizacion/embed") {
        continue;
      }
      const expected =
        path === "/" ? `${SITE_URL}/)` : `${SITE_URL}${path})`;
      expect(content).toContain(expected);
    }
  });

  it("lists recent courses and provinces as link sections", () => {
    expect(content).toContain("## Recent courses");
    expect(content).toContain(
      "## Provinces covered by the hormonización guide"
    );
  });
});

describe("markdown variants", () => {
  it("generates one markdown file per route", () => {
    for (const path of STATIC_PATHS) {
      const relative = path === "/" ? "index.md" : `${path.slice(1)}.md`;
      expect(
        existsSync(`public/markdown/${relative}`),
        `missing markdown for ${path}`
      ).toBe(true);
    }
    for (const path of COURSE_PATHS) {
      expect(existsSync(`public/markdown${path}.md`)).toBe(true);
    }
    for (const path of PROVINCIA_PATHS) {
      expect(existsSync(`public/markdown${path}.md`)).toBe(true);
    }
  });

  it("renders courses with their details", () => {
    const content = read("public/markdown/cursos/curso-de-testing-manual-2026.md");
    expect(content).toContain("# Curso de Testing Manual");
    expect(content).toContain("Horario:");
    expect(content).toContain("Fuente: https://transistemas.org/cursos/");
  });

  it("renders provincia pages with verified centers", () => {
    const content = read("public/markdown/hormonizacion/buenos-aires.md");
    expect(content).toContain("# Hormonización en Buenos Aires");
    expect(content).toContain("Centros de salud públicos");
  });

  it("generates 404 guidance inside the markdown home", () => {
    const content = read("public/markdown/index.md");
    expect(content).toContain("# Transistemas");
    expect(content).toContain("## Qué hacemos");
    expect(content).toContain("## Impacto");
  });

  it("mirrors the trust pages as markdown", () => {
    for (const file of ["about.md", "contact.md", "privacy.md"]) {
      const content = read(`public/markdown/${file}`);
      expect(content.length).toBeGreaterThanOrEqual(500);
    }
  });
});

describe("sitemap.xml", () => {
  const sitemap = read("public/sitemap.xml");

  it("includes trust pages", () => {
    for (const path of TRUST_PATHS) {
      expect(sitemap).toContain(`<loc>${SITE_URL}${path}</loc>`);
    }
  });

  it("includes courses and provincias", () => {
    expect(sitemap).toContain("<loc>https://transistemas.org/cursos</loc>");
    expect(sitemap).toContain(
      "<loc>https://transistemas.org/cursos/curso-de-testing-manual-2026</loc>"
    );
    expect(sitemap).toContain(
      "<loc>https://transistemas.org/hormonizacion/buenos-aires</loc>"
    );
  });

  it("matches the sitemap 0.9 schema", () => {
    expect(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(
      true
    );
    expect(sitemap).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });
});
