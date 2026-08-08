import { Check, MoreVertical, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface NotificationActionsProps {
  isRead: boolean
  onMarkRead: () => void
  onDelete: () => void
  className?: string
}

export function NotificationActions({ isRead, onMarkRead, onDelete, className }: NotificationActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Notification actions" className={className}>
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!isRead && (
          <DropdownMenuItem onSelect={onMarkRead}>
            <Check />
            Mark as read
          </DropdownMenuItem>
        )}
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
