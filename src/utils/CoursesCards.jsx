import pastCourseCardImage from '../assets/jpg/past-course-card_image.jpg';
import PastCourseCard from '../components/PastCourseCard';
import { SwiperSlide } from 'swiper/react';

const pastCards = [
    {
        img: pastCourseCardImage,
        date: 'Abril 2022',
        title: 'Testing Manual'
    },
    {
        title: 'Diseño UX/UI',
        date: 'Marzo 2020',
        img: pastCourseCardImage
    },
    {
        title: 'UX Writing',
        date: 'Junio 2021',
        img: pastCourseCardImage
    }
];

const PastCards = () => pastCards.map((item, idx) =>
(<SwiperSlide key={idx}>
    <PastCourseCard
        title={item.title}
        date={item.date}
        img={item.img}
    />
</SwiperSlide>));

export { PastCards };