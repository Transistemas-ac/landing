import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const BRAND_PRIMARY = "#6B2FB3";
const BRAND_SECONDARY = "#F4B5E1";
const BRAND_BG_FROM = "#1A0B2E";
const BRAND_BG_TO = "#3D1A5C";
const TEXT_LIGHT = "#FFFFFF";
const TEXT_MUTED = "#E5C8F5";

const OG_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_BG_FROM}"/>
      <stop offset="100%" stop-color="${BRAND_BG_TO}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND_PRIMARY}"/>
      <stop offset="100%" stop-color="${BRAND_SECONDARY}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="120" cy="120" r="280" fill="${BRAND_PRIMARY}" opacity="0.18"/>
  <circle cx="1080" cy="510" r="240" fill="${BRAND_SECONDARY}" opacity="0.14"/>
  <g transform="translate(80, 100)">
    <rect x="0" y="0" width="56" height="56" rx="14" fill="url(#accent)"/>
    <text x="28" y="40" font-family="Arial, sans-serif" font-size="34" font-weight="800" fill="${TEXT_LIGHT}" text-anchor="middle">T</text>
  </g>
  <text x="160" y="148" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="${TEXT_LIGHT}">Transistemas</text>
  <text x="80" y="290" font-family="Arial, sans-serif" font-size="76" font-weight="800" fill="${TEXT_LIGHT}">Formación y servicios</text>
  <text x="80" y="370" font-family="Arial, sans-serif" font-size="76" font-weight="800" fill="${TEXT_LIGHT}">IT con impacto social</text>
  <text x="80" y="450" font-family="Arial, sans-serif" font-size="30" font-weight="400" fill="${TEXT_MUTED}">Cursos gratuitos de Testing, Programación y Diseño</text>
  <text x="80" y="492" font-family="Arial, sans-serif" font-size="30" font-weight="400" fill="${TEXT_MUTED}">Desarrollo · Diseño UX/UI · Testing y QA</text>
  <rect x="80" y="540" width="280" height="6" rx="3" fill="url(#accent)"/>
  <text x="80" y="590" font-family="Arial, sans-serif" font-size="26" font-weight="600" fill="${TEXT_MUTED}">transistemas.org</text>
</svg>
`;

const APPLE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_PRIMARY}"/>
      <stop offset="100%" stop-color="${BRAND_BG_TO}"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" rx="36" fill="url(#bg)"/>
  <text x="90" y="118" font-family="Arial, sans-serif" font-size="110" font-weight="800" fill="${TEXT_LIGHT}" text-anchor="middle">T</text>
</svg>
`;

const generate = async () => {
  const ogBuffer = await sharp(Buffer.from(OG_SVG))
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile(path.join(PUBLIC, "og-image.png"), ogBuffer);
  console.log(`  og-image.png      (1200x630)  ${(ogBuffer.length / 1024).toFixed(1)} KB`);

  const appleBuffer = await sharp(Buffer.from(APPLE_SVG))
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile(path.join(PUBLIC, "apple-touch-icon.png"), appleBuffer);
  console.log(`  apple-touch-icon  (180x180)   ${(appleBuffer.length / 1024).toFixed(1)} KB`);
};

generate()
  .then(() => console.log("Assets generated successfully."))
  .catch((err) => {
    console.error("Asset generation failed:", err);
    process.exit(1);
  });
