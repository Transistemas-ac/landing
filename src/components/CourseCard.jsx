import Button from "./Button";
import emptyCourseCardImage from "../assets/svg/empty-course-card-icon.svg";

function CourseCard({
  title = "",
  img = "",
  teachers = "",
  description = "",
  curriculumHref = "",
  date = "",
  fechaInicio = "",
  fechaFin = "",
  duration = "",
  horario = "",
  modality = "",
  signupHref = "",
  status = "",
  ig = [],
}) {
  const courseTitle = title || "Curso";
  const courseImg = img || emptyCourseCardImage;
  const courseTeachers = teachers || "";
  const courseDescription = description || "";
  const courseDate =
    date || [fechaInicio, fechaFin].filter(Boolean).join(" - ");
  const courseDuration = duration || "";
  const courseHorario = horario || "";
  const courseModality = modality || "";
  const hasActions = signupHref || curriculumHref;
  const courseIgHref = ig[0] || "";
  const courseStatus = status || "";
  const isFinalized = courseStatus.trim().toLowerCase() === "finalizado";

  return (
    <div className="course-card">
      <h1 className="course-card__title">{courseTitle}</h1>

      {courseIgHref ? (
        <a
          href={courseIgHref}
          target="_blank"
          rel="noreferrer"
          className="course-card__image-link"
        >
          <img
            className="course-card__image"
            src={courseImg}
            alt={courseTitle}
          />
        </a>
      ) : (
        <img className="course-card__image" src={courseImg} alt={courseTitle} />
      )}

      {(courseTeachers || courseDescription) && (
        <div className="course-card__content">
          {courseTeachers && (
            <p className="course-card__teachers">
              <span className="course-card__teachers-label">
                Profes a cargo
              </span>
              <span className="course-card__teachers-names">
                {courseTeachers}
              </span>
            </p>
          )}

          {courseDescription && (
            <p className="course-card__description">{courseDescription}</p>
          )}
        </div>
      )}

      {(courseDate || courseDuration || courseModality) && (
        <div className="course-card__tags-container">
          {courseDate && <h4 className="course-card__tag">📆 {courseDate}</h4>}
          {courseDuration && (
            <h4 className="course-card__tag">⌛ {courseDuration}</h4>
          )}
          {courseModality && (
            <h4 className="course-card__tag">💻 {courseModality}</h4>
          )}
        </div>
      )}

      {courseHorario && (
        <p className="course-card__schedule">⏰ {courseHorario}</p>
      )}

      {hasActions && (
        <div className="course-card__actions">
          {!isFinalized ? (
            <Button
              type="anchor"
              target="_blank"
              rel="noreferrer"
              className="course-card__button course-card__button--signup"
              href={signupHref}
              icon="send"
            >
              Inscribirme
            </Button>
          ) : (
            <Button
              type="anchor"
              target="_blank"
              rel="noreferrer"
              className="course-card__button course-card__button--signup"
              href={signupHref}
              icon="close"
            >
              Inscripciones cerradas
            </Button>
          )}

          {curriculumHref && (
            <Button
              type="anchor"
              target="_blank"
              rel="noreferrer"
              className="course-card__button course-card__button--curriculum"
              href={curriculumHref}
              icon="link"
            >
              Programa de estudios
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseCard;
