import iconLey from "../assets/svg/hormonizacion_ley.svg";
import iconAtencion from "../assets/svg/hormonizacion_atencion.svg";
import iconDatos from "../assets/svg/hormonizacion_datos.svg";
import iconReporte from "../assets/svg/hormonizacion_reporte.svg";

const LEY_URL =
  "https://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/197860/norma.htm";

function HormonizacionGuide() {
  return (
    <section
      className="hormonizacion-guide"
      aria-label="Información sobre la guía de hormonización"
    >
      <p className="hormonizacion-guide-disclaimer">
        La información de este sitio es únicamente orientativa y no reemplaza el
        asesoramiento, diagnóstico ni tratamiento de un profesional de la salud.
      </p>
      <div className="hormonizacion-guide-grid">
        <article className="hormonizacion-guide-card">
          <img className="hormonizacion-guide-icon" src={iconLey} alt="" />
          <h3 className="hormonizacion-guide-title">
            Ley 26.743 de Identidad de Género
          </h3>
          <p className="hormonizacion-guide-text">
            En Argentina, la Ley 26.743 reconoce el derecho a la identidad de
            género y garantiza el acceso a la atención integral de la salud para
            personas trans. Los tratamientos hormonales y otras prestaciones de
            adecuación corporal forman parte de la cobertura obligatoria del
            sistema de salud, sin necesidad de autorización judicial o
            administrativa para personas mayores de 18 años.
          </p>
          <a
            className="hormonizacion-guide-link"
            href={LEY_URL}
            target="_blank"
            rel="noreferrer"
          >
            Infoleg
          </a>
        </article>
        <article className="hormonizacion-guide-card">
          <img
            className="hormonizacion-guide-icon"
            src={iconAtencion}
            alt=""
          />
          <h3 className="hormonizacion-guide-title">
            Líneas de atención y orientación
          </h3>
          <p className="hormonizacion-guide-text">
            <strong>144</strong> — Línea de Género y Diversidad (atención,
            asesoramiento y contención).
          </p>
          <p className="hormonizacion-guide-text">
            <strong>0800-222-3444</strong> — Salud Sexual (información sobre
            derechos y acceso a servicios de salud).
          </p>
        </article>
        <article className="hormonizacion-guide-card">
          <img className="hormonizacion-guide-icon" src={iconDatos} alt="" />
          <h3 className="hormonizacion-guide-title">Sobre los datos publicados</h3>
          <p className="hormonizacion-guide-text">
            La información sobre hospitales, consultorios y servicios fue
            recopilada a partir de fuentes públicas y registros oficiales.
            Aunque intentamos mantenerla actualizada, algunos datos pueden haber
            cambiado.
          </p>
          <p className="hormonizacion-guide-updated">
            Última actualización: 31/08/2026.
          </p>
        </article>
        <article className="hormonizacion-guide-card">
          <img className="hormonizacion-guide-icon" src={iconReporte} alt="" />
          <h3 className="hormonizacion-guide-title">
            ¿Encontraste un error o un dato desactualizado?
          </h3>
          <p className="hormonizacion-guide-text">
            Ayudanos a mejorar esta guía. Si un teléfono, dirección, horario o
            cualquier otra información es incorrecta,{" "}
            <a href="#contact-form">completá el formulario de reporte</a>.
          </p>
          <p className="hormonizacion-guide-text">
            Tu colaboración nos ayuda a mantener esta información precisa y útil
            para toda la comunidad.
          </p>
        </article>
      </div>
    </section>
  );
}

export default HormonizacionGuide;