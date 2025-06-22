import { MetaProps } from "@/types/Meta";
import { ProductProps } from "@/types/Product";
import { create } from "zustand";

interface MostSellProductsProps {
  products: ProductProps[];
  meta: MetaProps;
  setMostProducts: (products: ProductProps[]) => void;
  setMeta: (meta: MetaProps) => void;
  setLoading: (state: boolean) => void;
  loading: boolean;
}

const initialMeta: MetaProps = {
  total: 0,
  page: 1,
  perPage: 20,
  links: 0,
};

export const useMostSellProductStore = create<MostSellProductsProps>((set) => ({
  products: [],
  meta: initialMeta,
  loading: false,
  setMostProducts: (products: ProductProps[]) => set({ products }),
  setMeta: (meta: MetaProps) => set({ meta }),
  setLoading: (state: boolean) => set({ loading: state }),
}));
