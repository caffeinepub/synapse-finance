import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "../lib/utils";

interface AnimatedChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  action?: React.ReactNode;
  /** CSS class for the colored top-accent bar (e.g. "chart-accent-cyan") */
  accentClass?: string;
}

export function AnimatedChartCard({
  title,
  subtitle,
  children,
  className,
  delay = 0,
  action,
  accentClass,
}: AnimatedChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative rounded-2xl p-6 glass-card overflow-hidden",
        accentClass,
        className,
      )}
      style={{
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3
            className="text-sm font-semibold"
            style={{ color: "rgba(234,240,255,0.9)" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(111,122,150,0.8)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </motion.div>
  );
}

const TOOLTIP_STYLE = {
  backgroundColor: "rgba(8,12,28,0.98)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#EAF0FF",
  fontSize: "12px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
};

const GRID_STYLE = {
  stroke: "rgba(255,255,255,0.05)",
  strokeDasharray: "3 3",
};

const AXIS_STYLE = {
  fill: "#5A6478",
  fontSize: 11,
};

interface AreaData {
  month: string;
  income: number;
  expenses: number;
}

export function PortfolioAreaChart({ data }: { data: AreaData[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#37D6FF" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#37D6FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#A855F7" stopOpacity={0.22} />
            <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...GRID_STYLE} vertical={false} />
        <XAxis
          dataKey="month"
          tick={AXIS_STYLE}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={AXIS_STYLE}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={42}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(val: number, name: string) => [
            `$${val.toLocaleString()}`,
            name === "income" ? "Income" : "Expenses",
          ]}
        />
        <Legend
          formatter={(v) => (v === "income" ? "Income" : "Expenses")}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, color: "#5A6478" }}
        />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#37D6FF"
          strokeWidth={2}
          fill="url(#incomeGrad)"
          isAnimationActive
          animationDuration={1400}
          animationEasing="ease-out"
          dot={false}
          activeDot={{ r: 4, fill: "#37D6FF", strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="#A855F7"
          strokeWidth={2}
          fill="url(#expGrad)"
          isAnimationActive
          animationDuration={1600}
          animationEasing="ease-out"
          dot={false}
          activeDot={{ r: 4, fill: "#A855F7", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const CATEGORY_COLORS = [
  "#37D6FF",
  "#A855F7",
  "#22C55E",
  "#F59E0B",
  "#3B82F6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
];

interface PieData {
  category: string;
  total: number;
  percentage: number;
}

export function CategoryPieChart({ data }: { data: PieData[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          dataKey="total"
          nameKey="category"
          paddingAngle={3}
          isAnimationActive
          animationBegin={200}
          animationDuration={1200}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.category}
              fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
              opacity={0.9}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(val: number, name: string) => [
            `$${val.toLocaleString()}`,
            name,
          ]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 10, color: "#5A6478" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MonthlyBarChart({ data }: { data: AreaData[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid {...GRID_STYLE} vertical={false} />
        <XAxis
          dataKey="month"
          tick={AXIS_STYLE}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={AXIS_STYLE}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={42}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(val: number, name: string) => [
            `$${val.toLocaleString()}`,
            name === "income" ? "Income" : "Expenses",
          ]}
        />
        <Legend
          formatter={(v) => (v === "income" ? "Income" : "Expenses")}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, color: "#5A6478" }}
        />
        <Bar
          dataKey="income"
          fill="#37D6FF"
          opacity={0.75}
          radius={[4, 4, 0, 0]}
          maxBarSize={22}
          isAnimationActive
          animationDuration={1200}
        />
        <Bar
          dataKey="expenses"
          fill="#A855F7"
          opacity={0.75}
          radius={[4, 4, 0, 0]}
          maxBarSize={22}
          isAnimationActive
          animationDuration={1400}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SpendingTrendChart({
  data,
}: {
  data: { month: string; expenses: number; net: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.22} />
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...GRID_STYLE} vertical={false} />
        <XAxis
          dataKey="month"
          tick={AXIS_STYLE}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={AXIS_STYLE}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={42}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(val: number, name: string) => [
            `$${val.toLocaleString()}`,
            name === "net" ? "Net Savings" : "Expenses",
          ]}
        />
        <Area
          type="monotone"
          dataKey="net"
          stroke="#22C55E"
          strokeWidth={2}
          fill="url(#netGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#22C55E", strokeWidth: 0 }}
          isAnimationActive
          animationDuration={1400}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="#EF4444"
          strokeWidth={1.5}
          fill="none"
          dot={false}
          activeDot={{ r: 3, fill: "#EF4444", strokeWidth: 0 }}
          isAnimationActive
          animationDuration={1600}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
