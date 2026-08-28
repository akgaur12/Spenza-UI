import { format } from 'date-fns'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { DateRangeParams } from '@/features/admin/components/ai-assistant-tab/date-range-preset-select'
import { useAiAssistantUsageTimeseries } from '@/features/admin/hooks/use-ai-assistant-stats'
import { ChartWrapper } from '@/features/analytics/components/chart-wrapper'
import type { AIAssistantUsageBucket } from '@/features/admin/types'
import type { TrendInterval } from '@/features/analytics/types'

const INTERVAL_TABS: { value: TrendInterval; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]

/** Short, human labels instead of the backend's raw ISO period string (e.g. "2026-08-27"). */
function formatBucketLabel(bucket: AIAssistantUsageBucket, interval: TrendInterval): string {
  const date = new Date(`${bucket.start_date}T00:00:00`)
  switch (interval) {
    case 'daily':
    case 'weekly':
      return format(date, 'MMM d')
    case 'monthly':
      return format(date, 'MMM')
    case 'yearly':
      return format(date, 'yyyy')
  }
}

interface UsageTimeseriesChartProps {
  userId: string | null
  dateRange: DateRangeParams
}

export function UsageTimeseriesChart({ userId, dateRange }: UsageTimeseriesChartProps) {
  const [interval, setInterval] = useState<TrendInterval>('daily')
  const { data, isPending, isError, refetch } = useAiAssistantUsageTimeseries({
    interval,
    ...dateRange,
    user_id: userId ?? undefined,
  })

  const chartData = data?.data.map((bucket) => ({ label: formatBucketLabel(bucket, interval), messages: bucket.messages_sent })) ?? []

  return (
    <ChartWrapper
      title="Messages Sent"
      compactHeader
      action={
        <Tabs value={interval} onValueChange={(value) => setInterval(value as TrendInterval)}>
          <TabsList>
            {INTERVAL_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="px-1.5 text-xs sm:px-2 sm:text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      }
      isPending={isPending}
      isError={isError}
      onRetry={refetch}
      errorMessage="Unable to load usage over time."
      isEmpty={chartData.every((point) => point.messages === 0)}
      emptyMessage="No messages sent in this window yet."
      skeleton={<div className="h-[280px] w-full animate-pulse rounded-lg bg-accent/60" />}
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} allowDecimals={false} />
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
            formatter={(value) => [Number(value).toLocaleString(), 'Messages']}
          />
          <Bar dataKey="messages" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}
