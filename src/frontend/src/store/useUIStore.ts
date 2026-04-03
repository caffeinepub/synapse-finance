import { create } from "zustand";
import type { Transaction } from "../data/transactions";

interface UIStore {
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  editingTransaction: Transaction | null;
  isLoading: boolean;
  isExporting: boolean;
  setAddModalOpen: (open: boolean) => void;
  setEditModalOpen: (open: boolean) => void;
  setEditingTransaction: (t: Transaction | null) => void;
  setLoading: (loading: boolean) => void;
  setExporting: (exporting: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAddModalOpen: false,
  isEditModalOpen: false,
  editingTransaction: null,
  isLoading: false,
  isExporting: false,

  setAddModalOpen: (isAddModalOpen) => set({ isAddModalOpen }),
  setEditModalOpen: (isEditModalOpen) => set({ isEditModalOpen }),
  setEditingTransaction: (editingTransaction) => set({ editingTransaction }),
  setLoading: (isLoading) => set({ isLoading }),
  setExporting: (isExporting) => set({ isExporting }),
}));
