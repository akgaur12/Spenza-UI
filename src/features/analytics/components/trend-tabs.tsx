import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartWrapper } from '@/features/analytics/components/chart-wrapper'
import { TrendChart } from '@/features/analytics/components/trend-chart'
import { useTrendAnalytics } from '@/features/analytics/hooks/use-trend-analytics'
import type { TrendDataPoint, TrendInterval } from '@/features/analytics/types'
import { trendPointToDateRange } from '@/features/analytics/utils/trend-period'
import { useMediaQuery } from '@/hooks/use-media-query'

const TABS: { value: TrendInterval; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]

interface TrendTabsProps {
  startDate: string
  endDate: string
}

export function TrendTabs({ startDate, endDate }: TrendTabsProps) {
  const [interval, setInterval] = useState<TrendInterval>('daily')
  const isMobile = useMediaQuery('(max-width: 639px)')
  const navigate = useNavigate()

  const trendQuery = useTrendAnalytics({ interval, start_date: startDate, end_date: endDate })

  function handlePointClick(point: TrendDataPoint) {
    const range = trendPointToDateRange(interval, point)
    navigate({ to: '/expenses', search: { start_date: range.start_date, end_date: range.end_date } })
  }

  return (
    <ChartWrapper
      title="Trend Analysis"
      compactHeader
      action={
        <Tabs value={interval} onValueChange={(value) => setInterval(value as TrendInterval)}>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="px-1.5 text-xs sm:px-2 sm:text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      }
      isPending={trendQuery.isPending}
      isError={trendQuery.isError}
      onRetry={trendQuery.refetch}
      errorMessage="Unable to load the spending trend."
      isEmpty={trendQuery.data?.expense_count === 0}
      emptyMessage="No spending in this range yet."
      skeleton={<div className="h-[300px] w-full animate-pulse rounded-lg bg-accent/60" />}
    >
      {trendQuery.data && (
        <TrendChart interval={interval} data={trendQuery.data.data} isMobile={isMobile} onPointClick={handlePointClick} />
      )}
    </ChartWrapper>
  )
}
