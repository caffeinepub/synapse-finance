import { format, parseISO, startOfMonth, subMonths } from "date-fns";
import { useMemo } from "react";
import type { Transaction } from "../data/transactions";

export interface CategorySpending {
  category: string;
  total: number;
  percentage: number;
  count: number;
}

export interface MonthlyTotal {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

export interface AnalyticsResult {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  savingsRate: number;
  spendingByCategory: CategorySpending[];
  monthlyTotals: MonthlyTotal[];
  topCategory: CategorySpending | null;
  biggestExpense: Transaction | null;
  spendingTrend: "up" | "down" | "stable";
  hasUnusualSpike: boolean;
  spikeData: { month: string; amount: number } | null;
  mostActiveCategory: CategorySpending | null;
  prevMonthExpenses: number;
  currentMonthExpenses: number;
}

export function useAnalytics(transactions: Transaction[]): AnalyticsResult {
  return useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const incomes = transactions.filter((t) => t.type === "income");

    const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);
    const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
    const netBalance = totalIncome - totalExpenses;
    const savingsRate =
      totalIncome > 0
        ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
        : 0;

    // Spending by category
    const catMap: Record<string, { total: number; count: number }> = {};
    for (const t of expenses) {
      if (!catMap[t.category]) catMap[t.category] = { total: 0, count: 0 };
      catMap[t.category].total += t.amount;
      catMap[t.category].count += 1;
    }
    const spendingByCategory: CategorySpending[] = Object.entries(catMap)
      .map(([category, { total, count }]) => ({
        category,
        total,
        count,
        percentage:
          totalExpenses > 0 ? Math.round((total / totalExpenses) * 100) : 0,
      }))
      .sort((a, b) => b.total - a.total);

    // Monthly totals (last 12 months)
    const monthlyTotals: MonthlyTotal[] = [];
    for (let i = 11; i >= 0; i--) {
      const monthDate = subMonths(new Date(), i);
      const monthKey = format(monthDate, "yyyy-MM");
      const monthLabel = format(monthDate, "MMM yy");

      const monthIncome = incomes
        .filter((t) => t.date.startsWith(monthKey))
        .reduce((s, t) => s + t.amount, 0);
      const monthExpenses = expenses
        .filter((t) => t.date.startsWith(monthKey))
        .reduce((s, t) => s + t.amount, 0);

      monthlyTotals.push({
        month: monthLabel,
        income: monthIncome,
        expenses: monthExpenses,
        net: monthIncome - monthExpenses,
      });
    }

    // Spending trend
    const currentMonthKey = format(new Date(), "yyyy-MM");
    const prevMonthKey = format(subMonths(new Date(), 1), "yyyy-MM");
    const currentMonthExpenses = expenses
      .filter((t) => t.date.startsWith(currentMonthKey))
      .reduce((s, t) => s + t.amount, 0);
    const prevMonthExpenses = expenses
      .filter((t) => t.date.startsWith(prevMonthKey))
      .reduce((s, t) => s + t.amount, 0);

    const spendingTrend: "up" | "down" | "stable" =
      prevMonthExpenses === 0
        ? "stable"
        : currentMonthExpenses > prevMonthExpenses * 1.1
          ? "up"
          : currentMonthExpenses < prevMonthExpenses * 0.9
            ? "down"
            : "stable";

    // Unusual spike detection
    const monthlyExpenseAmounts = monthlyTotals.map((m) => m.expenses);
    const avgMonthly =
      monthlyExpenseAmounts.reduce((s, v) => s + v, 0) /
      monthlyExpenseAmounts.length;
    const spikeMonth = monthlyTotals.find(
      (m) => m.expenses > avgMonthly * 1.5 && m.expenses > 0,
    );
    const hasUnusualSpike = !!spikeMonth;
    const spikeData = spikeMonth
      ? { month: spikeMonth.month, amount: spikeMonth.expenses }
      : null;

    // Biggest expense
    const biggestExpense =
      expenses.length > 0
        ? expenses.reduce((max, t) => (t.amount > max.amount ? t : max))
        : null;

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      savingsRate,
      spendingByCategory,
      monthlyTotals,
      topCategory: spendingByCategory[0] ?? null,
      biggestExpense,
      spendingTrend,
      hasUnusualSpike,
      spikeData,
      mostActiveCategory:
        spendingByCategory.sort((a, b) => b.count - a.count)[0] ?? null,
      prevMonthExpenses,
      currentMonthExpenses,
    };
  }, [transactions]);
}
