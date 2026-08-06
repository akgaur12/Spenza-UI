import { useNavigate } from '@tanstack/react-router'
import { Download, FolderPlus, Plus, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAddExpenseModal } from '@/features/expenses/components/add-expense-provider'
import { QuickActionButton } from '@/features/overview/components/quick-action-button'

export function QuickActionsCard() {
  const { openAddExpenseModal } = useAddExpenseModal()
  const navigate = useNavigate()

  const goToImport = () => navigate({ to: '/import-export', search: { tab: 'import' } })
  const goToExport = () => navigate({ to: '/import-export', search: { tab: 'export' } })
  const goToAddCategory = () => navigate({ to: '/categories', search: { create: true } })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mobile: compact icon buttons, like a native finance app */}
        <div className="flex items-start justify-around sm:hidden">
          <QuickActionButton icon={Plus} label="Add Expense" variant="primary" onClick={openAddExpenseModal} />
          <QuickActionButton icon={Upload} label="Import" onClick={goToImport} />
          <QuickActionButton icon={Download} label="Export" onClick={goToExport} />
          <QuickActionButton icon={FolderPlus} label="Category" onClick={goToAddCategory} />
        </div>

        {/* Tablet and up: full-width labeled buttons */}
        <div className="hidden flex-wrap gap-3 sm:flex">
          <Button
            size="lg"
            className="flex-1 hover:ring-2 hover:ring-primary/40 hover:ring-offset-2 hover:ring-offset-background"
            onClick={openAddExpenseModal}
          >
            <Plus />
            Add Expense
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 hover:bg-primary/10 hover:text-primary hover:ring-2 hover:ring-primary/40 hover:ring-offset-2 hover:ring-offset-background"
            onClick={goToImport}
          >
            <Upload />
            Import Expenses
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 hover:bg-primary/10 hover:text-primary hover:ring-2 hover:ring-primary/40 hover:ring-offset-2 hover:ring-offset-background"
            onClick={goToExport}
          >
            <Download />
            Export Expenses
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 hover:bg-primary/10 hover:text-primary hover:ring-2 hover:ring-primary/40 hover:ring-offset-2 hover:ring-offset-background"
            onClick={goToAddCategory}
          >
            <FolderPlus />
            Add Category
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
