import {
  AlertTriangle,
  Award,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

type InsightVariant = "info" | "warning" | "success" | "highlight";

interface InsightCardProps {
  title: string;
  value: string;
  description: string;
  variant?: InsightVariant;
  icon?: React.ReactNode;
  delay?: number;
}

const variantStyles: Record<
  InsightVariant,
  { border: string; icon: string; badge: string; glow: string }
> = {
  info: {
    border: "rgba(59,130,246,0.25)",
    icon: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-300",
    glow: "0 0 30px rgba(59,130,246,0.08)",
  },
  warning: {
    border: "rgba(245,158,11,0.25)",
    icon: "text-amber-400",
    badge: "bg-amber-500/15 text-amber-300",
    glow: "0 0 30px rgba(245,158,11,0.08)",
  },
  success: {
    border: "rgba(34,197,94,0.25)",
    icon: "text-green-400",
    badge: "bg-green-500/15 text-green-300",
    glow: "0 0 30px rgba(34,197,94,0.08)",
  },
  highlight: {
    border: "rgba(168,85,247,0.25)",
    icon: "text-violet-400",
    badge: "bg-violet-500/15 text-violet-300",
    glow: "0 0 30px rgba(168,85,247,0.08)",
  },
};

export default function InsightCard({
  title,
  value,
  description,
  variant = "info",
  icon,
  delay = 0,
}: InsightCardProps) {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="relative overflow-hidden rounded-xl p-5 glass-card flex-1"
      style={{
        border: `1px solid ${styles.border}`,
        boxShadow: `${styles.glow}, 0 12px 30px rgba(0,0,0,0.4)`,
      }}
      data-ocid="dashboard.insight.card"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            styles.badge,
          )}
        >
          <span className={styles.icon}>{icon || <Zap size={15} />}</span>
        </div>
        <div
          className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            styles.badge,
          )}
        >
          {title}
        </div>
      </div>

      <p className="text-xl font-bold text-foreground/95 mb-1 leading-tight">
        {value}
      </p>
      <p className="text-xs text-muted-foreground/60 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
