"use client";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import Filters from "./filter";
import Paginator from "../paginator/paginator";
import GridSkeleton from "./grid-skeleton";
import { ProductProps } from "@/types/Product";
import { productApi } from "@/lib/productApi";

export default function ProductsGrid() {
  const [products, setProducs] = useState<ProductProps[]>([]);
  const [meta, setMeta] = useState<{
    links: number;
    total: number;
    page: number;
    perPage: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const getProducts = async (page?: number) => {
    setLoading(true);
    const query = new URLSearchParams({
      page: String(page ?? 1),
      perPage: String(20),
    });

    const { data } = await productApi.getPaginatedProducts(query.toString());
    setProducs(data.products);
    setMeta({
      links: data.links,
      total: data.total,
      page: data.page,
      perPage: data.perPage,
    });
    setLoading(false);
  };

  const handleNextPage = () => {
    if (meta?.page && meta.page < meta.links) {
      getProducts(meta.page + 1);
    }
  };

  const handleBackPage = () => {
    if (meta?.page && meta.page > 1) {
      getProducts(meta.page - 1);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
      <div className="py-6 flex justify-between items-center">
        <Typography variant="h5" className="text-zinc-950">
          Produtos
        </Typography>
        <Filters />
      </div>
      {loading ? (
        <GridSkeleton />
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {meta && (
        <div className="flex justify-between items-center">
          <span className="text-zinc-950">{`Mostrando ${
            meta?.page * meta?.perPage - meta?.perPage
          } a ${meta?.page * meta?.perPage} de ${meta?.total} produtos`}</span>
          <Paginator
            handleBackFirstPage={() => getProducts(1)}
            handleBackPage={handleBackPage}
            handleNextLastPage={() => getProducts(meta.links)}
            handleNextPage={handleNextPage}
          />
        </div>
      )}
    </Box>
  );
}
