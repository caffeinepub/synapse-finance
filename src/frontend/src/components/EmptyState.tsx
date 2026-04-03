import { Inbox, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useFilterStore } from "../store/useFilterStore";

interface EmptyStateProps {
  message?: string;
  showReset?: boolean;
}

export default function EmptyState({
  message = "No transactions found matching your filters.",
  showReset = true,
}: EmptyStateProps) {
  const { resetFilters } = useFilterStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="transactions.empty_state"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.15)",
        }}
      >
        <Inbox size={28} className="text-blue-400/60" />
      </motion.div>

      <h3 className="text-base font-semibold text-foreground/70 mb-2">
        No results found
      </h3>
      <p className="text-sm text-muted-foreground/50 max-w-xs mb-6">
        {message}
      </p>

      {showReset && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={resetFilters}
          data-ocid="filters.reset.button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.25)",
            color: "#60a5fa",
          }}
        >
          <RotateCcw size={14} />
          Clear all filters
        </motion.button>
      )}
    </motion.div>
  );
}
