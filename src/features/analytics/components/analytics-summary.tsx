import { format } from 'date-fns'
import { CalendarClock, Flame, Receipt, Tag } from 'lucide-react'
import { SectionError } from '@/components/common/section-error'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalyticsCard } from '@/features/analytics/components/analytics-card'
import { AnalyticsSummarySkeleton } from '@/features/analytics/components/analytics-summary-skeleton'
import { useAnalyticsSummary } from '@/features/analytics/hooks/use-analytics-summary'
import { formatCurrency } from '@/lib/format'

interface AnalyticsSummaryProps {
  startDate: string
  endDate: string
}

export function AnalyticsSummary({ startDate, endDate }: AnalyticsSummaryProps) {
  const summaryQuery = useAnalyticsSummary({ start_date: startDate, end_date: endDate })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {summaryQuery.isPending ? (
          <AnalyticsSummarySkeleton />
        ) : summaryQuery.isError || !summaryQuery.data ? (
          <SectionError message="Unable to load the analytics summary." onRetry={summaryQuery.refetch} />
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <AnalyticsCard
              icon={CalendarClock}
              label="Average Daily Spending"
              value={`${formatCurrency(summaryQuery.data.averageDailySpending)}/day`}
              subtitle="Over selected range"
            />
            <AnalyticsCard
              icon={Flame}
              label="Highest Spending Day"
              value={
                summaryQuery.data.highestSpendingDay
                  ? formatCurrency(summaryQuery.data.highestSpendingDay.total)
                  : 'No spending yet'
              }
              subtitle={
                summaryQuery.data.highestSpendingDay
                  ? format(new Date(summaryQuery.data.highestSpendingDay.date), 'd MMM yyyy')
                  : undefined
              }
            />
            <AnalyticsCard
              icon={Receipt}
              label="Largest Expense"
              value={
                summaryQuery.data.largestExpense ? formatCurrency(summaryQuery.data.largestExpense.amount) : 'No spending yet'
              }
              subtitle={summaryQuery.data.largestExpense?.description}
            />
            <AnalyticsCard
              icon={Tag}
              label="Most Used Category"
              value={summaryQuery.data.mostUsedCategory?.name ?? 'No spending yet'}
              subtitle={
                summaryQuery.data.mostUsedCategory
                  ? `${summaryQuery.data.mostUsedCategory.expense_count} expenses`
                  : undefined
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
