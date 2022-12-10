import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';



import Footer from '../components/Footer';
import Card from "../components/Card";
import Integrant from '../components/Integrant';
import Team from '../components/Team';
import Dropdown from "../components/Dropdown";

import ImagenDePrueba2 from "../media/svg/media_tiktok_fill.svg";
import imagenDePrueba from "../media/svg/img_example.svg";




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
                            img={imagenDePrueba}
                            alt="Descripcion de la imagen"
                            title="Equipo de cominucación"
                            description="Breve descripción de lo que hace el equipo en dos o tres lineas"
                            link="Me quiero sumar"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Card
                            img={imagenDePrueba}
                            alt="Descripcion de la imagen"
                            title="Equipo Educación"
                            description="Breve descripción de lo que hace el equipo en dos o tres líneas."
                            link="Me quiero sumar"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Card
                            img={imagenDePrueba}
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

                <Dropdown title="Equipo Comunicación">
                    <Integrant
                        img={ImagenDePrueba2}
                        name="Alex Alexa"
                        occupation="Programadora"
                    />
                    <Integrant
                        img={ImagenDePrueba2}
                        name="Alex Alexa"
                        occupation="Programadora"
                    />
                    <Integrant
                        img={ImagenDePrueba2}
                        name="Alex Alexa"
                        occupation="Programadora"
                    />
                </Dropdown>

                <Dropdown title="Equipo Educación">
                    <Integrant
                        img={ImagenDePrueba2}
                        name="Alex Alexa"
                        occupation="Programadora"
                    />
                    <Integrant
                        img={ImagenDePrueba2}
                        name="Alex Alexa"
                        occupation="Programadora"
                    />
                    <Integrant
                        img={ImagenDePrueba2}
                        name="Alex Alexa"
                        occupation="Programadora"
                    />
                </Dropdown>

                <Dropdown
                    title="Equipo Diseño"
                />







            </div>

            <Footer />


            


        </div>
    );
}

export default Nosotres;