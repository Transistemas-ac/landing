
function infoCard({ img, alt, title, description, link, href }) {
    return (
        <div className="info-card">
            <img className="info-card__image" src={img} alt={alt} />

            <h2 className="info-card__title">{title}</h2>

            <p className="info-card__description">{description}</p>

            <a className="info-card__link" href={href}>{link}</a>
        </div>
    );
}

export default infoCard;



