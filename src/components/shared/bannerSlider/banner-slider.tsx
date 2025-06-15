"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BannerSlider() {
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
      <SwiperSlide className="h-[400px] bg-white">Slide 1</SwiperSlide>
      <SwiperSlide className="h-[400px] bg-white">Slide 2</SwiperSlide>
      <SwiperSlide className="h-[400px] bg-white">Slide 3</SwiperSlide>
      <SwiperSlide className="h-[400px] bg-white">Slide 4</SwiperSlide>
    </Swiper>
  );
}
