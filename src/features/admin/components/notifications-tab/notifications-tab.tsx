import { Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { AdminPagination } from '@/features/admin/components/admin-pagination'
import { BroadcastDialog } from '@/features/admin/components/notifications-tab/broadcast-dialog'
import { DeliveryLogsTable } from '@/features/admin/components/notifications-tab/delivery-logs-table'
import { useAdminDeliveryLogs } from '@/features/admin/hooks/use-admin-delivery-logs'
import type { DeliveryChannel, DeliveryLogStatus } from '@/features/admin/types'

const PAGE_SIZE = 20

export function NotificationsTab() {
  const [broadcastOpen, setBroadcastOpen] = useState(false)
  const [status, setStatus] = useState<DeliveryLogStatus | 'all'>('all')
  const [channel, setChannel] = useState<DeliveryChannel | 'all'>('all')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useAdminDeliveryLogs({
    status: status === 'all' ? undefined : status,
    channel: channel === 'all' ? undefined : channel,
    page,
    page_size: PAGE_SIZE,
  })

  return (
    <div className="space-y-6">
      <Card className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-medium text-foreground">Broadcast notification</p>
          <p className="text-sm text-muted-foreground">Send an in-app and email notification to every active, verified user.</p>
        </div>
        <Button onClick={() => setBroadcastOpen(true)}>
          <Send className="size-4" />
          Broadcast
        </Button>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">Delivery logs</h2>
          <div className="flex gap-2">
            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value as DeliveryLogStatus | 'all')
                setPage(1)
              }}
            >
              <SelectTrigger size="sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={channel}
              onValueChange={(value) => {
                setChannel(value as DeliveryChannel | 'all')
                setPage(1)
              }}
            >
              <SelectTrigger size="sm">
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All channels</SelectItem>
                <SelectItem value="in_app">In-app</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : data && data.items.length > 0 ? (
          <DeliveryLogsTable logs={data.items} />
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">No delivery attempts found.</p>
        )}

        {data && (
          <AdminPagination page={data.page} pageSize={data.page_size} total={data.total} itemLabel="log" onPageChange={setPage} />
        )}
      </div>

      <BroadcastDialog open={broadcastOpen} onOpenChange={setBroadcastOpen} />
    </div>
  )
}
