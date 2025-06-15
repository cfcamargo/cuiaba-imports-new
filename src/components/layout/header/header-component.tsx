"use client";

import Image from "next/image";
import CategoriesMenu from "./caregories-menu";
import Link from "next/link";
import SearchBar from "./search-bar";
import MobileMenu from "./mobile-menu";

export default function HeaderComponent() {
  return (
    <div className="w-full">
      <div className="w-full h-[120px] bg-zinc-900">
        <div className="w-full max-w-[1200px] mx-auto h-[80] flex items-center justify-between">
          <Link href="/">
            <Image src="/white-logo.png" width={200} height={100} alt="logo" />
          </Link>
          <div className="xs:hidden md:flex">
            <SearchBar />
          </div>
          <div className="xs:flex md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto bg-white h-[50px] border rounded-lg px-8 py-2 -mt-[30px] absolute top-[120px] left-0 right-0 z-50">
        <CategoriesMenu />
      </div>
    </div>
  );
}

// 400px de altura nos banners
