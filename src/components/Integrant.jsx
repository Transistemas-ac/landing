import iconarrow from '../media/svg/icon_arrow.svg';

function Integrant(props) {
    return (
        <div className="integrant">

            <img className="integrant__image" src={props.img} alt="Imagen de integrante" />

            <img className="integrant__icon" src={iconarrow} alt="icono de flecha" />

            <p className="integrant__name">{props.name}</p>

            <p className="integrant__occupation">{props.occupation}</p>

            {/* <a className="card__link" href="./Arrow.jsx">{props.link}</a> */}
        </div>
    );
}

export default Integrant;



