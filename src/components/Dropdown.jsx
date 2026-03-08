import { useEffect, useMemo, useRef, useState } from "react";
import DropdownContext from "../context/DropdownContext";
import Integrant from "../components/Integrant";
import integrants from "../data/Integrants";
import dropdownArrow from "../assets/svg/dropdown_arrow.svg";

const getMembersByRole = (role) =>
  integrants
    .filter((member) => member.team === role)
    .map((member) => (
      <Integrant
        key={member.href}
        picture={member.picture}
        name={member.name}
        occupation={member.role}
        href={member.href}
      />
    ));

function Dropdown(props) {
  const [active, setActive] = useState(false);
  const dropdown = useRef();
  const members = useMemo(
    () => (props.role ? getMembersByRole(props.role) : null),
    [props.role],
  );

  useEffect(() => {
    if (!dropdown.current) return;

    const dropdownContent = dropdown.current.lastChild;
    dropdownContent.style.maxHeight = active
      ? `${dropdownContent.scrollHeight}px`
      : "0px";
  }, [active, members]);

  return (
    <div
      className={[props.className, "dropdown", active ? "active" : ""]
        .filter(Boolean)
        .join(" ")}
      ref={dropdown}
    >
      <button
        type="button"
        className="dropdown-button"
        onClick={() => {
          setActive(!active);
        }}
      >
        {props.title}
        <img
          className="dropdown-arrow"
          src={dropdownArrow}
          alt="flecha desplegable"
        />
      </button>

      <DropdownContext.Provider value={active}>
        <div className="dropdown-info" aria-disabled={!active}>
          {props.type === "basic" ? (
            <div className="dropdown-inner-container">{props.children}</div>
          ) : (
            <div className="dropdown-inner-container">{members}</div>
          )}
        </div>
      </DropdownContext.Provider>
    </div>
  );
}

export default Dropdown;
