import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteExpenseMutation } from '@/features/expenses/hooks/use-expense-mutations'
import type { Expense } from '@/features/expenses/types'
import { formatCurrency, formatExpenseDate } from '@/lib/format'

interface DeleteExpenseDialogProps {
  expense: Expense | null
  onOpenChange: (open: boolean) => void
}

export function DeleteExpenseDialog({ expense, onOpenChange }: DeleteExpenseDialogProps) {
  const deleteMutation = useDeleteExpenseMutation()

  function handleDelete() {
    if (!expense) return
    deleteMutation.mutate(expense.id)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={Boolean(expense)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Expense</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-1">
              <p className="font-medium text-foreground">{expense?.description}</p>
              {expense && (
                <p>
                  {formatCurrency(expense.amount)} · {formatExpenseDate(expense.spent_at)}
                </p>
              )}
              <p>Are you sure? This action cannot be undone.</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
