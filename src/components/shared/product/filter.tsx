"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useCategoriesStore } from "@/store/products/categories";
import { useBrandStore } from "@/store/products/brands";
import { fetchUniqueBrand } from "@/lib/fetchProducts";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { productApi } from "@/lib/productApi";
import { useProductStore } from "@/store/products/products";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterType {
  key: "brand" | "categorie";
  value: string;
}

export default function Filters() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [loading, setLoaging] = React.useState(false);
  const [filter, setFilter] = React.useState<"categorie" | "brand" | null>(
    null
  );
  const [searchByFilter, setSearchByFilter] = React.useState(false);

  const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null);
  const [selectedCategorie, setSelectedCategorie] = React.useState<
    string | null
  >(null);

  const categoriesStore = useCategoriesStore();
  const brandStore = useBrandStore();

  const { setLoading, setProducts, setMeta } = useProductStore();
  const searchParams = useSearchParams();

  const getBrands = async () => {
    setLoaging(true);
    const reponse = await fetchUniqueBrand();
    brandStore.setBrands(reponse);
    setLoaging(false);
  };

  const handleFilter = async () => {
    let query: URLSearchParams | null = null;

    if (filter === "brand") {
      query = new URLSearchParams({
        brand: selectedBrand!,
      });
      setSearchByFilter(true);
      router.push(`/shop?brand=${selectedBrand}`);
    }

    if (filter === "categorie") {
      query = new URLSearchParams({
        categorie: selectedCategorie!,
      });
      setSearchByFilter(true);
      router.push(`/shop?categorie=${selectedCategorie}`);
    }

    if (query) {
      getProduct(query.toString());
    }

    handleClose();
  };

  const getProduct = async (query?: string) => {
    setLoading(true);
    const { data } = await productApi.getPaginatedProducts(query);
    setProducts(data.products);
    setMeta({
      links: data.links,
      total: data.total,
      page: data.page,
      perPage: data.perPage,
    });
    setLoading(false);
  };

  const handleChangeBrand = (_: any, brand: string | null) => {
    if (brand) {
      setSelectedBrand(brand);
      setFilter("brand");
    } else {
      setFilter(null);
      setSelectedBrand(null);
    }
  };

  const handleChangeCategorie = (_: any, categorie: string | null) => {
    if (categorie) {
      setFilter("categorie");
      setSelectedCategorie(categorie);
    } else {
      setFilter(null);
      setSelectedCategorie(null);
    }
  };

  const handleClearFilters = () => {
    handleClose();
    getProduct();
    setFilter(null);
    setSelectedBrand(null);
    setSelectedCategorie(null);
    setSearchByFilter(false);

    router.push("/shop");
  };

  const setFilters = () => {
    const categoria = searchParams.get("categorie");
    const marca = searchParams.get("brand");

    if (categoria) {
      setSelectedCategorie(categoria);
      setSearchByFilter(true);
    }

    if (marca) {
      setSelectedBrand(marca);
      setSearchByFilter(true);
    }
  };

  React.useEffect(() => {
    getBrands();
    setFilters();
  }, []);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        className="flex items-center gap-1"
      >
        <span>Filtros</span>
        {searchByFilter && <Chip label="1" size="small" color="info" />}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <div className="px-4 py-2 flex flex-col gap-4">
          <Autocomplete
            options={categoriesStore.categories}
            value={selectedCategorie}
            sx={{ width: 300 }}
            onChange={(e, val) => handleChangeCategorie(e, val)}
            renderInput={(params) => (
              <TextField {...params} label="Categoria" />
            )}
          />
          <Autocomplete
            loading={loading}
            options={brandStore.brands}
            value={selectedBrand}
            onChange={(e, val) => handleChangeBrand(e, val)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Marcas" />}
          />

          <Button variant="contained" onClick={handleFilter}>
            Filtrar
          </Button>

          <Button variant="outlined" onClick={handleClearFilters}>
            Limpar filtros
          </Button>
        </div>
      </Menu>
    </div>
  );
}
