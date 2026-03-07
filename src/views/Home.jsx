import imgHero from "../assets/svg/img_transistemas.svg";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Metrics from "../components/Metrics";
import Contact from "../components/Contact";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { HomeSlides } from "../components/Slides";
import { Pagination } from "swiper/modules";

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <img
          src={imgHero}
          className="hero-section__illustration"
          alt="Transistemas ilustración"
        />

        <p className="hero-section__description">
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
          className="hero-section__button"
          type="link"
          href="https://discord.gg/yuYpD6QW74"
        >
          Unirse a la comunidad
        </Button>
      </div>

      <div className="cards-section">
        <h1 className="cards-section__title">Que hacemos</h1>
        <SwiperHOC
          modules={[Pagination]}
          spaceBetween={32}
          pagination={{ clickable: true }}
        >
          {HomeSlides()}
        </SwiperHOC>
      </div>

      <Metrics />

      <h3 className="contact-section__title">¡Dejanos tu mensaje!</h3>

      <Contact />

      <Footer />
    </div>
  );
}

export default Home;
