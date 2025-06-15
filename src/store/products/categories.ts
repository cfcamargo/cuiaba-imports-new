import { create } from "zustand";

interface CategoriesStore {
  categories: string[];
  loading: boolean;
  setCategories: (categories: string[]) => void;
  setLoading: (value: boolean) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  loading: false,
  setCategories: (categories) => set({ categories: categories }),
  setLoading: (value) => set({ loading: value }),
}));
