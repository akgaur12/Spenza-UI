import { ChartWrapper } from '@/features/analytics/components/chart-wrapper'
import { useAiAssistantOverview } from '@/features/admin/hooks/use-ai-assistant-stats'
import type { AIAssistantRunStatusCounts } from '@/features/admin/types'

/** Run outcome is a genuine good/bad state, so it wears the reserved status tokens (not arbitrary categorical hues) — completed=good, failed=critical, the rest neutral. */
const STATUS_META: { key: keyof AIAssistantRunStatusCounts; label: string; color: string }[] = [
  { key: 'completed', label: 'Completed', color: 'var(--success)' },
  { key: 'failed', label: 'Failed', color: 'var(--destructive)' },
  { key: 'running', label: 'Running', color: 'var(--muted-foreground)' },
  { key: 'queued', label: 'Queued', color: 'var(--muted-foreground)' },
  { key: 'cancelled', label: 'Cancelled', color: 'var(--muted-foreground)' },
]

interface RunStatusChartProps {
  userId: string | null
}

export function RunStatusChart({ userId }: RunStatusChartProps) {
  const { data, isLoading, isError, refetch } = useAiAssistantOverview({ user_id: userId ?? undefined })

  const counts = data?.runs_by_status
  const total = counts ? Object.values(counts).reduce((sum, value) => sum + value, 0) : 0
  const slices = counts
    ? STATUS_META.map((meta) => ({ ...meta, value: counts[meta.key] })).filter((slice) => slice.value > 0)
    : []

  return (
    <ChartWrapper
      title="Runs by Status"
      isPending={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Unable to load run status breakdown."
      isEmpty={total === 0}
      emptyMessage="No runs yet."
      skeleton={<div className="h-[220px] w-full animate-pulse rounded-lg bg-accent/60" />}
    >
      <div className="flex flex-1 -translate-y-4 flex-col justify-center space-y-5">
        <div className="flex h-8 gap-0.5 overflow-hidden rounded-md bg-card">
          {slices.map((slice) => (
            <div
              key={slice.key}
              style={{ width: `${(slice.value / total) * 100}%`, backgroundColor: slice.color }}
              title={`${slice.label}: ${slice.value.toLocaleString()}`}
            />
          ))}
        </div>

        <ul className="space-y-2.5">
          {slices.map((slice) => (
            <li key={slice.key} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
                {slice.label}
              </span>
              <span className="tabular-nums font-medium text-foreground">
                {slice.value.toLocaleString()}
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                  ({Math.round((slice.value / total) * 100)}%)
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartWrapper>
  )
}
