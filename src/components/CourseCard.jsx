import Button from "./Button";
import emptyCourseCardImage from "../assets/svg/empty-course-card-icon.svg";
import iconInstagramOutline from "../assets/svg/media_instagram_outline.svg";
import iconTwitterOutline from "../assets/svg/media_twiter_outline.svg";
import iconLinkedinOutline from "../assets/svg/media_linkedin_outline.svg";

function CourseCard(props) {
  if (!props.signupHref) {
    return (
      <div className="course-card course-card--empty">
        <h2 className="course-card__title">Próximamente</h2>

        <img
          className="course-card__image"
          src={emptyCourseCardImage}
          alt="Imagen de indisponibilidad"
        />
        <h3 className="course-card__subtitle">
          No hay actividades disponibles
        </h3>

        <p className="course-card__description">
          Por el momento no estamos dictando cursos o talleres, pero te
          invitamos a que nos sigas en las redes para enterarte cuando comienza
          la siguiente actividad.
        </p>

        <p className="course-card__curriculum-link">¡Seguinos!</p>
        <div className="course-card__icon-container">
          <a
            href="https://www.instagram.com/transistemas/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="footer__icon"
              src={iconInstagramOutline}
              alt="icono de instagram"
            />
          </a>

          <a
            href="https://www.linkedin.com/company/transistemasok/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="footer__icon"
              src={iconLinkedinOutline}
              alt="icono de instagram"
            />
          </a>

          <a
            href="https://twitter.com/Transistemas1"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="footer__icon"
              src={iconTwitterOutline}
              alt="icono de instagram"
            />
          </a>
        </div>
      </div>
    );
  }

  if (props.signupHref) {
    return (
      <div className="course-card">
        <h1 className="course-card__title">{props.title}</h1>
        <img className="course-card__image" src={props.img} alt={props.alt} />

        <p className="course-card__description">
          <span>
            <b>Profes a cargó:</b> {props.teachers}
          </span>
          {props.description}
        </p>

        <a
          target="_blank"
          rel="noreferrer"
          className="course-card__curriculum-link text-yellow"
          href={props.curriculumHref}
        >
          Ver temario
        </a>
        <div className="course-card__tags-container">
          <h4 className="course-card__tag">📆 {props.date}</h4>
          <h4 className="course-card__tag">⏰ {props.duration}</h4>
          <h4 className="course-card__tag">💻 {props.modality}</h4>
        </div>
        <Button
          type="anchor"
          target="_blank"
          rel="noreferrer"
          className="course-card__button"
          href={props.signupHref}
        >
          Inscribirse
        </Button>
      </div>
    );
  }
}

export default CourseCard;
