import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const COURSES_FILE = path.join(ROOT, "src", "data", "Courses.js");

const SITE_URL = "https://transistemas.org";
const today = new Date().toISOString().slice(0, 10);
const currentYear = new Date().getUTCFullYear();
const STALE_COURSE_YEARS = 2;

const dateToIso = (dateStr) => {
  if (!dateStr) return today;
  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return today;
  return `${match[3]}-${match[2]}-${match[1]}`;
};

const slugify = (title = "") =>
  title
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const getYearFromDate = (dateStr = "") => {
  if (!dateStr) return "";
  const match = dateStr.match(/(\d{4})/);
  return match ? match[1] : "";
};

const isStaleCourse = (dateStr = "") => {
  const year = parseInt(getYearFromDate(dateStr), 10);
  if (!year) return true;
  return currentYear - year >= STALE_COURSE_YEARS;
};

const extractCourses = (source) => {
  const courseObjects = [];
  const regex =
    /\{\s*title:\s*"([^"]+)"[\s\S]*?fechaInicio:\s*"([^"]*)"[\s\S]*?links:\s*\[([^\]]*)\]/g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    const [, title, fechaInicio, linksRaw] = match;
    const links = [...linksRaw.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    courseObjects.push({ title, fechaInicio, links });
  }
  return courseObjects;
};

const buildCoursePath = (title, year, duplicateNumber) => {
  const baseSlug = slugify(title) || "curso";
  const yearSlug = year ? `-${year}` : "";
  const uniqueSlug =
    duplicateNumber > 1
      ? `${baseSlug}${yearSlug}-${duplicateNumber}`
      : `${baseSlug}${yearSlug}`;
  return `/cursos/${uniqueSlug}`;
};

const computeCoursePaths = (courses) => {
  const slugCountByBase = new Map();
  return courses
    .map(({ title, fechaInicio, links }) => {
      const firstLink = links[0] || "";
      const isInternal = firstLink.startsWith("/cursos/");
      if (isInternal) {
        return firstLink.replace(/\/+$/, "");
      }
      const baseSlug = slugify(title) || "curso";
      const year = getYearFromDate(fechaInicio);
      const slugKey = year ? `${baseSlug}-${year}` : baseSlug;
      const nextDuplicateNumber = (slugCountByBase.get(slugKey) || 0) + 1;
      slugCountByBase.set(slugKey, nextDuplicateNumber);
      return buildCoursePath(title, year, nextDuplicateNumber);
    })
    .filter(Boolean);
};

const staticRoutes = [
  { loc: "", changefreq: "weekly", priority: "1.0" },
  { loc: "/cursos", changefreq: "weekly", priority: "0.9" },
  { loc: "/servicios", changefreq: "weekly", priority: "0.9" },
  { loc: "/equipos", changefreq: "monthly", priority: "0.8" }
];

const renderUrl = ({ loc, lastmod, changefreq, priority }) =>
  `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lastmod || today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

const generate = async () => {
  const source = await fs.readFile(COURSES_FILE, "utf-8");
  const courses = extractCourses(source);
  const coursePaths = computeCoursePaths(courses);

  const courseUrls = coursePaths.map((loc, i) => ({
    loc,
    lastmod: dateToIso(courses[i].fechaInicio),
    changefreq: "monthly",
    priority: isStaleCourse(courses[i].fechaInicio) ? "0.3" : "0.7"
  }));

  const allUrls = [...staticRoutes, ...courseUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(renderUrl).join("\n")}
</urlset>
`;

  await fs.writeFile(path.join(PUBLIC, "sitemap.xml"), xml);
  console.log(
    `  sitemap.xml       (${allUrls.length} URLs: ${staticRoutes.length} static, ${courseUrls.length} courses)`
  );
};

generate()
  .then(() => console.log("Sitemap generated successfully."))
  .catch((err) => {
    console.error("Sitemap generation failed:", err);
    process.exit(1);
  });
