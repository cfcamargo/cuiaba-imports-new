"use client";

import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import Filters from "./filter";
import Paginator from "../paginator/paginator";
import GridSkeleton from "./grid-skeleton";
import { productApi } from "@/lib/productApi";
import { useProductStore } from "@/store/products/products";
import { useSearchParams } from "next/navigation";
import EmptyResult from "../emptyResult/empty-result";
import ViewMode from "./view-mode";
import ListProductCard from "./list-product-card";

interface ProductGridProps {
  readonly perPage?: number;
  readonly showFilters?: boolean;
}

export default function ProductsGrid({
  perPage = 20,
  showFilters = true,
}: ProductGridProps) {
  const { loading, meta, products, setMeta, setProducts, setLoading } =
    useProductStore();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const searchParams = useSearchParams();

  const categoria = searchParams.get("categorie");
  const marca = searchParams.get("brand");
  const title = searchParams.get("title");

  const getProducts = async (page?: number) => {
    setLoading(true);
    const query = new URLSearchParams({
      page: String(page ?? 1),
      perPage: String(perPage),
      categorie: categoria ?? "",
      brand: marca ?? "",
      title: title ?? "",
    });

    const { data } = await productApi.getPaginatedProducts(query.toString());
    setProducts(data.products);
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

  const handleChangeViewMode = (view: "grid" | "list") => {
    setViewMode(view);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
      <div className="py-6 flex justify-between items-center px-2">
        <Typography variant="h5" className="text-zinc-950">
          Produtos
        </Typography>

        {showFilters && (
          <div className="flex items-center gap-2">
            <Filters />
            <div className="xs:hidden md:flex">
              <ViewMode
                handleChangeView={(view) => handleChangeViewMode(view)}
              />
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <GridSkeleton perPage={perPage} />
      ) : (
        <Grid container spacing={2} paddingX={1}>
          {products.map((product) =>
            viewMode === "grid" ? (
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ) : (
              <Grid size={12} key={product.id}>
                <ListProductCard product={product} />
              </Grid>
            )
          )}
        </Grid>
      )}
      {!loading && products.length === 0 && <EmptyResult />}
      {meta && (
        <div className="flex xs:flex-col justify-between items-center pt-4">
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
