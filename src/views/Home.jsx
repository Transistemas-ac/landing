import imgHero from '../assets/svg/img_transistemas.svg';
import imgVoluntarie from '../assets/svg/img_voluntarie.svg';

import Button from '../components/Button';
import Footer from '../components/Footer';
import HomeSlides from '../utils/HomeCards';

import { SwiperHOC } from '../utils/SwiperHOC';
import { Pagination } from 'swiper';
import Metrics from '../components/Metrics';

function Home() {

    function sendEmail(e) {
        e.preventDefault()
        const form = e.currentTarget;
        form.reset()
    }

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



            <Metrics />

            <div className="volunteer-section">
                <h1 className="volunteer-section__title">¿Querés ser voluntarie?</h1>
                <div className="volunteer-section__inner-container">
                    <img className="volunteer-section__illustration" src={imgVoluntarie} alt="imagen de voluntaries" />
                    <div className="volunteer-section__info-container">
                        <p className="volunteer-section__info">
                            <span>
                                Podés colaborar con nosotres desde cualquier lugar del mundo de forma remota en nuestros equipos de Diseño, Programación, Comunicación o Educación.
                            </span>
                            <strong className="text-yellow">¡Queremos escuchar tus propuestas!</strong>
                        </p>
                        <Button type='link' className="volunteer-section__button" href="/#contact-form">Sumate</Button>
                    </div>
                </div>
            </div>


            <div className="contact-section">
                <h1 className="contact-section__title">¡Dejanos tu mensaje!</h1>
                <form id='contact-form' className='contact-section__form' onSubmit={(e) => { sendEmail(e) }}>
                    <fieldset className="contact-section__input-container">
                        <input className='contact-section__input' type="text" placeholder='Nombre/s:' name='user_name' />
                        <input className='contact-section__input' type="text" placeholder='Pronombre/s:' name='user_pronouns' />
                        <input className='contact-section__input' type="text" placeholder='Correo electrónico:' name='user_email' />
                    </fieldset>
                    <fieldset className="contact-section__input-container">
                        <textarea className='contact-section__textarea' placeholder='Mensaje:' name='message'></textarea>
                        <Button type='submit' disabled className='contact-section__button' icon='send' value='Send'>Enviar</Button>
                    </fieldset>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default Home;