import { Children, useContext, useEffect, useRef, useState } from "react";
import DisplayContext from "../../context/DisplayProvider";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import dropdownArrow from "../../assets/svg/dropdown_arrow.svg";

export const SwiperHOC = (props) => {
  const {
    children,
    modules = [],
    spaceBetween = 20,
    desktopSlides: desktopSlidesProp = 4,
    desktopSlideWidth = 300,
    ...swiperProps
  } = props;
  const isMobile = useContext(DisplayContext);
  const slides = Children.toArray(children);
  const desktopSlides = desktopSlidesProp;
  const desktopWidth =
    desktopSlides * desktopSlideWidth + (desktopSlides - 1) * spaceBetween;
  const swiperStyle = isMobile
    ? {
        "--swiper-desktop-width": "100%",
        "--swiper-desktop-slide-width": "100%",
      }
    : {
        "--swiper-desktop-width": `${desktopWidth}px`,
        "--swiper-desktop-slide-width": `${desktopSlideWidth}px`,
      };
  const hasDesktopLayout = slides.length >= desktopSlides;
  const hasDesktopOverflow = slides.length > desktopSlides;

  const swiperRef = useRef();
  const [options, setOptions] = useState({ active: true, extended: false });

  useEffect(() => {
    if (isMobile) {
      setOptions({ active: true, extended: false });
      return;
    }

    if (!hasDesktopLayout) {
      swiperRef.current?.swiper?.slideTo(1);
      setOptions({ active: false, extended: false });
    } else {
      setOptions({ active: hasDesktopOverflow, extended: true });
    }
  }, [isMobile, hasDesktopLayout, hasDesktopOverflow]);

  return (
    <div className="swiper-container" style={swiperStyle}>
      <Swiper
        {...swiperProps}
        allowSlideNext={options.active}
        allowSlidePrev={options.active}
        allowTouchMove={options.active}
        slidesPerGroup={1}
        modules={[Navigation, ...modules]}
        navigation={{
          prevEl: "#custom-prev",
          nextEl: "#custom-next",
        }}
        slidesPerView={options.extended ? desktopSlides : 1}
        spaceBetween={spaceBetween}
        ref={swiperRef}
        className={`${isMobile ? "mobile" : "desktop"} ${
          options.extended ? "extended" : ""
        }`}
      >
        {children}
      </Swiper>
      <div className="swiper-buttons-container">
        <div
          style={{ display: options.active ? "flex" : "none" }}
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
          style={{ display: options.active ? "flex" : "none" }}
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
