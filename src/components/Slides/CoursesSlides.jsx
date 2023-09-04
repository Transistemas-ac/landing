import courses from "../../data/Courses";
import CourseCard from "../CourseCard";

const CoursesSlides = () => courses.map((item, idx) =>
    <CourseCard
        key={idx}
        title={item.title}
        img={item.img}
        teachers={item.teachers}
        description={item.description}
        curriculumHref={item.curriculumHref}
        date={item.date}
        duration={item.duration}
        modality={item.modality}
        signupHref={item.signupHref}
    />
);

export default CoursesSlides;