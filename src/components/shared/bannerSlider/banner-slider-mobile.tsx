"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BannerSliderMobile() {
  const slidesMobile = [
    "/banners/m-iphone.png",
    "/banners/m-alexa.png",
    "/banners/m-perfumes.png",
    "/banners/m-starlink.png",
  ];

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      height={400}
      className="h-[400px]"
      navigation
    >
      {slidesMobile.map((element, index) => {
        return (
          <SwiperSlide className="h-[400px] bg-white" key={index}>
            <img src={element} className="h-full w-full object-cover" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
