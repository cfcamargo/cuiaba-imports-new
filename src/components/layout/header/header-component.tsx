"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CategoriesMenu from "./caregories-menu";

export default function HeaderComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchTermChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    console.log("chamou");
  };

  return (
    <div className="w-full">
      <div className="w-full h-[120px] bg-zinc-900">
        <div className="w-full max-w-[1200px] mx-auto h-[80] flex items-center justify-between">
          <Image src="/white-logo.png" width={200} height={100} alt="logo" />
          <form
            onSubmit={onSubmitForm}
            className="flex gap-2 w-[500px] bg-white h-[40px] border border-white items-center px-4 rounded-md"
          >
            <input
              className="outline-none focus:outline-none flex-1 h-full  text-zinc-950"
              placeholder="Busque um produto"
              onChange={onSearchTermChange}
              value={searchTerm}
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
