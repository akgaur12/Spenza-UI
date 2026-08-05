import { useAddExpenseModal } from '@/features/expenses/components/add-expense-provider'
import { useExpenses } from '@/features/expenses/hooks/use-expenses'
import { SectionError } from '@/components/common/section-error'
import { AnalyticsFiltersBar } from '@/features/analytics/components/analytics-filters'
import { AnalyticsSummary } from '@/features/analytics/components/analytics-summary'
import { CalendarHeatmapCard } from '@/features/analytics/components/calendar-heatmap-card'
import { CategoryAnalysisSection } from '@/features/analytics/components/category-analysis-section'
import { EmptyAnalytics } from '@/features/analytics/components/empty-analytics'
import { InsightsSection } from '@/features/analytics/components/insights-section'
import { MonthlyCategoryChart } from '@/features/analytics/components/monthly-category-chart'
import { SpendingPatternsSection } from '@/features/analytics/components/spending-patterns-section'
import { TrendTabs } from '@/features/analytics/components/trend-tabs'
import { useAnalyticsFilters } from '@/features/analytics/hooks/use-analytics-filters'

/** Gates the page on whether the user has ever logged an expense — mirrors OverviewPage's convention. */
export function AnalyticsPage() {
  const { openAddExpenseModal } = useAddExpenseModal()
  const recentExpensesQuery = useExpenses({ page_size: 1 })
  const filters = useAnalyticsFilters()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>

      {recentExpensesQuery.isPending ? (
        <div className="h-24 animate-pulse rounded-lg bg-accent/60" />
      ) : recentExpensesQuery.isError ? (
        <SectionError message="Unable to load analytics." onRetry={() => recentExpensesQuery.refetch()} />
      ) : recentExpensesQuery.data.total === 0 ? (
        <EmptyAnalytics onAddExpense={openAddExpenseModal} />
      ) : (
        <>
          <AnalyticsFiltersBar filters={filters} />
          <AnalyticsSummary startDate={filters.dateRange.startDate} endDate={filters.dateRange.endDate} />
          <TrendTabs startDate={filters.dateRange.startDate} endDate={filters.dateRange.endDate} />
          <SpendingPatternsSection />
          <CategoryAnalysisSection startDate={filters.dateRange.startDate} endDate={filters.dateRange.endDate} />
          <MonthlyCategoryChart startDate={filters.dateRange.startDate} endDate={filters.dateRange.endDate} />
          <CalendarHeatmapCard />
          <InsightsSection startDate={filters.dateRange.startDate} endDate={filters.dateRange.endDate} />
        </>
      )}
    </div>
  )
}
