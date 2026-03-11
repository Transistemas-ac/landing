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
  links = []
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
  const courseLink = links[0] || "";
  const courseStatus = status || "";
  const isFinalized =
    courseStatus.trim().toLowerCase() === "finalizado" || !signupHref;

  return (
    <div className="course-card">
      <HashLink to={courseLink} className="course-card-link">
        <h1 className="course-card-title">{courseTitle}</h1>

        <img className="course-card-image" src={courseImg} alt={courseTitle} />

        {(courseTeachers || courseDescription) && (
          <div className="course-card-content">
            {courseTeachers && (
              <p className="course-card-teachers">
                <span className="course-card-teachers-label">
                  Profes a cargo
                </span>
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

        <div className="course-card-actions">
          {!isFinalized ? (
            <Button
              type="anchor"
              target="_blank"
              rel="noreferrer"
              className="course-card-button course-card-button-signup"
              href={signupHref}
              icon="send"
              onClick={(e) => e.stopPropagation()}
            >
              Inscribirme
            </Button>
          ) : (
            <Button
              type="anchor"
              target="_blank"
              rel="noreferrer"
              className="course-card-button course-card-button-closed"
              href={signupHref || "#"}
              icon="close"
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
            >
              Programa de estudios
            </Button>
          )}
        </div>
      </HashLink>
    </div>
  );
}

export default CourseCard;
