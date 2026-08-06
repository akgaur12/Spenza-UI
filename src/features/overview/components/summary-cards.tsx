import { CalendarDays, CalendarRange, Minus, Receipt, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionError } from '@/components/common/section-error'
import { useDashboardSummary } from '@/features/dashboard/hooks/use-dashboard-summary'
import type { MonthTrend } from '@/features/dashboard/types'
import { FeaturedSummaryCard } from '@/features/overview/components/featured-summary-card'
import { SummaryCard } from '@/features/overview/components/summary-card'
import { SummarySkeleton } from '@/features/overview/components/summary-skeleton'
import { formatCurrency } from '@/lib/format'

const MONTH_TREND_ICON: Record<MonthTrend, LucideIcon> = {
  up: TrendingUp,
  down: TrendingDown,
  same: Minus,
}

function expenseCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'expense' : 'expenses'}`
}

export function SummaryCards() {
  const summaryQuery = useDashboardSummary()

  if (summaryQuery.isPending) return <SummarySkeleton />
  if (summaryQuery.isError) {
    return <SectionError message="Unable to load your spending summary." onRetry={() => summaryQuery.refetch()} />
  }

  const { today, this_week, this_month, this_year, month_comparison } = summaryQuery.data

  const monthTrendLabel =
    month_comparison.percentage_change !== null
      ? `${Math.abs(month_comparison.percentage_change).toFixed(1)}% vs last month`
      : month_comparison.trend !== 'same'
        ? 'vs last month'
        : null

  const monthCard = {
    title: 'This Month',
    icon: MONTH_TREND_ICON[month_comparison.trend],
    amount: formatCurrency(this_month.total),
    meta: expenseCountLabel(this_month.expense_count),
    trend: monthTrendLabel ? { direction: month_comparison.trend, label: monthTrendLabel } : undefined,
  }

  const todayCard = {
    id: 'today',
    title: "Today's Spending",
    icon: Wallet,
    amount: formatCurrency(today.total),
    meta: expenseCountLabel(today.expense_count),
  }
  const weekCard = {
    id: 'week',
    title: 'This Week',
    icon: CalendarDays,
    amount: formatCurrency(this_week.total),
    meta: expenseCountLabel(this_week.expense_count),
  }
  const yearCard = {
    id: 'year',
    title: 'This Year',
    icon: CalendarRange,
    amount: formatCurrency(this_year.total),
    meta: expenseCountLabel(this_year.expense_count),
  }
  const avgDailyCard = {
    id: 'avg-daily',
    title: 'Average Daily Spending',
    icon: Receipt,
    amount: formatCurrency(this_month.daily_average),
    meta: 'Avg / day this month',
  }

  const restCards = [todayCard, weekCard, yearCard, avgDailyCard]

  return (
    <>
      {/* Mobile: This Month featured on top, the rest in a compact 2x2 grid */}
      <div className="space-y-3 sm:hidden">
        <FeaturedSummaryCard {...monthCard} />
        <div className="grid grid-cols-2 gap-3">
          {restCards.map(({ id, ...card }) => (
            <SummaryCard key={id} {...card} />
          ))}
        </div>
      </div>

      {/* Tablet and up: a single row/grid of all five, in their natural order */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
        <SummaryCard {...todayCard} />
        <SummaryCard {...weekCard} />
        <SummaryCard {...monthCard} />
        <SummaryCard {...yearCard} />
        <SummaryCard {...avgDailyCard} />
      </div>
    </>
  )
}
