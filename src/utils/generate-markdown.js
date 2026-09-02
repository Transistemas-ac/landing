import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getSiteRoutes, slugify } from "./site-routes.js";
import metrics from "../data/Metrics.js";
import Salud from "../data/Salud.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const TEAMS_FILE = path.join(ROOT, "src", "data", "Teams.js");
const OUTPUT_DIR = path.join(ROOT, "public", "markdown");

const SITE_URL = "https://transistemas.org";
const CONTACT_EMAIL = "equipo@transistemas.org";
const DISCORD_URL = "https://discord.gg/FSAbrjsCbW";
const STATIC_COUNT = 8;

const ABOUT_TEXT = {
  title: "Nosotres",
  description:
    "Somos una asociación civil de Argentina que impulsa la formación tecnológica y la inserción laboral de talento subrepresentado en la industria IT, con foco en la comunidad LGBTIQ+.",
  body: [
    "Transistemas nació en 2019 con el objetivo de ampliar las oportunidades laborales en el sector tecnológico para personas del colectivo LGBTIQ+. A partir de programas de formación y trabajo colaborativo, construimos una red de aprendizaje y desarrollo profesional que hoy impulsa tanto la capacitación tecnológica como la creación de proyectos y servicios digitales.",
    "Ofrecemos servicios profesionales de desarrollo de software, diseño UX/UI y testing/QA para empresas y organizaciones sociales. Los ingresos de estos servicios sostienen cursos gratuitos de tecnología para nuestra comunidad.",
    "Nuestro impacto hasta hoy: 28 cursos dictados, 500 ayudas sociales entregadas, 1821 egresades y más de 350 personas que consiguieron trabajo registrado.",
    "Trabajamos en cuatro equipos voluntarios: Educación (planifica cursos y talleres junto a empresas), Desarrollo (construye aplicaciones web), Diseño (investiga y diseña experiencias digitales accesibles) y Comunicación (ejecuta la estrategia de comunicación).",
    "Somos una asociación civil registrada en Argentina. Colaboran con nosotros empresas como Accenture y PedidosYa, además de organizaciones sociales de todo el país."
  ]
};

const CONTACT_TEXT = {
  title: "Contacto",
  description:
    "Escribinos para contratar servicios de software, proponer una alianza, sumarte como voluntarie o pedir información sobre nuestros cursos gratuitos.",
  body: [
    "Correo electrónico: " + CONTACT_EMAIL + " (canal principal, respondemos en días hábiles).",
    "Formulario de contacto: disponible en la página de inicio de transistemas.org; envía tu nombre, correo y mensaje a nuestro casilla de forma segura a través de formsubmit.co.",
    "Comunidad: " + DISCORD_URL + " — nuestro Discord es el canal más rápido para consultas sobre cursos e inserción laboral.",
    "Redes sociales: X/Twitter (@Transistemas1), Instagram (@transistemas), LinkedIn (transistemasok), Facebook (Transistemas) y TikTok (@transistemas).",
    "Para solicitar la eliminación de datos personales enviados por formulario, escribinos a " + CONTACT_EMAIL + " con el asunto \"Baja de datos\"."
  ]
};

const PRIVACY_TEXT = {
  title: "Política de Privacidad",
  description:
    "Cómo recopilamos, usamos y protegemos los datos personales de quienes navegan transistemas.org, se anotan a cursos o completan formularios de contacto.",
  body: [
    "Qué datos recopilamos: únicamente los datos que nos proporcionás de forma voluntaria — nombre, pronombres, correo electrónico y mensaje — cuando completás el formulario de contacto o los formularios de inscripción a cursos (Google Forms).",
    "Para qué los usamos: para responder tu consulta, gestionar tu inscripción a cursos y talleres, y enviararte información sobre nuestras actividades si nos das tu consentimiento. No vendemos, alquilamos ni cedemos tus datos personales a terceros con fines comerciales.",
    "Servicios de terceros: el formulario de contacto se procesa mediante formsubmit.co y las inscripciones a cursos mediante Google Forms; ambos actúan como encargados del tratamiento para entregar tu mensaje a nuestro correo. El mapa de hormonización usa teselas de mapas de OpenFreeMap, que puede registrar tu dirección IP según sus propias políticas.",
    "Cookies y analítica: este sitio no utiliza cookies de seguimiento ni herramientas de analítica publicitaria.",
    "Tus derechos: podés solicitar en cualquier momento el acceso, la rectificación o la eliminación de tus datos escribiendo a " + CONTACT_EMAIL + " con el asunto \"Baja de datos\".",
    "Actualizaciones: esta política puede actualizarse; la fecha de última revisión se indica en esta página. Última actualización: 2026."
  ]
};

const extractTeams = (source) => {
  const teams = [];
  const regex = /title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    teams.push({ title: match[1], description: match[2] });
  }
  return teams;
};

const dateToIso = (dateStr) => {
  if (!dateStr) return "";
  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return "";
  return `${match[3]}-${match[2]}-${match[1]}`;
};

