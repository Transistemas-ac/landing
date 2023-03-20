import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";



import Footer from "../components/Footer";
import Card from "../components/Card";
import Integrant from "../components/Integrant";
// import Team from "../components/Team";
import Dropdown from "../components/Dropdown";

import ImagenDePrueba2 from "../assets/svg/media_tiktok_fill.svg";
import imagenDePrueba from "../assets/svg/img_example.svg";




function Nosotres() {
    return (
        <div className="nosotres">

            <div className="teams-section">
                <h1 className="teams-section__title">Nosotres</h1>
                <p className="teams-section__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suspendisse suscipit elit ultricies risus arcu tellus. A, tellus tincidunt tortor, et cras non pretium urna. Risus dolor mi, amet dui dictum et condimentum.
                </p>

                <Swiper
                    modules={[Pagination]}
                    spaceBetween={20}
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

            <div className="integrants-section">
                <h2 className="integrants-section__title">Integrantes de Transistemas</h2>

                <Dropdown title="Equipo Comunicación">
                    <Integrant
                        picture={ImagenDePrueba2}
                        name="Alex Alexa"
                        occupation="Programadora"
                        href="https://translate.google.com.ar/?sl=es&tl=en&text=Foto%20de%20perfil&op=translate"
                    />
                    <Integrant
                        picture={ImagenDePrueba2}
                        name="Alex Alexa"
                        occupation="Programadora"
                        href="https://translate.google.com.ar/?sl=es&tl=en&text=Foto%20de%20perfil&op=translate"
                    />

                </Dropdown>

                <Dropdown title="Equipo Educación">

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