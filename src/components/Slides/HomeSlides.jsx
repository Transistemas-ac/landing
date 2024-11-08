import activities from '../../data/Activities';
import Card from '../Card';
import { SwiperSlide } from 'swiper/react';


const HomeSlides = () => activities.map((item, idx) =>
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

export default HomeSlides;