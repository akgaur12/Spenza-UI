import { Download, Plus, Upload } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAddExpenseModal } from '@/features/expenses/components/add-expense-provider'
import { QuickActionButton } from '@/features/overview/components/quick-action-button'

export function QuickActionsCard() {
  const { openAddExpenseModal } = useAddExpenseModal()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mobile: compact icon buttons, like a native finance app */}
        <div className="flex items-start justify-around sm:hidden">
          <QuickActionButton icon={Plus} label="Add Expense" variant="primary" onClick={openAddExpenseModal} />
          <QuickActionButton
            icon={Upload}
            label="Import"
            onClick={() => toast('Importing expenses is coming soon')}
          />
          <QuickActionButton
            icon={Download}
            label="Export"
            onClick={() => toast('Exporting expenses is coming soon')}
          />
        </div>

        {/* Tablet and up: full-width labeled buttons */}
        <div className="hidden gap-3 sm:flex">
          <Button size="lg" className="flex-1" onClick={openAddExpenseModal}>
            <Plus />
            Add Expense
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => toast('Importing expenses is coming soon')}
          >
            <Upload />
            Import Expenses
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => toast('Exporting expenses is coming soon')}
          >
            <Download />
            Export Expenses
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
