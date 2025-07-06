import teams from "../../data/Teams";
import Card from "../Card";
import { SwiperSlide } from "swiper/react";

const NosotresSlides = () =>
  teams.map((item, idx) => (
    <SwiperSlide key={idx}>
      <Card
        type="illustrative"
        img={item.img}
        alt={item.alt}
        title={item.title}
        description={item.description}
        link={item.link}
        anchor={true}
        href={
          "https://docs.google.com/forms/d/e/1FAIpQLSePZcGZlbE1JHx3PyLMgdzvtot6IZPVZ0XDi6SAquWPResx7g/viewform"
        }
      />
    </SwiperSlide>
  ));

export default NosotresSlides;
