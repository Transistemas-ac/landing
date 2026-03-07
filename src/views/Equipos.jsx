import imgEquipos from "../assets/hero/equipos.png";
import { Pagination } from "swiper/modules";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { EquiposSlides } from "../components/Slides";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";

function Equipos() {
  return (
    <div className="equipos">
      <h1 className="equipos-section__title">Nuestros Equipos</h1>
      <img
        className="equipos__hero-image"
        src={imgEquipos}
        alt="Ilustración de voluntaries"
      />
      <div className="equipos-section">
        <p className="equipos-section__description">
          Transistemas nació en 2019 con el objetivo de ampliar las
          oportunidades laborales en el sector tecnológico para personas del
          colectivo LGBTIQ+ A partir de programas de formación y trabajo
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
