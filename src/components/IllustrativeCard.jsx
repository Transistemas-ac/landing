import { HashLink } from 'react-router-hash-link';

function IllustrativeCard(props) {

    const { className, img, alt, title, description, href, link, anchor, ...otherProps } = props;

    return (
        <div {...otherProps} className={`${className || ''} illustrative-card`}>
            <img className="illustrative-card__image" src={img} alt={alt} />

            <h2 className="illustrative-card__title">{title}</h2>

            <p className="illustrative-card__description">{description}</p>

            {
                anchor
                    ?
                    <a className="illustrative-card__link" href={href}>{link}</a>
                    :
                    <HashLink smooth className="illustrative-card__link" to={href}>{link}</HashLink>
            }
        </div>
    );
}

export default IllustrativeCard;



