import { createContext, use, useState } from 'react'
import type { ReactNode } from 'react'
import { ExpenseModal } from '@/features/expenses/components/expense-modal'

interface AddExpenseContextValue {
  openAddExpenseModal: () => void
}

const AddExpenseContext = createContext<AddExpenseContextValue | null>(null)

/** Mounted once at the app-shell level so any page (or the bottom nav's FAB) can trigger the same Add Expense modal. */
export function AddExpenseProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <AddExpenseContext value={{ openAddExpenseModal: () => setOpen(true) }}>
      {children}
      <ExpenseModal open={open} onOpenChange={setOpen} />
    </AddExpenseContext>
  )
}

export function useAddExpenseModal(): AddExpenseContextValue {
  const context = use(AddExpenseContext)
  if (!context) {
    throw new Error('useAddExpenseModal must be used within an AddExpenseProvider')
  }
  return context
}
