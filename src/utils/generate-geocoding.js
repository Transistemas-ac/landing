import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const SALUD_FILE = path.join(ROOT, "src", "data", "Salud.js");
const OUTPUT_FILE = path.join(ROOT, "src", "data", "geocoding.json");

const USER_AGENT = "TransistemasWeb/1.0 (https://transistemas.org)";
const REQUEST_DELAY_MS = 1100;
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 15000;

const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=ar&q=";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const NUMBERS_TO_WORDS = {
  1: "uno", 2: "dos", 3: "tres", 4: "cuatro", 5: "cinco", 6: "seis",
  7: "siete", 8: "ocho", 9: "nueve", 10: "diez", 11: "once", 12: "doce",
  13: "trece", 14: "catorce", 15: "quince", 16: "dieciseis",
  17: "diecisiete", 18: "dieciocho", 19: "diecinueve", 20: "veinte",
  21: "veintiuno", 22: "veintidos", 23: "veintitres", 24: "veinticuatro",
  25: "veinticinco", 26: "veintiseis", 27: "veintisiete", 28: "veintiocho",
  29: "veintinueve", 30: "treinta", 31: "treinta y uno"
};

const norm = (text = "") =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(\d{1,2})\b/g, (_, num) => NUMBERS_TO_WORDS[num] || num)
    .replace(/\s+/g, " ")
    .trim();

const isMalvinasItem = (item) =>
  /malvina|puerto argentino/i.test(`${item.ciudad} ${item.provincia}`);

const normalizeAddress = (direccion = "") =>
  direccion
    .replace(/\([^)]*\)/g, "")
    .replace(/\bAv\./g, "Avenida")
    .replace(/\bDr\./g, "Doctor")
    .replace(/\bGral\./g, "General")
    .replace(/\bSta\b/g, "Santa")
    .replace(/\bS\/N\b/gi, "")
    .replace(/\bkm\s*[\d,]+\b/gi, "")
    .replace(/\bentre\b/gi, "y")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[,\s]+$/g, "");

const provinceKey = (provincia) =>
  provincia === "CABA"
    ? "ciudad autonoma de buenos aires"
    : norm(provincia);

const isValidResult = (item, displayName) => {
  const dn = norm(displayName);
  if (!dn) return false;
  const provKey = provinceKey(item.provincia);
  if (!dn.includes(provKey)) return false;

  const [mun, ...rest] = item.ciudad.split(",").map((part) => part.trim());
  const loc = rest.length ? rest[rest.length - 1] : mun;

  if (mun === "CBA") {
    const córdobaCapital = dn.includes("cordoba") && dn.includes("capital");
    const barrioOk = loc !== "CBA" && dn.includes(norm(loc));
    return córdobaCapital || barrioOk;
  }

  if (mun === "CABA") {
    return true;
  }

  const munNorm = norm(mun);
  const locNorm = norm(loc);
  return (
    dn.includes(locNorm) ||
    dn.includes(munNorm) ||
    dn.includes(`partido de ${munNorm}`) ||
    dn.includes(`departamento ${munNorm}`) ||
    dn.includes(`municipio de ${munNorm}`)
  );
};

const buildQueries = (item) => {
  const { direccion, ciudad, provincia } = item;
  const provinceName =
    provincia === "CABA" ? "Ciudad Autónoma de Buenos Aires" : provincia;
  const [mun, ...rest] = ciudad.split(",").map((part) => part.trim());
  const loc = rest.length ? rest[rest.length - 1] : mun;

  const cityName = mun === "CBA" ? "Córdoba" : ciudad;
  const normalized = normalizeAddress(direccion);

  const queries = [];
  if (normalized) {
    queries.push({ query: `${normalized}, ${cityName}, ${provinceName}, Argentina`, source: "address" });
  }
  queries.push({ query: `${cityName}, ${provinceName}, Argentina`, source: "ciudad" });
  if (loc !== mun) {
    queries.push({ query: `${loc}, ${provinceName}, Argentina`, source: "localidad" });
  }
  if (mun !== "CBA" && mun !== "CABA" && loc !== mun) {
    queries.push({ query: `${mun}, ${provinceName}, Argentina`, source: "municipio" });
  }
  return queries;
};

const geocode = async (item, retries = 0) => {
  const queries = buildQueries(item);
  let lastError = null;
  for (const { query, source } of queries) {
    const url = `${NOMINATIM_URL}${encodeURIComponent(query)}`;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const response = await fetch(url, {
        headers: { "User-Agent": USER_AGENT },
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const results = await response.json();
      for (const result of results) {
        if (!isValidResult(item, result.display_name)) continue;
        const { lat, lon, display_name } = result;
        return {
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          display_name,
          source
        };
      }
    } catch (err) {
      lastError = err;
      await sleep(REQUEST_DELAY_MS);
    }
  }
  if (lastError && retries < MAX_RETRIES) {
    await sleep(REQUEST_DELAY_MS * (retries + 2));
    return geocode(item, retries + 1);
  }
  return null;
};

const generate = async () => {
  const source = await fs.readFile(SALUD_FILE, "utf-8");
  const regex =
    /\{\s*nombre:\s*"([^"]*)"[\s\S]*?provincia:\s*"([^"]+)"[\s\S]*?ciudad:\s*"([^"]*)"[\s\S]*?direccion:\s*"([^"]*)"/g;
  let match;
  const items = [];
  while ((match = regex.exec(source)) !== null) {
    const [, nombre, provincia, ciudad, direccion] = match;
    items.push({ nombre, provincia, ciudad, direccion });
  }

  let cache = {};
  try {
    cache = JSON.parse(await fs.readFile(OUTPUT_FILE, "utf-8"));
  } catch {
    cache = {};
  }

  const pendingIndexes = items
    .map((item, index) => {
      const entry = cache[index];
      if (!entry || typeof entry.lat !== "number") return index;
      if (entry.source === "manual") {
        return isMalvinasItem(item) ? null : index;
      }
      return isValidResult(item, entry.display_name) ? null : index;
    })
    .filter((index) => index !== null);

  console.log(
    `  geocoding        (${items.length} items, ${pendingIndexes.length} pending)`
  );

  let geocoded = 0;
  const failed = [];
  for (let i = 0; i < pendingIndexes.length; i++) {
    const index = pendingIndexes[i];
    const item = items[index];
    try {
      const result = await geocode(item);
      if (result) {
        cache[index] = result;
        geocoded++;
      } else {
        failed.push({ index, nombre: item.nombre, ciudad: item.ciudad });
      }
    } catch (err) {
      failed.push({ index, nombre: item.nombre, ciudad: item.ciudad });
      console.error(`  failed: ${item.nombre} (${err.message})`);
    }
    if (i % 10 === 0) {
      await fs.writeFile(OUTPUT_FILE, JSON.stringify(cache, null, 2));
    }
    await sleep(REQUEST_DELAY_MS);
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(cache, null, 2));
  console.log(
    `  geocoding done   (${geocoded} new, ${failed.length} without result)`
  );
  if (failed.length) {
    console.log("  without result:");
    failed.forEach(({ index, nombre, ciudad }) =>
      console.log(`    [${index}] ${nombre} | ${ciudad}`)
    );
  }
};

generate()
  .then(() => console.log("Geocoding generated successfully."))
  .catch((err) => {
    console.error("Geocoding generation failed:", err);
    process.exit(1);
  });