import { Swiper, SwiperSlide } from 'swiper/react';

import imgTansistemas from '../media/svg/img_transistemas.svg';
import cardTalleres from '../media/svg/card_talleres.svg';
import cardCapacitaciones from '../media/svg/card_capacitaciones.svg';
import cardAcompaniamiento from '../media/svg/card_acompaniamiento.svg';

import Button from '../components/Button';
import Card from '../components/Card';


function Home() {


    return (
        <div className="home">

            <div className="hero-section">
                <img className="hero-section__img" src={imgTansistemas} alt="" />

                <br />

                <p className="hero-section__description">
                    Somos una organización social integrada por personas del colectivo <strong>LGTBIQNB+</strong> y personas con discapacidad (<strong>PcD</strong>).
                    <br /> <br />
                    Actuamos para la inserción laboral de nuestra comunidad en empleos formales del <strong>área de sistemas</strong>. Para lograrlo, realizamos <strong>cursos y capacitaciones gratuitas.</strong>
                </p>

                <Button>Colaborá donando</Button>
            </div>


            <div className="cards-section">
                <h1 className="cards-section__title">Que hacemos</h1>

                <Swiper
                    spaceBetween={8}
                    
                >
                    <SwiperSlide>
                        <Card
                            img={cardTalleres}
                            title="Cursos y talleres"
                            description="Brindamos capacitaciones en Testing, Diseño UX/UI y Desarrollo web para personas de la comunidad LGTBI+."
                            link="Ver más"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Card
                            img={cardCapacitaciones}
                            title="Capacitaciones"
                            description="Facilitamos capacitaciones en diversidad, género y discapacidad
                            para empresas y organizaciones."
                            link="Ver más"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Card
                            img={cardAcompaniamiento}
                            title="Acompañamiento"
                            description="Colaboramos con personas de la comunidad a sortear situaciones complejas."
                            link={<br />}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
}

export default Home;