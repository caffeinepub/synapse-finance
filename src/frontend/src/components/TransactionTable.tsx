import { format, parseISO } from "date-fns";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Transaction } from "../data/transactions";
import { cn } from "../lib/utils";
import { useFilterStore } from "../store/useFilterStore";
import EmptyState from "./EmptyState";

const CATEGORY_COLORS: Record<string, string> = {
  Housing: "#3B82F6",
  Food: "#22C55E",
  Transport: "#F59E0B",
  Entertainment: "#EC4899",
  Healthcare: "#14B8A6",
  Shopping: "#A855F7",
  Utilities: "#6B7280",
  Income: "#37D6FF",
  Investment: "#8B5CF6",
};

interface TransactionTableProps {
  transactions: Transaction[];
  isAdmin: boolean;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
  showPagination?: boolean;
}

const PAGE_SIZE = 10;

export default function TransactionTable({
  transactions,
  isAdmin,
  onEdit,
  onDelete,
  showPagination = true,
}: TransactionTableProps) {
  const [page, setPage] = useState(1);
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useFilterStore();

  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
  const paginated = showPagination
    ? transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : transactions;

  function handleSort(field: "date" | "amount") {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  }

  if (transactions.length === 0) {
    return <EmptyState />;
  }

  const SortIcon = ({ field }: { field: "date" | "amount" }) => {
    if (sortBy !== field)
      return <ChevronDown size={12} className="text-muted-foreground/30" />;
    return sortOrder === "asc" ? (
      <ChevronUp size={12} className="text-blue-400" />
    ) : (
      <ChevronDown size={12} className="text-blue-400" />
    );
  };

  return (
    <div data-ocid="transactions.table">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              <th className="text-left pb-3 px-3">
                <button
                  type="button"
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-1 text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase hover:text-muted-foreground/80 transition-colors"
                  data-ocid="transactions.date.toggle"
                >
                  Date <SortIcon field="date" />
                </button>
              </th>
              <th className="text-left pb-3 px-3 text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase">
                Description
              </th>
              <th className="text-left pb-3 px-3 text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase">
                Category
              </th>
              <th className="text-right pb-3 px-3">
                <button
                  type="button"
                  onClick={() => handleSort("amount")}
                  className="flex items-center gap-1 text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase hover:text-muted-foreground/80 transition-colors ml-auto"
                  data-ocid="transactions.amount.toggle"
                >
                  <SortIcon field="amount" /> Amount
                </button>
              </th>
              <th className="text-center pb-3 px-3 text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase">
                Type
              </th>
              {isAdmin && (
                <th className="text-right pb-3 px-3 text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {paginated.map((t, i) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  className="border-b border-white/4 hover:bg-white/3 transition-colors group"
                  data-ocid={`transactions.item.${i + 1}`}
                >
                  <td className="py-3 px-3">
                    <span className="text-xs text-muted-foreground/60 font-mono">
                      {format(parseISO(t.date), "MMM d, yyyy")}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-sm text-foreground/85 font-medium">
                      {t.description}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="pill-badge"
                      style={{
                        background: `${CATEGORY_COLORS[t.category] || "#6B7280"}1a`,
                        color: CATEGORY_COLORS[t.category] || "#6B7280",
                        border: `1px solid ${CATEGORY_COLORS[t.category] || "#6B7280"}30`,
                      }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={cn(
                        "font-semibold text-sm",
                        t.type === "income" ? "text-green-400" : "text-red-400",
                      )}
                    >
                      {t.type === "income" ? "+" : "-"}$
                      {t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex justify-center">
                      <span
                        className={cn(
                          "pill-badge",
                          t.type === "income"
                            ? "badge-income"
                            : "badge-expense",
                        )}
                      >
                        {t.type === "income" ? (
                          <ArrowUpRight size={10} className="mr-1" />
                        ) : (
                          <ArrowDownLeft size={10} className="mr-1" />
                        )}
                        {t.type}
                      </span>
                    </div>
                  </td>
                  {isAdmin && (
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onEdit(t)}
                          data-ocid={`transactions.edit_button.${i + 1}`}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground/50 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                        >
                          <Pencil size={12} />
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onDelete(t.id)}
                          data-ocid={`transactions.delete_button.${i + 1}`}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={12} />
                        </motion.button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        <AnimatePresence mode="popLayout">
          {paginated.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04 }}
              className="p-4 rounded-xl glass-card"
              data-ocid={`transactions.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground/90 truncate">
                    {t.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground/50 font-mono">
                      {format(parseISO(t.date), "MMM d")}
                    </span>
                    <span
                      className="pill-badge text-xs"
                      style={{
                        background: `${CATEGORY_COLORS[t.category] || "#6B7280"}1a`,
                        color: CATEGORY_COLORS[t.category] || "#6B7280",
                        border: `1px solid ${CATEGORY_COLORS[t.category] || "#6B7280"}30`,
                      }}
                    >
                      {t.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "font-bold text-base",
                      t.type === "income" ? "text-green-400" : "text-red-400",
                    )}
                  >
                    {t.type === "income" ? "+" : "-"}$
                    {t.amount.toLocaleString()}
                  </p>
                  {isAdmin && (
                    <div className="flex gap-1 mt-1 justify-end">
                      <button
                        type="button"
                        onClick={() => onEdit(t)}
                        data-ocid={`transactions.edit_button.${i + 1}`}
                        className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground/50 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                      >
                        <Pencil size={11} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(t.id)}
                        data-ocid={`transactions.delete_button.${i + 1}`}
                        className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/6">
          <p className="text-xs text-muted-foreground/50">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, transactions.length)} of{" "}
            {transactions.length} transactions
          </p>
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              data-ocid="transactions.pagination_prev"
              className="px-3 py-1.5 rounded-lg text-xs font-medium glass-card hover:bg-white/8 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </motion.button>
            <span className="text-xs text-muted-foreground/50">
              {page} / {totalPages}
            </span>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              data-ocid="transactions.pagination_next"
              className="px-3 py-1.5 rounded-lg text-xs font-medium glass-card hover:bg-white/8 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
