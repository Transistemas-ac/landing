import { useEffect, useState, useRef, createContext } from "react";
import dropdownArrow from "../assets/svg/dropdown_arrow.svg";
import Integrant from "../components/Integrant";
import members from '../utils/members';


export const DropdownContext = createContext();

function Dropdown(props) {

    const [active, setActive] = useState(false);
    const dropdown = useRef()
    const [integrants, setIntegrants] = useState(null);
    const url = process.env.REACT_APP_PUBLIC_URL;

    const iterateMembers = (role) => members.map((member, idx) => member.team === role ?
        <Integrant
            key={idx}
            picture={`${url}/png/${member.picture}.png`}
            name={member.name}
            occupation={member.role}
            href={member.href}
        /> : null);

    useEffect(() => {
        if (active) {
            if (props.role && !integrants) {
                setIntegrants(iterateMembers(props.role))
            }

            dropdown.current.lastChild.style.maxHeight = `${dropdown.current.lastChild.scrollHeight}px`;
            return
        }
        dropdown.current.lastChild.style.maxHeight = "0px";
    }, [active, integrants])

    return (
        <div className={`dropdown ${active ? 'active' : ''}`.trim()} ref={dropdown}>
            <button type="button" className="dropdown__title" onClick={() => { setActive(!active) }} >
                {props.title}
                <img className="dropdown__arrow" src={dropdownArrow} alt="flecha desplegable" />
            </button>
            <DropdownContext.Provider value={active}>
                <div className="dropdown__info" aria-disabled={!active}>
                    {props?.role ? <>{integrants}</> : <>{props.children}</>}
                </div>
            </DropdownContext.Provider>
        </div >
    );
}

export default Dropdown;
