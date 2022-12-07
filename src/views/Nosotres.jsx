import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';



import Footer from '../components/Footer';
import Card from "../components/Card";
import Integrant from '../components/Integrant';
import Team from '../components/Team';
import Dropdown from "../components/Dropdown";

import IconoDePrueba from '../media/svg/media_tiktok_fill.svg';




function Nosotres(){
    return (
        <div className="nosotres">

            <div className="hero-section">
                <h1>Nosotres</h1>
                <p className="hero-section__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suspendisse suscipit elit ultricies risus arcu tellus. A, tellus tincidunt tortor, et cras non pretium urna. Risus dolor mi, amet dui dictum et condimentum. 
                </p>
            </div>

            <div className="cards-section">

                <Swiper
                    modules={[Pagination]}
                    spaceBetween={8}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide>
                        <Card
                            //img={cardTalleres}
                            alt="Descripcion de la imagen"
                            title="Equipo de cominucación"
                            description="Breve descripción de lo que hace el equipo en dos o tres lineas"
                            link="Me quiero sumar"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Card
                            //img={cardCapacitaciones}
                            alt="Descripcion de la imagen"
                            title="Equipo Educación"
                            description="Breve descripción de lo que hace el equipo en dos o tres líneas."
                            link="Me quiero sumar"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Card
                            //img={cardAcompaniamiento}
                            alt="Descripcion de la imagen"
                            title="Equipo Diseño"
                            description="Breve descripción de lo que hace el equipo en dos o tres líneas."
                            link="Me quiero sumar"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="integrant-section">
                <h2 className="integrant-section__title">Integrantes de Transistemas</h2>

                <Dropdown
                    title="Equipo Comunicación"
                />

                <Dropdown
                    title="Equipo Educación"
                />

                <Dropdown
                    title="Equipo Diseño"
                />

                {/* <Team
                    title="Equipo Comunicación"                
                />

                <Integrant
                    img={IconoDePrueba}
                    name="Nombre voluntarie"
                    occupation="Ocupación/Profesión"
                /> */}





            </div>

            <Footer />


            


        </div>
    );
}

export default Nosotres;