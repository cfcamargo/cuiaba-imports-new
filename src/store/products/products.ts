import { MetaProps } from "@/types/Meta";
import { ProductProps } from "@/types/Product";
import { create } from "zustand";

interface BrandsStore {
  products: ProductProps[];
  meta: MetaProps;
  setProducts: (products: ProductProps[]) => void;
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

export const useProductStore = create<BrandsStore>((set) => ({
  products: [],
  meta: initialMeta,
  loading: false,
  setProducts: (products: ProductProps[]) => set({ products }),
  setMeta: (meta: MetaProps) => set({ meta }),
  setLoading: (state: boolean) => set({ loading: state }),
}));
