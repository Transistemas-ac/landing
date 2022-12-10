import iconarrow from '../media/svg/icon_arrow.svg';

function Integrant(props) {
    return (
        <div className="integrant">
            <div className='integrant__contenedorimg'>
                <img className="integrant__image" src={props.img} alt="Imagen de integrante" />
            </div>

            <div className='integrant__contenedorinfo'>
                <p className="integrant__name">{props.name}</p>

                <p className="integrant__occupation">{props.occupation}</p>
            </div>

            <div className='integrant__contenedoricon'>
                <img className="integrant__icon" src={iconarrow} alt="icono de flecha" />
            </div>
        </div>
    );
}

export default Integrant;



