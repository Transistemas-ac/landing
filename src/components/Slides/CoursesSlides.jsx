import courses from "../../data/Courses";
import CourseCard from "../CourseCard";
import { SwiperSlide } from "swiper/react";

const CoursesSlides = () =>
  courses.map((item, idx) => (
    <SwiperSlide key={idx}>
      <CourseCard
        title={item.title}
        img={item.img}
        teachers={item.teachers}
        description={item.description}
        fechaInicio={item.fechaInicio}
        fechaFin={item.fechaFin}
        duration={item.duration}
        horario={item.horario}
        curriculumHref={item.curriculumHref}
        signupHref={item.signupHref}
        status={item.status}
        ig={item.ig}
      />
    </SwiperSlide>
  ));

export default CoursesSlides;
