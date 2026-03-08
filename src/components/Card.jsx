import { Children, Fragment } from "react";
import IllustrativeCard from "./IllustrativeCard";
import CourseCard from "./CourseCard";

function Card(props) {
  const { type, children, className, divider, ...otherProps } = props;

  if (type === "basic") {
    const arrayChildren = Children.toArray(children);

    return (
      <div
        {...otherProps}
        className={`${className || ""} card ${divider ? "card-divided" : ""}`}
      >
        {divider
          ? arrayChildren.map((child, idx) => (
              <Fragment key={`divider-item-${idx}`}>
                {child}
                {idx < arrayChildren.length - 1 ? <hr /> : null}
              </Fragment>
            ))
          : children}
      </div>
    );
  }

  if (type === "illustrative") {
    return <IllustrativeCard {...props} />;
  }

  if (type === "course") {
    return <CourseCard {...props} />;
  }

  return null;
}

export default Card;
