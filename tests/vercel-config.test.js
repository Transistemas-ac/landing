import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";

const config = JSON.parse(readFileSync("vercel.json", "utf-8"));

const MARKDOWN_HAS = [{ type: "header", key: "accept", value: ".*text/markdown.*" }];

const findRewrite = (source, has) =>
  (config.rewrites || []).find(
    (rewrite) =>
      rewrite.source === source &&
      (has
        ? JSON.stringify(rewrite.has) === JSON.stringify(has)
        : rewrite.has === undefined)
  );

describe("vercel.json", () => {
  it("does not contain the SPA catch-all rewrite (soft-404 fix)", () => {
    const catchAll = config.rewrites.find(
      (rewrite) =>
        rewrite.source === "/(.*)" ||
        rewrite.source === "/:path(.*)" ||
        rewrite.source === "/:path*"
    );
    expect(catchAll).toBeUndefined();
  });

  it("keeps the www to apex 301 redirect", () => {
    const redirect = (config.redirects || []).find(
      (item) => item.statusCode === 301
    );
    expect(redirect).toBeDefined();
    expect(redirect.destination).toContain("https://transistemas.org");
    expect(redirect.has).toEqual([
      { type: "host", value: "www\\.transistemas\\.org" }
    ]);
  });

  it("configures deterministic trailing slash behavior", () => {
    expect(config.trailingSlash).toBe(false);
  });

  it("rewrites every SPA route to index.html", () => {
    for (const source of [
      "/cursos",
      "/cursos/:slug",
      "/equipos",
      "/hormonizacion",
      "/hormonizacion/embed",
      "/hormonizacion/:slug"
    ]) {
      const rewrite = findRewrite(source);
      expect(rewrite, `missing SPA rewrite for ${source}`).toBeDefined();
      expect(rewrite.destination).toBe("/index.html");
    }
  });

  it("rewrites trust pages to their static HTML files", () => {
    expect(findRewrite("/about").destination).toBe("/about.html");
    expect(findRewrite("/contact").destination).toBe("/contact.html");
    expect(findRewrite("/privacy").destination).toBe("/privacy.html");
  });

  it("rewrites markdown-accepting requests to markdown variants", () => {
    const expectations = [
      ["/", "/markdown/index.md"],
      ["/cursos", "/markdown/cursos.md"],
      ["/cursos/:slug", "/markdown/cursos/:slug.md"],
      ["/equipos", "/markdown/equipos.md"],
      ["/hormonizacion", "/markdown/hormonizacion.md"],
      ["/hormonizacion/:slug", "/markdown/hormonizacion/:slug.md"],
      ["/about", "/markdown/about.md"],
      ["/contact", "/markdown/contact.md"],
      ["/privacy", "/markdown/privacy.md"]
    ];
    for (const [source, destination] of expectations) {
      const rewrite = findRewrite(source, MARKDOWN_HAS);
      expect(rewrite, `missing rewrite for ${source}`).toBeDefined();
      expect(rewrite.destination).toBe(destination);
      expect(
        rewrite.has,
        `rewrite for ${source} must be conditioned on the accept header`
      ).toContainEqual({
        type: "header",
        key: "accept",
        value: ".*text/markdown.*"
      });
    }
  });

  it("orders markdown rewrites before SPA rewrites", () => {
    const sources = config.rewrites.map((rewrite) => rewrite.source);
    const markdownIndexes = sources
      .map((source, index) =>
        config.rewrites[index].destination.startsWith("/markdown/")
          ? index
          : -1
      )
      .filter((index) => index !== -1);
    const spaIndexes = sources
      .map((source, index) =>
        config.rewrites[index].destination === "/index.html" ? index : -1
      )
      .filter((index) => index !== -1);
    expect(markdownIndexes.length).toBeGreaterThan(0);
    expect(spaIndexes.length).toBeGreaterThan(0);
    expect(Math.max(...markdownIndexes)).toBeLessThan(
      Math.min(...spaIndexes)
    );
  });

  it("adds Vary: Accept, Accept-Encoding to negotiated page paths", () => {
    for (const source of [
      "/",
      "/cursos",
      "/cursos/:slug",
      "/equipos",
      "/hormonizacion",
      "/hormonizacion/:slug",
      "/about",
      "/contact",
      "/privacy",
      "/markdown/:path*"
    ]) {
      const headerRule = (config.headers || []).find(
        (rule) => rule.source === source
      );
      expect(headerRule, `missing header rule for ${source}`).toBeDefined();
      const vary = headerRule.headers.find((header) => header.key === "Vary");
      expect(vary, `missing Vary header for ${source}`).toBeDefined();
      expect(vary.value).toContain("Accept");
      expect(vary.value).toContain("Accept-Encoding");
    }
  });

  it("declares text/markdown content type for markdown files", () => {
    const markdownRule = (config.headers || []).find(
      (rule) => rule.source === "/markdown/:path*"
    );
    const contentType = markdownRule.headers.find(
      (header) => header.key === "Content-Type"
    );
    expect(contentType.value).toBe("text/markdown; charset=utf-8");
  });
});
