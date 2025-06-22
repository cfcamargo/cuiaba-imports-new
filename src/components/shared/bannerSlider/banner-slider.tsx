"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";

export default function BannerSlider() {
  const [useMobile, setUseMobile] = useState(true);

  const slides = [
    "/banners/iphone.png",
    "/banners/alexa.png",
    "/banners/perfumes.png",
    "/banners/starlink.png",
  ];

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
      {slides.map((element, index) => {
        return (
          <SwiperSlide className="h-[400px] bg-white" key={index}>
            <img src={element} className="h-full w-full object-cover" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
