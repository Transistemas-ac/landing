import imgHero from "../assets/svg/img_transistemas.svg";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Metrics from "../components/Metrics";

import { SwiperHOC } from "../components/HOC/SwiperHOC";
import { Pagination } from "swiper/modules";
import { HomeSlides } from "../components/Slides";

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <img src={imgHero} className="hero-section__illustration" alt="" />

        <p className="hero-section__description">
          <span>
            Somos un equipo tecnológico diverso y experimentado que impulsa la
            formación tecnológica y la inserción laboral de talento
            subrepresentado en la industria IT.
          </span>
          <span>
            Ofrecemos servicios de{" "}
            <strong>desarrollo de software, diseño y testing</strong> para
            empresas y organizaciones sociales. Además realizamos cursos
            gratuitos para nuestra comunidad.
          </span>
        </p>

        <Button
          className="hero-section__button"
          type="link"
          href="https://discord.gg/yuYpD6QW74"
        >
          Unirse a la comunidad
        </Button>
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
      {/*
      <div className="volunteer-section">
        <h1 className="volunteer-section__title">¿Querés ser voluntarie?</h1>
        <div className="volunteer-section__inner-container">
          <img
            className="volunteer-section__illustration"
            src={imgVoluntarie}
            alt="imagen de voluntaries"
          />
          <div className="volunteer-section__info-container">
            <p className="volunteer-section__info">
              <span>
                Podés colaborar con nosotres desde cualquier lugar del mundo de
                forma remota en nuestros equipos de Diseño, Programación,
                Comunicación o Educación.
              </span>
              <strong className="text-yellow">
                ¡Queremos escuchar tus propuestas!
              </strong>
            </p>
            <Button
              target="_blank"
              rel="noreferrer"
              type="anchor"
              className="volunteer-section__button"
              href="https://discord.gg/yuYpD6QW74"
            >
              Sumate
            </Button>
          </div>
        </div>
      </div>
*/}
      <div className="contact-section">
        <h1 className="contact-section__title">¡Dejanos tu mensaje!</h1>
        <form
          id="contact-form"
          className="contact-section__form"
          action="https://formsubmit.co/contacto@transistemas.org"
          method="POST"
        >
          <fieldset className="contact-section__input-container">
            <input
              className="contact-section__input"
              type="text"
              placeholder="Nombre/s:"
              name="nombre"
              required
            />
            <input
              className="contact-section__input"
              type="text"
              placeholder="Pronombre/s:"
              name="pronombres"
            />
            <input
              className="contact-section__input"
              type="email"
              placeholder="Correo electrónico:"
              name="email"
              required
            />
          </fieldset>
          <fieldset className="contact-section__input-container">
            <textarea
              className="contact-section__textarea"
              placeholder="Mensaje:"
              name="message"
            ></textarea>
            <Button
              type="submit"
              className="contact-section__button"
              icon="send"
              value="Send"
            >
              Enviar
            </Button>
          </fieldset>
          <input type="hidden" name="_next" value="https://transistemas.org/" />
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
