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
  "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=10&countrycodes=ar&q=";

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

const normalizeAddress = (direccion = "") =>
  direccion
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(av|avda|dr|dra|gral|pres|brig|cmte|cnl|may)\b\.?\s*/gi, " ")
    .replace(/\bSta\b/g, "Santa")
    .replace(/\bS\/N\b/gi, "")
    .replace(/\bkm\s*[\d,]+\b/gi, "")
    .replace(/\s*entre\s+[\s\S]*$/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[,\s]+$/g, "")
    .replace(/\s+y\s*$/gi, "")
    .replace(/[,\s]+$/g, "");

const plain = (text = "") =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const plainStreet = (text = "") =>
  plain(text)
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const streetKey = (address = "") => {
  const head = plain(address)
    .replace(/\s+y\s+[\s\S]*$/, "")
    .replace(
      /\b(calle|avenida|av|diag|diagonal|ruta|pasaje|boulevard|blvd|doctor|dr|general|gral)\b/g,
      " "
    )
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const stripped = head.replace(/(?:\s+\d+[a-z]*)+$/, "");
  return stripped.length >= 4 ? stripped : head;
};

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

  if (mun === "CABA" || item.provincia === "CABA") {
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
  const streetPart = normalized.replace(/\s+y\s+[\s\S]*$/i, "").trim();
  const streetNoNumber = streetPart.replace(/\s+\d+[\d\-/]*$/, "").trim();

  const scope = provincia === "CABA" ? provinceName : `${loc}, ${provinceName}`;
  const cityScope =
    provincia === "CABA" ? provinceName : `${cityName}, ${provinceName}`;

  const queries = [];
  if (normalized) {
    queries.push({
      query: `${normalized}, ${scope}, Argentina`,
      source: "address",
      street: streetPart
    });
    if (cityScope !== scope) {
      queries.push({
        query: `${normalized}, ${cityScope}, Argentina`,
        source: "address",
        street: streetPart
      });
    }
    if (streetNoNumber && streetNoNumber !== normalized) {
      queries.push({
        query: `${streetNoNumber}, ${scope}, Argentina`,
        source: "address",
        street: streetPart
      });
      if (cityScope !== scope) {
        queries.push({
          query: `${streetNoNumber}, ${cityScope}, Argentina`,
          source: "address",
          street: streetPart
        });
      }
    }
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

const pick = (result, source) => ({
  lat: parseFloat(result.lat),
  lng: parseFloat(result.lon),
  display_name: result.display_name,
  source
});

const fetchResults = async (query) => {
  const url = `${NOMINATIM_URL}${encodeURIComponent(query)}`;
  let lastError = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
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
      return await response.json();
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES) {
        await sleep(REQUEST_DELAY_MS * (attempt + 2));
      }
    }
  }
  throw lastError;
};

const geocode = async (item, retries = 0) => {
  const queries = buildQueries(item);
  let lastError = null;
  let addressFallback = null;
  for (const { query, source, street } of queries) {
    try {
      const results = await fetchResults(query);
      const valid = results.filter((result) =>
        isValidResult(item, result.display_name)
      );
      if (!valid.length) continue;
      if (source !== "address") {
        return pick(valid[0], source);
      }
      const key = streetKey(street);
      const streetMatch = key
        ? valid.find((result) =>
            plainStreet(result.display_name).includes(key)
          )
        : null;
      if (streetMatch) {
        return pick(streetMatch, "address");
      }
      if (!addressFallback) {
        addressFallback = pick(valid[0], "ciudad");
      }
    } catch (err) {
      lastError = err;
      await sleep(REQUEST_DELAY_MS);
    }
  }
  if (addressFallback) {
    return addressFallback;
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
      if (entry.source === "manual" || entry.source !== "address") {
        return null;
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