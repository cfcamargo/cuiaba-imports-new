"use-client";

import { productApi } from "@/lib/productApi";
import { useProductStore } from "@/store/products/products";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
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
  );
}
