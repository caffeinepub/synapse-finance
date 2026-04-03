import { ArrowRightLeft, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { toast } from "sonner";
import ExportButton from "../components/ExportButton";
import FiltersPanel from "../components/FiltersPanel";
import TransactionTable from "../components/TransactionTable";
import { useFilterStore } from "../store/useFilterStore";
import { useRoleStore } from "../store/useRoleStore";
import { useTransactionStore } from "../store/useTransactionStore";
import { useUIStore } from "../store/useUIStore";

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactionStore();
  const { isAdmin } = useRoleStore();
  const { setAddModalOpen, setEditModalOpen, setEditingTransaction } =
    useUIStore();
  const { search, categories, dateRange, amountRange, sortBy, sortOrder } =
    useFilterStore();

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }

    if (categories.length > 0) {
      result = result.filter((t) => categories.includes(t.category));
    }

    if (dateRange.start) {
      result = result.filter((t) => t.date >= dateRange.start!);
    }
    if (dateRange.end) {
      result = result.filter((t) => t.date <= dateRange.end!);
    }

    if (amountRange.min !== null) {
      result = result.filter((t) => t.amount >= amountRange.min!);
    }
    if (amountRange.max !== null) {
      result = result.filter((t) => t.amount <= amountRange.max!);
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "date") {
        cmp = a.date.localeCompare(b.date);
      } else {
        cmp = a.amount - b.amount;
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });

    return result;
  }, [
    transactions,
    search,
    categories,
    dateRange,
    amountRange,
    sortBy,
    sortOrder,
  ]);

  function handleDelete(id: string) {
    deleteTransaction(id);
    toast.success("Transaction deleted", { icon: "🗑️" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      data-ocid="transactions.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            <ArrowRightLeft size={16} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground/95">
              Transactions
            </h1>
            <p className="text-xs text-muted-foreground/50">
              {filtered.length} of {transactions.length} records
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ExportButton transactions={filtered} />
          {isAdmin && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAddModalOpen(true)}
              data-ocid="transactions.add.primary_button"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                boxShadow: "0 0 16px rgba(59,130,246,0.25)",
              }}
            >
              <Plus size={15} />
              Add
            </motion.button>
          )}
        </div>
      </div>

      {/* Filters */}
      <FiltersPanel />

      {/* Table */}
      <div
        className="rounded-2xl glass-card p-6"
        style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}
        data-ocid="transactions.table.card"
      >
        <TransactionTable
          transactions={filtered}
          isAdmin={isAdmin}
          onEdit={(t) => {
            setEditingTransaction(t);
            setEditModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </div>
    </motion.div>
  );
}
