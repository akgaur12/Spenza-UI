import { SectionError } from '@/components/common/section-error'
import { useExpenses } from '@/features/expenses/hooks/use-expenses'
import { CategoryBreakdownCard } from '@/features/overview/components/category-breakdown-card'
import { CategorySkeleton } from '@/features/overview/components/category-skeleton'
import { ChartSkeleton } from '@/features/overview/components/chart-skeleton'
import { EmptyOverview } from '@/features/overview/components/empty-overview'
import { GreetingCard } from '@/features/overview/components/greeting-card'
import { InsightsSection } from '@/features/overview/components/insights-section'
import { QuickActionsCard } from '@/features/overview/components/quick-actions-card'
import { RecentExpensesSkeleton } from '@/features/overview/components/recent-expenses-skeleton'
import { RecentExpensesCard } from '@/features/overview/components/recent-expenses-card'
import { SpendingTrendCard } from '@/features/overview/components/spending-trend-card'
import { SummaryCards } from '@/features/overview/components/summary-cards'
import { SummarySkeleton } from '@/features/overview/components/summary-skeleton'

/** Gates the page on knowing whether the user has ever logged an expense — charts and tables must never render empty. */
export function OverviewPage() {
  const recentExpensesQuery = useExpenses({ page_size: 5 })

  if (recentExpensesQuery.isPending) {
    return (
      <div className="space-y-6">
        <GreetingCard />
        <SummarySkeleton />
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartSkeleton />
          <CategorySkeleton />
        </div>
        <RecentExpensesSkeleton />
      </div>
    )
  }

  if (recentExpensesQuery.isError) {
    return (
      <div className="space-y-6">
        <GreetingCard />
        <SectionError message="Unable to load your dashboard." onRetry={() => recentExpensesQuery.refetch()} />
      </div>
    )
  }

  if (recentExpensesQuery.data.total === 0) {
    return (
      <div className="space-y-6">
        <GreetingCard />
        <EmptyOverview />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <GreetingCard />
      <SummaryCards />
      <QuickActionsCard />
      <div className="grid gap-6 lg:grid-cols-2">
        <SpendingTrendCard />
        <CategoryBreakdownCard />
      </div>
      <InsightsSection />
      <RecentExpensesCard />
    </div>
  )
}
