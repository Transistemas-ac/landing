import cardTalleres from "../assets/svg/card_talleres.svg";
import cardAcompaniamiento from "../assets/svg/card_acompaniamiento.svg";

const activities = [
  {
    img: cardTalleres,
    alt: "Cursos",
    title: "Cursos",
    description:
      "Brindamos capacitaciones gratuitas en Testing, Programación y Diseño para formar a nuestra comunidad y facilitar su inserción laboral.",
    link: "Anotarse",
    href: "/cursos",
  },

  {
    img: cardAcompaniamiento,
    alt: "Acompañamiento",
    title: "Acompañamiento",
    description:
      "Creamos una comunidad de acompañamiento y apoyo mutuo para compartir experiencias y generar redes que ayuden a sortear situaciones difíciles.",
    link: "Unirse a la comunidad",
    href: "https://discord.gg/yuYpD6QW74",
  },
];

export default activities;
