import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import { findCourseBySlug } from "../utils/coursesFunctions";
import ErrorPage from "./ErrorPage";

function CourseLanding() {
  const { courseSlug = "" } = useParams();
  const course = findCourseBySlug(courseSlug);

  if (!course) {
    return <ErrorPage title="Este curso no existe o ya no está disponible." />;
  }

  const courseDate =
    course.date ||
    [course.fechaInicio, course.fechaFin].filter(Boolean).join(" - ");
  const isFinalized = course.status?.trim().toLowerCase() === "finalizado";

  return (
    <div className="courses course-landing">
      <div className="courses-section course-landing-section">
        <div className="course-landing-content">
          <div className="course-landing-header">
            <h1 className="course-landing-title">{course.title}</h1>
          </div>
          <div className="course-landing-body">
            <div className="course-landing-left">
              <div className="course-landing-tags">
                {courseDate && (
                  <span className="course-landing-tag">📆 {courseDate}</span>
                )}
                {course.duration && (
                  <span className="course-landing-tag">
                    ⌛ {course.duration}
                  </span>
                )}
                {course.modality && (
                  <span className="course-landing-tag">
                    💻 {course.modality}
                  </span>
                )}
              </div>

              {course.horario && (
                <p className="course-landing-schedule">⏰ {course.horario}</p>
              )}

              {course.teachers && (
                <div className="course-landing-teachers">
                  <span className="course-landing-teachers-label">
                    Profes a cargo
                  </span>
                  <span className="course-landing-teachers-names">
                    {course.teachers}
                  </span>
                </div>
              )}

              {course.description && (
                <p className="course-landing-description">
                  {course.description}
                </p>
              )}

              <div className="course-landing-actions">
                {!isFinalized ? (
                  <Button
                    type="anchor"
                    target="_blank"
                    rel="noreferrer"
                    className="course-landing-button course-landing-button-signup"
                    href={course.signupHref}
                    icon="send"
                  >
                    Inscribirme
                  </Button>
                ) : (
                  <Button
                    type="anchor"
                    target="_blank"
                    rel="noreferrer"
                    className="course-landing-button course-landing-button-closed"
                    href={course.signupHref}
                    icon="close"
                  >
                    Inscripciones cerradas
                  </Button>
                )}

                {course.curriculumHref && (
                  <Button
                    type="anchor"
                    target="_blank"
                    rel="noreferrer"
                    className="course-landing-button course-landing-button-curriculum"
                    href={course.curriculumHref}
                    icon="link"
                  >
                    Programa de estudios
                  </Button>
                )}

                <Button
                  type="link"
                  className="course-landing-button course-landing-back-button"
                  href="/cursos"
                  icon="link"
                >
                  Ver todos los cursos
                </Button>
              </div>
            </div>
            <div className="course-landing-right">
              <div className="course-landing-image-container">
                <img
                  className="course-landing-image"
                  src={course.img}
                  alt={course.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="course-landing-faq">
        <Dropdown type="basic" title="¿Cuál es el costo de los cursos?">
          Los cursos son gratuitos y no tienen coste de emisión de certificado.
        </Dropdown>
        <Dropdown type="basic" title="¿Quiénes pueden anotarse a los cursos?">
          Cualquier persona interesada, damos prioridad a personas del colectivo
          LGTBIQ+.
        </Dropdown>
        <Dropdown
          type="basic"
          title="¿Si termino el curso recibo un certificado?"
        >
          ¡Si! Vas a recibir un certificado expedido por Transistemas y los
          entes que participen de la certificación.
        </Dropdown>
        <Dropdown type="basic" title="¿Los cursos son online o presenciales?">
          Nuestros cursos se dictan de forma online para facilitar el acceso
          desde distintas regiones.
        </Dropdown>
        <Dropdown type="basic" title="¿Cuándo salen nuevos cursos?">
          Los nuevos cursos se anuncian a través de nuestras redes, seguinos
          para enterarte.
        </Dropdown>
      </div>

      <Footer />
    </div>
  );
}

export default CourseLanding;
