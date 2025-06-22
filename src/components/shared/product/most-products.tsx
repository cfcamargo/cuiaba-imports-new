import { Box } from "@mui/material";
import ProductsSlider from "./products-slider";
import { useEffect } from "react";
import { useMostProductStore } from "@/store/products/most-products";
import { productApi } from "@/lib/productApi";
import { useMostSellProductStore } from "@/store/products/most-sell-products";

interface MostProductProps {
  readonly type: "search" | "sell";
  readonly title: string;
}

export default function MostProduct({ type, title }: MostProductProps) {
  const mostProductStore = useMostProductStore();

  const mostSellProductStore = useMostSellProductStore();

  const getMostProducts = async () => {
    if (type === "search") {
      mostProductStore.setLoading(true);
      await productApi
        .getMostProducts(type)
        .then((response) => {
          mostProductStore.setMostProducts(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      mostProductStore.setLoading(false);
    }

    if (type === "sell") {
      mostSellProductStore.setLoading(true);
      await productApi
        .getMostProducts(type)
        .then((response) => {
          mostSellProductStore.setMostProducts(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      mostSellProductStore.setLoading(false);
    }
  };

  useEffect(() => {
    getMostProducts();
  }, []);

  return (
    <Box>
      <ProductsSlider
        products={
          type === "search"
            ? mostProductStore.products
            : mostSellProductStore.products
        }
        title={title}
        loading={
          type === "search"
            ? mostProductStore.loading
            : mostSellProductStore.loading
        }
      />
    </Box>
  );
}
