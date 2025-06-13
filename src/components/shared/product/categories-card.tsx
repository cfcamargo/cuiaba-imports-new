"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { Button, Typography, Card, CardContent } from "@mui/material";
import {
  FlaskRound,
  Laptop,
  SatelliteDish,
  Smartphone,
  Speaker,
  Tablet,
  Watch,
} from "lucide-react";

export default function CategoriesCard() {
  const swiperRef = useRef<SwiperCore | null>(null);

  const categories = [
    {
      name: "Celulares",
      icon: <Smartphone size={40} />,
    },
    {
      name: "Tablets",
      icon: <Tablet size={40} />,
    },
    {
      name: "Nootebooks",
      icon: <Laptop size={40} />,
    },
    {
      name: "Smartwatches",
      icon: <Watch size={40} />,
    },
    {
      name: "Starlink",
      icon: <SatelliteDish size={40} />,
    },
    {
      name: "Perfumes",
      icon: <FlaskRound size={40} />,
    },
    {
      name: "Caixas de som",
      icon: <Speaker size={40} />,
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 bg-zinc-950">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Busque por categorias</Typography>
        <div className="flex items-center gap-2">
          <Button onClick={() => swiperRef.current?.slidePrev()}>Back</Button>
          <Button onClick={() => swiperRef.current?.slideNext()}>Next</Button>
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {categories.map((categorie, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "300px" }} // controla o tamanho visível de cada card
            className="!w-[300px] shrink-0"
          >
            <Button>
              <Card className="min-w-[300px]">
                <CardContent className="flex flex-col gap-4 justify-center items-center">
                  {categorie.icon}
                  <span>{categorie.name}</span>
                </CardContent>
              </Card>
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
