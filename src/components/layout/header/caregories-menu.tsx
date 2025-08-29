"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AlignJustify } from "lucide-react";
import clsx from "clsx";
import { CircularProgress, Grid2 as Grid } from "@mui/material";
import { useCategoriesStore } from "@/store/products/categories";
import { useEffect } from "react";
import { fetchUniqueCategories } from "@/lib/fetchProducts";
import { productApi } from "@/lib/productApi";
import { useProductStore } from "@/store/products/products";
import SearchBar from "./search-bar";

export default function CategoriesMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const pathname = usePathname();

  const { setMeta, setLoading, setProducts } = useProductStore();
  const route = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navLinkClass = (href: string) =>
    clsx(
      "text-black border-b border-transparent hover:border-zinc-950 transition-all duration-200",
      pathname === href && "border-zinc-950 font-semibold"
    );

  const categoriesStore = useCategoriesStore();

  const getCategories = async () => {
    categoriesStore.setLoading(true);
    const response = await fetchUniqueCategories();
    categoriesStore.setCategories(response);
    categoriesStore.setLoading(false);
  };

  const getProductByCategorie = async (categorie: string) => {
    setAnchorEl(null);

    if (pathname === "/shop") {
      const query = new URLSearchParams({
        categorie,
      });

      setLoading(true);
      const { data } = await productApi.getPaginatedProducts(query.toString());
      setProducts(data.products);
      setMeta({
        links: data.links,
        total: data.total,
        page: data.page,
        perPage: data.perPage,
      });
      setLoading(false);
    }
    route.push(`/shop/?categorie=${categorie}`);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <nav className="xs:hidden md:flex items-center gap-16 justify-center relative">
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: 1,
              minWidth: "150px",
              minHeight: "37px",
            }}
          >
            {categoriesStore.loading ? (
              <CircularProgress size={16} />
            ) : (
              <>
                <AlignJustify />
                <span>Categorias</span>
              </>
            )}
          </Button>
          {!categoriesStore.loading && (
            <Menu
              id="basic-menu"
              className="absolute"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              sx={{
                top: "8px",
                width: "100%",
                maxWidth: "1200px",
              }}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <Grid container spacing={1} width={800}>
                {categoriesStore.categories.map((categorie, i) => (
                  <Grid size={4} key={i}>
                    <MenuItem onClick={() => getProductByCategorie(categorie)}>
                      {categorie}
                    </MenuItem>
                  </Grid>
                ))}
              </Grid>
            </Menu>
          )}
        </div>

        <Link className={navLinkClass("/")} href="/">
          HOME
        </Link>
        <Link className={navLinkClass("/shop")} href="/shop">
          LOJA
        </Link>
        <Link className={navLinkClass("/assistance")} href="/assistance">
          ASSISTÊNCIA TÉCNICA
        </Link>
        <Link className={navLinkClass("/about")} href="/about">
          SOBRE
        </Link>
      </nav>

      <div className="xs:flex md:hidden">
        <SearchBar />
      </div>
    </>
  );
}
