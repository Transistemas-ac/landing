import cardTalleres from "../assets/svg/card_talleres.svg";
import cardCapacitaciones from "../assets/svg/card_capacitaciones.svg";
import cardAcompaniamiento from "../assets/svg/card_acompaniamiento.svg";

const activities = [
  {
    img: cardTalleres,
    alt: "Talleres",
    title: "Cursos y talleres",
    description:
      "Brindamos capacitaciones en Testing, Diseño UX/UI y Programación para personas de la comunidad LGTBIQANB+.",
    link: "Ver más",
    href: "/cursos",
  },

  {
    img: cardCapacitaciones,
    alt: "Capacitaciones",
    title: "Capacitaciones",
    description:
      "Facilitamos capacitaciones en diversidad, género y discapacidad para empresas y organizaciones.",
    link: "Ver más",
    href: "/#contact-form",
  },

  {
    img: cardAcompaniamiento,
    alt: "Acompañamiento",
    title: "Acompañamiento",
    description:
      "Colaboramos con personas de la comunidad a sortear situaciones complejas.",
    link: "Ver más",
    href: "/donar",
  },
];

export default activities;
