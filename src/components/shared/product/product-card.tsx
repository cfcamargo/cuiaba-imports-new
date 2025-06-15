import { ProductProps } from "@/types/Product";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

interface ProductCardPros {
  product: ProductProps;
}

export default function ProductCard({ product }: ProductCardPros) {
  return (
    <Link href={`/shop/${product.id}`}>
      <Card>
        <CardContent className="flex flex-col justify-center items-center gap-4 min-h-[400px] hover:bg-zinc-50">
          <div>
            <img
              src={product.cover}
              alt={product.title}
              className="h-[200px] object-cover aspect-square"
            />
          </div>
          <div className="flex flex-col justify-center text-center">
            <Typography variant="body1" fontWeight={600}>
              {product.title}
            </Typography>
            <Typography variant="subtitle2">{product.sub}</Typography>

            {product.qtd > 0 ? (
              <span className="text-blue-800">Disponível</span>
            ) : (
              <span className="text-red-500">Indisponível</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
