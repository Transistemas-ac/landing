import { HashLink } from "react-router-hash-link";

function IllustrativeCard(props) {
  const {
    className,
    img,
    alt,
    title,
    description,
    href,
    link,
    anchor,
    ...otherProps
  } = props;

  return (
    <div {...otherProps} className={`${className || ""} illustrative-card`}>
      <img className="illustrative-card-image" src={img} alt={alt} />

      <h2 className="illustrative-card-title">{title}</h2>

      <p className="illustrative-card-description">{description}</p>

      {anchor ? (
        <a
          className="illustrative-card-link"
          target="_blank"
          rel="noreferrer"
          href={href}
        >
          {link}
        </a>
      ) : (
        <HashLink smooth className="illustrative-card-link" to={href}>
          {link}
        </HashLink>
      )}
    </div>
  );
}

export default IllustrativeCard;
