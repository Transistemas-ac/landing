import Salud from "../data/Salud";
import geocoding from "../data/geocoding.json";

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

const getCoords = (item, index) => {
  const entry = geocoding[index];
  if (!entry || typeof entry.lat !== "number" || typeof entry.lng !== "number") {
    return null;
  }
  return { lat: entry.lat, lng: entry.lng };
};

const splitEmails = (correo = "") =>
  correo
    .split("/")
    .map((email) => email.trim())
    .filter(Boolean);

export {
  Salud,
  geocoding,
  provincias,
  slugifyProvincia,
  getProvinciaBySlug,
  getProvinciaSlug,
  getItemsByProvincia,
  getCoords,
  splitEmails
};