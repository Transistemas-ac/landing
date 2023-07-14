import Card from '../components/Card';
import { SwiperSlide } from 'swiper/react';

import cardTalleres from '../assets/svg/card_talleres.svg';
import cardCapacitaciones from '../assets/svg/card_capacitaciones.svg';
import cardAcompaniamiento from '../assets/svg/card_acompaniamiento.svg';

import teamProgramming from '../assets/svg/team_programming.svg'
import teamDesigners from '../assets/svg/team_design.svg'
import teamCommunication from '../assets/svg/team_communication.svg'
import teamEducation from '../assets/svg/team_education.svg'

const nosotresCards = [
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

const homeCards = [
    {
        img: cardTalleres,
        alt: 'Descripcion de la imagen',
        title: 'Cursos y talleres',
        description: 'Brindamos capacitaciones en Testing, Diseño UX/UI y Programación para personas de la comunidad LGTBI+.',
        link: 'Ver más',
        href: '/cursos'
    },

    {
        img: cardCapacitaciones,
        alt: 'Descripcion de la imagen',
        title: 'Capacitaciones',
        description: 'Facilitamos capacitaciones en diversidad, género y discapacidad para empresas y organizaciones.',
        link: 'Ver más',
        href: '/#contact-form'
    },

    {
        img: cardAcompaniamiento,
        alt: 'Descripcion de la imagen',
        title: 'Acompañamiento',
        description: 'Colaboramos con personas de la comunidad a sortear situaciones complejas.',
        //link: 'Ver más',
        //href: '/donar'
    }
];

const pastCourseCards = [
    {
        title: 'Herramientas Básicas para la inserción laboral',
        date: 'Junio 2023'
    },
    {
        title: 'UX Writing',
        date: 'Septiembre 2022'
    },
    {
        title: 'Diseño UX/UI',
        date: 'Septiembre 2022'
    },
    {
        title: 'Taller de testing manual',
        date: 'Agosto 2021'
    },
    {
        title: 'Alfabetización digital',
        date: 'Junio 2021'
    },
    {
        title: 'Speak Up',
        date: 'Marzo 2021'
    },
    {
        title: 'WordPress',
        date: 'Septiembre 2020'
    },
    {
        title: 'Programación',
        date: 'Febrero 2020'
    }
];



const NosotresSlides = () => nosotresCards.map((item, idx) =>
(<SwiperSlide key={idx}>
    <Card
        type='illustrative'
        img={item.img}
        alt={item.alt}
        title={item.title}
        description={item.description}
        link={item.link}
        anchor={true}
        href={'https://docs.google.com/forms/d/e/1FAIpQLSePZcGZlbE1JHx3PyLMgdzvtot6IZPVZ0XDi6SAquWPResx7g/viewform'}
    />
</SwiperSlide>));

const HomeSlides = () => homeCards.map((item, idx) =>
(<SwiperSlide key={idx}>
    <Card
        type='illustrative'
        img={item.img}
        alt={item.alt}
        title={item.title}
        description={item.description}
        link={item.link}
        href={item.href}
        anchor={false}
    />
</SwiperSlide>));

const PastCourseSlides = () => pastCourseCards.map((item, idx) =>
(<SwiperSlide key={idx}>
    <Card
        type='basic'
        className='past-course-card'
    >
        <h2 className="past-course-card__title">{item.title}</h2>
        <h4 className="past-course-card__date">{item.date}</h4>
    </Card>
</SwiperSlide>));

export { NosotresSlides, HomeSlides, PastCourseSlides }