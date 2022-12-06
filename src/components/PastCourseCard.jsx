
function PastCourseCard(props) {
    return (
        <div className="past-course-card">
            <h2 className="past-course-card__title">{props.title}</h2>
            <h4 className="past-course-card__date">{props.date}</h4>
            <div className="past-course-card__image-container">
                <img className="past-course-card__image" src={props.img} alt="" />

            </div>
        </div>
    );
}

export default PastCourseCard;



