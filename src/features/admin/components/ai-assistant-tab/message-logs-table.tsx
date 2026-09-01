import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SectionError } from '@/components/common/section-error'
import { AdminPagination } from '@/features/admin/components/admin-pagination'
import { formatUsd } from '@/features/admin/components/ai-assistant-tab/format-usd'
import { formatLatency, PROVIDER_LABELS } from '@/features/admin/components/ai-assistant-tab/provider-format'
import { useAiAssistantLogs } from '@/features/admin/hooks/use-ai-assistant-stats'
import type { AIAssistantMessageLog, ChatRunStatus } from '@/features/admin/types'
import type { LLMProvider } from '@/features/assistant/types/chat.types'
import { formatRelativeTime } from '@/lib/format'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 15

const STATUS_OPTIONS: { value: ChatRunStatus; label: string }[] = [
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'running', label: 'Running' },
  { value: 'queued', label: 'Queued' },
]

const PROVIDER_OPTIONS: { value: LLMProvider; label: string }[] = [
  { value: 'ollama', label: 'Ollama' },
  { value: 'aws_bedrock', label: 'AWS Bedrock' },
  { value: 'groq', label: 'Groq' },
  { value: 'nvidia', label: 'NVIDIA' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'huggingface', label: 'Hugging Face' },
  { value: 'open_router', label: 'OpenRouter' },
]

function truncate(text: string | null, max: number): string {
  if (!text) return '—'
  return text.length > max ? `${text.slice(0, max)}…` : text
}

function StatusBadge({ status }: { status: ChatRunStatus }) {
  if (status === 'completed') return <Badge variant="secondary" className="text-success">Completed</Badge>
  if (status === 'failed') return <Badge variant="destructive">Failed</Badge>
  if (status === 'cancelled') return <Badge variant="outline">Cancelled</Badge>
  return <Badge variant="secondary">{status === 'running' ? 'Running' : 'Queued'}</Badge>
}

interface MessageLogsTableProps {
  userId: string | null
}

export function MessageLogsTable({ userId }: MessageLogsTableProps) {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<ChatRunStatus | 'all'>('all')
  const [provider, setProvider] = useState<LLMProvider | 'all'>('all')
  const [selectedLog, setSelectedLog] = useState<AIAssistantMessageLog | null>(null)

  const { data, isLoading, isError, refetch } = useAiAssistantLogs({
    page,
    page_size: PAGE_SIZE,
    status: status === 'all' ? undefined : status,
    provider: provider === 'all' ? undefined : provider,
    user_id: userId ?? undefined,
  })

  function handleStatusChange(value: string) {
    setStatus(value as ChatRunStatus | 'all')
    setPage(1)
  }

  function handleProviderChange(value: string) {
    setProvider(value as LLMProvider | 'all')
    setPage(1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Logs</CardTitle>
        <CardDescription>Every run — who sent it, what went in and came out, tokens, cost, and latency.</CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={provider} onValueChange={handleProviderChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All providers</SelectItem>
              {PROVIDER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : isError ? (
          <SectionError message="Unable to load message logs." onRetry={refetch} />
        ) : !data || data.items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No runs match these filters.</p>
        ) : (
          <>
            <div className="space-y-3 md:hidden">
              {data.items.map((log) => (
                <button
                  type="button"
                  key={log.run_id}
                  onClick={() => setSelectedLog(log)}
                  className="w-full rounded-lg border border-border p-4 text-left"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{log.username}</p>
                      <p className="truncate text-xs text-muted-foreground">{log.email}</p>
                    </div>
                    <StatusBadge status={log.status} />
                  </div>
                  <p className="mt-2 truncate text-sm text-foreground">{truncate(log.input_message, 60)}</p>
                  <div className="mt-3 grid grid-cols-3 gap-y-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Tokens (in/out)</p>
                      <p className="tabular-nums">
                        {log.input_tokens?.toLocaleString() ?? '—'} / {log.output_tokens?.toLocaleString() ?? '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cost</p>
                      <p className="tabular-nums font-medium text-foreground">{formatUsd(log.estimated_cost_usd)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Latency</p>
                      <p className="tabular-nums">{formatLatency(log.latency_ms)}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{formatRelativeTime(log.created_at)}</p>
                </button>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Input Tok</TableHead>
                    <TableHead className="text-right">Output Tok</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Latency</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((log) => (
                    <TableRow key={log.run_id} onClick={() => setSelectedLog(log)} className="cursor-pointer">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{log.username}</span>
                          <span className="text-xs text-muted-foreground">{log.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-64 truncate text-muted-foreground">
                        {truncate(log.input_message, 70)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{PROVIDER_LABELS[log.provider] ?? log.provider}</span>
                          <span className="text-xs text-muted-foreground">{log.model}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={log.status} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{log.input_tokens?.toLocaleString() ?? '—'}</TableCell>
                      <TableCell className="text-right tabular-nums">{log.output_tokens?.toLocaleString() ?? '—'}</TableCell>
                      <TableCell className="text-right tabular-nums font-medium text-foreground">
                        {formatUsd(log.estimated_cost_usd)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{formatLatency(log.latency_ms)}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{formatRelativeTime(log.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <AdminPagination page={data.page} pageSize={data.page_size} total={data.total} itemLabel="run" onPageChange={setPage} />
          </>
        )}
      </CardContent>

      <Dialog open={selectedLog !== null} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {selectedLog && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedLog.username}
                  <StatusBadge status={selectedLog.status} />
                </DialogTitle>
                <DialogDescription>
                  {selectedLog.email} · {new Date(selectedLog.created_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 rounded-lg border border-border p-4 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground">Provider</p>
                  <p>{PROVIDER_LABELS[selectedLog.provider] ?? selectedLog.provider}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Model</p>
                  <p className="truncate">{selectedLog.model}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tool Calls</p>
                  <p className="tabular-nums">{selectedLog.tool_calls.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Latency</p>
                  <p className="tabular-nums">{formatLatency(selectedLog.latency_ms)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Input Tokens</p>
                  <p className="tabular-nums">{selectedLog.input_tokens?.toLocaleString() ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Output Tokens</p>
                  <p className="tabular-nums">{selectedLog.output_tokens?.toLocaleString() ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Tokens</p>
                  <p className="tabular-nums">{selectedLog.total_tokens?.toLocaleString() ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Est. Cost</p>
                  <p className="tabular-nums font-medium text-foreground">{formatUsd(selectedLog.estimated_cost_usd)}</p>
                </div>
              </div>

              {selectedLog.error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {selectedLog.error}
                </div>
              )}

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Input message</p>
                <p className={cn('rounded-lg border border-border bg-accent/30 p-3 text-sm whitespace-pre-wrap text-foreground', !selectedLog.input_message && 'text-muted-foreground italic')}>
                  {selectedLog.input_message ?? 'No input message recorded.'}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Output message</p>
                <p className={cn('rounded-lg border border-border bg-accent/30 p-3 text-sm whitespace-pre-wrap text-foreground', !selectedLog.output_message && 'text-muted-foreground italic')}>
                  {selectedLog.output_message || 'No response generated.'}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
