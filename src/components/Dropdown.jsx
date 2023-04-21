import dropdownArrow from "../assets/svg/dropdown_arrow.svg";

function Dropdown(props) {
    
    function openDropdown(e) {
        let dropdown = e.currentTarget.nextSibling;
        let dropdownArrow = e.currentTarget.lastChild.classList;

        dropdown.classList.toggle("active");
        dropdownArrow.toggle("active");

        if (dropdown.classList.contains("active")) {
            dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
        } else {
            dropdown.style.maxHeight = "0px";
        }
    }

    return (
        <div className="dropdown" >
            <h3 className="dropdown__title" onClick={(e) => { openDropdown(e) }} >
                {props.title}
                <img className="dropdown__arrow" src={dropdownArrow} alt="flecha desplegable" />
            </h3>

            <div className="dropdown__info">
                {props.children}
            </div>

        </div>
    );
}

export default Dropdown;
