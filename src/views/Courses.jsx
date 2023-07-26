import { SwiperHOC } from "../utils/SwiperHOC"
import { Pagination } from 'swiper';

import CourseCard from "../components/CourseCard";
import courseCardImage from "../assets/svg/cursoTesting.svg"
import Footer from "../components/Footer";
import { PastCourseSlides } from "../utils/Slides"

import Dropdown from "../components/Dropdown";

function Courses() {
    return (
        <div className="courses">
            <div className="courses-section">
                <h1 className="courses-section__title">Cursos y talleres</h1>
                <h4 className="courses-section__description">
                    Brindamos capacitaciones en el área de la tecnología y ofrecemos diferentes herramientas para la inserción laboral a personas de la comunidad LGTBIQANB+.
                </h4>

                <CourseCard
                title="TESTING MANUAL"
                img={courseCardImage}
                teacher="Lorena Miranda, Luis Thur, Julián Landó, Andres del Valle y Gisela Cordero"
                description={<p>¿Que es el testing? <br />
                    Analizamos softwares y realizamos pruebas para analizar su calidad y detectar defectos. <br />
                    <br />
                    ¿Quienes pueden hacer el curso?<br />
                    Cualquier persona interesada en el mundo de las TICs, que tenga el compromiso de finalizar el curso.
                    No es necesario tener conocimientos previos. <br />
                    Miércoles de 18:30 a 20:30 hs
                    </p>}
                curriculumHref="https://drive.google.com/file/d/1c-KsPMruhFILetBSaneSigI42GBiPwpy"
                date="09/08"
                duration="17 Semanas"
                modality="Online"
                signupHref="https://docs.google.com/forms/d/16s5Q9mo145caz2-vpAJxm0qxqPjOVMJFhycaxxo5kh8"
                />
            </div>

            <div className="past-courses-section">
                <h1 className="past-courses-section__title">Cursos pasados</h1>
                <p className="past-courses-section__description">
                    Estas son las actividades que brindamos anteriormente.
                    <br />
                    ¡Seguinos en las redes para no perderte ninguna!
                </p>

                <SwiperHOC
                    modules={[Pagination]}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                >
                    {PastCourseSlides()}
                </SwiperHOC>
            </div>

            <div className="faq-section">
                <h2 className="faq-section__title">Preguntas frecuentes</h2>
                <Dropdown type='basic' title="¿Cuál es el costo de los cursos?">
                    Los cursos son gratuitos y no tienen coste de emisión de certificado.
                </Dropdown>
                <Dropdown type='basic' title="¿Quiénes pueden anotarse a los cursos?">
                    Cualquier persona interesada, damos prioridad a personas del colectivo LGTBIQANB+.
                </Dropdown>
                <Dropdown type='basic' title="¿Si termino el curso recibo un certificado?">
                    ¡Si! Vas a recibir un certificado expedido por Transistemas y los entes que participen de la certificación.
                </Dropdown>
            </div>

            <Footer />
        </div>
    );
}

export default Courses;