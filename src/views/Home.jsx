import { Swiper, SwiperSlide } from 'swiper/react';

import imgTansistemas from '../media/svg/img_transistemas.svg';
import imgVoluntarie from '../media/svg/img_voluntarie.svg';

import cardTalleres from '../media/svg/card_talleres.svg';
import cardCapacitaciones from '../media/svg/card_capacitaciones.svg';
import cardAcompaniamiento from '../media/svg/card_acompaniamiento.svg';

// import iconFacebookOutline from '../media/svg/media_facebook_outline.svg';
// import iconInstagramOutline from '../media/svg/media_instagram_outline.svg';
// import iconTwitterOutline from '../media/svg/media_twiter_outline.svg';
// import iconTikTokOutline from '../media/svg/media_tiktok_outline.svg';
// import iconLinkedinOutline from '../media/svg/media_linkedin_outline.svg';
// import iconTelegramOutline from '../media/svg/media_telegram_outline.svg';

//Import components
import Button from '../components/Button';
import Card from '../components/Card';
import Contact from '../components/Contact';
import Message from '../components/Message';
import Footer from '../components/Footer';


function Home() {


    return (
        <div className="home">

            <div className="hero-section">
                <img className="hero-section__img" src={imgTansistemas} alt="imagen de transistemas" />

                <br />

                <p className="hero-section__description">
                    Somos una organización social integrada por personas del colectivo <strong>LGTBIQANB+</strong> y personas con discapacidad (<strong>PcD</strong>).
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
                            alt="Descripcion de la imagen"
                            title="Cursos y talleres"
                            description="Brindamos capacitaciones en Testing, Diseño UX/UI y Desarrollo web para personas de la comunidad LGTBI+."
                            link="Ver más"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Card
                            img={cardCapacitaciones}
                            alt="Descripcion de la imagen"
                            title="Capacitaciones"
                            description="Facilitamos capacitaciones en diversidad, género y discapacidad
                            para empresas y organizaciones."
                            link="Ver más"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Card
                            img={cardAcompaniamiento}
                            alt="Descripcion de la imagen"
                            title="Acompañamiento"
                            description="Colaboramos con personas de la comunidad a sortear situaciones complejas."
                            link={<br />}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="volunteer-section">
                <h1 className="cards-section__title">¿Querés ser voluntarie?</h1>
                
                <img className="volunteer-section__img" src={imgVoluntarie} alt="imagen de voluntaries" />

                <p className="volunteer-section__description">
                    Podés colaborar desde cualquier lugar del mundo, nos reunimos de forma remota.
                </p>
                   
                <p className="volunteer-section__description">
                    Equipos de Diseño, Desarrollo Web, Comunicación, Social o Educación.
                </p>

                <p className="volunteer-section__description-strong">
                    <strong>¡Queremos escuchar tus propuestas!</strong>
                </p>

                <Button>Sumate</Button>
                

            </div>

            <div className="contact-section">
                <h2 className='contact-section__title'>¡Dejanos tu mensaje!</h2>

                

                <Contact
                    title="Nombre/s:"
                />

                

                <Contact
                    title="Pronombres/s:"
                
                />

                

                <Contact
                    title="Correo electrónico:"
                
                />

                

                <Message
                    title="Mensaje:"
                />

                

                <Button>Enviar <img src="" alt="" /></Button>
                    

            </div>

            <div className="footer-section">
                <Footer/>

            </div>

        </div>
    );
}

export default Home;