import { Receipt } from 'lucide-react'
import { ExpenseActions } from '@/features/expenses/components/expense-actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Expense } from '@/features/expenses/types'
import { formatCurrency, formatExpenseDay, formatExpenseTableDate } from '@/lib/format'

interface ExpenseTableProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
}

export function ExpenseTable({ expenses, onEdit, onDelete }: ExpenseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pr-1">Date</TableHead>
          <TableHead className="pl-1">Day</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="pr-6 text-right">Amount</TableHead>
          <TableHead className="w-0 pl-6">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="pr-1">{formatExpenseTableDate(expense.spent_at)}</TableCell>
            <TableCell className="pl-1 text-muted-foreground">{formatExpenseDay(expense.spent_at)}</TableCell>
            <TableCell>
              <span className="flex items-center gap-2">
                <span aria-hidden>{expense.category.icon ?? <Receipt className="size-4 text-muted-foreground" />}</span>
                {expense.category.name}
              </span>
            </TableCell>
            <TableCell className="max-w-64 truncate whitespace-normal">{expense.description}</TableCell>
            <TableCell className="pr-6 text-right font-medium tabular-nums">{formatCurrency(expense.amount)}</TableCell>
            <TableCell className="pl-6">
              <div className="flex justify-end">
                <ExpenseActions
                  description={expense.description}
                  onEdit={() => onEdit(expense)}
                  onDelete={() => onDelete(expense)}
                  alwaysVisible
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
