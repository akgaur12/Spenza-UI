import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface ExpenseActionsProps {
  description: string
  onEdit: () => void
  onDelete: () => void
  /** Skips the hover-to-reveal/dropdown behavior and always shows the inline icon buttons — used by the desktop table. */
  alwaysVisible?: boolean
}

/** Desktop: hover reveals inline icon buttons. Mobile: no hover, so a persistent menu button carries the same actions. */
export function ExpenseActions({ description, onEdit, onDelete, alwaysVisible }: ExpenseActionsProps) {
  return (
    <>
      <div
        className={cn(
          'shrink-0 items-center gap-1',
          alwaysVisible ? 'flex' : 'hidden sm:group-hover:flex',
        )}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Edit ${description}`}
          onClick={onEdit}
          className={cn(alwaysVisible && 'text-muted-foreground hover:text-foreground')}
        >
          <Pencil className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Delete ${description}`}
          onClick={onDelete}
          className={cn(
            alwaysVisible ? 'text-muted-foreground hover:text-destructive' : 'text-destructive hover:text-destructive',
          )}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>

      {!alwaysVisible && (
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
      )}
    </>
  )
}
