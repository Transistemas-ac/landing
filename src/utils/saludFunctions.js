import Salud from "../data/Salud";

const provincias = [...new Set(Salud.map((item) => item.provincia))];

const slugifyProvincia = (provincia = "") =>
  provincia
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const getProvinciaBySlug = (slug = "") =>
  provincias.find((provincia) => slugifyProvincia(provincia) === slug);

const getProvinciaSlug = (provincia) => slugifyProvincia(provincia);

const getItemsByProvincia = (provincia) =>
  Salud.filter((item) => item.provincia === provincia);

const getCoords = (item) => {
  if (
    !item ||
    typeof item.lat !== "number" ||
    typeof item.lng !== "number" ||
    !Number.isFinite(item.lat) ||
    !Number.isFinite(item.lng)
  ) {
    return null;
  }
  return { lat: item.lat, lng: item.lng };
};

const splitEmails = (correo = "") =>
  correo
    .split(/[/,]/)
    .map((email) => email.trim())
    .filter(Boolean);

export {
  Salud,
  provincias,
  slugifyProvincia,
  getProvinciaBySlug,
  getProvinciaSlug,
  getItemsByProvincia,
  getCoords,
  splitEmails
};