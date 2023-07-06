import Card from '../components/Card';
import { SwiperSlide } from 'swiper/react';

const pastCards = [
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

const PastCards = () => pastCards.map((item, idx) =>
(<SwiperSlide key={idx}>
    <Card
        className='past-course-card'
    >
        <h2 className="past-course-card__title">{item.title}</h2>
        <h4 className="past-course-card__date">{item.date}</h4>
    </Card>
</SwiperSlide>));

export { PastCards };