import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ExcelJS from "exceljs";
import Salud from "../data/Salud.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const OUTPUT = path.join(ROOT, "public", "hormonizacion-centros.xlsx");

const HEADERS = [
  { header: "nombre", key: "nombre", width: 55 },
  { header: "especialidad", key: "especialidad", width: 45 },
  { header: "provincia", key: "provincia", width: 18 },
  { header: "ciudad", key: "ciudad", width: 28 },
  { header: "direccion", key: "direccion", width: 40 },
  { header: "telefono", key: "telefono", width: 32 },
  { header: "correo", key: "correo", width: 42 },
  { header: "lat", key: "lat", width: 12 },
  { header: "lng", key: "lng", width: 12 }
];

const generate = async () => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Transistemas";
  workbook.title = "Centros de salud con hormonización";
  workbook.subject = "Mapa y listado de centros de salud con hormonización";

  const sheet = workbook.addWorksheet("Centros de hormonización");
  sheet.columns = HEADERS;
  sheet.addRows(Salud);
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  sheet.autoFilter = { from: "A1", to: "I1" };

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFCC00" }
  };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };

  await workbook.xlsx.writeFile(OUTPUT);
  console.log(`✓ XLSX generado: ${OUTPUT}`);
};

generate().catch((error) => {
  console.error("Error generando el XLSX:", error);
  process.exit(1);
});