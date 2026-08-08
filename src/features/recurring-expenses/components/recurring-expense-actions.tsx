import { MoreVertical, Pause, Pencil, Play, Trash2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { RecurringExpense } from '@/features/recurring-expenses/types'

interface RecurringExpenseActionsProps {
  recurringExpense: RecurringExpense
  onEdit: () => void
  onPause: () => void
  onResume: () => void
  onRunNow: () => void
  onDelete: () => void
}

export function RecurringExpenseActions({
  recurringExpense,
  onEdit,
  onPause,
  onResume,
  onRunNow,
  onDelete,
}: RecurringExpenseActionsProps) {
  const { status } = recurringExpense
  const canEdit = status === 'active' || status === 'paused'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${recurringExpense.description}`}>
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {canEdit && (
          <DropdownMenuItem onSelect={onEdit}>
            <Pencil />
            Edit
          </DropdownMenuItem>
        )}
        {status === 'active' && (
          <DropdownMenuItem onSelect={onPause}>
            <Pause />
            Pause
          </DropdownMenuItem>
        )}
        {status === 'paused' && (
          <DropdownMenuItem onSelect={onResume}>
            <Play />
            Resume
          </DropdownMenuItem>
        )}
        {status === 'active' && (
          <DropdownMenuItem onSelect={onRunNow}>
            <Zap />
            Run Now
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
