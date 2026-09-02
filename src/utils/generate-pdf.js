import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import Salud from "../data/Salud.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const FONTS_DIR = path.join(ROOT, "src", "assets", "fonts");
const OUTPUT = path.join(ROOT, "public", "hormonizacion-centros.pdf");

const SITE_URL = "https://transistemas.org";
const LEY_URL =
  "https://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/197860/norma.htm";

const COLORS = {
  black: "#1a1a1a",
  grey: "#555555",
  greyLight: "#f4f4f4",
  border: "#dddddd",
  yellow: "#ffcc00",
  pink: "#b31e8c",
  blue: "#1a73e8",
  white: "#ffffff",
  pinkLight: "#ff99cc"
};

const FLAG_COLORS = ["#55cdfc", "#f7a8b8", "#ffffff", "#f7a8b8", "#55cdfc"];

const MARGIN = 48;
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FOOTER_Y = PAGE_HEIGHT - 60;
const BOTTOM_LIMIT = PAGE_HEIGHT - 64;

const provincias = [...new Set(Salud.map((item) => item.provincia))];

let pageCount = 1;

const splitEmails = (correo = "") =>
  correo
    .split(/[/,]/)
    .map((email) => email.trim())
    .filter(Boolean);

const drawTransFlag = (doc, x, y, size) => {
  const radius = size / 2;
  const stripe = size / 5;
  doc.save();
  doc.circle(x + radius, y + radius, radius).clip();
  FLAG_COLORS.forEach((color, index) => {
    doc
      .rect(x, y + index * stripe, size, stripe)
      .fill(color);
  });
  doc.restore();
  doc
    .circle(x + radius, y + radius, radius)
    .lineWidth(1.2)
    .stroke(COLORS.white);
};

const addPage = (doc) => {
  doc.addPage();
  drawFooter(doc);
};

const drawFooter = (doc) => {
  doc.save();
  doc
    .font("WorkSans")
    .fontSize(8)
    .fillColor(COLORS.grey)
    .text(`Página ${pageCount}`, 0, FOOTER_Y, {
      width: PAGE_WIDTH,
      align: "center"
    });
  doc.restore();
  doc.y = MARGIN;
};

const ensureSpace = (doc, height) => {
  if (doc.y + height > BOTTOM_LIMIT) addPage(doc);
};

const drawSectionTitle = (doc, title) => {
  ensureSpace(doc, 40);
  doc.y += 16;
  doc.rect(MARGIN, doc.y - 1, 4, 16).fill(COLORS.yellow);
  doc
    .font("WorkSansBold")
    .fontSize(11.5)
    .fillColor(COLORS.black)
    .text(title, MARGIN + 12, doc.y - 4, {
      width: CONTENT_WIDTH - 12,
      lineGap: 2
    });
  doc.y += 6;
};

const drawParagraph = (doc, text, size = 9.5, options = {}) => {
  const font = options.bold ? "WorkSansBold" : "WorkSans";
  doc.font(font).fontSize(size);
  const height = doc.heightOfString(text, {
    width: CONTENT_WIDTH,
    lineGap: 3
  });
  ensureSpace(doc, height + 6);
  doc
    .font(font)
    .fontSize(size)
    .fillColor(options.color || COLORS.grey)
    .text(text, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      lineGap: 3,
      ...options
    });
  doc.y += 4;
};

