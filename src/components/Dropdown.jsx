import { useEffect, useState, useRef } from "react";
import dropdownArrow from "../assets/svg/dropdown_arrow.svg";
import Integrant from "../components/Integrant";
import members from '../utils/members';

function Dropdown(props) {

    const [integrants, setIntegrants] = useState(null)
    const dropdownButton = useRef()

    const iterateMembers = (role) => members.map((member, idx) => member.team === role ?
        <Integrant
            key={idx}
            picture={`http://localhost:3000/png/${member.picture}.png`}
            name={member.name}
            occupation={member.role}
            href="https://translate.google.com.ar/?sl=es&tl=en&text=Foto%20de%20perfil&op=translate"
        /> : null);


    const toggleDropdown = () => {
        let dropdown = dropdownButton.current.nextSibling;
        let dropdownArrow = dropdownButton.current.lastChild.classList;

        dropdown.classList.toggle("active");
        dropdownArrow.toggle("active");

        if (dropdown.classList.contains("active")) {
            dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
        } else {
            dropdown.style.maxHeight = "0px";
        }
    }

    useEffect(() => {
        if (integrants) {
            toggleDropdown()
        }
    }, [integrants])

    function openDropdown(e) {
        if (props.role) { setIntegrants(() => iterateMembers(props.role)); return }
        toggleDropdown()
    }

    return (
        <div className="dropdown" >
            <button ref={dropdownButton} type="button" className="dropdown__title" onClick={(e) => { openDropdown(e) }} >
                {props.title}
                <img className="dropdown__arrow" src={dropdownArrow} alt="flecha desplegable" />
            </button>

            <div className="dropdown__info">
                {props?.role ? <>{integrants}</> : <>{props.children}</>}
            </div>

        </div>
    );
}

export default Dropdown;
