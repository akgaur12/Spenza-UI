import { Link } from '@tanstack/react-router'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { SectionError } from '@/components/common/section-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useExpenses } from '@/features/expenses/hooks/use-expenses'
import { RecentExpensesSkeleton } from '@/features/overview/components/recent-expenses-skeleton'
import { formatCurrency, formatExpenseDate } from '@/lib/format'

export function RecentExpensesCard() {
  const expensesQuery = useExpenses({ page_size: 5 })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        {expensesQuery.isPending ? (
          <RecentExpensesSkeleton />
        ) : expensesQuery.isError ? (
          <SectionError message="Unable to load recent expenses." onRetry={() => expensesQuery.refetch()} />
        ) : expensesQuery.data.items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No expenses yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {expensesQuery.data.items.map((expense) => (
              <li
                key={expense.id}
                className="group flex items-center gap-3 px-6 py-3 transition-colors hover:bg-accent/40 sm:px-0"
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-lg"
                  aria-hidden
                >
                  {expense.category.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{expense.description}</p>
                  <p className="truncate text-xs text-muted-foreground">{expense.category.name}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-0.5">
                  <span className="text-sm font-semibold tabular-nums">{formatCurrency(expense.amount)}</span>
                  <span className="text-xs text-muted-foreground">{formatExpenseDate(expense.spent_at)}</span>
                </div>

                {/* Tablet and up: actions reveal on row hover */}
                <div className="hidden shrink-0 items-center gap-1 sm:group-hover:flex">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${expense.description}`}
                    onClick={() => toast('Editing expenses is coming soon')}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${expense.description}`}
                    onClick={() => toast('Deleting expenses is coming soon')}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>

                {/* Mobile: no hover, so actions sit behind a persistent menu button */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="shrink-0 sm:hidden"
                      aria-label={`Actions for ${expense.description}`}
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => toast('Editing expenses is coming soon')}>
                      <Pencil />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onSelect={() => toast('Deleting expenses is coming soon')}>
                      <Trash2 />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/expenses">View All Expenses</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
