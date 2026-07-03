import { Helmet } from "react-helmet-async";
import { SITE_URL, SITE_NAME } from "../utils/seo";

const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  "Equipo tecnológico que ofrece servicios de desarrollo de software, diseño y testing para empresas y organizaciones además de cursos gratuitos para la comunidad LGBTIQ+ para mejorar su inserción laboral.";

const jsonLdToString = (data) =>
  typeof data === "string" ? data : JSON.stringify(data);

const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  schema,
  schemaId
}) => {
  const fullUrl = `${SITE_URL}${path}`;
  const fullTitle = title
    ? title.includes(SITE_NAME)
      ? title
      : `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Desarrollo web, diseño y testing`;
  const resolvedImage = image?.startsWith("http")
    ? image
    : `${SITE_URL}${image}`;

  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const schemaBlocks = schema
    ? (Array.isArray(schema) ? schema : [schema]).filter(Boolean)
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_AR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:site" content="@Transistemas1" />

      {schemaBlocks.map((block, i) => {
        const blockWithGraph = block["@graph"]
          ? { ...block, "@context": "https://schema.org" }
          : {
              "@context": "https://schema.org",
              ...block,
              ...(block["@type"] && {
                "@id": block["@id"] || `${fullUrl}#${schemaId || "schema"}-${i}`
              })
            };
        return (
          <script key={`schema-${i}`} type="application/ld+json">
            {jsonLdToString(blockWithGraph)}
          </script>
        );
      })}
    </Helmet>
  );
};

export default Seo;
