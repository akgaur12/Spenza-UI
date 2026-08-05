import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartWrapper } from '@/features/analytics/components/chart-wrapper'
import { YearSelector } from '@/features/analytics/components/year-selector'
import { useTrendAnalytics } from '@/features/analytics/hooks/use-trend-analytics'
import { viridisScale } from '@/features/analytics/utils/viridis'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatCurrency } from '@/lib/format'

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
/** date-fns getDay() is 0=Sunday..6=Saturday — reorder to Monday-first to match the reference chart. */
const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0]

/** Aggregates a single calendar year (defaults to the current one) by day-of-week — deliberately independent of the page's global filter. */
export function WeekdaySpendingChart() {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const [year, setYear] = useState(() => new Date().getFullYear())

  const trendQuery = useTrendAnalytics({
    interval: 'daily',
    start_date: `${year}-01-01`,
    end_date: `${year}-12-31`,
  })

  const data = useMemo(() => {
    const totals = new Array(7).fill(0)
    trendQuery.data?.data.forEach((point) => {
      totals[new Date(point.period).getDay()] += Number(point.total)
    })
    return WEEKDAY_ORDER.map((dayIndex, index) => ({ label: WEEKDAY_LABELS[index], total: totals[dayIndex] }))
  }, [trendQuery.data])

  const colors = viridisScale(data.length)
  const isEmpty = data.every((point) => point.total === 0)

  return (
    <ChartWrapper
      title="Weekday Spending Trends"
      compactHeader
      action={<YearSelector year={year} onChange={setYear} />}
      isPending={trendQuery.isPending}
      isError={trendQuery.isError}
      onRetry={trendQuery.refetch}
      errorMessage="Unable to load weekday spending trends."
      isEmpty={!trendQuery.isPending && !trendQuery.isError && isEmpty}
      emptyMessage="No spending recorded this year yet."
      skeleton={<div className="h-[320px] w-full animate-pulse rounded-lg bg-accent/60" />}
    >
      <ResponsiveContainer width="100%" height={isMobile ? 280 : 340}>
        <BarChart data={data} margin={{ left: isMobile ? 0 : 4, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
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
            formatter={(value: unknown) => formatCurrency(Number(value))}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {data.map((point, index) => (
              <Cell key={point.label} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}
