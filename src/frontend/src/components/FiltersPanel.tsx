import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { categories } from "../data/transactions";
import { cn } from "../lib/utils";
import { useFilterStore } from "../store/useFilterStore";

export default function FiltersPanel() {
  const [expanded, setExpanded] = useState(false);
  const {
    search,
    categories: selectedCats,
    dateRange,
    amountRange,
    sortBy,
    sortOrder,
    setSearch,
    toggleCategory,
    setDateRange,
    setAmountRange,
    setSortBy,
    setSortOrder,
    resetFilters,
  } = useFilterStore();

  const hasActiveFilters =
    search ||
    selectedCats.length > 0 ||
    dateRange.start ||
    dateRange.end ||
    amountRange.min !== null ||
    amountRange.max !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl glass-card overflow-hidden"
      data-ocid="filters.panel"
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 p-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-9 pr-4 py-2 text-sm input-glass"
            data-ocid="filters.search_input"
          />
        </div>

        {/* Filter toggle */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setExpanded((e) => !e)}
          data-ocid="filters.toggle"
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            expanded
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              : "glass-card text-muted-foreground/70 hover:text-foreground",
          )}
        >
          <SlidersHorizontal size={14} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#3B82F6" }}
            />
          )}
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </motion.button>

        {/* Reset */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              data-ocid="filters.reset.button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
            >
              <RotateCcw size={12} />
              Reset
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-5 pt-2 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Categories */}
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase mb-2">
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        data-ocid="filters.category.toggle"
                        className={cn(
                          "text-xs px-2.5 py-1 rounded-full transition-all font-medium",
                          selectedCats.includes(cat)
                            ? "bg-blue-500/25 text-blue-300 border border-blue-500/40"
                            : "glass-card text-muted-foreground/60 hover:text-foreground hover:bg-white/8",
                        )}
                      >
                        {cat}
                        {selectedCats.includes(cat) && (
                          <X size={9} className="inline ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date range */}
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase mb-2">
                    Date Range
                  </p>
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={dateRange.start || ""}
                      onChange={(e) =>
                        setDateRange({
                          ...dateRange,
                          start: e.target.value || null,
                        })
                      }
                      className="w-full px-3 py-2 text-xs input-glass"
                      data-ocid="filters.date_start.input"
                    />
                    <input
                      type="date"
                      value={dateRange.end || ""}
                      onChange={(e) =>
                        setDateRange({
                          ...dateRange,
                          end: e.target.value || null,
                        })
                      }
                      className="w-full px-3 py-2 text-xs input-glass"
                      data-ocid="filters.date_end.input"
                    />
                  </div>
                </div>

                {/* Amount range */}
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase mb-2">
                    Amount Range
                  </p>
                  <div className="space-y-2">
                    <input
                      type="number"
                      placeholder="Min amount"
                      value={amountRange.min ?? ""}
                      onChange={(e) =>
                        setAmountRange({
                          ...amountRange,
                          min: e.target.value ? +e.target.value : null,
                        })
                      }
                      className="w-full px-3 py-2 text-xs input-glass"
                      data-ocid="filters.amount_min.input"
                    />
                    <input
                      type="number"
                      placeholder="Max amount"
                      value={amountRange.max ?? ""}
                      onChange={(e) =>
                        setAmountRange({
                          ...amountRange,
                          max: e.target.value ? +e.target.value : null,
                        })
                      }
                      className="w-full px-3 py-2 text-xs input-glass"
                      data-ocid="filters.amount_max.input"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground/50 uppercase mb-2">
                    Sort By
                  </p>
                  <div className="space-y-2">
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value as "date" | "amount")
                      }
                      data-ocid="filters.sort_by.select"
                      className="w-full px-3 py-2 text-xs input-glass appearance-none cursor-pointer"
                    >
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                    </select>
                    <select
                      value={sortOrder}
                      onChange={(e) =>
                        setSortOrder(e.target.value as "asc" | "desc")
                      }
                      data-ocid="filters.sort_order.select"
                      className="w-full px-3 py-2 text-xs input-glass appearance-none cursor-pointer"
                    >
                      <option value="desc">Newest / Highest first</option>
                      <option value="asc">Oldest / Lowest first</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
