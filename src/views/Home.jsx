import { SwiperHOC } from '../utils/SwiperHOC';
import { Pagination } from 'swiper';
import SuspenseImage from '../lazy-components/SuspenseImage';

import Button from '../components/Button';
import Footer from '../components/Footer';
import HomeSlides from '../utils/HomeCards';

import imgHero from '../assets/svg/img_transistemas.svg';
import imgVoluntarie from '../assets/svg/img_voluntarie.svg';

import iconSend from '../assets/svg/icon_send.svg'

function Home() {

    return (
        <div className="home">
            <div className="hero-section">

                {/* TODO: Replace all images */}
                <SuspenseImage src={imgHero} className="hero-section__img" />
                {/* TODO: Replace all images */}

                <p className="hero-section__description">
                    Somos una organización social integrada por personas del colectivo <strong>LGTBIQANB+</strong> y personas con discapacidad (<strong>PcD</strong>).
                    <br /> <br />
                    Actuamos para la inserción laboral de nuestra comunidad en empleos formales del <strong>área de sistemas</strong>. Para lograrlo, realizamos <strong>cursos y capacitaciones gratuitas.</strong>
                </p>
                <Button href="/donar">Colaborá donando</Button>
            </div>

            <div className="cards-section">
                <h1 className="cards-section__title">Que hacemos</h1>

                {/* <Swiper
                    modules={[Pagination]}
                    spaceBetween={32}
                    pagination={{ clickable: true }}
                    className={display === 'desktop' ? 'desktop' : 'mobile'}
                >
                    {HomeSlides()}
                </Swiper> */}

                <SwiperHOC
                    modules={[Pagination]}
                    spaceBetween={32}
                    pagination={{ clickable: true }}
                >
                    {HomeSlides()}
                </SwiperHOC>
            </div>

            <div className="volunteer-section">
                <h1 className="volunteer-section__title">¿Querés ser voluntarie?</h1>
                <img className="volunteer-section__img" src={imgVoluntarie} alt="imagen de voluntaries" />
                <p className="volunteer-section__description">
                    <span>
                        Podés colaborar desde cualquier lugar del mundo, nos reunimos de forma remota.
                    </span> <br />

                    <span>
                        Equipos de Diseño, Desarrollo Web, Comunicación, Social o Educación.
                    </span>
                    <br />
                    <strong className="text-yellow">¡Queremos escuchar tus propuestas!</strong>
                </p>

                <Button href="/cursos">Sumate</Button>
            </div>

            <div className="contact-section">
                <h2 className='contact-section__title'>¡Dejanos tu mensaje!</h2>

                <form className='contact-section__form' action="#">
                    <input className='contact-section__input' type="text" placeholder='Nombre/s:' />
                    <input className='contact-section__input' type="text" placeholder='Prenombre/s:' />
                    <input className='contact-section__input' type="text" placeholder='Correo electrónico:' />
                    <textarea className='contact-section__textarea' placeholder='Mensaje'></textarea>
                    <button className='contact-section__send button'>Enviar<img src={iconSend} alt="" /></button>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default Home;