import pastCourseImage from '../assets/jpg/past-course-image.jpg';
import Card from '../components/Card';
import { SwiperSlide } from 'swiper/react';

const pastCards = [
    {
        img: pastCourseImage,
        date: 'Abril 2022',
        title: 'Testing Manual'
    },
    {
        title: 'Diseño UX/UI',
        date: 'Marzo 2020',
        img: pastCourseImage
    },
    {
        title: 'UX Writing',
        date: 'Junio 2021',
        img: pastCourseImage
    },
    {
        title: 'UX Writing',
        date: 'Junio 2021',
        img: pastCourseImage
    }
];

const PastCards = () => pastCards.map((item, idx) =>
(<SwiperSlide key={idx}>
    <Card
        className='past-course-card'
    // divider={true}
    // title={item.title}
    // date={item.date}
    // img={item.img}
    >
        <h2 className="past-course-card__title">{item.title}</h2>
        <h4 className="past-course-card__date">{item.date}</h4>
        <div className="past-course-card__image-container">
            <img className="past-course-card__image" src={item.img} alt="" />
        </div>
    </Card>
</SwiperSlide>));

export { PastCards };