import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import { findCourseBySlug, getCourseSlugFromPath } from "../utils/coursesFunctions";
import ErrorPage from "./ErrorPage";
import Seo from "../components/Seo";
import { SITE_URL, organizationId } from "../utils/seo";
import Breadcrumb from "../components/Breadcrumb";
import { buildBreadcrumbSchema } from "../utils/breadcrumb";

const faqItems = [
  {
    question: "¿Cuál es el costo de los cursos?",
    answer:
      "Los cursos son gratuitos y no tienen coste de emisión de certificado."
  },
  {
    question: "¿Quiénes pueden anotarse a los cursos?",
    answer:
      "Cualquier persona interesada, damos prioridad a personas del colectivo LGTBIQ+."
  },
  {
    question: "¿Si termino el curso recibo un certificado?",
    answer:
      "¡Si! Vas a recibir un certificado expedido por Transistemas y los entes que participen de la certificación."
  },
  {
    question: "¿Los cursos son online o presenciales?",
    answer:
      "Nuestros cursos se dictan de forma online para facilitar el acceso desde distintas regiones."
  },
  {
    question: "¿Cuándo salen nuevos cursos?",
    answer:
      "Los nuevos cursos se anuncian a través de nuestras redes, seguinos para enterarte."
  }
];

const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  return `${match[3]}-${match[2]}-${match[1]}`;
};

const buildSchedule = (horario) => {
  if (!horario) return null;
  const weekdayMatch = horario.match(/^([A-Za-záéíóúÁÉÍÓÚ&]+)/);
  const timeMatch = horario.match(/(\d{1,2}(?::\d{2})?\s*a\s*\d{1,2}(?::\d{2})?)/);
  return {
    ...(weekdayMatch && { byDay: weekdayMatch[1].replace(/\s+/g, " ").trim() }),
    ...(timeMatch && { startTime: timeMatch[1] })
  };
};

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer
    }
  }))
};

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
  const slug = getCourseSlugFromPath(course.links?.[0] || "");
  const path = `/cursos/${slug}`;
  const courseUrl = `${SITE_URL}${path}`;
  const courseImage = course.img
    ? course.img.startsWith("http")
      ? course.img
      : course.img
    : `${SITE_URL}/og-image.png`;

  const startDate = parseDate(course.fechaInicio);
  const endDate = parseDate(course.fechaFin);
  const schedule = buildSchedule(course.horario);

  const courseSchema = {
    "@type": "Course",
    "@id": `${courseUrl}#course`,
    name: course.title,
    description:
      course.description ||
      `Curso de ${course.title} brindado por Transistemas.`,
    provider: { "@id": organizationId },
    inLanguage: "es-AR",
    isAccessibleForFree: true,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: course.duration,
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(schedule && { courseSchedule: schedule }),
      ...(course.signupHref && {
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "ARS",
          url: course.signupHref,
          availability: isFinalized
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
          validFrom: startDate || undefined
        }
      }),
      instructor: {
        "@type": "Organization",
        name: course.teachers || "Equipo de Educación de Transistemas"
      }
    }
  };

  const breadcrumbItems = [
    { name: "Inicio", url: `${SITE_URL}/` },
    { name: "Cursos", url: `${SITE_URL}/cursos` },
    { name: course.title, url: courseUrl }
  ];

  return (
    <div className="courses course-landing">
      <Seo
        title={course.title}
        description={
          course.description ||
          `${course.title}: curso gratuito de Transistemas. ${courseDate ? `Fechas: ${courseDate}.` : ""} ${
            course.duration ? `Duración: ${course.duration}.` : ""
          } Inscripción abierta con prioridad para la comunidad LGBTIQ+.`
        }
        path={path}
        image={courseImage}
        type="article"
        schema={[
          courseSchema,
          { ...faqSchema, "@id": `${courseUrl}#faq` },
          buildBreadcrumbSchema(breadcrumbItems)
        ]}
      />

      <div className="courses-section course-landing-section">
        <Breadcrumb items={breadcrumbItems} />

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
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="course-landing-faq">
        <h2 className="faq-section-title">Preguntas frecuentes</h2>
        {faqItems.map(({ question, answer }) => (
          <Dropdown type="basic" title={question} key={question}>
            {answer}
          </Dropdown>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default CourseLanding;
