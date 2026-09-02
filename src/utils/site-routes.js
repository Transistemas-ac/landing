import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Salud from "../data/Salud.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const COURSES_FILE = path.join(ROOT, "src", "data", "Courses.js");

export const SITE_URL = "https://transistemas.org";

export const STATIC_PATHS = [
  "/",
  "/cursos",
  "/equipos",
  "/hormonizacion",
  "/hormonizacion/embed",
  "/about",
  "/contact",
  "/privacy"
];

export const TRUST_PATHS = ["/about", "/contact", "/privacy"];

export const slugify = (title = "") =>
  title
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const extractCourses = (source) => {
  const courseObjects = [];
  const regex =
    /\{\s*title:\s*"([^"]+)"[\s\S]*?teachers:\s*"([^"]*)"[\s\S]*?fechaInicio:\s*"([^"]*)"[\s\S]*?fechaFin:\s*"([^"]*)"[\s\S]*?duration:\s*"([^"]*)"[\s\S]*?horario:\s*"([^"]*)"[\s\S]*?curriculumHref:\s*"([^"]*)"[\s\S]*?signupHref:\s*"([^"]*)"[\s\S]*?links:\s*\[([^\]]*)\][\s\S]*?status:\s*"([^"]*)"/g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    const [
      ,
      title,
      teachers,
      fechaInicio,
      fechaFin,
      duration,
      horario,
      curriculumHref,
      signupHref,
      linksRaw,
      status
    ] = match;
    const links = [...linksRaw.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    courseObjects.push({
      title,
      teachers,
      fechaInicio,
      fechaFin,
      duration,
      horario,
      curriculumHref,
      signupHref,
      links,
      status
    });
  }
  return courseObjects;
};

export const getYearFromDate = (dateStr = "") => {
  if (!dateStr) return "";
  const match = dateStr.match(/(\d{4})/);
  return match ? match[1] : "";
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

export const extractProvincias = () =>
  [...new Set(Salud.map((centro) => centro.provincia))];

export const getProvinciaCentros = (provincia) =>
  Salud.filter((centro) => centro.provincia === provincia);

export const getSiteRoutes = async () => {
  const source = await fs.readFile(COURSES_FILE, "utf-8");
  const courses = extractCourses(source);
  const coursePaths = computeCoursePaths(courses);
  const coursePages = courses.map((course, i) => ({
    ...course,
    path: coursePaths[i]
  }));

  const provincias = extractProvincias();
  const provinciaPages = provincias.map((provincia) => ({
    provincia,
    path: `/hormonizacion/${slugify(provincia)}`,
    centros: getProvinciaCentros(provincia)
  }));

  return { coursePages, provinciaPages };
};
