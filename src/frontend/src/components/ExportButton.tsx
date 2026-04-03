import {
  ChevronDown,
  Download,
  FileJson,
  FileText,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Transaction } from "../data/transactions";
import { useRoleStore } from "../store/useRoleStore";
import { useUIStore } from "../store/useUIStore";
import { exportToCSV, exportToJSON } from "../utils/exportData";

interface ExportButtonProps {
  transactions: Transaction[];
}

export default function ExportButton({ transactions }: ExportButtonProps) {
  const { isAdmin } = useRoleStore();
  const { isExporting, setExporting } = useUIStore();
  const [open, setOpen] = useState(false);

  if (!isAdmin) return null;

  async function handleExport(format: "csv" | "json") {
    setOpen(false);
    setExporting(true);
    await new Promise((r) => setTimeout(r, 400));

    const filename = `synapse_transactions_${new Date().toISOString().slice(0, 10)}`;
    if (format === "csv") {
      exportToCSV(transactions, filename);
      toast.success("Exported as CSV", { icon: "📊" });
    } else {
      exportToJSON(transactions, filename);
      toast.success("Exported as JSON", { icon: "📦" });
    }
    setExporting(false);
  }

  return (
    <div className="relative" data-ocid="export.button">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
          border: "1px solid rgba(59,130,246,0.3)",
          color: "#93c5fd",
        }}
        data-ocid="export.open_modal_button"
      >
        {isExporting ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Download size={14} />
        )}
        Export
        <ChevronDown
          size={13}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
              role="button"
              tabIndex={-1}
              aria-label="Close export menu"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden z-50"
              style={{
                background: "rgba(10,16,34,0.97)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              }}
              data-ocid="export.dropdown_menu"
            >
              <button
                type="button"
                onClick={() => handleExport("csv")}
                data-ocid="export.csv.button"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground/80 hover:text-foreground hover:bg-white/5 transition-all"
              >
                <FileText size={14} className="text-green-400" />
                Export as CSV
              </button>
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
              <button
                type="button"
                onClick={() => handleExport("json")}
                data-ocid="export.json.button"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground/80 hover:text-foreground hover:bg-white/5 transition-all"
              >
                <FileJson size={14} className="text-amber-400" />
                Export as JSON
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
