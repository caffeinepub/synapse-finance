import { Bell, ChevronDown, Search, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

type Page = "dashboard" | "transactions" | "analytics";

const pageTitles: Record<Page, string> = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  analytics: "Analytics",
};

interface NavbarProps {
  currentPage: Page;
}

export default function Navbar({ currentPage }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header
      className="glass-navbar fixed top-0 left-60 right-0 h-14 flex items-center justify-between px-6 z-30"
      data-ocid="navbar.panel"
    >
      {/* Left: page title */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground/40 text-sm">Synapse /</span>
        <span className="text-foreground/90 text-sm font-semibold">
          {pageTitles[currentPage]}
        </span>
      </div>

      {/* Center/Right: search + actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <input
                  ref={inputRef}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                  placeholder="Search transactions..."
                  data-ocid="navbar.search_input"
                  className="w-full px-4 py-1.5 text-sm input-glass"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (searchOpen) {
                setSearchOpen(false);
                setSearchValue("");
              } else {
                setSearchOpen(true);
              }
            }}
            data-ocid="navbar.search_input"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/8 transition-all"
          >
            {searchOpen ? <X size={15} /> : <Search size={15} />}
          </motion.button>
        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-white/8 transition-all"
          data-ocid="navbar.bell.button"
        >
          <Bell size={15} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: "#3B82F6" }}
          />
        </motion.button>

        {/* User chip */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm hover:bg-white/8 transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          data-ocid="navbar.user.button"
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            }}
          >
            A
          </div>
          <span className="text-foreground/80 font-medium">Alex</span>
          <ChevronDown size={12} className="text-muted-foreground/50" />
        </motion.button>
      </div>
    </header>
  );
}
