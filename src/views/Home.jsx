import imgHero from "../assets/hero/inicio.svg";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Metrics from "../components/Metrics";
import Contact from "../components/Contact";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { HomeSlides } from "../components/Slides";
import { Pagination } from "swiper/modules";
import Seo from "../components/Seo";

function Home() {
  return (
    <div className="home">
      <Seo
        title="Transistemas — Formación y servicios IT con impacto social"
        description="Equipo profesional y diverso que impulsa la formación tecnológica gratuita y la inserción laboral de la comunidad LGBTIQ+ en la industria IT. Ofrecemos servicios de desarrollo de software, diseño UX/UI y testing para empresas y organizaciones."
        path="/"
      />

      <div className="hero-section">
        <h1 className="visually-hidden">
          Transistemas: formación tecnológica y servicios IT con impacto social
        </h1>
        <img
          src={imgHero}
          className="hero-section-illustration"
          alt="Ilustración de Transistemas"
          decoding="async"
        />

        <p className="hero-section-description">
          <span>
            Somos un equipo profesional y diverso que impulsa la formación
            tecnológica y la inserción laboral de nuestra comunidad en la
            industria IT.
          </span>
          <span>
            Ofrecemos servicios de{" "}
            <strong>desarrollo de software, diseño y testing</strong> para
            empresas y organizaciones sociales. Además realizamos cursos
            gratuitos para nuestra comunidad.
          </span>
        </p>

        <Button
          className="hero-section-button"
          type="link"
          href="https://discord.gg/FSAbrjsCbW"
        >
          Unirse a la comunidad
        </Button>
      </div>

      <div className="cards-section">
        <h2 className="cards-section-title">Que hacemos</h2>
        <SwiperHOC
          modules={[Pagination]}
          spaceBetween={32}
          pagination={{ clickable: true }}
        >
          {HomeSlides()}
        </SwiperHOC>
      </div>

      <Metrics />

      <h2 className="contact-section-title">¡Dejanos tu mensaje!</h2>

      <Contact />

      <Footer />
    </div>
  );
}

export default Home;
