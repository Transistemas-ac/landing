import teamProgramming from '../assets/svg/team_programming.svg'
import teamDesigners from '../assets/svg/team_design.svg'
import teamCommunication from '../assets/svg/team_communication.svg'
import { SwiperSlide } from 'swiper/react';
import Card from '../components/Card';

const cards = [
    {
        img: teamCommunication,
        alt: "Descripcion de la imagen",
        title: "Equipo Comunicación",
        description: "Breve descripción de lo que hace el equipo en dos o tres líneas.",
        link: "Me quiero sumar"
    },

    {
        img: teamProgramming,
        alt: "Descripcion de la imagen",
        title: "Equipo Programación",
        description: "Breve descripción de lo que hace el equipo en dos o tres líneas.",
        link: "Me quiero sumar"
    },

    {
        img: teamDesigners,
        alt: "Descripcion de la imagen",
        title: "Equipo Diseño",
        description: "Breve descripción de lo que hace el equipo en dos o tres líneas.",
        link: "Me quiero sumar"
    }
];

const NosotresSlides = () => cards.map((item, idx) =>
(<SwiperSlide key={idx}>
    <Card
        img={item.img}
        alt={item.alt}
        title={item.title}
        description={item.description}
        link={item.link}
    />
</SwiperSlide>));

export default NosotresSlides;