import { create } from "zustand";

interface BrandsStore {
  brands: string[];
  setBrands: (brands: string[]) => void;
}

export const useBrandStore = create<BrandsStore>((set) => ({
  brands: [],
  setBrands: (brands: string[]) => set({ brands: brands }),
}));
