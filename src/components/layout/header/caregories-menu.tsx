"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";
import clsx from "clsx";
import { CircularProgress, Grid } from "@mui/material";
import { useCategoriesStore } from "@/store/products/categories";
import { useEffect } from "react";
import { fetchUniqueCategories } from "@/lib/fetchProducts";

export default function CategoriesMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const pathname = usePathname();

  const [loading, setLoading] = React.useState(true);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSearchByFilter = () => {
    setAnchorEl(null);
  };

  const navLinkClass = (href: string) =>
    clsx(
      "text-black border-b border-transparent hover:border-zinc-950 transition-all duration-200",
      pathname === href && "border-zinc-950 font-semibold"
    );

  const categoriesStore = useCategoriesStore();
  const getCategories = async () => {
    const response = await fetchUniqueCategories();
    categoriesStore.setCategories(response);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <nav className="flex items-center gap-16 justify-center relative">
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
          {loading ? (
            <CircularProgress size={16} />
          ) : (
            <>
              <AlignJustify />
              <span>Categorias</span>
            </>
          )}
        </Button>
        {!loading && (
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
            <Grid container spacing={1}>
              {categoriesStore.categories.map((categorie, i) => (
                <Grid size={4} key={i}>
                  <MenuItem onClick={handleSearchByFilter}>
                    {categorie}
                  </MenuItem>
                </Grid>
              ))}
            </Grid>
          </Menu>
        )}
      </div>

      <Link className={navLinkClass("/")} href="/">
        LOJA
      </Link>
      <Link className={navLinkClass("/assistance")} href="/assistance">
        ASSISTÊNCIA TÉCNICA
      </Link>
      <Link className={navLinkClass("/about")} href="/about">
        SOBRE
      </Link>
      <Link className={navLinkClass("/contact")} href="/contact">
        CONTATO
      </Link>
    </nav>
  );
}
