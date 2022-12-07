import Button from "./Button";
import Tag from "./Tag";

function CourseCard(props) {
    return (
        <div className="course-card">
            <h2 className="course-card__title">{props.title}</h2>

            <img className="course-card__image" src={props.img} alt={props.alt} />
            <h3 className="course-card__teacher">{props.teacher}</h3>

            <p className="course-card__description">{props.description}</p>


            <div className="course-card__information">
                <a className="course-card__curriculum-link text-yellow" href={props.curriculumHref}>Ver temario</a>
                <div className="course-card__tags-container">
                    <Tag>📆 {props.date}</Tag>
                    <Tag>⏰ {props.duration}</Tag>
                    <Tag>💻 {props.modality}</Tag>
                </div>
                <Button href={props.signupHref}>Inscribirse</Button>
            </div>
        </div>
    );
}

export default CourseCard;



