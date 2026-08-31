import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const SALUD_FILE = path.join(ROOT, "src", "data", "Salud.js");
const GEOCODING_FILE = path.join(ROOT, "src", "data", "geocoding.json");
const PENDING_FILE = path.join(ROOT, "geocoding-pending.json");

const ITEM_REGEX =
  /\{\s*nombre:\s*"([^"]*)"[\s\S]*?provincia:\s*"([^"]+)"[\s\S]*?ciudad:\s*"([^"]*)"[\s\S]*?direccion:\s*"([^"]*)"/g;

const generate = async () => {
  const source = await fs.readFile(SALUD_FILE, "utf-8");
  let match;
  const items = [];
  while ((match = ITEM_REGEX.exec(source)) !== null) {
    const [, nombre, provincia, ciudad, direccion] = match;
    items.push({ nombre, provincia, ciudad, direccion });
  }

  const cache = JSON.parse(await fs.readFile(GEOCODING_FILE, "utf-8"));

  const pending = {};
  for (const [key, entry] of Object.entries(cache)) {
    if (entry.source !== "manual" && entry.source !== "address") {
      const item = items[Number(key)];
      if (!item) continue;
      pending[key] = {
        nombre: item.nombre,
        direccion: item.direccion,
        ciudad: item.ciudad,
        provincia: item.provincia,
        lat: entry.lat,
        lng: entry.lng,
        display_name: entry.display_name
      };
    }
  }

  const count = Object.keys(pending).length;
  await fs.writeFile(PENDING_FILE, JSON.stringify(pending, null, 2));
  console.log(
    `  pending file     (${count} items) -> ${path.relative(ROOT, PENDING_FILE)}`
  );
};

generate()
  .then(() => console.log("Pending geocoding file generated successfully."))
  .catch((err) => {
    console.error("Pending file generation failed:", err);
    process.exit(1);
  });