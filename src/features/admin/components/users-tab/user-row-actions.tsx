import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { UserRole } from '@/features/admin/types'

interface UserRowActionsProps {
  role: UserRole
  isOwnAccount: boolean
  isLocked: boolean
  onUnlock: () => void
  onChangeRole: () => void
  onViewSessions: () => void
  onNotify: () => void
  onSendEmail: () => void
  onDelete: () => void
}

export function UserRowActions({
  role,
  isOwnAccount,
  isLocked,
  onUnlock,
  onChangeRole,
  onViewSessions,
  onNotify,
  onSendEmail,
  onDelete,
}: UserRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isLocked && <DropdownMenuItem onClick={onUnlock}>Unlock account</DropdownMenuItem>}
        <DropdownMenuItem onClick={onChangeRole}>{role === 'admin' ? 'Demote to user' : 'Promote to admin'}</DropdownMenuItem>
        <DropdownMenuItem onClick={onViewSessions}>View sessions</DropdownMenuItem>
        <DropdownMenuItem onClick={onNotify}>Send notification</DropdownMenuItem>
        <DropdownMenuItem onClick={onSendEmail}>Send email</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled={isOwnAccount} onClick={onDelete}>
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
