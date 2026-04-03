import { DollarSign, FileText, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { categories } from "../data/transactions";
import type { Transaction } from "../data/transactions";
import { cn } from "../lib/utils";
import { useTransactionStore } from "../store/useTransactionStore";
import { useUIStore } from "../store/useUIStore";

interface FormState {
  description: string;
  amount: string;
  date: string;
  category: string;
  type: "income" | "expense";
}

const defaultForm: FormState = {
  description: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Food",
  type: "expense",
};

function TransactionForm({
  initial,
  onSubmit,
  onClose,
  isEdit,
}: {
  initial?: FormState;
  onSubmit: (data: FormState) => void;
  onClose: () => void;
  isEdit?: boolean;
}) {
  const [form, setForm] = useState<FormState>(initial || defaultForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const errs: Partial<FormState> = {};
    if (!form.description.trim()) errs.description = "Required";
    if (!form.amount || Number.isNaN(+form.amount) || +form.amount <= 0)
      errs.amount = "Must be > 0";
    if (!form.date) errs.date = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  const inputClass = "w-full px-3 py-2.5 text-sm input-glass transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Description */}
      <div>
        <label
          htmlFor="tx-description"
          className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5 block"
        >
          Description
        </label>
        <div className="relative">
          <FileText
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40"
          />
          <input
            id="tx-description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="e.g. Monthly Salary"
            className={cn(inputClass, "pl-9")}
            data-ocid="transaction.description.input"
          />
        </div>
        {errors.description && (
          <p
            className="text-xs text-red-400 mt-1"
            data-ocid="transaction.description.error_state"
          >
            {errors.description}
          </p>
        )}
      </div>

      {/* Amount + Type */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="tx-amount"
            className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5 block"
          >
            Amount
          </label>
          <div className="relative">
            <DollarSign
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40"
            />
            <input
              id="tx-amount"
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: e.target.value }))
              }
              placeholder="0.00"
              className={cn(inputClass, "pl-9")}
              data-ocid="transaction.amount.input"
            />
          </div>
          {errors.amount && (
            <p
              className="text-xs text-red-400 mt-1"
              data-ocid="transaction.amount.error_state"
            >
              {errors.amount}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5">
            Type
          </p>
          <div
            className="flex rounded-lg overflow-hidden h-[41px]"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                data-ocid={`transaction.type.${t}.toggle`}
                className={`flex-1 text-xs font-semibold capitalize transition-all ${
                  form.type === t
                    ? t === "income"
                      ? "bg-green-500/25 text-green-300"
                      : "bg-red-500/25 text-red-300"
                    : "text-muted-foreground/50 hover:text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Date + Category */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="tx-date"
            className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5 block"
          >
            Date
          </label>
          <input
            id="tx-date"
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className={inputClass}
            data-ocid="transaction.date.input"
          />
          {errors.date && (
            <p
              className="text-xs text-red-400 mt-1"
              data-ocid="transaction.date.error_state"
            >
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="tx-category"
            className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1.5 block"
          >
            Category
          </label>
          <select
            id="tx-category"
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
            className={cn(inputClass, "appearance-none cursor-pointer")}
            data-ocid="transaction.category.select"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          data-ocid="transaction.cancel_button"
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground/70 hover:text-foreground transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-ocid="transaction.submit_button"
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            boxShadow: "0 0 20px rgba(59,130,246,0.3)",
          }}
        >
          {isEdit ? "Save Changes" : "Add Transaction"}
        </motion.button>
      </div>
    </form>
  );
}

export function AddTransactionModal() {
  const { isAddModalOpen, setAddModalOpen } = useUIStore();
  const { addTransaction } = useTransactionStore();

  function handleSubmit(data: FormState) {
    addTransaction({
      description: data.description,
      amount: +data.amount,
      date: data.date,
      category: data.category,
      type: data.type,
    });
    setAddModalOpen(false);
    toast.success("Transaction added successfully", { icon: "✅" });
  }

  return (
    <AnimatePresence>
      {isAddModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          data-ocid="transaction.modal"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 280 }}
            className="w-full max-w-md rounded-2xl p-6 relative"
            style={{
              background: "rgba(10,16,34,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-foreground/95">
                  Add Transaction
                </h2>
                <p className="text-xs text-muted-foreground/50 mt-0.5">
                  Enter transaction details below
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                data-ocid="transaction.close_button"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/8 transition-all"
              >
                <X size={15} />
              </button>
            </div>
            <TransactionForm
              onSubmit={handleSubmit}
              onClose={() => setAddModalOpen(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function EditTransactionModal() {
  const {
    isEditModalOpen,
    editingTransaction,
    setEditModalOpen,
    setEditingTransaction,
  } = useUIStore();
  const { updateTransaction } = useTransactionStore();

  function handleSubmit(data: FormState) {
    if (!editingTransaction) return;
    updateTransaction(editingTransaction.id, {
      description: data.description,
      amount: +data.amount,
      date: data.date,
      category: data.category,
      type: data.type,
    });
    setEditModalOpen(false);
    setEditingTransaction(null);
    toast.success("Transaction updated", { icon: "✏️" });
  }

  if (!editingTransaction) return null;

  const initial: FormState = {
    description: editingTransaction.description,
    amount: editingTransaction.amount.toString(),
    date: editingTransaction.date,
    category: editingTransaction.category,
    type: editingTransaction.type,
  };

  return (
    <AnimatePresence>
      {isEditModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          data-ocid="transaction.edit.modal"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 280 }}
            className="w-full max-w-md rounded-2xl p-6 relative"
            style={{
              background: "rgba(10,16,34,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-foreground/95">
                  Edit Transaction
                </h2>
                <p className="text-xs text-muted-foreground/50 mt-0.5">
                  Update the transaction details
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditModalOpen(false);
                  setEditingTransaction(null);
                }}
                data-ocid="transaction.edit.close_button"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-white/8 transition-all"
              >
                <X size={15} />
              </button>
            </div>
            <TransactionForm
              initial={initial}
              onSubmit={handleSubmit}
              onClose={() => {
                setEditModalOpen(false);
                setEditingTransaction(null);
              }}
              isEdit
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
