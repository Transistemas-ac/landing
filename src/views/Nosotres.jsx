import { SwiperHOC } from '../utils/SwiperHOC';
import { Pagination } from "swiper";

import { NosotresSlides } from '../utils/Slides';
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import Metrics from '../components/Metrics';


function Nosotres() {

    return (
        <div className="nosotres">

            <div className="teams-section">
                <h1 className="teams-section__title">Nosotres</h1>
                <p className="teams-section__description">
                    Transistemas comenzó en 2019, meses antes de la ley del Cupo Laboral Travesti Trans. Queríamos armar una cooperativa para incluirnos como comunidad dentro del sistema laboral en el área de programación y diseño. Para lograr eso debíamos capacitarnos; así comenzamos a dictar cursos, con el objetivo de cambiar la cultura de trabajo dominante.
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
                <h2 className="integrants-section__title">Integrantes de Transistemas</h2>
                <Dropdown title="Equipo Comunicación" type='members' role='communication' />

                <Dropdown title="Equipo Educación" type='members' role='education' />

                <Dropdown title="Equipo Diseño" type='members' role='design' />

                <Dropdown title="Equipo Desarrollo" type='members' role='development' />
            </div >

            <Footer />
        </div >
    );
}

export default Nosotres;