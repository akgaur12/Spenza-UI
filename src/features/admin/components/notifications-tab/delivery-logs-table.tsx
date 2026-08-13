import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { DeliveryLogResponse, DeliveryLogStatus } from '@/features/admin/types'
import { formatRelativeTime } from '@/lib/format'

const STATUS_VARIANT: Record<DeliveryLogStatus, 'secondary' | 'destructive' | 'outline'> = {
  success: 'secondary',
  failed: 'destructive',
  pending: 'outline',
}

interface DeliveryLogsTableProps {
  logs: DeliveryLogResponse[]
}

export function DeliveryLogsTable({ logs }: DeliveryLogsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Channel</TableHead>
          <TableHead>Attempt</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Error</TableHead>
          <TableHead>When</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>
              <Badge variant={STATUS_VARIANT[log.status]}>{log.status}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{log.channel}</TableCell>
            <TableCell className="text-muted-foreground">{log.attempt}</TableCell>
            <TableCell className="text-muted-foreground">{log.provider ?? '—'}</TableCell>
            <TableCell className="max-w-64 truncate whitespace-normal text-muted-foreground">
              {log.error_message ?? '—'}
            </TableCell>
            <TableCell className="text-muted-foreground">{formatRelativeTime(log.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
