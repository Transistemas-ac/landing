import servicesImage from "../assets/hero/servicios.png";
import Card from "../components/Card";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { serviceOfferings, workflowSteps } from "../data/Servicios";
import Seo from "../components/Seo";
import { SITE_URL, organizationId } from "../utils/seo";
import Breadcrumb from "../components/Breadcrumb";
import { buildBreadcrumbSchema } from "../utils/breadcrumb";

const faqItems = [
  {
    question: "¿Cuál es el costo de los servicios?",
    answer:
      "El costo se define según el alcance y la duración del proyecto. Escribinos a equipo@transistemas.org y te enviamos una propuesta personalizada."
  },
  {
    question: "¿Trabajan con empresas y organizaciones sociales?",
    answer:
      "Sí. Trabajamos con empresas, ONGs y cooperativas que buscan construir productos digitales inclusivos, accesibles y centrados en las personas."
  },
  {
    question: "¿En qué modalidades se pueden prestar los servicios?",
    answer:
      "Trabajamos de forma 100% online con equipos distribuidos en distintas regiones, manteniendo comunicación continua y entregables por etapas."
  },
  {
    question: "¿Puedo solicitar solo una etapa del proceso (diseño, desarrollo o testing)?",
    answer:
      "Sí. Si ya tenés un equipo y necesitás apoyo puntual en diseño, desarrollo o testing, podemos intervenir solo en esa etapa."
  }
];

const serviceSchemaByName = (name) => {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${SITE_URL}/servicios#${slug}`;
};

const serviceSchemas = serviceOfferings.map(({ title, description }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": serviceSchemaByName(title),
  name: title,
  description,
  provider: { "@id": organizationId },
  areaServed: { "@type": "Country", name: "Argentina" },
  serviceType: title,
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SITE_URL}/servicios`
  }
}));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/servicios#faq`,
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
  { name: "Servicios", url: `${SITE_URL}/servicios` }
];

function Servicios() {
  return (
    <div className="servicios">
      <Seo
        title="Servicios de desarrollo, diseño y testing"
        description="Construimos productos digitales inclusivos: desarrollo de software a medida, diseño UX/UI accesible y testing funcional. Servicios para empresas y organizaciones sociales en Argentina y la región."
        path="/servicios"
        schema={[
          ...serviceSchemas,
          faqSchema,
          buildBreadcrumbSchema(breadcrumbItems)
        ]}
      />

      <section className="services-section">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="services-section-title">Servicios</h1>
        <p className="services-section-description">
          Trabajamos junto a empresas y organizaciones que buscan construir
          productos digitales inclusivos. Combinamos desarrollo, diseño y
          testing para crear soluciones sostenibles, accesibles y centradas en
          las personas.
        </p>
        <img
          className="services-section-image"
          src={servicesImage}
          alt="Equipos de Transistemas en una jornada de trabajo"
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="offer-section">
        <h2 className="offer-section-title">Qué ofrecemos</h2>
        <div className="offer-section-cards">
          {serviceOfferings.map(({ title, description }) => (
            <Card key={title} type="basic" className="service-card">
              <h3 className="service-card-title">{title}</h3>
              <p className="service-card-description">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="workflow-section">
        <h2 className="workflow-section-title">Cómo trabajamos</h2>
        <Card type="basic" divider={true} className="workflow-card">
          {workflowSteps.map(({ step, description }) => (
            <div key={step} className="workflow-card-item">
              <p className="workflow-card-step">{step}</p>
              <p className="workflow-card-description">{description}</p>
            </div>
          ))}
        </Card>
      </section>

      <section className="services-contact-section">
        <h2 className="services-contact-section-title">
          ¿Tenés un proyecto en mente?
        </h2>
        <p className="services-contact-section-description">
          Contanos qué necesitás y pensamos la mejor forma de trabajarlo en
          conjunto.
        </p>
        <Contact />
      </section>

      <Footer />
    </div>
  );
}

export default Servicios;
