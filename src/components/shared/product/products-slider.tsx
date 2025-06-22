"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import {
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Skeleton,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FlaskRound,
  Laptop,
  SatelliteDish,
  Smartphone,
  Speaker,
  Tablet,
  Watch,
} from "lucide-react";
import { useProductStore } from "@/store/products/products";
import { productApi } from "@/lib/productApi";
import { useRouter } from "next/navigation";
import { ProductProps } from "@/types/Product";
import Link from "next/link";
import ProductCard from "./product-card";

interface ProductsSliderProps {
  readonly loading?: boolean;
  readonly products: ProductProps[];
  readonly title: string;
}

export default function ProductsSlider({
  products,
  loading,
  title,
}: ProductsSliderProps) {
  const swiperRef = useRef<SwiperCore | null>(null);

  const categories = [
    {
      name: "Celulares",
      icon: <Smartphone size={40} />,
      filter: "Celular",
    },
    {
      name: "Tablets",
      icon: <Tablet size={40} />,
      filter: "Tablet",
    },
    {
      name: "Notebooks",
      icon: <Laptop size={40} />,
      filter: "Notebook",
    },
    {
      name: "Smartwatches",
      icon: <Watch size={40} />,
      filter: "Smartwatches",
    },
    // {
    //   name: "Starlink",
    //   icon: <SatelliteDish size={40} />,
    //   filter: "Smartwatches",
    // },
    {
      name: "Perfumes",
      icon: <FlaskRound size={40} />,
      filter: "Perfumes arabes",
    },
    {
      name: "Caixas de som",
      icon: <Speaker size={40} />,
      filter: "Caixa de som",
    },
  ] as const;

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 bg-zinc-950">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">{title}</Typography>
        <div className="flex items-center gap-2">
          <IconButton onClick={() => swiperRef.current?.slidePrev()}>
            <ChevronLeft color="white" />
          </IconButton>
          <IconButton onClick={() => swiperRef.current?.slideNext()}>
            <ChevronRight color="white" />
          </IconButton>
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {loading
          ? [...Array(8)].map((item, index) => (
              <SwiperSlide
                key={index}
                style={{ width: "300px" }} // controla o tamanho visível de cada card
                className="!w-[300px] shrink-0"
              >
                <Skeleton height={400} />
              </SwiperSlide>
            ))
          : products.map((product) => (
              <SwiperSlide
                key={product.id}
                style={{ width: "300px" }} // controla o tamanho visível de cada card
                className="!w-[300px] shrink-0"
              >
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
