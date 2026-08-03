import { ArrowDownWideNarrow, ArrowUpWideNarrow, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { ExpenseSortOption } from '@/features/expenses/types'
import { cn } from '@/lib/utils'

const SORT_LABELS: Record<ExpenseSortOption, string> = {
  newest: 'Newest First',
  oldest: 'Oldest First',
  highest: 'Highest Amount',
  lowest: 'Lowest Amount',
}

const SORT_OPTIONS: ExpenseSortOption[] = ['newest', 'oldest', 'highest', 'lowest']

interface SortMenuProps {
  value: ExpenseSortOption
  onChange: (sort: ExpenseSortOption) => void
  className?: string
}

export function SortMenu({ value, onChange, className }: SortMenuProps) {
  const isAscending = value === 'oldest' || value === 'lowest'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" className={cn('justify-start font-normal', className)}>
          <span className="flex min-w-0 items-center gap-2">
            {isAscending ? (
              <ArrowUpWideNarrow className="size-4 shrink-0 text-muted-foreground" />
            ) : (
              <ArrowDownWideNarrow className="size-4 shrink-0 text-muted-foreground" />
            )}
            <span className="truncate">{SORT_LABELS[value]}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem key={option} onSelect={() => onChange(option)}>
            <Check className={cn('size-4', value === option ? 'opacity-100' : 'opacity-0')} />
            {SORT_LABELS[option]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
