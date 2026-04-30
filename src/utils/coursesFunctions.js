import courses from "../data/Courses.js";

const COURSE_PATH_PREFIX = "/cursos";

// Función para obtener el año de una fecha dada en formato de texto
const getYearFromDate = (dateStr = "") => {
  if (!dateStr) return "";
  const match = dateStr.match(/(\d{4})/);
  return match ? match[1] : "";
};

// Función para convertir un título de curso en un slug URL-friendly
const slugifyCourseTitle = (title = "") =>
  title
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// Función para obtener el slug de un curso de la URL
const getCourseSlugFromPath = (path = "") =>
  path
    .toString()
    .replace(/^\/+/, "")
    .replace(/^cursos\//, "")
    .replace(/\/+$/, "");

// Función para construir la ruta de un curso dado su título, año y número de duplicado
const buildCoursePath = (title = "", year = "", duplicateNumber = 1) => {
  const baseSlug = slugifyCourseTitle(title) || "curso";
  const yearSlug = year ? `-${year}` : "";
  const uniqueSlug =
    duplicateNumber > 1
      ? `${baseSlug}${yearSlug}-${duplicateNumber}`
      : `${baseSlug}${yearSlug}`;

  return `${COURSE_PATH_PREFIX}/${uniqueSlug}`;
};

// Función para normalizar los enlaces de un curso, asegurando que el primer enlace sea interno y único
const normalizeCourseLinks = (course = {}, slugCountByBase = new Map()) => {
  const courseLinks = Array.isArray(course.links)
    ? course.links.filter(Boolean)
    : [];
  const firstLink = courseLinks[0] || "";
  const isFirstLinkInternal = firstLink.startsWith(`${COURSE_PATH_PREFIX}/`);

  if (isFirstLinkInternal) {
    return {
      ...course,
      links: [firstLink, ...courseLinks.slice(1)]
    };
  }

  const baseSlug = slugifyCourseTitle(course.title) || "curso";
  const year = getYearFromDate(course.fechaInicio);
  const slugKey = year ? `${baseSlug}-${year}` : baseSlug;

  const nextDuplicateNumber = (slugCountByBase.get(slugKey) || 0) + 1;

  slugCountByBase.set(slugKey, nextDuplicateNumber);

  return {
    ...course,
    links: [
      buildCoursePath(course.title, year, nextDuplicateNumber),
      ...courseLinks
    ]
  };
};

// Función para encontrar un curso por su slug en la URL
const findCourseBySlug = (courseSlug = "") =>
  courses.find(
    (course) => getCourseSlugFromPath(course.links?.[0]) === courseSlug
  );

export { findCourseBySlug, normalizeCourseLinks };
