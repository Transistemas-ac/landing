// import { Swiper, SwiperSlide } from 'swiper/react';
// import PastCourseCard from "../components/PastCourseCard";
import { SwiperHOC } from "../utils/SwiperHOC"
import { Pagination } from 'swiper';

import CourseCard from "../components/CourseCard";
import courseCardImage from "../assets/png/course-card_image.png";
import { PastCards } from "../utils/CoursesCards"

import Dropdown from "../components/Dropdown";

function Courses() {
    return (
        <div className="courses">
            <div className="courses-section">
                <h1 className="courses-section__title">Cursos y talleres</h1>

                <CourseCard
                    title="Introducción a UX/UI"
                    img={courseCardImage}
                    teacher="Profe Pepita"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque earum provident, nulla molestias blanditiis voluptatum ab dicta culpa praesentium, explicabo mollitia architecto pariatur accusamus unde consectetur"
                    date="15/07"
                    duration="4 Semanas"
                    modality="Online"
                />
            </div>

            <div className="past-courses-section">
                <h1 className="past-courses-section__title">Cursos pasados</h1>
                <p className="past-courses-section__description">Seguinos en las redes para no perderte ninguno.</p>

                <SwiperHOC
                    modules={[Pagination]}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                >
                    {PastCards()}
                </SwiperHOC>
            </div>

            <div className="faq-section">
                <h2 className="faq-section__title">Preguntas frecuentes</h2>
                <Dropdown title={"¿Cuál es el costo de los cursos?"}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores est iure expedita officiis. Beatae consequatur provident minima eum vitae
                </Dropdown>
                <Dropdown title="¿Quiénes pueden anotarse a los cursos?">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores est iure expedita officiis. Beatae consequatur provident minima eum vitae
                </Dropdown>
                <Dropdown title="¿Si termino el curso recibo un certificado?">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quasi nostrum hic, fugiat quas delectus cum quis
                </Dropdown>
            </div>
        </div>
    );
}

export default Courses;