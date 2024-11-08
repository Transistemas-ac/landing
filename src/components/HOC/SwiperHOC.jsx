import { useContext, useEffect, useRef, useState } from "react";
import DisplayContext from "../../context/DisplayProvider";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import dropdownArrow from "../../assets/svg/dropdown_arrow.svg";

export const SwiperHOC = (props) => {
  const isMobile = useContext(DisplayContext);
  const larger = props.children.length > 3;

  const swiperRef = useRef();
  const [options, setOptions] = useState({ active: true, extended: false });

  useEffect(() => {
    if (isMobile) {
      setOptions({ active: true, extended: false });
      return;
    }

    if (!larger) {
      swiperRef.current.swiper.slideTo(1);
      setOptions({ active: false, extended: false });
    } else {
      setOptions({ active: true, extended: true });
    }
  }, [isMobile]);

  return (
    <div className="swiper-container">
      <Swiper
        {...props}
        allowSlideNext={options.active}
        allowSlidePrev={options.active}
        allowTouchMove={options.active}
        slidesPerGroup={1}
        modules={[Navigation, ...props.modules]}
        navigation={{
          prevEl: "#custom-prev",
          nextEl: "#custom-next",
        }}
        slidesPerView={options.extended ? 3 : 1}
        ref={swiperRef}
        className={`${isMobile ? "mobile" : "desktop"} ${
          options.extended ? "extended" : ""
        }`}
      />
      <div className="swiper-buttons-container">
        <div
          style={{ display: options.extended ? "flex" : "none" }}
          id="custom-prev"
          className="swiper-button-prev"
        >
          <img
            className="swiper-button-prev__arrow"
            src={dropdownArrow}
            alt="anterior carta"
          />
        </div>
        <div
          style={{ display: options.extended ? "flex" : "none" }}
          id="custom-next"
          className="swiper-button-next"
        >
          <img
            className="swiper-button-next__arrow"
            src={dropdownArrow}
            alt="siguiente carta"
          />
        </div>
      </div>
    </div>
  );
};
