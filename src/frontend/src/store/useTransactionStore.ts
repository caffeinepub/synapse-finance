import { create } from "zustand";
import { seedTransactions } from "../data/transactions";
import type { Transaction } from "../data/transactions";

const STORAGE_KEY = "synapse_transactions";

function loadFromStorage(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return seedTransactions;
}

function saveToStorage(transactions: Transaction[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    // ignore
  }
}

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  resetToSeed: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: loadFromStorage(),

  addTransaction: (t) =>
    set((state) => {
      const newT: Transaction = {
        ...t,
        id: `t${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      };
      const updated = [newT, ...state.transactions];
      saveToStorage(updated);
      return { transactions: updated };
    }),

  updateTransaction: (id, t) =>
    set((state) => {
      const updated = state.transactions.map((tx) =>
        tx.id === id ? { ...tx, ...t } : tx,
      );
      saveToStorage(updated);
      return { transactions: updated };
    }),

  deleteTransaction: (id) =>
    set((state) => {
      const updated = state.transactions.filter((tx) => tx.id !== id);
      saveToStorage(updated);
      return { transactions: updated };
    }),

  resetToSeed: () =>
    set(() => {
      saveToStorage(seedTransactions);
      return { transactions: seedTransactions };
    }),
}));
