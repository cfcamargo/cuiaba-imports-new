"use client";

import BannerSlider from "@/components/shared/bannerSlider/banner-slider";
import CategoriesCard from "../components/shared/product/categories-card";

export default function Home() {
  return (
    <>
      <div className="z-0">
        <BannerSlider />
      </div>
      <CategoriesCard />
    </>
  );
}
