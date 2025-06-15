"use client";

import BannerSlider from "@/components/shared/bannerSlider/banner-slider";
import CategoriesCard from "../components/shared/product/categories-card";
import ProductsGrid from "@/components/shared/product/products-grid";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="z-0">
        <BannerSlider />
      </div>
      <CategoriesCard />
      <div className="bg-white">
        <Suspense fallback={null}>
          <div className="w-full max-w-[1200px] mx-auto px-2">
            <ProductsGrid perPage={8} showFilters={false} />
          </div>
        </Suspense>
      </div>
    </>
  );
}
