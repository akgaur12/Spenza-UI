import { format } from 'date-fns'
import { CalendarX, Layers, ListChecks, Receipt, TrendingUp, Wallet } from 'lucide-react'
import { SectionError } from '@/components/common/section-error'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuickInsights } from '@/features/analytics/hooks/use-quick-insights'
import { InsightCard } from '@/features/overview/components/insight-card'
import { formatCurrency } from '@/lib/format'

function formatMonthPeriod(period: string): string {
  return format(new Date(`${period}-01`), 'MMM yyyy')
}

function formatWeekPeriod(period: string): string {
  const [year, week] = period.split('-W')
  return `Week ${week}, ${year}`
}

interface InsightsSectionProps {
  startDate: string
  endDate: string
}

export function InsightsSection({ startDate, endDate }: InsightsSectionProps) {
  const insightsQuery = useQuickInsights({ start_date: startDate, end_date: endDate })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Insights</CardTitle>
      </CardHeader>
      <CardContent>
        {insightsQuery.isPending ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-lg bg-accent/60" />
            ))}
          </div>
        ) : insightsQuery.isError || !insightsQuery.data ? (
          <SectionError message="Unable to load quick insights." onRetry={insightsQuery.refetch} />
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            <InsightCard
              icon={TrendingUp}
              label="Highest Spending Month"
              value={
                insightsQuery.data.highestSpendingMonth
                  ? formatCurrency(insightsQuery.data.highestSpendingMonth.total)
                  : 'No spending yet'
              }
              meta={
                insightsQuery.data.highestSpendingMonth
                  ? formatMonthPeriod(insightsQuery.data.highestSpendingMonth.period)
                  : undefined
              }
            />
            <InsightCard
              icon={Layers}
              label="Highest Spending Week"
              value={
                insightsQuery.data.highestSpendingWeek
                  ? formatCurrency(insightsQuery.data.highestSpendingWeek.total)
                  : 'No spending yet'
              }
              meta={
                insightsQuery.data.highestSpendingWeek
                  ? formatWeekPeriod(insightsQuery.data.highestSpendingWeek.period)
                  : undefined
              }
            />
            <InsightCard
              icon={Wallet}
              label="Most Expensive Category"
              value={insightsQuery.data.mostExpensiveCategory?.name ?? 'No spending yet'}
              meta={
                insightsQuery.data.mostExpensiveCategory
                  ? formatCurrency(insightsQuery.data.mostExpensiveCategory.total)
                  : undefined
              }
            />
            <InsightCard
              icon={Receipt}
              label="Average Expense"
              value={`${formatCurrency(insightsQuery.data.averageExpense)}/expense`}
            />
            <InsightCard
              icon={ListChecks}
              label="Active Categories"
              value={String(insightsQuery.data.activeCategoryCount)}
              meta="With spending in range"
            />
            <InsightCard
              icon={CalendarX}
              label="Zero Spending Days"
              value={String(insightsQuery.data.zeroSpendingDays)}
              meta="Days with no expenses"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
