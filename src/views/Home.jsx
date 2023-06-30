import imgHero from '../assets/svg/img_transistemas.svg';
import imgVoluntarie from '../assets/svg/img_voluntarie.svg';

import Button from '../components/Button';
import Footer from '../components/Footer';
import HomeSlides from '../utils/HomeCards';

import { SwiperHOC } from '../utils/SwiperHOC';
import { Pagination } from 'swiper';

import Metrics from '../components/Metrics';

function Home() {

    return (
        <div className="home">
            <div className="hero-section">
                <img src={imgHero} className="hero-section__illustration" alt='' />

                <p className="hero-section__description">
                    <span>
                        Somos una organización social integrada por personas del colectivo <strong>LGTBIQANB+</strong> y personas con discapacidad (<strong>PcD</strong>).
                    </span>
                    <span>
                        Actuamos para la inserción laboral de nuestra comunidad en empleos formales del <strong>área de sistemas</strong>. Para lograrlo, realizamos <strong>cursos y capacitaciones gratuitas.</strong>
                    </span>
                </p>

                <Button className='hero-section__button' type='link' href="/donar">Colaborá donando</Button>
            </div>



            <div className="cards-section">
                <h1 className="cards-section__title">Que hacemos</h1>
                <SwiperHOC
                    modules={[Pagination]}
                    spaceBetween={32}
                    pagination={{ clickable: true }}
                >
                    {HomeSlides()}
                </SwiperHOC>
            </div>



            <div className="metrics-section">
                <Metrics />
            </div>

            <div className="volunteer-section">
                <h1 className="volunteer-section__title">¿Querés ser voluntarie?</h1>
                <div className="volunteer-section__inner-container">
                    <img className="volunteer-section__illustration" src={imgVoluntarie} alt="imagen de voluntaries" />
                    <div className="volunteer-section__info-container">
                        <p className="volunteer-section__info">
                            <span>
                                Podés colaborar desde cualquier lugar del mundo, nos reunimos de forma remota.
                            </span>
                            <span>
                                Equipos de Diseño, Desarrollo Web, Comunicación, Social o Educación.
                            </span>
                            <strong className="text-yellow">¡Queremos escuchar tus propuestas!</strong>
                        </p>
                        <Button type='link' className="volunteer-section__button" href="/cursos">Sumate</Button>
                    </div>
                </div>
            </div>


            <div className="contact-section">
                <h2 className="contact-section__title">¡Dejanos tu mensaje!</h2>
                <form className='contact-section__form' action="#">
                    <fieldset className="contact-section__input-container">
                        <input className='contact-section__input' type="text" placeholder='Nombre/s:' />
                        <input className='contact-section__input' type="text" placeholder='Prenombre/s:' />
                        <input className='contact-section__input' type="text" placeholder='Correo electrónico:' />
                    </fieldset>
                    <fieldset className="contact-section__input-container">
                        <textarea className='contact-section__textarea' placeholder='Mensaje:'></textarea>
                        <Button type='submit' className='contact-section__button' icon='send'>Enviar</Button>
                    </fieldset>
                </form>
            </div>


            {/* <div className="volunteer-section">

                <h1 className="volunteer-section__title">¿Querés ser voluntarie?</h1>

                <div className="volunteer-section__conteiner">

                    <img className="volunteer-section__conteiner__img"
                        src={imgVoluntarie} alt="imagen de voluntaries" />

                    <div className="volunteer-section__conteiner__description-buttom">
                        <p className="volunteer-section__conteiner__description-buttom__description">
                            <span>
                                Podés colaborar desde cualquier lugar del mundo, nos reunimos de forma remota.
                            </span>
                            <br />
                            <br />
                            <span>
                                Equipos de Diseño, Desarrollo Web, Comunicación, Social o Educación.
                            </span>
                            <br />
                            <br />
                            <strong className="text-yellow">¡Queremos escuchar tus propuestas!</strong>
                        </p>
                        <Button type='link' className="volunteer-section__conteiner__description-buttom__buttom"
                            href="/cursos">Sumate</Button>
                    </div>

                </div>

            </div>



            <div className="contact-section">
                <h2 className="contact-section__title">¡Dejanos tu mensaje!</h2>
                <div className="contact-section__form">
                    <form className='contact-section__form__form1' action="#">
                        <input className='contact-section__input' type="text" placeholder='Nombre/s:' />
                        <input className='contact-section__input' type="text" placeholder='Prenombre/s:' />
                        <input className='contact-section__input' type="text" placeholder='Correo electrónico:' />
                    </form>
                    <form className='contact-section__form__form2' action="#">
                        <textarea className='contact-section__form__form2__textarea' placeholder='Mensaje'></textarea>
                        <Button type='button' className='contact-section__form__form2__send button' icon='send'>Enviar</Button>
                    </form>
                </div>
            </div> */}



            <Footer />
        </div>
    );
}

export default Home;