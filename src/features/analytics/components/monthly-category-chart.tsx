import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartWrapper } from '@/features/analytics/components/chart-wrapper'
import { useMonthlyCategorySpending } from '@/features/analytics/hooks/use-monthly-category-spending'
import { useCategories } from '@/features/categories/hooks/use-categories'
import { CategoryMultiCombobox } from '@/features/expenses/components/category-multi-combobox'
import { useDebounce } from '@/hooks/use-debounce'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatCurrency } from '@/lib/format'

interface MonthlyCategoryChartProps {
  startDate: string
  endDate: string
}

const tooltipStyle = {
  cursor: { fill: 'var(--accent)', opacity: 0.4 },
  contentStyle: {
    background: 'var(--popover)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 12,
  },
  labelStyle: { color: 'var(--popover-foreground)' },
  itemStyle: { color: 'var(--popover-foreground)' },
  formatter: (value: unknown) => formatCurrency(Number(value)),
}

export function MonthlyCategoryChart({ startDate, endDate }: MonthlyCategoryChartProps) {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const navigate = useNavigate()
  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const [categorySearch, setCategorySearch] = useState('')
  const debouncedCategorySearch = useDebounce(categorySearch, 250)
  const categoriesQuery = useCategories({ search: debouncedCategorySearch || undefined })
  const monthly = useMonthlyCategorySpending(startDate, endDate, categoryIds)

  const isEmpty = monthly.data.every((point) =>
    monthly.series.every((series) => !point[series.key] || Number(point[series.key]) === 0),
  )
  // A single month bucket (e.g. "Today"/"This Month" filters) has nothing to stack or group against
  // on a shared x-axis — show a ranked horizontal bar per category instead.
  const singleMonth = monthly.data.length === 1

  const singlePeriodRows = singleMonth
    ? monthly.series
        .map((series) => ({ key: series.key, name: series.name, color: series.color, total: Number(monthly.data[0]?.[series.key] ?? 0) }))
        .filter((row) => row.total > 0)
        .sort((a, b) => b.total - a.total)
    : []

  function goToExpenses(startAt: string, endAt: string, categoryKey?: string) {
    if (isMobile) return
    navigate({
      to: '/expenses',
      search: { start_date: startAt, end_date: endAt, category_id: categoryKey === 'other' ? undefined : categoryKey },
    })
  }

  return (
    <ChartWrapper
      title="Monthly Category Spending"
      compactHeader
      action={
        <CategoryMultiCombobox
          categories={categoriesQuery.data?.items ?? []}
          search={categorySearch}
          onSearchChange={setCategorySearch}
          selectedIds={categoryIds}
          onChange={setCategoryIds}
          className="min-w-0 shrink"
        />
      }
      isPending={monthly.isPending}
      isError={monthly.isError}
      onRetry={monthly.refetch}
      errorMessage="Unable to load monthly category spending."
      isEmpty={!monthly.isPending && !monthly.isError && (monthly.data.length === 0 || isEmpty)}
      emptyMessage="No category spending in this range yet."
      skeleton={<div className="h-[300px] w-full animate-pulse rounded-lg bg-accent/60" />}
    >
      {monthly.truncatedMonths && (
        <p className="mb-2 text-xs text-muted-foreground">Showing the most recent 12 months in range.</p>
      )}
      {singleMonth ? (
        <ResponsiveContainer width="100%" height={Math.max(160, singlePeriodRows.length * 44)}>
          <BarChart
            data={singlePeriodRows}
            layout="vertical"
            margin={{ left: 8, right: 24, top: 8, bottom: 8 }}
            onClick={(state: { activeTooltipIndex?: number | string | null }) => {
              if (state?.activeTooltipIndex == null) return
              const row = singlePeriodRows[Number(state.activeTooltipIndex)]
              if (row) goToExpenses(monthly.data[0].start_date, monthly.data[0].end_date, row.key)
            }}
            className={isMobile ? undefined : 'cursor-pointer'}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              tickFormatter={(value: number) => formatCurrency(value)}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={isMobile ? 70 : 100}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="total" radius={[0, 4, 4, 0]} maxBarSize={28} fillOpacity={0.8}>
              {singlePeriodRows.map((row) => (
                <Cell key={row.key} fill={row.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={isMobile ? 260 : 320}>
          <BarChart
            data={monthly.data}
            margin={{ left: isMobile ? 0 : 4, right: 8, top: 8 }}
            onClick={(state: { activeTooltipIndex?: number | string | null }) => {
              if (state?.activeTooltipIndex == null) return
              const point = monthly.data[Number(state.activeTooltipIndex)]
              if (point) goToExpenses(point.start_date, point.end_date)
            }}
            className={isMobile ? undefined : 'cursor-pointer'}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
            <YAxis
              hide={isMobile}
              tickLine={false}
              axisLine={false}
              width={56}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              tickFormatter={(value: number) => formatCurrency(value)}
            />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'var(--muted-foreground)' }} />
            {monthly.series.map((series) => (
              <Bar
                key={series.key}
                dataKey={series.key}
                name={series.name}
                stackId="categories"
                fill={series.color}
                fillOpacity={0.8}
                maxBarSize={48}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartWrapper>
  )
}
