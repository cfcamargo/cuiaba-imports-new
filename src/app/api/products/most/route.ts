import { fetchAndTransformProducts } from "@/lib/fetchProducts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const mostType = req.nextUrl.searchParams.get("most");

  try {
    const transformedProducts = await fetchAndTransformProducts();

    const filtered = transformedProducts.filter((product) => {
      if (mostType === "sell") return product.mostSellHome;
      if (mostType === "search") return product.mostSearchShop;
      return false;
    });

    const limited = filtered.slice(0, 10);

    return NextResponse.json(limited);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
