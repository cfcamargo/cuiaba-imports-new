import { fetchUniqueCategories } from "@/lib/fetchProducts";
import { create } from "zustand";

interface CategoriesStore {
  categories: string[];
  setCategories: (categories: string[]) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories: categories }),
}));
