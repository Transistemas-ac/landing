import Button from "./Button";
import emptyCourseCardImage from "../assets/svg/empty-course-card-icon.svg";
import iconInstagramOutline from '../assets/svg/media_instagram_outline.svg';
import iconTwitterOutline from '../assets/svg/media_twiter_outline.svg';
import iconLinkedinOutline from '../assets/svg/media_linkedin_outline.svg';

function CourseCard({ title, img, alt, teacher, description, curriculumHref, date, duration, modality, signupHref }) {

    if (!signupHref) {
        return (
            <div className="course-card course-card--empty">
                <h2 className="course-card__title">Próximamente</h2>

                <img className="course-card__image" src={emptyCourseCardImage} alt='Imagen de indisponibilidad' />
                <h3 className="course-card__teacher">No hay actividades disponibles</h3>

                <p className="course-card__description">
                    Por el momento no estamos dictando cursos o talleres, pero te invitamos a que nos sigas en las redes para enterarte cuando comienza la siguiente actividad.
                </p>


                <a className="course-card__curriculum-link text-yellow">¡Seguinos!</a>
                <div className="course-card__icon-container">
                    <a href="https://www.instagram.com/transistemas/" target="_blank" rel="noreferrer">
                        <img className="footer__icon" src={iconInstagramOutline} alt="icono de instagram" />
                    </a>

                    <a href="https://www.linkedin.com/company/transistemasok/" target="_blank" rel="noreferrer">
                        <img className="footer__icon" src={iconLinkedinOutline} alt="icono de instagram" />
                    </a>

                    <a href="https://twitter.com/Transistemas1" target="_blank" rel="noreferrer">
                        <img className="footer__icon" src={iconTwitterOutline} alt="icono de instagram" />
                    </a>
                </div>
            </div>
        )
    }

    if (signupHref) {
        return (
            <div className="course-card">
                <img className="course-card__image" src={img} alt={alt} />
                <h1 className="course-card__title">{title}</h1>
                <h3 className="course-card__teacher">{teacher}</h3>

                <p className="course-card__description">{description}</p>


                <a className="course-card__curriculum-link text-yellow" href={curriculumHref}>Ver temario</a>
                <div className="course-card__tags-container">
                    <h4 className="course-card__tag">📆 {date}</h4>
                    <h4 className="course-card__tag">⏰ {duration}</h4>
                    <h4 className="course-card__tag">💻 {modality}</h4>
                </div>
                <Button className='course-card__button' href={signupHref}>Inscribirse</Button>
            </div>
        );
    }
}

export default CourseCard;



