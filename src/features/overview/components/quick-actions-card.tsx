import { useNavigate } from '@tanstack/react-router'
import { ChevronUp, Download, FileText, FolderPlus, MoreHorizontal, Plus, Repeat, Upload } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAddExpenseModal } from '@/features/expenses/components/add-expense-provider'
import { QuickActionButton } from '@/features/overview/components/quick-action-button'

export function QuickActionsCard() {
  const { openAddExpenseModal } = useAddExpenseModal()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const goToImport = () => navigate({ to: '/import-export', search: { tab: 'import' } })
  const goToExport = () => navigate({ to: '/import-export', search: { tab: 'export' } })
  const goToAddCategory = () => navigate({ to: '/categories', search: { create: true } })
  const goToAddRecurringExpense = () => navigate({ to: '/recurring-expenses', search: { create: true } })
  const goToGenerateReport = () => navigate({ to: '/reports' })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-0">
        {/* Mobile: compact icon buttons, like a native finance app */}
        <div className="grid grid-cols-5 items-start sm:hidden">
          <QuickActionButton icon={Plus} label="Add Expense" variant="primary" onClick={openAddExpenseModal} />
          <QuickActionButton icon={Upload} label="Import" onClick={goToImport} />
          <QuickActionButton icon={Download} label="Export" onClick={goToExport} />
          <QuickActionButton icon={FolderPlus} label="Category" onClick={goToAddCategory} />
          <QuickActionButton
            icon={expanded ? ChevronUp : MoreHorizontal}
            label={expanded ? 'Less' : 'More'}
            onClick={() => setExpanded((value) => !value)}
          />
        </div>

        {expanded && (
          <div className="grid grid-cols-5 items-start sm:hidden">
            <QuickActionButton icon={Repeat} label="Recurring" onClick={goToAddRecurringExpense} />
            <QuickActionButton icon={FileText} label="Report" onClick={goToGenerateReport} />
          </div>
        )}

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
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 hover:bg-primary/10 hover:text-primary hover:ring-2 hover:ring-primary/40 hover:ring-offset-2 hover:ring-offset-background"
            onClick={goToAddRecurringExpense}
          >
            <Repeat />
            Add Recurring
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 hover:bg-primary/10 hover:text-primary hover:ring-2 hover:ring-primary/40 hover:ring-offset-2 hover:ring-offset-background"
            onClick={goToGenerateReport}
          >
            <FileText />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