const coursePage = ({ path, title, teachers, fechaInicio, fechaFin, duration, horario, curriculumHref, signupHref, links, status }) => {
  const lines = [
    `# ${title}`,
    "",
    `Estado: ${status || "Sin información"}.`,
    "",
    `- **Equipo docente:** ${teachers || "Equipo de Educación de Transistemas"}`,
    `- **Inicio:** ${fechaInicio || "A confirmar"}`,
    `- **Fin:** ${fechaFin || "A confirmar"}`,
    `- **Duración:** ${duration || "A confirmar"}`,
    `- **Horario:** ${horario || "A confirmar"}`,
    "",
    "Este curso es gratuito y está pensado para facilitar la inserción laboral en la industria IT. Damos prioridad a personas del colectivo LGBTIQ+, pero cualquiera puede anotarse. Al finalizar recibís un certificado expedido por Transistemas y los entes que participen de la certificación. Los cursos se dictan de forma online para facilitar el acceso desde distintas regiones.",
    ""
  ];
  if (signupHref) lines.push(`- [Inscripción](${signupHref})`);
  if (curriculumHref) lines.push(`- [Temario](${curriculumHref})`);
  for (const link of links) {
    if (link !== signupHref && link !== curriculumHref) {
      lines.push(`- [Más información](${link})`);
    }
  }
  lines.push("", `Fuente: ${SITE_URL}${path}`, "");
  return lines.join("\n");
};

const provinciaPage = ({ provincia, path, centros }) => {
  const lines = [
    `# Hormonización en ${provincia}`,
    "",
    `Centros de salud públicos en ${provincia} (Argentina) que brindan hormonización gratuita y atención integral para la comunidad LGBTIQ+. Datos verificados por el equipo de Transistemas.`,
    "",
    `Total de centros: ${centros.length}.`,
    ""
  ];
  for (const centro of centros) {
    lines.push(`## ${centro.nombre}`, "");
    lines.push(`- **Ciudad:** ${centro.ciudad}`);
    lines.push(`- **Especialidades:** ${centro.especialidad}`);
    lines.push(`- **Dirección:** ${centro.direccion}`);
    if (centro.telefono) lines.push(`- **Teléfono:** ${centro.telefono}`);
    if (centro.correo) lines.push(`- **Correo:** ${centro.correo}`);
    lines.push("");
  }
  lines.push(`Fuente: ${SITE_URL}${path}`, "");
  return lines.join("\n");
};

const trustPage = ({ title, description, body }) =>
  [
    `# ${title}`,
    "",
    description,
    "",
    ...body.map((paragraph) => `${paragraph}\n`),
    `Fuente: ${SITE_URL}`,
    ""
  ].join("\n");

const homePage = (coursePages) =>
  [
    "# Transistemas",
    "",
    "> Asociación civil argentina que impulsa la formación tecnológica y la inserción laboral de la comunidad LGBTIQ+ en la industria IT. Cursos gratuitos de tecnología y servicios profesionales de desarrollo de software, diseño UX/UI y testing para empresas y organizaciones.",
    "",
    "Somos un equipo profesional y diverso que impulsa la formación tecnológica y la inserción laboral de nuestra comunidad en la industria IT. Ofrecemos servicios de **desarrollo de software, diseño y testing** para empresas y organizaciones sociales. Además realizamos cursos gratuitos para nuestra comunidad.",
    "",
    "## Qué hacemos",
    "",
    "### Cursos",
    "",
    "Brindamos capacitaciones gratuitas en Testing, Programación y Diseño para formar a nuestra comunidad y facilitar su inserción laboral.",
    "",
    "### Servicios",
    "",
    "Ofrecemos servicios de desarrollo de software, diseño y testing para organizaciones sociales y empresas de distintos sectores.",
    "",
    "### Acompañamiento",
    "",
    "Creamos una comunidad de acompañamiento y apoyo mutuo para compartir experiencias y generar redes que ayuden a sortear situaciones difíciles.",
    "",
    "## Impacto",
    "",
    ...metrics.map(({ value, title }) => `- **${value}** ${title}`),
    "",
    "## Últimos cursos",
    "",
    ...coursePages.slice(0, 6).map(({ path, title, fechaInicio }) => `- [${title}](${SITE_URL}${path}) — inicio ${fechaInicio}`),
    "",
    "## Contacto",
    "",
    `- Correo: ${CONTACT_EMAIL}`,
    `- Comunidad: ${DISCORD_URL}`,
    "",
    `Fuente: ${SITE_URL}/`,
    ""
  ].join("\n");

