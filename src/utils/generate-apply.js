import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const SALUD_FILE = path.join(ROOT, "src", "data", "Salud.js");
const GEOCODING_FILE = path.join(ROOT, "src", "data", "geocoding.json");
const PENDING_FILE = path.join(ROOT, "geocoding-pending.json");

const META_FIELDS = ["nombre", "direccion", "ciudad", "provincia"];

const isValidLat = (lat) =>
  typeof lat === "number" && Number.isFinite(lat) && lat >= -90 && lat <= 90;

const isValidLng = (lng) =>
  typeof lng === "number" && Number.isFinite(lng) && lng >= -180 && lng <= 180;

const escapeJs = (value = "") =>
  value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const fieldRegex = (field) =>
  new RegExp(`(\\n\\s*${field}:\\s*)("(?:[^"\\\\]|\\\\.)*")`);

const itemNombre = (segment) => {
  const match = segment.match(/\bnombre:\s*"((?:[^"\\]|\\.)*)"/s);
  return match ? match[1] : "(sin nombre)";
};

const apply = async () => {
  let pending;
  try {
    pending = JSON.parse(await fs.readFile(PENDING_FILE, "utf-8"));
  } catch {
    console.error("  pending file missing. Run `npm run geocode:pending` first.");
    process.exit(1);
  }

  const cache = JSON.parse(await fs.readFile(GEOCODING_FILE, "utf-8"));
  const source = await fs.readFile(SALUD_FILE, "utf-8");

  const segments = source.split("\n  },");
  const header = segments[0].slice(0, segments[0].indexOf("\n  {"));
  segments[0] = segments[0].slice(segments[0].indexOf("\n  {"));

  const lastIndex = segments.length - 1;
  const tailStart = segments[lastIndex].indexOf("\n];");
  const tail =
    tailStart === -1 ? "" : segments[lastIndex].slice(tailStart);
  segments[lastIndex] =
    tailStart === -1 ? segments[lastIndex] : segments[lastIndex].slice(0, tailStart);

  const metaUpdated = [];
  for (const [key, edited] of Object.entries(pending)) {
    const index = Number(key);
    const segment = segments[index];
    if (!segment) continue;
    for (const field of META_FIELDS) {
      const editedValue = edited[field];
      if (typeof editedValue !== "string") continue;
      const match = segment.match(fieldRegex(field));
      if (!match || match[1] === editedValue) continue;
      const currentValue = match[2].slice(1, -1).replace(/\\(["\\])/g, "$1");
      if (currentValue === editedValue) continue;
      segments[index] = segments[index].replace(
        fieldRegex(field),
        `$1"${escapeJs(editedValue)}"`
      );
      metaUpdated.push({ key, field });
    }
  }

  const pendingKeys = new Set(Object.keys(pending));
  const deleted = Object.keys(cache)
    .filter(
      (key) =>
        ["ciudad", "localidad"].includes(cache[key].source) &&
        !pendingKeys.has(key)
    )
    .sort((a, b) => Number(b) - Number(a))
    .map((key) => ({ key, nombre: itemNombre(segments[Number(key)] ?? "") }));

  for (const { key } of deleted) {
    segments.splice(Number(key), 1);
  }

  const shift = (key) =>
    key - deleted.filter((item) => Number(item.key) < key).length;

  const newCache = {};
  for (const [key, entry] of Object.entries(cache)) {
    if (deleted.some((item) => item.key === key)) continue;
    newCache[String(shift(Number(key)))] = entry;
  }

  let applied = 0;
  let unchanged = 0;
  const invalid = [];
  for (const [key, edited] of Object.entries(pending)) {
    const current = newCache[String(shift(Number(key)))];
    if (!current) continue;
    if (
      current.lat === edited.lat &&
      current.lng === edited.lng &&
      current.display_name === edited.display_name
    ) {
      unchanged++;
      continue;
    }
    if (!isValidLat(edited.lat) || !isValidLng(edited.lng)) {
      invalid.push({
        key,
        nombre: edited.nombre,
        lat: edited.lat,
        lng: edited.lng
      });
      continue;
    }
    newCache[String(shift(Number(key)))] = {
      lat: edited.lat,
      lng: edited.lng,
      display_name: edited.display_name ?? current.display_name,
      source: "manual"
    };
    applied++;
  }

  const newSource = header + segments.join("\n  },") + tail;

  await fs.writeFile(SALUD_FILE, newSource);
  await fs.writeFile(GEOCODING_FILE, JSON.stringify(newCache, null, 2));

  console.log(
    `  geocoding apply  (${applied} coords, ${unchanged} unchanged, ${metaUpdated.length} meta, ${deleted.length} deleted)`
  );
  if (metaUpdated.length) {
    console.log("  meta updated:");
    const byKey = {};
    metaUpdated.forEach(({ key, field }) => {
      (byKey[key] ||= []).push(field);
    });
    Object.entries(byKey).forEach(([key, fields]) =>
      console.log(`    [${key}] ${fields.join(", ")}`)
    );
  }
  if (deleted.length) {
    console.log("  deleted items:");
    deleted.forEach(({ key, nombre }) =>
      console.log(`    [${key}] ${nombre}`)
    );
  }
  if (invalid.length) {
    console.log("  invalid coords (skipped):");
    invalid.forEach(({ key, nombre, lat, lng }) =>
      console.log(`    [${key}] ${nombre} | lat=${lat}, lng=${lng}`)
    );
  }
};

apply()
  .then(() => console.log("Manual geocoding applied successfully."))
  .catch((err) => {
    console.error("Manual geocoding apply failed:", err);
    process.exit(1);
  });