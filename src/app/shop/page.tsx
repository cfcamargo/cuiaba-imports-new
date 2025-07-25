"use client";
import { Suspense } from "react";
import ProductsGrid from "../../components/shared/product/products-grid";

export default function Shop() {
  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-[1200px] mx-auto mt-10">
        <Suspense fallback={null}>
          <ProductsGrid />
        </Suspense>
      </div>
    </div>
  );
}
