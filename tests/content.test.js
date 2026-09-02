import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";

const visibleText = (html) => {
  let text = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  text = text.replace(/<[^>]+>/g, " ");
  const entities = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&aacute;": "á",
    "&eacute;": "é",
    "&iacute;": "í",
    "&oacute;": "ó",
    "&uacute;": "ú",
    "&ntilde;": "ñ"
  };
  for (const [entity, char] of Object.entries(entities)) {
    text = text.split(entity).join(char);
  }
  return text.replace(/\s+/g, " ").trim();
};

const read = (path) => readFileSync(path, "utf-8");

describe("index.html static no-JS content", () => {
  const html = read("index.html");
  const rootHtml = html.slice(html.indexOf('<div id="root">'));
  const text = visibleText(rootHtml);

  it("serves at least 500 characters of meaningful content without JS", () => {
    expect(text.length).toBeGreaterThanOrEqual(500);
  });

  it("has exactly one H1 in the static content", () => {
    expect(rootHtml.match(/<h1/g)?.length).toBe(1);
    expect(rootHtml).toContain(
      "Transistemas: formación tecnológica y servicios IT con impacto social"
    );
  });

  it("keeps heading levels sequential (h1 then h2)", () => {
    expect(rootHtml).not.toMatch(/<h3[\s\S]*?(?=<h2)/);
    const headings = [...rootHtml.matchAll(/<h([12])\b/g)].map(
      (match) => Number(match[1])
    );
    expect(headings[0]).toBe(1);
    for (let i = 1; i < headings.length; i += 1) {
      expect(headings[i] - headings[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  it("describes the organization, services and contact channels", () => {
    expect(text).toContain("asociación civil");
    expect(text).toContain("LGBTIQ+");
    expect(text).toContain("desarrollo de software");
    expect(text).toContain("testing");
    expect(text).toContain("equipo@transistemas.org");
    expect(text).toContain("cursos");
  });

  it("links to trust and catalog pages for agents", () => {
    expect(rootHtml).toContain('href="https://transistemas.org/cursos"');
    expect(rootHtml).toContain('href="https://transistemas.org/about"');
    expect(rootHtml).toContain('href="https://transistemas.org/contact"');
    expect(rootHtml).toContain('href="https://transistemas.org/privacy"');
  });
});

describe("trust anchor pages", () => {
  const pages = [
    {
      file: "public/about.html",
      url: "https://transistemas.org/about",
      h1: "Nosotres"
    },
    {
      file: "public/contact.html",
      url: "https://transistemas.org/contact",
      h1: "Contacto"
    },
    {
      file: "public/privacy.html",
      url: "https://transistemas.org/privacy",
      h1: "Política de Privacidad"
    }
  ];

  it.each(pages)(
    "serves $file with real, indexable content",
    ({ file, url, h1 }) => {
      const html = read(file);
      const text = visibleText(html);
      expect(
        text.length,
        `${file} must have at least 500 visible characters`
      ).toBeGreaterThanOrEqual(500);
      expect(html.match(/<h1[^>]*>/g)?.length).toBe(1);
      expect(html).toContain(`<h1>${h1}</h1>`);
      expect(html).toContain(`<link rel="canonical" href="${url}" />`);
      expect(html).toMatch(/<meta name="robots" content="index, follow"/);
      expect(html).toContain('lang="es"');
    }
  );

  it("exposes the contact email and data-deletion channel", () => {
    for (const file of ["public/contact.html", "public/privacy.html"]) {
      const html = read(file);
      expect(html).toContain("equipo@transistemas.org");
      expect(html).toContain("Baja de datos");
    }
  });

  it("links the trust pages to each other and to machine-readable files", () => {
    for (const file of [
      "public/about.html",
      "public/contact.html",
      "public/privacy.html"
    ]) {
      const html = read(file);
      expect(html).toContain('href="/about"');
      expect(html).toContain('href="/contact"');
      expect(html).toContain('href="/privacy"');
      expect(html).toContain('href="/llms.txt"');
      expect(html).toContain('href="/sitemap.xml"');
    }
  });
});

describe("custom 404 page", () => {
  const html = read("public/404.html");

  it("is a real 404 page pointing agents to machine-readable indexes", () => {
    expect(html).toContain("404");
    expect(html).toContain('href="/llms.txt"');
    expect(html).toContain('href="/sitemap.xml"');
    expect(html).toMatch(/noindex/);
  });
});
