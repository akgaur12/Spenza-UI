import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { DateRangeParams } from '@/features/admin/components/ai-assistant-tab/date-range-preset-select'
import { formatUsd } from '@/features/admin/components/ai-assistant-tab/format-usd'
import { formatLatency, PROVIDER_LABELS } from '@/features/admin/components/ai-assistant-tab/provider-format'
import { useAiAssistantProviderUsage } from '@/features/admin/hooks/use-ai-assistant-stats'
import { ChartWrapper } from '@/features/analytics/components/chart-wrapper'

interface ProviderUsageTableProps {
  userId: string | null
  dateRange: DateRangeParams
}

export function ProviderUsageTable({ userId, dateRange }: ProviderUsageTableProps) {
  const { data, isPending, isError, refetch } = useAiAssistantProviderUsage({
    ...dateRange,
    user_id: userId ?? undefined,
  })

  const providers = data?.providers ?? []

  return (
    <ChartWrapper
      title="Usage by Provider & Model"
      compactHeader
      action={
        data && (
          <span className="text-sm text-muted-foreground">
            Total: <span className="font-medium text-foreground">{formatUsd(data.total_estimated_cost_usd)}</span>
          </span>
        )
      }
      isPending={isPending}
      isError={isError}
      onRetry={refetch}
      errorMessage="Unable to load provider usage."
      isEmpty={providers.length === 0}
      emptyMessage="No runs in this range yet."
      skeleton={<div className="h-[200px] w-full animate-pulse rounded-lg bg-accent/60" />}
    >
      <div className="space-y-3 md:hidden">
        {providers.map((row) => (
          <div key={`${row.provider}-${row.model}`} className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{PROVIDER_LABELS[row.provider] ?? row.provider}</p>
                <p className="truncate text-xs text-muted-foreground">{row.model}</p>
              </div>
              <span className="shrink-0 font-medium text-foreground tabular-nums">{formatUsd(row.estimated_cost_usd)}</span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-y-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Runs</p>
                <p className="tabular-nums">{row.total_runs.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className={`tabular-nums ${row.completed > 0 ? 'text-success' : ''}`}>{row.completed.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Failed</p>
                <p className={`tabular-nums ${row.failed > 0 ? 'text-destructive' : ''}`}>{row.failed.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cancelled</p>
                <p className="tabular-nums text-muted-foreground">{row.cancelled.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tool Calls</p>
                <p className="tabular-nums">{row.tool_calls.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Latency</p>
                <p className="tabular-nums">{formatLatency(row.average_latency_ms)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Input Tokens</p>
                <p className="tabular-nums">{row.input_tokens?.toLocaleString() ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Output Tokens</p>
                <p className="tabular-nums">{row.output_tokens?.toLocaleString() ?? '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="text-right">Runs</TableHead>
              <TableHead className="text-right">Completed</TableHead>
              <TableHead className="text-right">Failed</TableHead>
              <TableHead className="text-right">Cancelled</TableHead>
              <TableHead className="text-right">Input Tokens</TableHead>
              <TableHead className="text-right">Output Tokens</TableHead>
              <TableHead className="text-right">Tool Calls</TableHead>
              <TableHead className="text-right">Avg Latency</TableHead>
              <TableHead className="text-right">Est. Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((row) => (
              <TableRow key={`${row.provider}-${row.model}`}>
                <TableCell className="font-medium text-foreground">
                  {PROVIDER_LABELS[row.provider] ?? row.provider}
                </TableCell>
                <TableCell className="text-muted-foreground">{row.model}</TableCell>
                <TableCell className="text-right tabular-nums">{row.total_runs.toLocaleString()}</TableCell>
                <TableCell className={`text-right tabular-nums ${row.completed > 0 ? 'text-success' : ''}`}>
                  {row.completed.toLocaleString()}
                </TableCell>
                <TableCell className={`text-right tabular-nums ${row.failed > 0 ? 'text-destructive' : ''}`}>
                  {row.failed.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {row.cancelled.toLocaleString()}
                </TableCell>
                <TableCell className="text-right tabular-nums">{row.input_tokens?.toLocaleString() ?? '—'}</TableCell>
                <TableCell className="text-right tabular-nums">{row.output_tokens?.toLocaleString() ?? '—'}</TableCell>
                <TableCell className="text-right tabular-nums">{row.tool_calls.toLocaleString()}</TableCell>
                <TableCell className="text-right tabular-nums">{formatLatency(row.average_latency_ms)}</TableCell>
                <TableCell className="text-right tabular-nums font-medium text-foreground">
                  {formatUsd(row.estimated_cost_usd)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ChartWrapper>
  )
}
