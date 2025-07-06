import pastCourses from "../../data/PastCourses";
import Card from "../Card";
import { SwiperSlide } from "swiper/react";

const PastCoursesSlides = () =>
  pastCourses.map((item, idx) => (
    <SwiperSlide key={idx}>
      <Card type="basic" className="past-course-card">
        <h2 className="past-course-card__title">{item.title}</h2>
        <h4 className="past-course-card__date">{item.date}</h4>
      </Card>
    </SwiperSlide>
  ));

export default PastCoursesSlides;
