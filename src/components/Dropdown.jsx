import { useEffect, useState, useRef } from "react";
import dropdownArrow from "../assets/svg/dropdown_arrow.svg";
import Integrant from "../components/Integrant";
import members from '../utils/members';

function Dropdown(props) {

    const url = process.env.REACT_APP_PUBLIC_URL;
    const [integrants, setIntegrants] = useState(null);
    const [active, setActive] = useState(false);
    const dropdown = useRef()

    const iterateMembers = (role) => members.map((member, idx) => member.team === role ?
        <Integrant
            active={active}
            key={idx}
            picture={`${url}/png/${member.picture}.png`}
            name={member.name}
            occupation={member.role}
            href="https://translate.google.com.ar/?sl=es&tl=en&text=Foto%20de%20perfil&op=translate"
        /> : null);


    const toggleDropdown = () => {
        let dropdownInfo = dropdown.current.lastChild;
        if (active) {
            dropdownInfo.style.maxHeight = `${dropdownInfo.scrollHeight}px`;
        } else {
            dropdownInfo.style.maxHeight = "0px";
        }
    }

    useEffect(() => {
        if (integrants) {
            toggleDropdown()
        }
    }, [integrants])

    function openDropdown() {
        setActive(!active)
        if (props.role) { setIntegrants(() => iterateMembers(props.role)); return }
        toggleDropdown()
    }

    return (
        <div className={`dropdown ${active ? 'active' : ''}`.trim()} ref={dropdown}>
            <button type="button" className="dropdown__title" onClick={() => { openDropdown() }} >
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
