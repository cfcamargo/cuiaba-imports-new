import axios from "axios";
import { ProductProps } from "../types/Product";

const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SPREADSHEET_ID}/values/PRODUTOS_LOJA?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY}`;

export async function fetchAndTransformProducts(): Promise<ProductProps[]> {
  const apiResponse = await axios.get(url);

  const transformedProducts: ProductProps[] = [];

  apiResponse.data.values.forEach((product: string[]) => {
    if (
      (product[0] !== "ID" && product[16] === "Sim") ||
      (product[0] !== "id" && product[16] === "sim")
    ) {
      transformedProducts.push({
        id: Number(product[0]),
        qtd: Number(product[1]),
        title: product[2],
        sub: product[3],
        description: product[4],
        brand: product[5],
        category: product[6],
        cover: product[7],
        videoURL: product[8],
        mostSellHome: product[9] === "SIM",
        mostSearchShop: product[10] === "SIM",
        variants: product[11].split(","),
      });
    }
  });

  return transformedProducts;
}

export async function fetchUniqueCategories(): Promise<string[]> {
  console.log("url", url);
  const apiResponse = await axios.get(url);

  const categoriesSet = new Set<string>();

  apiResponse.data.values.forEach((product: string[]) => {
    const isHeader = product[0]?.toLowerCase() === "id";
    const isActive = product[16]?.toLowerCase() === "sim";

    if (!isHeader && isActive) {
      const category = product[6]?.trim();
      if (category) {
        categoriesSet.add(
          category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        );
      }
    }
  });

  return Array.from(categoriesSet).sort();
}

export async function fetchUniqueBrand(): Promise<string[]> {
  const apiResponse = await axios.get(url);

  const brandSet = new Set<string>();

  apiResponse.data.values.forEach((product: string[]) => {
    const isHeader = product[0]?.toLowerCase() === "id";
    const isActive = product[16]?.toLowerCase() === "sim";

    if (!isHeader && isActive) {
      const brand = product[5]?.trim();
      if (brand) {
        brandSet.add(
          brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()
        );
      }
    }
  });

  return Array.from(brandSet).sort();
}