const drawInfoPage = (doc) => {
  const centerText = (text, size, font, color, y) => {
    doc
      .font(font)
      .fontSize(size)
      .fillColor(color)
      .text(text, 0, y, { width: PAGE_WIDTH, align: "center" });
    return y + size * 1.6;
  };

  let y = 70;
  y = centerText("<Transistemas>", 30, "RobotCrush", COLORS.black, y);
  doc
    .font("WorkSansSemiBold")
    .fontSize(11)
    .fillColor(COLORS.grey)
    .text("Hormonización en Argentina · Centros de salud LGBTIQ+", 0, y, {
      width: PAGE_WIDTH,
      align: "center"
    });
  y += 30;
  doc.rect(MARGIN, y, CONTENT_WIDTH, 2).fill(COLORS.pinkLight);
  y += 22;
  doc.y = y;

  drawParagraph(
    doc,
    `Mapa y listado de ${Salud.length} centros de salud públicos que brindan hormonización gratuita y atención integral para la comunidad LGBTIQ+ en Argentina, distribuidos en las ${provincias.length} provincias. Cada ficha incluye la dirección, el teléfono y el correo de contacto del centro para consultar turnos y atención.`
  );
  doc.y += 6;

  drawSectionTitle(doc, "Ley 26.743 de Identidad de Género");
  drawParagraph(
    doc,
    "En Argentina, la Ley 26.743 reconoce el derecho a la identidad de género y garantiza el acceso a la atención integral de la salud para personas trans. Los tratamientos hormonales y otras prestaciones de adecuación corporal forman parte de la cobertura obligatoria del sistema de salud, sin necesidad de autorización judicial o administrativa para personas mayores de 18 años."
  );
  doc
    .font("WorkSansSemiBold")
    .fontSize(9.5)
    .fillColor(COLORS.blue)
    .text("Fuente: Infoleg · Ley 26.743", MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      link: LEY_URL,
      underline: true
    });
  doc.y += 4;

  drawSectionTitle(doc, "Líneas de atención y orientación");
  drawParagraph(
    doc,
    "144 · Línea de Género y Diversidad (atención, asesoramiento y contención).",
    9.5,
    { bold: true }
  );
  drawParagraph(
    doc,
    "0800-222-3444 · Salud Sexual (información sobre derechos y acceso a servicios de salud)."
  );
  doc.y += 2;

  drawSectionTitle(doc, "Sobre los datos publicados");
  drawParagraph(
    doc,
    "La información sobre hospitales, consultorios y servicios fue recopilada a partir de fuentes públicas y registros oficiales. El mapa se construye sobre cartografía de OpenStreetMap y OpenFreeMap. Aunque intentamos mantenerla actualizada, algunos datos pueden haber cambiado."
  );
  doc
    .font("WorkSansSemiBold")
    .fontSize(9.5)
    .fillColor(COLORS.black)
    .text("Última actualización: 31/08/2026.", MARGIN, doc.y, {
      width: CONTENT_WIDTH
    });
  doc.y += 4;

  drawSectionTitle(doc, "¿Encontraste un error o un dato desactualizado?");
  drawParagraph(
    doc,
    "Ayudanos a mejorar esta guía. Si un teléfono, dirección, horario o cualquier otra información es incorrecta, completá el formulario de reporte disponible en transistemas.org/hormonizacion. Tu colaboración ayuda a mantener esta información precisa y útil para toda la comunidad."
  );
  doc.y += 8;

  const disclaimer =
    "La información de este sitio es únicamente orientativa y no reemplaza el asesoramiento, diagnóstico ni tratamiento de un profesional de la salud.";
  doc.font("WorkSans").fontSize(8.5);
  const disclaimerHeight = doc.heightOfString(disclaimer, {
    width: CONTENT_WIDTH,
    lineGap: 3
  });
  ensureSpace(doc, disclaimerHeight + 4);
  doc
    .font("WorkSans")
    .fontSize(8.5)
    .fillColor(COLORS.grey)
    .text(disclaimer, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      lineGap: 3,
      italic: true
    });

  doc.y += 8;
  doc
    .font("WorkSans")
    .fontSize(8.5)
    .fillColor(COLORS.grey)
    .text(`${SITE_URL}/hormonizacion`, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      link: `${SITE_URL}/hormonizacion`,
      underline: true
    });
};

