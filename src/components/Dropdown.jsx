import { useEffect, useState, useRef, createContext } from "react";
import dropdownArrow from "../assets/svg/dropdown_arrow.svg";
import Integrant from "../components/Integrant";
import integrants from "../data/Integrants";

export const DropdownContext = createContext();
const url = "https://transistemas.org/";

const iterateMembers = (role) =>
  integrants.map((member, idx) =>
    member.team === role ? (
      <Integrant
        key={idx}
        picture={`${url}/assets/images/${member.picture}`}
        name={member.name}
        occupation={member.role}
        href={member.href}
      />
    ) : null
  );

function Dropdown(props) {
  const [active, setActive] = useState(false);
  const dropdown = useRef();

  const [integrants, setIntegrants] = useState(null);

  useEffect(() => {
    if (active) {
      if (props.role && !integrants) {
        setIntegrants(iterateMembers(props.role));
      }

      dropdown.current.lastChild.style.maxHeight = `${dropdown.current.lastChild.scrollHeight}px`;
      return;
    }
    dropdown.current.lastChild.style.maxHeight = "0px";
  }, [active, integrants]);

  return (
    <div
      className={`${props.className || ""}dropdown ${active ? "active" : ""}`}
      ref={dropdown}
    >
      <button
        type="button"
        className="dropdown__button"
        onClick={() => {
          setActive(!active);
        }}
      >
        {props.title}
        <img
          className="dropdown__arrow"
          src={dropdownArrow}
          alt="flecha desplegable"
        />
      </button>

      <DropdownContext.Provider value={active}>
        <div className="dropdown__info" aria-disabled={!active}>
          {props.type === "basic" ? (
            <div className="dropdown__inner-container">{props.children}</div>
          ) : (
            <div className="dropdown__integrants-container">{integrants}</div>
          )}
        </div>
      </DropdownContext.Provider>
    </div>
  );
}

export default Dropdown;
