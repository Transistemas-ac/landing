import Button from "./Button";

export default function Contact() {
  return (
    <div className="contact-section">
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
  );
}
