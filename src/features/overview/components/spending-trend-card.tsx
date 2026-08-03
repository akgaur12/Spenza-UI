import { format, startOfMonth, subMonths } from 'date-fns'
import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { SectionError } from '@/components/common/section-error'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTrendAnalytics } from '@/features/analytics/hooks/use-trend-analytics'
import { ChartSkeleton } from '@/features/overview/components/chart-skeleton'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatCurrency } from '@/lib/format'

function formatMonthLabel(period: string): string {
  const [year, month] = period.split('-').map(Number)
  return format(new Date(year, month - 1, 1), 'MMM')
}

export function SpendingTrendCard() {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const range = useMemo(() => {
    const end = new Date()
    const start = startOfMonth(subMonths(end, 5))
    return {
      interval: 'monthly' as const,
      start_date: format(start, 'yyyy-MM-dd'),
      end_date: format(end, 'yyyy-MM-dd'),
    }
  }, [])

  const trendQuery = useTrendAnalytics(range)

  const chartData = trendQuery.data?.data.map((point) => ({
    label: formatMonthLabel(point.period),
    total: Number(point.total),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {trendQuery.isPending ? (
          <ChartSkeleton />
        ) : trendQuery.isError || !chartData ? (
          <SectionError message="Unable to load the spending trend." onRetry={() => trendQuery.refetch()} />
        ) : (
          <ResponsiveContainer width="100%" height={isMobile ? 220 : 260}>
            <BarChart data={chartData} margin={{ left: isMobile ? 0 : 4, right: 8, top: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
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
                cursor={{ fill: 'var(--accent)' }}
                contentStyle={{
                  background: 'var(--popover)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 12,
                }}
                labelStyle={{ color: 'var(--popover-foreground)' }}
                itemStyle={{ color: 'var(--popover-foreground)' }}
                formatter={(value) => formatCurrency(Number(value))}
              />
              <Bar
                dataKey="total"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {chartData.map((point, index) => (
                  <Cell
                    key={point.label}
                    fill="var(--primary)"
                    fillOpacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
