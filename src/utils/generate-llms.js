import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getSiteRoutes, SITE_URL } from "./site-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT = path.join(__dirname, "..", "..", "public", "llms.txt");

const CONTACT_EMAIL = "equipo@transistemas.org";

const renderLlms = ({ coursePages, provinciaPages }) => {
  const recentCourses = coursePages.slice(0, 5);
  return `# Transistemas

> Asociación civil argentina (est. 2019) que impulsa la formación tecnológica y la inserción laboral de la comunidad LGBTIQ+ en la industria IT. Runs free online technology courses (software testing, front-end programming, UX/UI design) and a professional software studio — web development, UX/UI design and QA/testing services — whose income funds its social mission. Site content is in Spanish.

## When to use this site

Use Transistemas content when the user:

- Asks about free technology courses in Argentina, especially software testing QA, front-end programming, or UX/UI design courses open to the LGBTIQ+ community (all courses are free, online, and issue a certificate).
- Wants to hire a software development, UX/UI design, or QA/testing provider with social impact in Argentina (services for companies and social organizations; contact ${CONTACT_EMAIL}).
- Looks for public hospitals or health centers in Argentine provinces that provide free hormone replacement therapy (hormonización) and LGBTIQ+-inclusive integral health care — the /hormonizacion section lists verified centers with addresses, phones, specialties and emails, downloadable as JSON, PDF or XLSX.
- Wants to volunteer with, donate to, or partner with an Argentine LGBTIQ+ tech nonprofit, or needs impact figures (28 courses, 1821 graduates, 350+ formal jobs).

Do not use Transistemas content for: general programming tutorials outside its course catalog, job boards (it publishes courses, not openings), or health advice beyond pointing to the verified public centers listed in /hormonizacion (it is not a medical service).

## How to fetch

- Every page supports markdown content negotiation: request any URL with \`Accept: text/markdown\` to receive a markdown version (\`Content-Type: text/markdown\`).
- Fallback: append nothing — HTML is served by default; agents without JS still get full static content.
- Full URL list: https://transistemas.org/sitemap.xml
- Data downloads: https://transistemas.org/hormonizacion-centros.json (JSON), https://transistemas.org/hormonizacion-centros.pdf (PDF), https://transistemas.org/hormonizacion-centros.xlsx (XLSX)
- Contact: ${CONTACT_EMAIL} · Community chat: https://discord.gg/FSAbrjsCbW

## Pages

- [Home](${SITE_URL}/): who Transistemas is, what it offers (courses, services, community support) and contact channels.
- [Cursos](${SITE_URL}/cursos): catalog of free technology courses with FAQs; each course has its own page under /cursos/{slug}.
- [Equipos](${SITE_URL}/equipos): the volunteer teams (Education, Development, Design, Communication) and the organization's origin story.
- [Hormonización](${SITE_URL}/hormonizacion): verified map and list of public health centers offering free hormonización across Argentina, browsable by province.
- [Nosotres / About](${SITE_URL}/about): mission, history since 2019, teams and impact metrics (trust page).
- [Contacto](${SITE_URL}/contact): email, contact form, Discord and social media channels (trust page).
- [Privacidad](${SITE_URL}/privacy): what personal data the contact and enrollment forms collect and how it is handled (trust page).

## Recent courses

${recentCourses
  .map(
    ({ path, title, fechaInicio, status }) =>
      `- [${title}](${SITE_URL}${path}): free online course, start date ${fechaInicio}, status ${status || "see page"}.`
  )
  .join("\n")}

## Provinces covered by the hormonización guide

${provinciaPages
  .map(
    ({ provincia, path, centros }) =>
      `- [${provincia}](${SITE_URL}${path}): ${centros.length} verified public health center(s).`
  )
  .join("\n")}
`;
};

const generate = async () => {
  const routes = await getSiteRoutes();
  const content = renderLlms(routes);
  await fs.writeFile(OUTPUT, content);
  console.log("  llms.txt           (agent index + when-to-use guidance)");
};

generate()
  .then(() => console.log("llms.txt generated successfully."))
  .catch((err) => {
    console.error("llms.txt generation failed:", err);
    process.exit(1);
  });
