import imgCursos from "../assets/hero/cursos.png";
import { CoursesSlides } from "../components/Slides";
import Dropdown from "../components/Dropdown";
import Footer from "../components/Footer";
import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { Pagination } from "swiper/modules";

function Courses() {
  return (
    <div className="courses">
      <div className="courses-section">
        <h1 className="courses-section-title">Cursos y Talleres</h1>
        <h4 className="courses-section-description">
          Brindamos capacitaciones gratuitas en Testing, Programación y Diseño
          para formar a nuestra comunidad y facilitar su inserción laboral.
          <br></br>
          Nuestros cursos son gratuitos y cualquiera puede anotarse pero damos
          prioridad a personas del colectivo LGTBIQ+
        </h4>

        <img
          className="courses-section-image"
          src={imgCursos}
          alt="Ilustración de cursos"
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
        <Dropdown type="basic" title="¿Cuál es el costo de los cursos?">
          Los cursos son gratuitos y no tienen coste de emisión de certificado.
        </Dropdown>
        <Dropdown type="basic" title="¿Quiénes pueden anotarse a los cursos?">
          Cualquier persona interesada, damos prioridad a personas del colectivo
          LGTBIQ+.
        </Dropdown>
        <Dropdown
          type="basic"
          title="¿Si termino el curso recibo un certificado?"
        >
          ¡Si! Vas a recibir un certificado expedido por Transistemas y los
          entes que participen de la certificación.
        </Dropdown>
        <Dropdown type="basic" title="¿Los cursos son online o presenciales?">
          Nuestros cursos se dictan de forma online para facilitar el acceso desde distintas regiones.
        </Dropdown>
        <Dropdown type="basic" title="¿Cuándo salen nuevos cursos?">
          Los nuevos cursos se anuncian a través de nuestras redes, seguinos para enterarte.
        </Dropdown>
      </div>

      <Footer />
    </div>
  );
}

export default Courses;
