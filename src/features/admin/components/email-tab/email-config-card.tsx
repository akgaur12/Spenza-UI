import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useEmailConfig } from '@/features/admin/hooks/use-admin-email'

function ConfigRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}

export function EmailConfigCard() {
  const { data, isLoading } = useEmailConfig()

  if (isLoading || !data) {
    return (
      <Card className="p-4">
        <Skeleton className="h-40 w-full" />
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <ConfigRow label="Backend" value={<Badge variant="secondary">{data.backend}</Badge>} />
      <ConfigRow label="Sender" value={`${data.sender_name} <${data.sender_email ?? 'not set'}>`} />
      <ConfigRow label="SMTP server" value={`${data.smtp_server}:${data.smtp_port}`} />
      <ConfigRow
        label="SMTP TLS"
        value={<Badge variant={data.smtp_use_tls ? 'secondary' : 'outline'}>{data.smtp_use_tls ? 'Enabled' : 'Disabled'}</Badge>}
      />
      <ConfigRow
        label="Resend"
        value={
          <Badge variant={data.resend_configured ? 'secondary' : 'outline'}>
            {data.resend_configured ? 'Configured' : 'Not configured'}
          </Badge>
        }
      />
      <ConfigRow label="Max retries" value={data.max_retries} />
      <ConfigRow label="Retry delay" value={`${data.retry_base_delay_seconds}s`} />
    </Card>
  )
}
