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
import {
  usePauseRecurringExpenseMutation,
  useResumeRecurringExpenseMutation,
} from '@/features/recurring-expenses/hooks/use-recurring-expense-mutations'
import type { RecurringExpense } from '@/features/recurring-expenses/types'

interface PauseRecurringExpenseDialogProps {
  recurringExpense: RecurringExpense | null
  action: 'pause' | 'resume'
  onOpenChange: (open: boolean) => void
}

/** Shared confirmation for both directions — pausing and resuming are the same action mirrored. */
export function PauseRecurringExpenseDialog({ recurringExpense, action, onOpenChange }: PauseRecurringExpenseDialogProps) {
  const pauseMutation = usePauseRecurringExpenseMutation()
  const resumeMutation = useResumeRecurringExpenseMutation()

  function handleConfirm() {
    if (!recurringExpense) return
    if (action === 'pause') {
      pauseMutation.mutate(recurringExpense.id)
    } else {
      resumeMutation.mutate(recurringExpense.id)
    }
    onOpenChange(false)
  }

  return (
    <AlertDialog open={Boolean(recurringExpense)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action === 'pause' ? 'Pause recurring expense?' : 'Resume recurring expense?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium text-foreground">{recurringExpense?.description}</span>{' '}
            {action === 'pause'
              ? 'will no longer be processed until you resume it.'
              : 'will resume processing on its normal schedule.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{action === 'pause' ? 'Pause' : 'Resume'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
