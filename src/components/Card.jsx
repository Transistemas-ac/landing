import { Children } from "react";
import IllustrativeCard from "./IllustrativeCard";
import CourseCard from "./CourseCard";

function Card(props) {
  if (props.type === "basic") {
    const arrayChildren = Children.toArray(props.children);
    const { className, divider, ...otherProps } = props;

    return (
      <div
        {...otherProps}
        className={`${className || ""} card ${divider ? "card--divided" : ""}`}
      >
        {divider
          ? Children.map(arrayChildren, (child, idx) => (
              <>
                {child} <hr />
              </>
            ))
          : props.children}
      </div>
    );
  }

  if (props.type === "illustrative") {
    return <IllustrativeCard {...props} />;
  }

  if (props.type === "course") {
    return <CourseCard {...props} />;
  }
}

export default Card;
