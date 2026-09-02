import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Salud from "../data/Salud.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const OUTPUT = path.join(ROOT, "public", "hormonizacion-centros.json");

const generate = async () => {
  await fs.writeFile(OUTPUT, `${JSON.stringify(Salud, null, 2)}\n`);
  console.log(`✓ JSON generado: ${OUTPUT}`);
};

generate().catch((error) => {
  console.error("Error generando el JSON:", error);
  process.exit(1);
});