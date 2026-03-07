import servicesImage from "../assets/hero/servicios.png";
import Card from "../components/Card";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { serviceOfferings, workflowSteps } from "../data/Servicios";

function Servicios() {
  return (
    <div className="servicios">
      <section className="services-section">
        <h1 className="services-section__title">Servicios</h1>
        <p className="services-section__description">
          Trabajamos junto a empresas y organizaciones que buscan construir
          productos digitales inclusivos. Combinamos desarrollo, diseño y
          testing para crear soluciones sostenibles, accesibles y centradas en
          las personas.
        </p>
        <img
          className="services-section__image"
          src={servicesImage}
          alt="Equipos de Transistemas en una jornada de trabajo"
        />
      </section>

      <section className="offer-section">
        <h2 className="offer-section__title">Qué ofrecemos</h2>
        <div className="offer-section__cards">
          {serviceOfferings.map(({ title, description }) => (
            <Card key={title} type="basic" className="service-card">
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__description">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="workflow-section">
        <h2 className="workflow-section__title">Cómo trabajamos</h2>
        <Card type="basic" divider={true} className="workflow-card">
          {workflowSteps.map(({ step, description }) => (
            <div key={step} className="workflow-card__item">
              <p className="workflow-card__step">{step}</p>
              <p className="workflow-card__description">{description}</p>
            </div>
          ))}
        </Card>
      </section>

      <section className="services-contact-section">
        <h2 className="services-contact-section__title">
          ¿Tenés un proyecto en mente?
        </h2>
        <p className="services-contact-section__description">
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
