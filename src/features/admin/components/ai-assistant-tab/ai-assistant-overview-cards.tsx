import { Activity, Bot, CheckCircle2, Clock, DollarSign, Gauge, MessageSquare, Users, Wrench, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatUsd } from '@/features/admin/components/ai-assistant-tab/format-usd'
import { useAiAssistantOverview } from '@/features/admin/hooks/use-ai-assistant-stats'
import { SummaryCard } from '@/features/overview/components/summary-card'

function formatTokens(value: number | null): string {
  if (value === null) return '—'
  return value.toLocaleString()
}

function formatLatency(value: number | null): string {
  if (value === null) return '—'
  return value < 1000 ? `${Math.round(value)}ms` : `${(value / 1000).toFixed(1)}s`
}

interface AiAssistantOverviewCardsProps {
  userId: string | null
}

export function AiAssistantOverviewCards({ userId }: AiAssistantOverviewCardsProps) {
  const { data, isLoading } = useAiAssistantOverview({ user_id: userId ?? undefined })

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  const failureRate = data.total_runs > 0 ? Math.round((data.runs_by_status.failed / data.total_runs) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage overview</CardTitle>
        <CardDescription>
          {userId ? "This user's AI assistant activity." : 'System-wide AI assistant activity across every user.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard title="Total Chats" icon={Bot} amount={data.total_chats.toLocaleString()} />
          <SummaryCard
            title="Messages Sent"
            icon={MessageSquare}
            amount={data.total_messages_sent.toLocaleString()}
            meta={`${data.messages_sent_last_7_days.toLocaleString()} in last 7d`}
          />
          <SummaryCard
            title="Total Runs"
            icon={Activity}
            amount={data.total_runs.toLocaleString()}
            meta={`${data.runs_last_7_days.toLocaleString()} in last 7d`}
          />
          <SummaryCard
            title="Failed Runs"
            icon={XCircle}
            amount={data.runs_by_status.failed.toLocaleString()}
            meta={`${failureRate}% of all runs`}
            tone={failureRate > 5 ? 'destructive' : 'success'}
          />
          {!userId && (
            <>
              <SummaryCard
                title="Active Users"
                icon={Users}
                amount={data.active_users_last_7_days.toLocaleString()}
                meta={`${data.active_users_last_30_days.toLocaleString()} in last 30d`}
              />
              <SummaryCard
                title="Access Enabled"
                icon={CheckCircle2}
                amount={data.users_with_access_enabled.toLocaleString()}
                tone="success"
              />
            </>
          )}
          <SummaryCard
            title="Tokens Used"
            icon={Gauge}
            amount={formatTokens(
              data.total_input_tokens === null && data.total_output_tokens === null
                ? null
                : (data.total_input_tokens ?? 0) + (data.total_output_tokens ?? 0),
            )}
            meta={
              data.total_input_tokens !== null
                ? `${formatTokens(data.total_input_tokens)} in / ${formatTokens(data.total_output_tokens)} out`
                : undefined
            }
          />
          <SummaryCard title="Tool Calls" icon={Wrench} amount={data.total_tool_calls.toLocaleString()} />
          <SummaryCard title="Avg Latency" icon={Clock} amount={formatLatency(data.average_latency_ms)} />
          <SummaryCard title="Estimated Cost" icon={DollarSign} amount={formatUsd(data.total_estimated_cost_usd)} />
        </div>
      </CardContent>
    </Card>
  )
}