const drawCentro = (doc, item) => {
  const nameWidth = CONTENT_WIDTH - 52;
  doc.font("WorkSansBold").fontSize(10.5);
  const nameHeight = doc.heightOfString(item.nombre, {
    width: nameWidth,
    lineGap: 2
  });
  doc.font("WorkSansSemiBold").fontSize(8.5);
  const especialidadHeight = doc.heightOfString(item.especialidad, {
    width: nameWidth,
    lineGap: 2
  });

  const rows = [["Ciudad", item.ciudad], ["Dirección", item.direccion]];
  if (item.telefono) rows.push(["Teléfono", item.telefono]);
  if (item.correo) rows.push(["Correo", item.correo]);

  doc.font("WorkSans").fontSize(8.5);
  let rowsHeight = 0;
  rows.forEach(([label, value]) => {
    rowsHeight +=
      doc.heightOfString(`${label}: ${value}`, {
        width: CONTENT_WIDTH - 28,
        lineGap: 2
      }) + 4;
  });

  const cardHeight = 14 + nameHeight + 3 + especialidadHeight + 6 + rowsHeight + 12;
  ensureSpace(doc, cardHeight + 16);

  const y = doc.y;
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, cardHeight, 10).fill(COLORS.greyLight);
  drawTransFlag(doc, MARGIN + 14, y + 14, 14);

  doc
    .font("WorkSansBold")
    .fontSize(10.5)
    .fillColor(COLORS.black)
    .text(item.nombre, MARGIN + 38, y + 12, { width: nameWidth, lineGap: 2 });

  doc
    .font("WorkSansSemiBold")
    .fontSize(8.5)
    .fillColor(COLORS.pink)
    .text(item.especialidad, MARGIN + 38, y + 12 + nameHeight + 3, {
      width: nameWidth,
      lineGap: 2
    });

  let rowY = y + 12 + nameHeight + 3 + especialidadHeight + 6;
  rows.forEach(([label, value]) => {
    if (label === "Correo") {
      doc
        .font("WorkSansBold")
        .fontSize(8.5)
        .fillColor(COLORS.black)
        .text("Correo: ", MARGIN + 14, rowY, { continued: true });
      const emails = splitEmails(value);
      doc.font("WorkSans").fillColor(COLORS.blue);
      emails.forEach((email, emailIndex) => {
        doc.text(email, {
          link: `mailto:${email}`,
          continued: emailIndex < emails.length - 1
        });
        if (emailIndex < emails.length - 1) {
          doc.text(" / ", { continued: true });
        }
      });
    } else {
      doc
        .font("WorkSansBold")
        .fontSize(8.5)
        .fillColor(COLORS.black)
        .text(`${label}: `, MARGIN + 14, rowY, { continued: true });
      doc
        .font("WorkSans")
        .fontSize(8.5)
        .fillColor(COLORS.black)
        .text(value, { width: CONTENT_WIDTH - 28, lineGap: 2 });
    }
    rowY = doc.y + 4;
  });

  doc.y = rowY + 6;
};

const drawListado = (doc) => {
  addPage(doc);

  doc
    .font("WorkSansBold")
    .fontSize(16)
    .fillColor(COLORS.black)
    .text("Listado de centros de salud", 0, doc.y, {
      width: PAGE_WIDTH,
      align: "center"
    });
  doc.y += 4;
  doc
    .font("WorkSans")
    .fontSize(9)
    .fillColor(COLORS.grey)
    .text(`${Salud.length} centros en las ${provincias.length} provincias de Argentina`, 0, doc.y, {
      width: PAGE_WIDTH,
      align: "center"
    });
  doc.y += 14;

  let globalIndex = 0;
  provincias.forEach((provincia, provinciaIndex) => {
    const items = Salud.filter((item) => item.provincia === provincia);
    if (provinciaIndex > 0) addPage(doc);

    const title = `${provincia} · ${items.length} ${items.length === 1 ? "centro" : "centros"}`;
    doc.font("WorkSansBold").fontSize(12.5);
    const underlineWidth = Math.min(
      doc.widthOfString(title),
      CONTENT_WIDTH
    );
    doc
      .font("WorkSansBold")
      .fontSize(12.5)
      .fillColor(COLORS.black)
      .text(title, MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.rect(MARGIN, doc.y + 3, underlineWidth, 2.5).fill(COLORS.yellow);
    doc.y += 10;

    items.forEach((item) => {
      drawCentro(doc, item);
      globalIndex += 1;
    });
  });
};

const generate = async () => {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    info: {
      Title: "Hormonización en Argentina · Centros de salud LGBTIQ+",
      Author: "Transistemas",
      Subject: "Mapa y listado de centros de salud con hormonización",
      Keywords: "hormonización, LGBTIQ+, salud, Argentina, transistemas"
    }
  });

  doc.registerFont(
    "RobotCrush",
    path.join(FONTS_DIR, "RobotCrush", "RobotCrush.ttf")
  );
  doc.registerFont("WorkSans", path.join(FONTS_DIR, "WorkSans", "WorkSans-Regular.ttf"));
  doc.registerFont("WorkSansBold", path.join(FONTS_DIR, "WorkSans", "WorkSans-Bold.ttf"));
  doc.registerFont("WorkSansSemiBold", path.join(FONTS_DIR, "WorkSans", "WorkSans-SemiBold.ttf"));

  pageCount = 1;
  drawFooter(doc);
  doc.on("pageAdded", () => {
    pageCount += 1;
  });

  doc.y = MARGIN;

  drawInfoPage(doc);
  drawListado(doc);

  const chunks = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  const done = new Promise((resolve, reject) => {
    doc.on("end", resolve);
    doc.on("error", reject);
  });
  doc.end();
  await done;

  await fs.writeFile(OUTPUT, Buffer.concat(chunks));
  console.log(`✓ PDF generado: ${OUTPUT} (${Buffer.concat(chunks).length} bytes)`);
};

generate().catch((error) => {
  console.error("Error generando el PDF:", error);
  process.exit(1);
});