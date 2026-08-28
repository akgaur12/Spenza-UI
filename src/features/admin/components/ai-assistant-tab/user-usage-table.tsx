import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AdminPagination } from '@/features/admin/components/admin-pagination'
import { formatUsd } from '@/features/admin/components/ai-assistant-tab/format-usd'
import { useAiAssistantUserUsage } from '@/features/admin/hooks/use-ai-assistant-stats'
import type { AIAssistantUserSortBy, SortOrder } from '@/features/admin/types'
import { SectionError } from '@/components/common/section-error'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/format'

const PAGE_SIZE = 10

const SORTABLE_COLUMNS: { key: AIAssistantUserSortBy; label: string; align?: 'right' }[] = [
  { key: 'chats_created', label: 'Chats' },
  { key: 'messages_sent', label: 'Messages (all-time)', align: 'right' },
  { key: 'last_active', label: 'Last Active' },
]

interface UserUsageTableProps {
  selectedUserId: string | null
  onSelectUser: (userId: string | null) => void
}

export function UserUsageTable({ selectedUserId, onSelectUser }: UserUsageTableProps) {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<AIAssistantUserSortBy>('messages_sent')
  const [order, setOrder] = useState<SortOrder>('desc')

  const { data, isLoading, isError, refetch } = useAiAssistantUserUsage({
    page,
    page_size: PAGE_SIZE,
    sort_by: sortBy,
    order,
  })

  function handleSort(column: AIAssistantUserSortBy) {
    if (column === sortBy) {
      setOrder(order === 'desc' ? 'asc' : 'desc')
    } else {
      setSortBy(column)
      setOrder('desc')
    }
    setPage(1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage by User</CardTitle>
        <CardDescription>
          Only users who have used the assistant at least once. Click a row to filter the dashboard above to them.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : isError ? (
          <SectionError message="Unable to load per-user usage." onRetry={refetch} />
        ) : !data || data.items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No usage recorded yet.</p>
        ) : (
          <>
            <div className="flex items-center gap-2 md:hidden">
              <Select value={sortBy} onValueChange={(value) => handleSort(value as AIAssistantUserSortBy)}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORTABLE_COLUMNS.map((column) => (
                    <SelectItem key={column.key} value={column.key}>
                      {column.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}
                aria-label={order === 'desc' ? 'Sort ascending' : 'Sort descending'}
              >
                {order === 'desc' ? <ArrowDown className="size-4" /> : <ArrowUp className="size-4" />}
              </Button>
            </div>

            <div className="space-y-3 md:hidden">
              {data.items.map((user) => {
                const isSelected = user.user_id === selectedUserId
                return (
                  <button
                    type="button"
                    key={user.user_id}
                    onClick={() => onSelectUser(isSelected ? null : user.user_id)}
                    className={cn(
                      'w-full rounded-lg border border-border p-4 text-left',
                      isSelected && 'bg-accent/60',
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{user.username}</p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <Badge variant={user.enabled ? 'default' : 'secondary'} className="shrink-0">
                        {user.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-y-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Chats</p>
                        <p className="tabular-nums">{user.total_chats.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Messages</p>
                        <p className="tabular-nums">{user.total_messages_sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Messages (30d)</p>
                        <p className="tabular-nums">{user.messages_sent_last_30_days.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Last Active</p>
                        <p>{user.last_active_at ? formatRelativeTime(user.last_active_at) : 'Never'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Cost</p>
                        <p className="tabular-nums font-medium text-foreground">{formatUsd(user.estimated_cost_usd)}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Access</TableHead>
                    {SORTABLE_COLUMNS.map((column) => (
                      <TableHead key={column.key} className={column.align === 'right' ? 'text-right' : undefined}>
                        <button
                          type="button"
                          onClick={() => handleSort(column.key)}
                          className={`inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground ${column.align === 'right' ? 'flex-row-reverse' : ''}`}
                        >
                          {column.label}
                          {sortBy !== column.key ? (
                            <ArrowUpDown className="size-3" />
                          ) : order === 'desc' ? (
                            <ArrowDown className="size-3" />
                          ) : (
                            <ArrowUp className="size-3" />
                          )}
                        </button>
                      </TableHead>
                    ))}
                    <TableHead className="text-right">Messages (30d)</TableHead>
                    <TableHead className="text-right">Est. Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((user) => {
                    const isSelected = user.user_id === selectedUserId
                    return (
                      <TableRow
                        key={user.user_id}
                        onClick={() => onSelectUser(isSelected ? null : user.user_id)}
                        className={cn('cursor-pointer', isSelected && 'bg-accent/60')}
                      >
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{user.username}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.enabled ? 'default' : 'secondary'}>
                            {user.enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </TableCell>
                        <TableCell className="tabular-nums">{user.total_chats.toLocaleString()}</TableCell>
                        <TableCell className="text-right tabular-nums">{user.total_messages_sent.toLocaleString()}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.last_active_at ? formatRelativeTime(user.last_active_at) : 'Never'}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {user.messages_sent_last_30_days.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right tabular-nums font-medium text-foreground">
                          {formatUsd(user.estimated_cost_usd)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            <AdminPagination page={data.page} pageSize={data.page_size} total={data.total} itemLabel="user" onPageChange={setPage} />
          </>
        )}
      </CardContent>
    </Card>
  )
}
