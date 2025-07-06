import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { Pagination } from "swiper/modules";

import { NosotresSlides } from "../components/Slides";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import Metrics from "../components/Metrics";

function Nosotres() {
  return (
    <div className="nosotres">
      <div className="teams-section">
        <h1 className="teams-section__title">Nosotres</h1>
        <p className="teams-section__description">
          Transistemas comenzó a fines del 2019, años antes de la ley del Cupo
          Laboral Travesti Trans, nuestro deseo era armar una cooperativa para
          incluirnos como comunidad dentro del sistema laboral de las TICs. Para
          lograr eso debíamos capacitarnos, así comenzamos a dictar cursos, con
          el objetivo de cambiar la cultura empresarial dominante y mejorar la
          situación laboral de nuestra comunidad.
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
        <Dropdown
          title="Equipo Comunicación"
          type="members"
          role="communication"
        />

        <Dropdown title="Equipo Educación" type="members" role="education" />

        <Dropdown title="Equipo Diseño" type="members" role="design" />

        <Dropdown title="Equipo Desarrollo" type="members" role="development" />
      </div>

      <Footer />
    </div>
  );
}

export default Nosotres;
