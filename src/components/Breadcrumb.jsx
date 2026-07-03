import { HashLink } from "react-router-hash-link";

function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="breadcrumb visually-hidden" aria-label="Ruta de navegación">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="breadcrumb-item">
              {isLast ? (
                <span aria-current="page" className="breadcrumb-current">
                  {item.name}
                </span>
              ) : (
                <HashLink smooth to={item.url} className="breadcrumb-link">
                  {item.name}
                </HashLink>
              )}
              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  {" "}/{" "}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
