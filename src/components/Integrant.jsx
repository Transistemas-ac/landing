import arrowIcon from '../assets/svg/icon_arrow.svg';

function Integrant(props) {
    return (
        <div className="integrant">
            <img className="integrant__picture" src={props.picture} alt="Imagen de integrante" />

            <div className='integrant__info-container'>
                <h3 className="integrant__name">{props.name}</h3>

                <p className="integrant__occupation">{props.occupation}</p>
            </div>

            <a className='integrant__link' href={props.href}>
                <img className="integrant__icon" src={arrowIcon} alt="icono de flecha" />
            </a>
        </div>
    );
}

export default Integrant;



