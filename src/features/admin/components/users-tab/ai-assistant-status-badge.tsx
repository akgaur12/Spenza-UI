import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserAiAssistantPermission } from '@/features/admin/hooks/use-user-ai-assistant-permission'

interface AiAssistantStatusBadgeProps {
  userId: string
  onClick: () => void
}

/** Clickable so the table doubles as the entry point into the management dialog, not just a status readout. */
export function AiAssistantStatusBadge({ userId, onClick }: AiAssistantStatusBadgeProps) {
  const { data, isLoading } = useUserAiAssistantPermission(userId)

  if (isLoading) return <Skeleton className="h-5 w-16" />

  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <Badge variant={data?.enabled ? 'default' : 'secondary'}>{data?.enabled ? 'Enabled' : 'Disabled'}</Badge>
    </button>
  )
}
