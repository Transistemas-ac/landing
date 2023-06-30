import { SwiperHOC } from '../utils/SwiperHOC';
import { Pagination } from "swiper";
import NosotresCards from '../utils/NosotresCards';

import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";

import Metrics from '../components/Metrics';

function Nosotres() {

    return (
        <div className="nosotres">

            <div className="teams-section">
                <h1 className="teams-section__title">Nosotres</h1>
                <p className="teams-section__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suspendisse suscipit elit ultricies risus arcu tellus. A, tellus tincidunt tortor, et cras non pretium urna. Risus dolor mi, amet dui dictum et condimentum.
                </p>
                <SwiperHOC
                    modules={[Pagination]}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                >
                    {NosotresCards()}
                </SwiperHOC>
            </div>

            <Metrics />

            <div className="integrants-section">
                <h2 className="integrants-section__title">Integrantes de Transistemas</h2>
                <Dropdown title="Equipo Comunicación" role='communication' />

                <Dropdown title="Equipo Educación" role='education' />

                <Dropdown title="Equipo Diseño" role='design' />

                <Dropdown title="Equipo Desarrollo" role='development' />
            </div >

            <Footer />
        </div >
    );
}

export default Nosotres;