import { ProductProps } from "@/types/Product";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface ListProductCardPros {
  product: ProductProps;
}

export default function ListProductCard({ product }: ListProductCardPros) {
  const getReserveLink = () => {
    const message = `Olá! eu gostaria do Orçamento de um ${product.title}.`;
    const url = `https://api.whatsapp.com/send?phone=5567984513860&text=${message}`;

    return url;
  };

  return (
    <Card>
      <CardContent className="flex justify-start items-center gap-4 min-h-[120px] hover:bg-zinc-50">
        <div>
          <img
            src={product.cover}
            alt={product.title}
            className="h-[90px] object-cover aspect-square"
          />
        </div>
        <div className="w-full flex justify-between">
          <div className="flex-1 flex flex-col justify-start">
            <Typography variant="h6" fontWeight={600}>
              {product.title}
            </Typography>
            <Typography variant="subtitle2">{product.sub}</Typography>

            {product.qtd > 0 ? (
              <span className="text-blue-800">Disponível</span>
            ) : (
              <span className="text-red-500">Indisponível</span>
            )}
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <Link href={`/shop/${product.id}`}>
              <Button className="!min-w-[180px]" variant="contained">
                Ver detalhes
              </Button>
            </Link>
            <a
              href={getReserveLink()}
              target="_blank"
              className="!min-w-[180px] bg-green-400 px-4 py-2 text-white rounded-lg flex items-center gap-2"
            >
              <MessageCircle color="white" />
              Fazer orçamento
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
