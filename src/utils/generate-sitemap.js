import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  SITE_URL,
  getSiteRoutes,
  getYearFromDate,
  TRUST_PATHS
} from "./site-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const PUBLIC = path.join(ROOT, "public");

const today = new Date().toISOString().slice(0, 10);
const currentYear = new Date().getUTCFullYear();
const STALE_COURSE_YEARS = 2;

const dateToIso = (dateStr) => {
  if (!dateStr) return today;
  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return today;
  return `${match[3]}-${match[2]}-${match[1]}`;
};

const isStaleCourse = (dateStr = "") => {
  const year = parseInt(getYearFromDate(dateStr), 10);
  if (!year) return true;
  return currentYear - year >= STALE_COURSE_YEARS;
};

const staticRoutes = [
  { loc: "", changefreq: "weekly", priority: "1.0" },
  { loc: "/cursos", changefreq: "weekly", priority: "0.9" },
  { loc: "/equipos", changefreq: "monthly", priority: "0.8" },
  ...TRUST_PATHS.map((loc) => ({
    loc,
    changefreq: "yearly",
    priority: "0.5"
  }))
];

const renderUrl = ({ loc, lastmod, changefreq, priority }) =>
  `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lastmod || today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

const generate = async () => {
  const { coursePages, provinciaPages } = await getSiteRoutes();

  const courseUrls = coursePages.map(({ path: loc, fechaInicio }) => ({
    loc,
    lastmod: dateToIso(fechaInicio),
    changefreq: "monthly",
    priority: isStaleCourse(fechaInicio) ? "0.3" : "0.7"
  }));

  const saludUrls = [
    {
      loc: "/hormonizacion",
      lastmod: today,
      changefreq: "weekly",
      priority: "0.9"
    },
    ...provinciaPages.map(({ path: loc }) => ({
      loc,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.7"
    }))
  ];

  const allUrls = [...staticRoutes, ...courseUrls, ...saludUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(renderUrl).join("\n")}
</urlset>
`;

  await fs.writeFile(path.join(PUBLIC, "sitemap.xml"), xml);
  console.log(
    `  sitemap.xml       (${allUrls.length} URLs: ${staticRoutes.length} static, ${courseUrls.length} courses, ${saludUrls.length} salud)`
  );
};

generate()
  .then(() => console.log("Sitemap generated successfully."))
  .catch((err) => {
    console.error("Sitemap generation failed:", err);
    process.exit(1);
  });
