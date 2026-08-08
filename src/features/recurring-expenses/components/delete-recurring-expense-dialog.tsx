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
import { useDeleteRecurringExpenseMutation } from '@/features/recurring-expenses/hooks/use-recurring-expense-mutations'
import type { RecurringExpense } from '@/features/recurring-expenses/types'

interface DeleteRecurringExpenseDialogProps {
  recurringExpense: RecurringExpense | null
  onOpenChange: (open: boolean) => void
}

export function DeleteRecurringExpenseDialog({ recurringExpense, onOpenChange }: DeleteRecurringExpenseDialogProps) {
  const deleteMutation = useDeleteRecurringExpenseMutation()

  function handleDelete() {
    if (!recurringExpense) return
    deleteMutation.mutate(recurringExpense.id)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={Boolean(recurringExpense)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete recurring expense?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-1">
              <p className="font-medium text-foreground">{recurringExpense?.description}</p>
              <p>This will stop future executions. Existing expenses will not be deleted.</p>
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
