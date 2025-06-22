"use client";

import BannerSlider from "@/components/shared/bannerSlider/banner-slider";
import CategoriesCard from "../components/shared/product/categories-card";
import ProductsGrid from "@/components/shared/product/products-grid";
import { Suspense } from "react";
import MostProduct from "@/components/shared/product/most-products";
import BannerSliderMobile from "@/components/shared/bannerSlider/banner-slider-mobile";

export default function Home() {
  return (
    <>
      <div className="z-0">
        <div className="xs:hidden md:flex">
          <BannerSlider />
        </div>
        <div className="xs:flex md:hidden">
          <BannerSliderMobile />
        </div>
      </div>
      <CategoriesCard />
      <div className="bg-white">
        <Suspense fallback={null}>
          <div className="w-full max-w-[1200px] mx-auto px-2">
            <ProductsGrid perPage={8} showFilters={false} />
          </div>
        </Suspense>
      </div>
      <div>
        <div className="w-full max-w-[1200px] mx-auto">
          <MostProduct type="search" title="Produtos mais buscados" />
        </div>
        <div className="w-full max-w-[1200px] mx-auto">
          <MostProduct type="sell" title="Produtos mais vendidos" />
        </div>
      </div>
    </>
  );
}
