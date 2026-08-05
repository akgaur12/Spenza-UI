import { MonthlySpendingTrendsChart } from '@/features/analytics/components/monthly-spending-trends-chart'
import { WeekdaySpendingChart } from '@/features/analytics/components/weekday-spending-chart'

/** Fixed-scope pattern charts (current year / current month) — deliberately not affected by the global filter bar. */
export function SpendingPatternsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <MonthlySpendingTrendsChart />
      <WeekdaySpendingChart />
    </div>
  )
}
