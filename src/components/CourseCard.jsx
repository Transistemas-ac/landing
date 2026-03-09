import Button from "./Button";
import emptyCourseCardImage from "../assets/svg/empty-course-card-icon.svg";
import { HashLink } from "react-router-hash-link";

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
  links = [],
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
  const courseLinks = links || [];
  const primaryCourseLink = courseLinks[0] || "";
  const isPrimaryLinkInternal = primaryCourseLink.startsWith("/");
  const courseStatus = status || "";
  const isFinalized = courseStatus.trim().toLowerCase() === "finalizado";

  return (
    <div className="course-card">
      <h1 className="course-card-title">{courseTitle}</h1>

      {primaryCourseLink ? (
        isPrimaryLinkInternal ? (
          <HashLink to={primaryCourseLink} className="course-card-image-link">
            <img
              className="course-card-image"
              src={courseImg}
              alt={courseTitle}
            />
          </HashLink>
        ) : (
          <a
            href={primaryCourseLink}
            target="_blank"
            rel="noreferrer"
            className="course-card-image-link"
          >
            <img
              className="course-card-image"
              src={courseImg}
              alt={courseTitle}
            />
          </a>
        )
      ) : (
        <img className="course-card-image" src={courseImg} alt={courseTitle} />
      )}

      {(courseTeachers || courseDescription) && (
        <div className="course-card-content">
          {courseTeachers && (
            <p className="course-card-teachers">
              <span className="course-card-teachers-label">Profes a cargo</span>
              <span className="course-card-teachers-names">
                {courseTeachers}
              </span>
            </p>
          )}

          {courseDescription && (
            <p className="course-card-description">{courseDescription}</p>
          )}
        </div>
      )}

      {(courseDate || courseDuration || courseModality) && (
        <div className="course-card-tags-container">
          {courseDate && <h4 className="course-card-tag">📆 {courseDate}</h4>}
          {courseDuration && (
            <h4 className="course-card-tag">⌛ {courseDuration}</h4>
          )}
          {courseModality && (
            <h4 className="course-card-tag">💻 {courseModality}</h4>
          )}
        </div>
      )}

      {courseHorario && (
        <p className="course-card-schedule">⏰ {courseHorario}</p>
      )}

      {hasActions && (
        <div className="course-card-actions">
          {!isFinalized ? (
            <Button
              type="anchor"
              target="_blank"
              rel="noreferrer"
              className="course-card-button course-card-button-signup"
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
              className="course-card-button course-card-button-closed"
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
              className="course-card-button course-card-button-curriculum"
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
