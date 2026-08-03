import { CalendarClock, Flame, Receipt, Tag } from 'lucide-react'
import { SectionError } from '@/components/common/section-error'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardSummary } from '@/features/dashboard/hooks/use-dashboard-summary'
import { InsightCard } from '@/features/overview/components/insight-card'
import { formatCurrency } from '@/lib/format'

export function InsightsSection() {
  const summaryQuery = useDashboardSummary()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Insights</CardTitle>
      </CardHeader>
      <CardContent>
        {summaryQuery.isPending ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-lg bg-accent/60" />
            ))}
          </div>
        ) : summaryQuery.isError ? (
          <SectionError message="Unable to load spending insights." onRetry={() => summaryQuery.refetch()} />
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <InsightCard
              icon={Tag}
              label="Top Category"
              value={summaryQuery.data.top_category?.name ?? 'No spending yet'}
              meta={
                summaryQuery.data.top_category
                  ? `${formatCurrency(summaryQuery.data.top_category.total)} · ${summaryQuery.data.top_category.percentage.toFixed(0)}%`
                  : undefined
              }
            />
            <InsightCard
              icon={Flame}
              label="Largest Expense"
              value={
                summaryQuery.data.largest_expense
                  ? formatCurrency(summaryQuery.data.largest_expense.amount)
                  : 'No spending yet'
              }
              meta={summaryQuery.data.largest_expense?.description}
            />
            <InsightCard
              icon={Receipt}
              label="Average Expense"
              value={formatCurrency(summaryQuery.data.this_month.average_expense)}
              meta="This month"
            />
            <InsightCard
              icon={CalendarClock}
              label="Average Daily Spending"
              value={formatCurrency(summaryQuery.data.this_month.daily_average)}
              meta="This month"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
