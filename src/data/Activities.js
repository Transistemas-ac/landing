import cardTalleres from "../assets/svg/card_talleres.svg";
import cardServicios from "../assets/svg/card_servicios.svg";
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
    img: cardServicios,
    alt: "Servicios",
    title: "Servicios",
    description:
      "Ofrecemos servicios de desarrollo de software, diseño y testing para organizaciones sociales y empresas de distintos sectores.",
    link: "Ver más",
    href: "/servicios",
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
