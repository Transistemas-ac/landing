

function Card(props) {
    return (
        <div className="card">
            <img className="card__image" src={props.img} alt={props.alt}/>

            <h2 className="card__title">{props.title}</h2>

            <p className="card__description">{props.description}</p>

            <a className="card__link" href="./Button.jsx">{props.link}</a>
        </div>
    );
}

export default Card;



