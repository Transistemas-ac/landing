import imgHero from '../assets/svg/img_transistemas.svg';
import imgVoluntarie from '../assets/svg/img_voluntarie.svg';

import Button from '../components/Button';
import Footer from '../components/Footer';
import HomeSlides from '../utils/HomeCards';

import { SwiperHOC } from '../utils/SwiperHOC';
import { Pagination } from 'swiper';
import emailjs from '@emailjs/browser'

import Metrics from '../components/Metrics';
import { snackbar } from '../components/Snackbar';

function Home() {

    function sendEmail(e) {
        e.preventDefault()
        const form = e.currentTarget;
        const name = form.user_name.value
        const pronouns = form.user_pronouns.value
        const email = form.user_email.value
        const message = form.message.value

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (!name || !pronouns || !message) { return snackbar('Hay campos que estan vacios.', 'error', 5000) }
        if (!emailRegex.test(email)) { return snackbar('Por favor ingrese un correo electrónico valido.', 'error', 5000) }


        emailjs
            .sendForm(
                'service_9puzbaf',
                'template_upu9i4k',
                form,
                '_UFa8ACqJSgraW_13'
            )
            .then((result) => {
                snackbar('Formulario enviado exitosamente.', 'success', 3000)
            }).catch((e) => {
                snackbar('Hubo un error al enviar el formulario, vuelva a intentarlo mas tarde.', 'error', 5000)
            })

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
                                Podés colaborar con nosotres desde cualquier lugar del mundo de forma remota en nuestros equipos de Diseño, Desarrollo Web, Comunicación, Social o Educación.
                            </span>
                            <strong className="text-yellow">¡Queremos escuchar tus propuestas!</strong>
                        </p>
                        <Button type='link' className="volunteer-section__button" href="/cursos">Sumate</Button>
                    </div>
                </div>
            </div>


            <div className="contact-section">
                <h2 className="contact-section__title">¡Dejanos tu mensaje!</h2>
                <form className='contact-section__form' onSubmit={(e) => { sendEmail(e) }}>
                    <fieldset className="contact-section__input-container">
                        <input className='contact-section__input' type="text" placeholder='Nombre/s:' name='user_name' />
                        <input className='contact-section__input' type="text" placeholder='Prenombre/s:' name='user_pronouns' />
                        <input className='contact-section__input' type="text" placeholder='Correo electrónico:' name='user_email' />
                    </fieldset>
                    <fieldset className="contact-section__input-container">
                        <textarea className='contact-section__textarea' placeholder='Mensaje:' name='message'></textarea>
                        <Button type='submit' className='contact-section__button' icon='send' value='Send'>Enviar</Button>
                    </fieldset>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default Home;