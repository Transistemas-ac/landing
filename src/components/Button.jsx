import { HashLink } from "react-router-hash-link";
import { snackbar } from "./Snackbar";

import iconSend from "../assets/svg/icon_send.svg";
import iconMail from "../assets/svg/icon_mail.svg";
import iconCopy from "../assets/svg/icon_copy.svg";
import iconLink from "../assets/svg/icon_arrow.svg";
import iconClose from "../assets/svg/icon_close.svg";

const ICONS = {
  send: { src: iconSend, alt: "Icono de enviar" },
  mail: { src: iconMail, alt: "Icono de mail" },
  link: { src: iconLink, alt: "Icono de link externo" },
  copy: { src: iconCopy, alt: "Icono de copiar texto" },
  close: { src: iconClose, alt: "Icono de cerrar" },
};

function Button({
  type = "button",
  icon,
  copy,
  href,
  className = "",
  children,
  onClick,
  ...otherProps
}) {
  const iconData = icon ? ICONS[icon] : null;
  const buttonClassName =
    `${className} button ${iconData ? "button-icon" : ""}`.trim();

  const handleCopy = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard
      .writeText(copy)
      .then(() => {
        snackbar("Texto copiado exitosamente", "success", 3000);
      })
      .catch(() => {
        snackbar("Ha ocurrido un error inesperado", "error", 3000);
      });
  };

  const content = (
    <>
      {children}
      {iconData ? (
        <img className="button-icon" src={iconData.src} alt={iconData.alt} />
      ) : null}
    </>
  );

  if (type === "link") {
    return (
      <HashLink {...otherProps} to={href} className={buttonClassName}>
        {content}
      </HashLink>
    );
  }

  if (type === "anchor") {
    return (
      <a
        {...otherProps}
        href={href}
        type="text/html"
        className={buttonClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      {...otherProps}
      type={type}
      className={buttonClassName}
      onClick={copy ? handleCopy : onClick}
    >
      {content}
    </button>
  );
}

export default Button;
