import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useCountUp } from "../hooks/useCountUp";
import { cn } from "../lib/utils";

type GlowColor = "cyan" | "purple" | "green" | "blue";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change?: number;
  changeLabel?: string;
  glow?: GlowColor;
  delay?: number;
}

const glowMap: Record<GlowColor, string> = {
  cyan: "card-glow-cyan",
  purple: "card-glow-purple",
  green: "card-glow-green",
  blue: "card-glow-blue",
};

// Each accent color tints the primary stat value for instant visual differentiation
const valueColorMap: Record<GlowColor, string> = {
  cyan: "#37D6FF",
  purple: "#C084FC",
  green: "#4ADE80",
  blue: "#60A5FA",
};

export default function StatCard({
  title,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  change,
  changeLabel,
  glow = "blue",
  delay = 0,
}: StatCardProps) {
  const { value: displayValue, ref } = useCountUp(
    value,
    1800,
    decimals,
    prefix,
  );

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const accentColor = valueColorMap[glow];

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.1)",
        transition: { duration: 0.2 },
      }}
      className={cn(
        "relative overflow-hidden rounded-xl p-5 glass-card cursor-default",
        glowMap[glow],
      )}
      style={{
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
      data-ocid="dashboard.stat.card"
    >
      <div className="relative z-10">
        {/* Title row with a tiny accent dot */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: accentColor,
              boxShadow: `0 0 6px ${accentColor}`,
            }}
          />
          <p
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(166,176,198,0.55)" }}
          >
            {title}
          </p>
        </div>

        {/* Value — colored to match accent */}
        <div className="mb-2">
          <span className="stat-value" style={{ color: accentColor }}>
            {displayValue}
          </span>
          {suffix && (
            <span
              className="text-base font-semibold ml-1"
              style={{ color: accentColor, opacity: 0.75 }}
            >
              {suffix}
            </span>
          )}
        </div>

        {/* Change pill + label — stacked below value */}
        <div className="flex items-center gap-2">
          {change !== undefined && (
            <div
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
                isPositive
                  ? "bg-green-500/15 text-green-400"
                  : isNegative
                    ? "bg-red-500/15 text-red-400"
                    : "bg-white/6 text-muted-foreground/60",
              )}
            >
              {isPositive ? (
                <TrendingUp size={10} />
              ) : isNegative ? (
                <TrendingDown size={10} />
              ) : (
                <Minus size={10} />
              )}
              {change > 0 ? "+" : ""}
              {change.toFixed(1)}%
            </div>
          )}
          {changeLabel && (
            <span
              className="text-xs"
              style={{ color: "rgba(166,176,198,0.38)" }}
            >
              {changeLabel}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
