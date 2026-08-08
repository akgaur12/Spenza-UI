import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { LoadingButton } from '@/components/common/loading-button'
import { useRunRecurringExpenseNowMutation } from '@/features/recurring-expenses/hooks/use-recurring-expense-mutations'
import type { RecurringExpense } from '@/features/recurring-expenses/types'

interface RunNowDialogProps {
  recurringExpense: RecurringExpense | null
  onOpenChange: (open: boolean) => void
}

export function RunNowDialog({ recurringExpense, onOpenChange }: RunNowDialogProps) {
  const runNowMutation = useRunRecurringExpenseNowMutation()

  function handleConfirm() {
    if (!recurringExpense) return
    runNowMutation.mutate(recurringExpense.id, { onSettled: () => onOpenChange(false) })
  }

  return (
    <AlertDialog
      open={Boolean(recurringExpense)}
      onOpenChange={(open) => !runNowMutation.isPending && onOpenChange(open)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Run recurring expense now?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-1">
              <p>
                This will immediately create a normal expense for{' '}
                <span className="font-medium text-foreground">{recurringExpense?.description}</span>.
              </p>
              <p>It updates the recurring template's schedule — it does not just update the template on its own.</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={runNowMutation.isPending}>Cancel</AlertDialogCancel>
          <LoadingButton
            onClick={handleConfirm}
            isLoading={runNowMutation.isPending}
            loadingText="Creating expense…"
          >
            Run Now
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
