import teamProgramming from '../assets/svg/team_programming.svg'
import teamDesigners from '../assets/svg/team_design.svg'
import teamCommunication from '../assets/svg/team_communication.svg'
import teamEducation from '../assets/svg/team_education.svg'
import { SwiperSlide } from 'swiper/react';
import InfoCard from '../components/InfoCard';

const cards = [
    {
        img: teamCommunication,
        alt: "Descripcion de la imagen",
        title: "Equipo Comunicación",
        description: "Pensamos y ejecutamos la estrategia de comunicación de nuestra organicación.",
        link: "Me quiero sumar"
    },
    {
        img: teamEducation,
        alt: "Descripcion de la imagen",
        title: "Equipo Educación",
        description: "Planificamos y llevamos adelante los cursos y talleres en conjunto con empresas.",
        link: "Me quiero sumar"
    },

    {
        img: teamDesigners,
        alt: "Descripcion de la imagen",
        title: "Equipo Diseño",
        description: "Investigamos, analizamos y diseñamos una experiencia digital accesible y agradable.",
        link: "Me quiero sumar"
    },

    {
        img: teamProgramming,
        alt: "Descripcion de la imagen",
        title: "Equipo Programación",
        description: "Desarrollamos y mantenemos actualizada la web con las últimas tecnologías.",
        link: "Me quiero sumar"
    }
];

const NosotresSlides = () => cards.map((item, idx) =>
(<SwiperSlide key={idx}>
    <InfoCard
        img={item.img}
        alt={item.alt}
        title={item.title}
        description={item.description}
        link={item.link}
        href={'/#contact-form'}
    />
</SwiperSlide>));

export default NosotresSlides;