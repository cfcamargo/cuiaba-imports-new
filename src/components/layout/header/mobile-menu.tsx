"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Hamburger from "hamburger-react";
import { useCategoriesStore } from "@/store/products/categories";
import { usePathname, useRouter } from "next/navigation";
import { productApi } from "@/lib/productApi";
import { useProductStore } from "@/store/products/products";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  const { loading, categories } = useCategoriesStore();
  const { setLoading, setProducts, setMeta } = useProductStore();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const pathname = usePathname();
  const route = useRouter();

  const getProductByCategorie = async (categorie: string) => {
    setOpen(false);

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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {categories.map((categorie, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => getProductByCategorie(categorie)}>
              <ListItemText primary={categorie} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link href={"/"}>Home</Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link href={"/shop"}>Loja</Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link href={"/assistance"}>Assistência Técnica</Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link href={"/about"}>Sobre</Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {loading ? (
        <div className="p-4">
          <CircularProgress size={26} color="info" />
        </div>
      ) : (
        <Hamburger toggled={open} toggle={setOpen} color="white" />
      )}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
