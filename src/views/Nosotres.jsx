import { SwiperHOC } from '../utils/SwiperHOC';
import { Pagination } from "swiper";
import NosotresCards from '../utils/NosotresCards';

import Footer from "../components/Footer";
import Integrant from "../components/Integrant";
import Dropdown from "../components/Dropdown";

import profileImage from "../assets/svg/media_tiktok_fill.svg";
import Metrics from '../components/Metrics';

function Nosotres() {

    return (
        <div className="nosotres">

            <div className="teams-section">
                <h1 className="teams-section__title">Nosotres</h1>
                <p className="teams-section__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suspendisse suscipit elit ultricies risus arcu tellus. A, tellus tincidunt tortor, et cras non pretium urna. Risus dolor mi, amet dui dictum et condimentum.
                </p>

                <div className="teams-section__swiper-container">
                    <SwiperHOC
                        modules={[Pagination]}
                        spaceBetween={20}
                        pagination={{ clickable: true }}
                    >
                        {NosotresCards()}
                    </SwiperHOC>
                </div>

            </div>

            <div className="metrics-section">
                <Metrics />
            </div>

            <div className="integrants-section">
                <h2 className="integrants-section__title">Integrantes de Transistemas</h2>

                <Dropdown title="Equipo Comunicación">
                    <Integrant
                        picture={profileImage}
                        name="Alex Alexa"
                        occupation="Programadora"
                        href="https://translate.google.com.ar/?sl=es&tl=en&text=Foto%20de%20perfil&op=translate"
                    />
                    <Integrant
                        picture={profileImage}
                        name="Alex Alexa"
                        occupation="Programadora"
                        href="https://translate.google.com.ar/?sl=es&tl=en&text=Foto%20de%20perfil&op=translate"
                    />
                </Dropdown>

                <Dropdown title="Equipo Educación" />

                <Dropdown title="Equipo Diseño" />

            </div>

            <Footer />
        </div>
    );
}

export default Nosotres;