const coursesPage = (coursePages) =>
  [
    "# Cursos y Talleres",
    "",
    "Brindamos capacitaciones gratuitas en Testing, Programación y Diseño para formar a nuestra comunidad y facilitar su inserción laboral. Nuestros cursos son gratuitos y cualquiera puede anotarse, pero damos prioridad a personas del colectivo LGBTIQ+.",
    "",
    "## Preguntas frecuentes",
    "",
    "- **¿Cuál es el costo de los cursos?** Los cursos son gratuitos y no tienen coste de emisión de certificado.",
    "- **¿Quiénes pueden anotarse?** Cualquier persona interesada; damos prioridad a personas del colectivo LGBTIQ+.",
    "- **¿Se emite certificado?** Sí, expedido por Transistemas y los entes que participen de la certificación.",
    "- **¿Son online o presenciales?** Se dictan de forma online para facilitar el acceso desde distintas regiones.",
    "",
    "## Listado de cursos",
    "",
    ...coursePages.map(
      ({ path, title, fechaInicio, status }) =>
        `- [${title}](${SITE_URL}${path}) — inicio ${fechaInicio} (${status || "ver estado"})`
    ),
    "",
    `Fuente: ${SITE_URL}/cursos`,
    ""
  ].join("\n");

const equiposPage = (teams) =>
  [
    "# Nuestros Equipos",
    "",
    "Transistemas nació en 2019 con el objetivo de ampliar las oportunidades laborales en el sector tecnológico para personas del colectivo LGBTIQ+. A partir de programas de formación y trabajo colaborativo, fuimos construyendo una red de aprendizaje y desarrollo profesional que hoy impulsa tanto la capacitación tecnológica como la creación de proyectos y servicios digitales.",
    "",
    ...teams.flatMap(({ title, description }) => [
      `## ${title}`,
      "",
      description,
      ""
    ]),
    `Fuente: ${SITE_URL}/equipos`,
    ""
  ].join("\n");

const hormonizacionPage = (provinciaPages) =>
  [
    "# Hormonización en Argentina",
    "",
    `Mapa y listado de ${Salud.length} centros de salud públicos que brindan hormonización gratuita y atención integral para la comunidad LGBTIQ+ en Argentina. Cada centro incluye especialidades, dirección, teléfono y correo de contacto.`,
    "",
    "## Centros por provincia",
    "",
    ...provinciaPages.map(
      ({ provincia, path, centros }) =>
        `- [${provincia}](${SITE_URL}${path}) — ${centros.length} centro(s)`
    ),
    "",
    "Descargas: [JSON](https://transistemas.org/hormonizacion-centros.json) · [PDF](https://transistemas.org/hormonizacion-centros.pdf) · [XLSX](https://transistemas.org/hormonizacion-centros.xlsx)",
    "",
    `Fuente: ${SITE_URL}/hormonizacion`,
    ""
  ].join("\n");

const embedPage = (provinciaPages) =>
  [
    "# Mapa de hormonización (versión embebida)",
    "",
    "Versión embebible del mapa interactivo de centros de salud públicos con hormonización gratuita en Argentina. Esta ruta está pensada para insertarse en otros sitios mediante iframe y muestra el mismo mapa y listado que la página principal de hormonización.",
    "",
    "## Centros por provincia",
    "",
    ...provinciaPages.map(
      ({ provincia, path, centros }) =>
        `- [${provincia}](${SITE_URL}${path}) — ${centros.length} centro(s)`
    ),
    "",
    `Fuente: ${SITE_URL}/hormonizacion/embed`,
    ""
  ].join("\n");

const generate = async () => {
  const [{ coursePages, provinciaPages }, teamsSource] = await Promise.all([
    getSiteRoutes(),
    fs.readFile(TEAMS_FILE, "utf-8")
  ]);
  const teams = extractTeams(teamsSource);

  const files = new Map([
    ["index.md", homePage(coursePages)],
    ["cursos.md", coursesPage(coursePages)],
    ["equipos.md", equiposPage(teams)],
    [
      "hormonizacion.md",
      hormonizacionPage(provinciaPages)
    ],
    ["hormonizacion/embed.md", embedPage(provinciaPages)],
    ["about.md", trustPage(ABOUT_TEXT)],
    ["contact.md", trustPage(CONTACT_TEXT)],
    ["privacy.md", trustPage(PRIVACY_TEXT)]
  ]);

  for (const course of coursePages) {
    files.set(`cursos/${course.path.replace("/cursos/", "")}.md`, coursePage(course));
  }
  for (const provincia of provinciaPages) {
    files.set(
      `hormonizacion/${slugify(provincia.provincia)}.md`,
      provinciaPage(provincia)
    );
  }

  await fs.mkdir(path.join(OUTPUT_DIR, "cursos"), { recursive: true });
  await fs.mkdir(path.join(OUTPUT_DIR, "hormonizacion"), { recursive: true });
  for (const [relativePath, content] of files) {
    await fs.writeFile(path.join(OUTPUT_DIR, relativePath), content);
  }

  console.log(
    `  markdown/          (${files.size} archivos: ${STATIC_COUNT} estáticos, ${coursePages.length} cursos, ${provinciaPages.length} provincias)`
  );
};

generate()
  .then(() => console.log("Markdown generated successfully."))
  .catch((err) => {
    console.error("Markdown generation failed:", err);
    process.exit(1);
  });
