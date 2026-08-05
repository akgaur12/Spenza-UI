import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartWrapper } from '@/features/analytics/components/chart-wrapper'
import { YearSelector } from '@/features/analytics/components/year-selector'
import { useTrendAnalytics } from '@/features/analytics/hooks/use-trend-analytics'
import { trendPointToDateRange } from '@/features/analytics/utils/trend-period'
import { viridisScale } from '@/features/analytics/utils/viridis'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatCurrency } from '@/lib/format'

/** Shows a single calendar year (defaults to the current one) — deliberately independent of the page's global date-range filter. */
export function MonthlySpendingTrendsChart() {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const navigate = useNavigate()
  const [year, setYear] = useState(() => new Date().getFullYear())

  const trendQuery = useTrendAnalytics({
    interval: 'monthly',
    start_date: `${year}-01-01`,
    end_date: `${year}-12-31`,
  })
  const data = trendQuery.data?.data ?? []
  const colors = viridisScale(data.length)

  return (
    <ChartWrapper
      title="Monthly Spending Trends"
      compactHeader
      action={<YearSelector year={year} onChange={setYear} />}
      isPending={trendQuery.isPending}
      isError={trendQuery.isError}
      onRetry={trendQuery.refetch}
      errorMessage="Unable to load monthly spending trends."
      isEmpty={trendQuery.data?.expense_count === 0}
      emptyMessage="No spending recorded this year yet."
      skeleton={<div className="h-[320px] w-full animate-pulse rounded-lg bg-accent/60" />}
    >
      <ResponsiveContainer width="100%" height={isMobile ? 280 : 340}>
        <BarChart
          data={data}
          margin={{ left: isMobile ? 0 : 4, right: 8, top: 8, bottom: 8 }}
          onClick={(state: { activeTooltipIndex?: number | string | null }) => {
            if (state?.activeTooltipIndex == null) return
            const point = data[Number(state.activeTooltipIndex)]
            if (point) {
              const clickRange = trendPointToDateRange('monthly', point)
              navigate({ to: '/expenses', search: { start_date: clickRange.start_date, end_date: clickRange.end_date } })
            }
          }}
          className="cursor-pointer"
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="period"
            tickLine={false}
            axisLine={false}
            angle={-35}
            textAnchor="end"
            height={50}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            tickFormatter={(period: string) => format(new Date(`${period}-01`), 'MMM')}
          />
          <YAxis
            hide={isMobile}
            tickLine={false}
            axisLine={false}
            width={56}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            tickFormatter={(value: number) => formatCurrency(value)}
          />
          <Tooltip
            cursor={{ fill: 'var(--accent)', opacity: 0.4 }}
            contentStyle={{
              background: 'var(--popover)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12,
            }}
            labelStyle={{ color: 'var(--popover-foreground)' }}
            itemStyle={{ color: 'var(--popover-foreground)' }}
            labelFormatter={(period: unknown) => format(new Date(`${String(period)}-01`), 'MMM yyyy')}
            formatter={(value: unknown) => formatCurrency(Number(value))}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {data.map((point, index) => (
              <Cell key={point.period} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}
