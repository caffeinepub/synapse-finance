import {
  AlertCircle,
  ArrowRight,
  Award,
  ChevronRight,
  Clock,
  LayoutGrid,
  Plus,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Suspense, lazy } from "react";
import {
  AnimatedChartCard,
  CategoryPieChart,
  PortfolioAreaChart,
} from "../components/AnimatedChartCard";
import InsightCard from "../components/InsightCard";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionTable";
import { useAnalytics } from "../hooks/useAnalytics";
import { useRoleStore } from "../store/useRoleStore";
import { useTransactionStore } from "../store/useTransactionStore";
import { useUIStore } from "../store/useUIStore";

const HeroScene = lazy(() => import("../three/HeroScene"));

type Page = "dashboard" | "transactions" | "analytics";

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { transactions, deleteTransaction } = useTransactionStore();
  const { isAdmin } = useRoleStore();
  const { setAddModalOpen, setEditModalOpen, setEditingTransaction } =
    useUIStore();
  const analytics = useAnalytics(transactions);

  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const incomeChange =
    analytics.prevMonthExpenses > 0
      ? ((analytics.currentMonthExpenses - analytics.prevMonthExpenses) /
          analytics.prevMonthExpenses) *
        100
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
      data-ocid="dashboard.page"
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative rounded-3xl overflow-hidden min-h-[320px] flex items-center"
        data-ocid="dashboard.hero.section"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,16,40,0.95) 0%, rgba(15,25,60,0.9) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 70px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(168,85,247,0.06) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 flex items-center w-full">
          <div className="flex-1 px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-5"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  color: "#60a5fa",
                }}
              >
                <Zap size={11} />
                Next-Gen Finance
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hero-headline text-foreground/95 mb-4"
            >
              Financial
              <br />
              <span className="gradient-text">Intelligence</span>
              <br />
              Redefined.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm leading-relaxed mb-8 max-w-sm"
              style={{ color: "rgba(166,176,198,0.65)" }}
            >
              AI-powered analytics, real-time insights, and precision portfolio
              tracking — engineered for the modern investor.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                type="button"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 30px rgba(59,130,246,0.45)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("analytics")}
                data-ocid="dashboard.analytics.primary_button"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  boxShadow: "0 0 20px rgba(59,130,246,0.25)",
                }}
              >
                View Analytics
                <ArrowRight size={15} />
              </motion.button>

              {isAdmin && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setAddModalOpen(true)}
                  data-ocid="dashboard.add_transaction.secondary_button"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#EAF0FF",
                  }}
                >
                  <Plus size={15} />
                  Add Transaction
                </motion.button>
              )}
            </motion.div>
          </div>

          <div className="hidden lg:block w-80 xl:w-96 h-72 flex-shrink-0">
            <Suspense fallback={<div className="w-full h-full" />}>
              <HeroScene />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── Overview stats ───────────────────────────────────────────────── */}
      <section data-ocid="dashboard.stats.section">
        <div className="section-label">
          <LayoutGrid size={12} style={{ color: "rgba(166,176,198,0.4)" }} />
          <span className="section-label-text">Overview</span>
          <div className="section-label-line" />
        </div>
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            title="Total Income"
            value={analytics.totalIncome}
            prefix="$"
            change={8.2}
            changeLabel="vs last 12 months"
            glow="cyan"
            delay={0}
          />
          <StatCard
            title="Total Expenses"
            value={analytics.totalExpenses}
            prefix="$"
            change={-incomeChange}
            changeLabel="vs last month"
            glow="purple"
            delay={0.08}
          />
          <StatCard
            title="Net Balance"
            value={analytics.netBalance}
            prefix="$"
            change={analytics.netBalance > 0 ? 12.5 : -5.2}
            changeLabel="this period"
            glow="green"
            delay={0.16}
          />
          <StatCard
            title="Savings Rate"
            value={analytics.savingsRate}
            suffix="%"
            change={analytics.savingsRate > 20 ? 3.1 : -2.4}
            changeLabel="of total income"
            glow="blue"
            delay={0.24}
          />
        </motion.div>
      </section>

      {/* ── Smart Insights ───────────────────────────────────────────────── */}
      <section data-ocid="dashboard.insights.section">
        <div className="section-label">
          <Sparkles size={12} style={{ color: "rgba(166,176,198,0.4)" }} />
          <span className="section-label-text">Smart Insights</span>
          <div className="section-label-line" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {analytics.topCategory && (
            <InsightCard
              title="Top Category"
              value={analytics.topCategory.category}
              description={`$${analytics.topCategory.total.toLocaleString()} (${analytics.topCategory.percentage}% of total spending)`}
              variant="info"
              icon={<Award size={15} />}
              delay={0.1}
            />
          )}
          {analytics.biggestExpense && (
            <InsightCard
              title="Largest Expense"
              value={`$${analytics.biggestExpense.amount.toLocaleString()}`}
              description={analytics.biggestExpense.description}
              variant="highlight"
              icon={<Target size={15} />}
              delay={0.18}
            />
          )}
          <InsightCard
            title="Spending Trend"
            value={
              analytics.spendingTrend === "up"
                ? "Spending Up"
                : analytics.spendingTrend === "down"
                  ? "Spending Down"
                  : "Stable"
            }
            description={
              analytics.spendingTrend === "stable"
                ? "Your spending is consistent this month."
                : `${
                    analytics.spendingTrend === "up" ? "Increased" : "Decreased"
                  } vs last month`
            }
            variant={
              analytics.spendingTrend === "up"
                ? "warning"
                : analytics.spendingTrend === "down"
                  ? "success"
                  : "info"
            }
            icon={
              analytics.spendingTrend === "up" ? (
                <TrendingUp size={15} />
              ) : analytics.spendingTrend === "down" ? (
                <TrendingDown size={15} />
              ) : (
                <AlertCircle size={15} />
              )
            }
            delay={0.26}
          />
        </div>
      </section>

      {/* ── Charts ───────────────────────────────────────────────────────── */}
      <section
        className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        data-ocid="dashboard.charts.section"
      >
        <AnimatedChartCard
          title="Portfolio Performance"
          subtitle="Income vs Expenses — last 12 months"
          className="lg:col-span-3"
          accentClass="chart-accent-cyan"
          delay={0.15}
        >
          <PortfolioAreaChart data={analytics.monthlyTotals} />
        </AnimatedChartCard>

        <AnimatedChartCard
          title="Category Breakdown"
          subtitle="Spending distribution"
          className="lg:col-span-2"
          accentClass="chart-accent-purple"
          delay={0.2}
        >
          <CategoryPieChart data={analytics.spendingByCategory} />
        </AnimatedChartCard>
      </section>

      {/* ── Recent Transactions ──────────────────────────────────────────── */}
      <section data-ocid="dashboard.recent.section">
        <div className="section-label">
          <Clock size={12} style={{ color: "rgba(166,176,198,0.4)" }} />
          <span className="section-label-text">Recent Transactions</span>
          <div className="section-label-line" />
          <motion.button
            type="button"
            whileHover={{ x: 2 }}
            onClick={() => onNavigate("transactions")}
            data-ocid="dashboard.view_all.link"
            className="flex items-center gap-1 text-xs font-medium transition-colors flex-shrink-0"
            style={{ color: "rgba(96,165,250,0.7)" }}
          >
            View all
            <ChevronRight size={13} />
          </motion.button>
        </div>
        <div
          className="rounded-2xl glass-card p-5"
          style={{
            boxShadow:
              "0 12px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <TransactionTable
            transactions={recentTransactions}
            isAdmin={isAdmin}
            onEdit={(t) => {
              setEditingTransaction(t);
              setEditModalOpen(true);
            }}
            onDelete={deleteTransaction}
            showPagination={false}
          />
        </div>
      </section>
    </motion.div>
  );
}
