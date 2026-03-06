import imgVoluntarie from "../assets/svg/img_voluntarie.svg";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { Pagination } from "swiper/modules";

import { NosotresSlides } from "../components/Slides";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import Metrics from "../components/Metrics";

function Nosotres() {
  return (
    <div className="nosotres">
      <img
        className="nosotres__hero-image"
        src={imgVoluntarie}
        alt="Ilustración de voluntaries"
      />
      <div className="teams-section">
        <h1 className="teams-section__title">Nosotres</h1>
        <p className="teams-section__description">
          Transistemas nació en 2019 con el objetivo de ampliar las
          oportunidades laborales en el sector tecnológico para personas
          travestis, trans y otras comunidades subrepresentadas A partir de
          programas de formación y trabajo colaborativo, fuimos construyendo una
          red de aprendizaje y desarrollo profesional que hoy impulsa tanto la
          capacitación tecnológica como la creación de proyectos y servicios
          digitales.
        </p>
        <SwiperHOC
          modules={[Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
        >
          {NosotresSlides()}
        </SwiperHOC>
      </div>

      <Metrics />

      <div className="integrants-section">
        <h2 className="integrants-section__title">
          Integrantes de Transistemas
        </h2>
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

export default Nosotres;
