import { splitEmails } from "../utils/saludFunctions";

function SaludListItem({ index, item, selected, onSelect }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(index);
    }
  };

  return (
    <article
      id={`salud-item-${index}`}
      className={`salud-item ${selected ? "selected" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={() => onSelect(index)}
      onKeyDown={handleKeyDown}
    >
      <div className="salud-item-header">
        <span className="salud-item-flag" aria-hidden="true" />
        <h3 className="salud-item-title">{item.nombre}</h3>
      </div>
      <p className="salud-item-especialidad">{item.especialidad}</p>
      <p className="salud-item-row">
        <strong>Ciudad:</strong> {item.ciudad}
      </p>
      <p className="salud-item-row">
        <strong>Dirección:</strong> {item.direccion}
      </p>
      {item.telefono && (
        <p className="salud-item-row">
          <strong>Teléfono:</strong> {item.telefono}
        </p>
      )}
      {item.correo && (
        <p className="salud-item-row salud-item-row-emails">
          <strong>Correo:</strong>{" "}
          <span className="salud-emails">
            {splitEmails(item.correo).map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                onClick={(event) => event.stopPropagation()}
              >
                {email}
              </a>
            ))}
          </span>
        </p>
      )}
    </article>
  );
}

export default SaludListItem;