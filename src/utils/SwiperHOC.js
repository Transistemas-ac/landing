import { useContext, useEffect, useRef, useState } from 'react';
import { DisplayContext } from './DisplayProvider';
import { Swiper } from 'swiper/react';


export const SwiperHOC = (props) => {
    const [available, setAvailable] = useState(true);
    const swiper = useRef();
    const display = useContext(DisplayContext);

    useEffect(() => {
        if (display === 'desktop') {
            swiper.current.swiper.slideTo(1);
            setAvailable(false)
        }
        else {
            setAvailable(true)
        }

    }, [display])

    return <>
        <Swiper
            allowSlideNext={available}
            allowSlidePrev={available}
            allowTouchMove={available}
            ref={swiper}
            className={`${display === 'desktop' ? 'desktop' : 'mobile'}`}
            {...props}
        />
    </>
}