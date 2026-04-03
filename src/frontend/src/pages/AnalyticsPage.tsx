import {
  AlertTriangle,
  Award,
  BarChart3,
  LineChart,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import {
  AnimatedChartCard,
  CategoryPieChart,
  MonthlyBarChart,
  SpendingTrendChart,
} from "../components/AnimatedChartCard";
import InsightCard from "../components/InsightCard";
import { useAnalytics } from "../hooks/useAnalytics";
import { useTransactionStore } from "../store/useTransactionStore";

export default function AnalyticsPage() {
  const { transactions } = useTransactionStore();
  const analytics = useAnalytics(transactions);

  const avgMonthlyExpense =
    analytics.monthlyTotals.length > 0
      ? analytics.monthlyTotals.reduce((s, m) => s + m.expenses, 0) /
        analytics.monthlyTotals.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
      data-ocid="analytics.page"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(168,85,247,0.12)",
            border: "1px solid rgba(168,85,247,0.2)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <LineChart size={16} className="text-violet-400" />
        </div>
        <div>
          <h1
            className="text-xl font-bold"
            style={{ color: "rgba(234,240,255,0.95)" }}
          >
            Analytics
          </h1>
          <p className="text-xs" style={{ color: "rgba(111,122,150,0.7)" }}>
            Deep insights into your financial patterns
          </p>
        </div>
      </div>

      {/* Key insights */}
      <section data-ocid="analytics.insights.section">
        <div className="section-label">
          <Sparkles size={12} style={{ color: "rgba(166,176,198,0.4)" }} />
          <span className="section-label-text">Key Insights</span>
          <div className="section-label-line" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <InsightCard
            title="Top Spender"
            value={analytics.topCategory?.category || "N/A"}
            description={`$${(analytics.topCategory?.total || 0).toLocaleString()} — ${analytics.topCategory?.percentage || 0}% of all expenses`}
            variant="info"
            icon={<Award size={15} />}
            delay={0.05}
          />
          {analytics.hasUnusualSpike && analytics.spikeData && (
            <InsightCard
              title="Unusual Spike"
              value={`$${analytics.spikeData.amount.toLocaleString()}`}
              description={`Spending spike detected in ${analytics.spikeData.month} — 50%+ above average`}
              variant="warning"
              icon={<AlertTriangle size={15} />}
              delay={0.12}
            />
          )}
          <InsightCard
            title="Avg Monthly Expense"
            value={`$${Math.round(avgMonthlyExpense).toLocaleString()}`}
            description="Average monthly spending over the last 12 months"
            variant="highlight"
            icon={<Target size={15} />}
            delay={0.18}
          />
          <InsightCard
            title="Most Active"
            value={analytics.mostActiveCategory?.category || "N/A"}
            description={`${analytics.mostActiveCategory?.count || 0} transactions in this category`}
            variant="success"
            icon={<TrendingUp size={15} />}
            delay={0.25}
          />
        </div>
      </section>

      {/* Monthly comparison charts */}
      <section data-ocid="analytics.charts.section">
        <div className="section-label">
          <BarChart3 size={12} style={{ color: "rgba(166,176,198,0.4)" }} />
          <span className="section-label-text">Monthly Breakdown</span>
          <div className="section-label-line" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedChartCard
            title="Monthly Income vs Expenses"
            subtitle="Side-by-side comparison over 12 months"
            accentClass="chart-accent-cyan"
            delay={0.1}
          >
            <MonthlyBarChart data={analytics.monthlyTotals} />
          </AnimatedChartCard>

          <AnimatedChartCard
            title="Category Distribution"
            subtitle="Where your money goes"
            accentClass="chart-accent-purple"
            delay={0.15}
          >
            <CategoryPieChart data={analytics.spendingByCategory} />
          </AnimatedChartCard>
        </div>
      </section>

      {/* Trend chart */}
      <AnimatedChartCard
        title="Net Savings vs Spending Trend"
        subtitle="12-month overview — green = net savings, red = expenses"
        accentClass="chart-accent-green"
        delay={0.2}
      >
        <SpendingTrendChart data={analytics.monthlyTotals} />
      </AnimatedChartCard>

      {/* Category deep dive */}
      <AnimatedChartCard
        title="Category Deep Dive"
        subtitle="Full breakdown by spending category"
        accentClass="chart-accent-blue"
        delay={0.25}
      >
        <div className="space-y-3.5 mt-2">
          {analytics.spendingByCategory.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              className="flex items-center gap-4"
              data-ocid={`analytics.category.item.${i + 1}`}
            >
              <div
                className="w-28 text-xs font-medium truncate"
                style={{ color: "rgba(166,176,198,0.75)" }}
              >
                {cat.category}
              </div>
              <div
                className="flex-1 relative h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.percentage}%` }}
                  transition={{
                    delay: i * 0.05 + 0.4,
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                    opacity: Math.max(0.45, 1 - i * 0.07),
                  }}
                />
              </div>
              <div className="text-right w-20">
                <span
                  className="text-sm font-semibold tabular-nums"
                  style={{ color: "rgba(234,240,255,0.88)" }}
                >
                  ${cat.total.toLocaleString()}
                </span>
              </div>
              <div className="w-10 text-right">
                <span
                  className="text-xs"
                  style={{ color: "rgba(111,122,150,0.7)" }}
                >
                  {cat.percentage}%
                </span>
              </div>
              <div className="w-16 text-right">
                <span
                  className="text-xs"
                  style={{ color: "rgba(111,122,150,0.5)" }}
                >
                  {cat.count} txn{cat.count !== 1 ? "s" : ""}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedChartCard>
    </motion.div>
  );
}
