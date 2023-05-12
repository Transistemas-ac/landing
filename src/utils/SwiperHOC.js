import { useContext, useEffect, useRef, useState } from 'react';
import { DisplayContext } from './DisplayProvider';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper';
import dropdownArrow from "../assets/svg/dropdown_arrow.svg";


export const SwiperHOC = (props) => {
    const display = useContext(DisplayContext);
    const length = props.children.length > 3;
    const swiper = useRef();
    const [available, setAvailable] = useState({ active: true, extended: false });

    useEffect(() => {

        if (display && !length) {
            swiper.current.swiper.slideTo(1);
            setAvailable({ active: false, extended: false })
            return
        }

        if (display && length) {
            setAvailable({ active: true, extended: true })
            return
        }

        setAvailable({ active: true, extended: false })
    }, [display])

    return <>
        <Swiper
            {...props}
            allowSlideNext={available.active}
            allowSlidePrev={available.active}
            allowTouchMove={available.active}
            slidesPerGroup={1}
            modules={[Navigation, ...props.modules]}

            // navigation={true}
            navigation={{
                prevEl: '#custom-prev',
                nextEl: '#custom-next',
            }}
            slidesPerView={available.extended ? 3 : 1}

            ref={swiper}
            // loop={true}
            // loopFillGroupWithBlank={true}
            className={`${display === 'desktop' ? 'desktop' : 'mobile'}`}
        />
        <div id="custom-prev" className='swiper-button-prev'>
            <img className="swiper-button-prev__arrow" src={dropdownArrow} alt="flecha desplegable" />
        </div>
        <div id="custom-next" className='swiper-button-next'>
            <img className="swiper-button-next__arrow" src={dropdownArrow} alt="flecha desplegable" />
        </div>
    </>
}