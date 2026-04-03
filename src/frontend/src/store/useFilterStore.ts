import { create } from "zustand";

export interface FilterState {
  search: string;
  categories: string[];
  dateRange: { start: string | null; end: string | null };
  amountRange: { min: number | null; max: number | null };
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
  setSearch: (s: string) => void;
  setCategories: (cats: string[]) => void;
  toggleCategory: (cat: string) => void;
  setDateRange: (range: { start: string | null; end: string | null }) => void;
  setAmountRange: (range: { min: number | null; max: number | null }) => void;
  setSortBy: (s: "date" | "amount") => void;
  setSortOrder: (o: "asc" | "desc") => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: "",
  categories: [],
  dateRange: { start: null, end: null },
  amountRange: { min: null, max: null },
  sortBy: "date",
  sortOrder: "desc",

  setSearch: (search) => set({ search }),
  setCategories: (categories) => set({ categories }),
  toggleCategory: (cat) =>
    set((state) => ({
      categories: state.categories.includes(cat)
        ? state.categories.filter((c) => c !== cat)
        : [...state.categories, cat],
    })),
  setDateRange: (dateRange) => set({ dateRange }),
  setAmountRange: (amountRange) => set({ amountRange }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  resetFilters: () =>
    set({
      search: "",
      categories: [],
      dateRange: { start: null, end: null },
      amountRange: { min: null, max: null },
      sortBy: "date",
      sortOrder: "desc",
    }),
}));
