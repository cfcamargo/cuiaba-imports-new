import { fetchAndTransformProducts } from "@/lib/fetchProducts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const perPage = Number(searchParams.get("perPage") || "15");
    const page = Number(searchParams.get("page") || "1");
    const title = searchParams.get("title")?.toLowerCase() || "";
    const brand = searchParams.get("brand")?.toLowerCase() || "";
    const category = searchParams.get("category")?.toLowerCase() || "";

    let products = await fetchAndTransformProducts();

    if (title) {
      products = products.filter((p) => p.title.toLowerCase().includes(title));
    }

    if (brand) {
      products = products.filter((p) => p.brand.toLowerCase().includes(brand));
    }

    if (category) {
      products = products.filter((p) =>
        p.category.toLowerCase().includes(category)
      );
    }

    const start = (page - 1) * perPage;
    const end = start + perPage;

    return NextResponse.json({
      products: products.slice(start, end),
      links: Math.ceil(products.length / perPage),
      total: products.length,
      perPage,
      page,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar os produtos" },
      { status: 500 }
    );
  }
}
