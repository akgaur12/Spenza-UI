import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface ExpenseActionsProps {
  description: string
  onEdit: () => void
  onDelete: () => void
}

/** Desktop: hover reveals inline icon buttons. Mobile: no hover, so a persistent menu button carries the same actions. */
export function ExpenseActions({ description, onEdit, onDelete }: ExpenseActionsProps) {
  return (
    <>
      <div className="hidden shrink-0 items-center gap-1 sm:group-hover:flex">
        <Button variant="ghost" size="icon-sm" aria-label={`Edit ${description}`} onClick={onEdit}>
          <Pencil className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Delete ${description}`}
          onClick={onDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="shrink-0 sm:hidden"
            aria-label={`Actions for ${description}`}
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={onEdit}>
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={onDelete}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
