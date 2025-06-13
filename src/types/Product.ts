export interface ProductProps {
  id: number;
  qtd: number;
  title: string;
  sub: string;
  description: string;
  brand: string;
  category: string;
  cover: string;
  videoURL: string;
  mostSellHome: boolean;
  mostSearchShop: boolean;
  variants: string[];
}
