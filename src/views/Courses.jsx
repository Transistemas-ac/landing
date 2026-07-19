import imgCursos from "../assets/hero/cursos.png";
import { CoursesSlides } from "../components/Slides";
import Dropdown from "../components/Dropdown";
import Footer from "../components/Footer";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { Pagination } from "swiper/modules";
import Seo from "../components/Seo";
import { SITE_URL, organizationId } from "../utils/seo";
import Breadcrumb from "../components/Breadcrumb";
import { buildBreadcrumbSchema } from "../utils/breadcrumb";
import { courseFaqItems as faqItems } from "../data/faqs";

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer
    }
  }))
};

const breadcrumbItems = [
  { name: "Inicio", url: `${SITE_URL}/` },
  { name: "Cursos", url: `${SITE_URL}/cursos` }
];

const courseListSchema = {
  "@type": "ItemList",
  name: "Cursos y talleres de Transistemas",
  itemListOrder: "https://schema.org/ItemListUnordered",
  numberOfItems: 3,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Testing",
      url: `${SITE_URL}/cursos`
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Programación",
      url: `${SITE_URL}/cursos`
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Diseño UX/UI",
      url: `${SITE_URL}/cursos`
    }
  ]
};

function Courses() {
  return (
    <div className="courses">
      <Seo
        title="Cursos gratuitos de tecnología"
        description="Cursos y talleres gratuitos en Testing, Programación y Diseño para la comunidad LGBTIQ+ y todas las personas interesadas. Inscripción abierta con prioridad para el colectivo LGBTIQ+."
        path="/cursos"
        schema={[
          { ...faqSchema, "@id": `${SITE_URL}/cursos#faq` },
          {
            ...courseListSchema,
            "@id": `${SITE_URL}/cursos#courses`,
            provider: { "@id": organizationId }
          },
          buildBreadcrumbSchema(breadcrumbItems)
        ]}
      />

      <div className="courses-section">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="courses-section-title">Cursos y Talleres</h1>
        <p className="courses-section-description">
          Brindamos capacitaciones gratuitas en Testing, Programación y Diseño
          para formar a nuestra comunidad y facilitar su inserción laboral.
          <br></br>
          Nuestros cursos son gratuitos y cualquiera puede anotarse pero damos
          prioridad a personas del colectivo LGTBIQ+
        </p>

        <img
          className="courses-section-image"
          src={imgCursos}
          alt="Ilustración de cursos y talleres de Transistemas"
          loading="lazy"
          decoding="async"
        />

        <SwiperHOC
          modules={[Pagination]}
          spaceBetween={16}
          desktopSlides={3}
          desktopSlideWidth={470}
          pagination={{ clickable: true }}
        >
          {CoursesSlides()}
        </SwiperHOC>
      </div>

      <div className="faq-section">
        <h2 className="faq-section-title">Preguntas frecuentes</h2>
        {faqItems.map(({ question, answer }) => (
          <Dropdown type="basic" title={question} key={question}>
            {answer}
          </Dropdown>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Courses;
