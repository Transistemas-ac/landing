import servicesImage from "../assets/images/servicios.jpeg";
import Button from "../components/Button";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Metrics from "../components/Metrics";

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
          alt="Equipo de Transistemas en una jornada de trabajo"
        />
      </section>

      <section className="offer-section">
        <h2 className="offer-section__title">Qué ofrecemos</h2>
        <div className="offer-section__cards">
          <Card type="basic" className="service-card">
            <h3 className="service-card__title">Desarrollo de software</h3>
            <p className="service-card__description">
              Construimos aplicaciones web a medida, priorizando calidad
              técnica, escalabilidad y mantenimiento a largo plazo.
            </p>
          </Card>

          <Card type="basic" className="service-card">
            <h3 className="service-card__title">Diseño UX/UI</h3>
            <p className="service-card__description">
              Diseñamos experiencias digitales claras y accesibles, desde el
              relevamiento hasta prototipos listos para implementación.
            </p>
          </Card>

          <Card type="basic" className="service-card">
            <h3 className="service-card__title">Testing</h3>
            <p className="service-card__description">
              Realizamos pruebas funcionales y de usabilidad para mejorar la
              estabilidad de tu producto y reducir errores en producción.
            </p>
          </Card>
        </div>
      </section>

      <section className="workflow-section">
        <h2 className="workflow-section__title">Cómo trabajamos</h2>
        <Card type="basic" divider={true} className="workflow-card">
          <div className="workflow-card__item">
            <p className="workflow-card__step">01. Diagnóstico</p>
            <p className="workflow-card__description">
              Relevamos necesidades, objetivos y alcance del proyecto para
              definir una propuesta realista.
            </p>
          </div>

          <div className="workflow-card__item">
            <p className="workflow-card__step">02. Diseño</p>
            <p className="workflow-card__description">
              Creamos prototipos interactivos y diseños visuales para validar la
              experiencia antes de la implementación.
            </p>
          </div>

          <div className="workflow-card__item">
            <p className="workflow-card__step">03. Desarrollo</p>
            <p className="workflow-card__description">
              Ejecutamos el trabajo en etapas cortas y con entregables visibles,
              manteniendo comunicación continua.
            </p>
          </div>

          <div className="workflow-card__item">
            <p className="workflow-card__step">04. Testing</p>
            <p className="workflow-card__description">
              Realizamos pruebas funcionales y de usabilidad para asegurar la
              calidad del producto antes de su lanzamiento.
            </p>
          </div>

          <div className="workflow-card__item">
            <p className="workflow-card__step">05. Mantenimiento</p>
            <p className="workflow-card__description">
              Ofrecemos soporte continuo para resolver problemas, actualizar
              funcionalidades y asegurar la estabilidad del producto a largo
              plazo.
            </p>
          </div>
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
        <Button
          type="link"
          href="/#contact-form"
          icon="mail"
          className="services-contact-section__button"
        >
          Contactanos
        </Button>
      </section>
      <Footer />
    </div>
  );
}

export default Servicios;
