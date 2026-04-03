import {
  ArrowRightLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  Settings,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import RoleSwitcher from "./RoleSwitcher";

type Page = "dashboard" | "transactions" | "analytics";

const navItems = [
  { id: "dashboard" as Page, label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics" as Page, label: "Analytics", icon: LineChart },
  { id: "transactions" as Page, label: "Transactions", icon: ArrowRightLeft },
];

const bottomNavItems = [
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings },
  { label: "Help", icon: HelpCircle },
];

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-sidebar fixed left-0 top-0 h-full w-60 flex flex-col z-40"
      data-ocid="sidebar.panel"
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
              boxShadow: "0 0 20px rgba(59,130,246,0.4)",
            }}
          >
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div
              className="font-bold text-base tracking-widest"
              style={{
                background: "linear-gradient(135deg, #37D6FF, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SYNAPSE
            </div>
            <div className="text-xs text-muted-foreground/60 tracking-wide">
              Finance OS
            </div>
          </div>
        </div>
      </div>

      <div
        className="mx-4 h-px mb-4"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* Nav label */}
      <div className="px-5 mb-2">
        <span className="text-xs font-semibold tracking-widest text-muted-foreground/50 uppercase">
          Main
        </span>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-3 space-y-1" data-ocid="sidebar.list">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 + 0.2 }}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate(item.id)}
              data-ocid={`sidebar.${item.id}.link`}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "nav-item-active text-white"
                  : "text-muted-foreground/70 hover:text-foreground hover:bg-white/5",
              )}
            >
              <Icon
                size={17}
                className={cn(
                  "transition-colors",
                  isActive ? "text-blue-400" : "group-hover:text-blue-300/70",
                )}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && (
                <ChevronRight size={12} className="text-blue-400/60" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 mb-3 space-y-1">
        <div
          className="mx-2 h-px mb-2"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground/50 hover:text-muted-foreground/80 hover:bg-white/5 transition-all"
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Role Switcher */}
      <div className="px-3 pb-5">
        <RoleSwitcher />
      </div>
    </motion.aside>
  );
}
