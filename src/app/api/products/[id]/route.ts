import { fetchAndTransformProducts } from "@/lib/fetchProducts";
import { NextResponse } from "next/server";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, context: any) {
  try {
    const id = Number(context.params.id);
    const products = await fetchAndTransformProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}
