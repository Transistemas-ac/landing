import { useContext } from 'react';
import arrowIcon from '../assets/svg/icon_arrow.svg';
import { DropdownContext } from './Dropdown';

function Integrant(props) {
    const isActive = useContext(DropdownContext);

    return (
        <div className="integrant">
            <img className="integrant__picture" src={props.picture} alt="Imagen de integrante" />

            <div className='integrant__info-container'>
                <h3 className="integrant__name">{props.name}</h3>

                <p className="integrant__occupation">{props.occupation}</p>
            </div>

            <a className='integrant__link' href={props.href} target='_blank' rel='noreferrer' tabIndex={isActive ? 0 : -1}>
                <img className="integrant__icon" src={arrowIcon} alt="icono de flecha" />
            </a>
        </div>
    );
}

export default Integrant;



