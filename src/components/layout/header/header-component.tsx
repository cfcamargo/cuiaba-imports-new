"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CategoriesMenu from "./caregories-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useProductStore } from "@/store/products/products";
import { productApi } from "@/lib/productApi";

export default function HeaderComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading, setMeta, setProducts, loading } = useProductStore();

  const onSearchTermChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    router.push(`/shop?title=${searchTerm}`);

    if (pathname === "/shop") {
      setLoading(true);
      const query = new URLSearchParams({
        title: searchTerm ?? "",
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
    }

    setSearchTerm("");
  };

  return (
    <div className="w-full">
      <div className="w-full h-[120px] bg-zinc-900">
        <div className="w-full max-w-[1200px] mx-auto h-[80] flex items-center justify-between">
          <Link href="/">
            <Image src="/white-logo.png" width={200} height={100} alt="logo" />
          </Link>
          <form
            onSubmit={onSubmitForm}
            className="flex gap-2 w-[500px] bg-white h-[40px] border border-white items-center px-4 rounded-md"
          >
            <input
              className="outline-none focus:outline-none flex-1 h-full  text-zinc-950"
              placeholder="Busque um produto"
              onChange={onSearchTermChange}
              value={searchTerm}
              disabled={loading}
            />
            <div className="border-l-2 border-zinc-950 pl-2">
              <Search size={25} color="black" />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto bg-white h-[50px] border rounded-lg px-8 py-2 -mt-[30px] absolute top-[120px] left-0 right-0 z-50">
        <CategoriesMenu />
      </div>
    </div>
  );
}

// 400px de altura nos banners
