import imgEquipos from "../assets/hero/equipos.png";
import { Pagination } from "swiper/modules";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { EquiposSlides } from "../components/Slides";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import Seo from "../components/Seo";
import { SITE_URL, organizationId } from "../utils/seo";
import Breadcrumb from "../components/Breadcrumb";
import { buildBreadcrumbSchema } from "../utils/breadcrumb";

const breadcrumbItems = [
  { name: "Inicio", url: `${SITE_URL}/` },
  { name: "Equipos", url: `${SITE_URL}/equipos` }
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/equipos#about`,
  url: `${SITE_URL}/equipos`,
  name: "Nuestros equipos — Transistemas",
  description:
    "Transistemas nació en 2019 con el objetivo de ampliar las oportunidades laborales en el sector tecnológico para personas del colectivo LGBTIQ+.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": organizationId }
};

function Equipos() {
  return (
    <div className="equipos">
      <Seo
        title="Nuestros equipos"
        description="Conocé los equipos de Transistemas: Educación, Desarrollo, Diseño y Comunicación. Un grupo profesional y diverso que impulsa la formación tecnológica y la inserción laboral de la comunidad LGBTIQ+."
        path="/equipos"
        schema={[aboutSchema, buildBreadcrumbSchema(breadcrumbItems)]}
      />

      <Breadcrumb items={breadcrumbItems} />

      <h1 className="equipos-section-title">Nuestros Equipos</h1>
      <img
        className="equipos-hero-image"
        src={imgEquipos}
        alt="Ilustración de voluntaries de Transistemas"
        loading="lazy"
        decoding="async"
      />
      <div className="equipos-section">
        <p className="equipos-section-description">
          Transistemas nació en 2019 con el objetivo de ampliar las
          oportunidades laborales en el sector tecnológico para personas del
          colectivo LGBTIQ+. A partir de programas de formación y trabajo
          colaborativo, fuimos construyendo una red de aprendizaje y desarrollo
          profesional que hoy impulsa tanto la capacitación tecnológica como la
          creación de proyectos y servicios digitales.
        </p>
        <SwiperHOC
          modules={[Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
        >
          {EquiposSlides()}
        </SwiperHOC>
      </div>

      <div className="integrants-section">
        <Dropdown title="Equipo Educación" type="members" role="education" />
        <Dropdown title="Equipo Desarrollo" type="members" role="development" />
        <Dropdown title="Equipo Diseño" type="members" role="design" />
        <Dropdown
          title="Equipo Comunicación"
          type="members"
          role="communication"
        />
      </div>

      <Footer />
    </div>
  );
}

export default Equipos;
