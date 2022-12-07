import dropdownArrow from "../media/svg/dropdown_arrow.svg";

function Dropdown(props) {
    
    function openDropdown(e) {
        // Busca a el nodo padre y conseguie a el elemento que le sigue (dropdown__info)
        let dropdown = e.target.tagName !== "H3" ? e.target.parentNode.nextSibling : e.target.nextSibling;
        let dropdownArrow = dropdown.previousElementSibling.lastChild.classList;

        // Altero su clase
        dropdown.classList.toggle("active");
        dropdownArrow.toggle("active");

        // Si posee la clase "active" altero su altura a el tamaño de su contenido
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
