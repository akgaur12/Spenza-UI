import { Check, Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { SectionError } from '@/components/common/section-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCategories } from '@/features/categories/hooks/use-categories'
import { EmptyExportState } from '@/features/import-export/components/empty-export-state'
import { ExportFilters } from '@/features/import-export/components/export-filters'
import { ExportSummary } from '@/features/import-export/components/export-summary'
import { LoadingState } from '@/features/import-export/components/loading-state'
import { useExportMutation } from '@/features/import-export/hooks/use-export-mutation'
import type { ExportDateRange, ExportFormat } from '@/features/import-export/types'
import { resolveExportDateRangePreset } from '@/features/import-export/utils/export-date-range'
import { useExpenses } from '@/features/expenses/hooks/use-expenses'

const FORMATS = [
  { value: 'csv', label: 'CSV', icon: FileText },
  { value: 'xlsx', label: 'XLSX', icon: FileSpreadsheet },
] as const satisfies { value: ExportFormat; label: string; icon: typeof FileText }[]

export function ExportPanel() {
  const accountExpensesQuery = useExpenses({ page_size: 1 })
  const [format, setFormat] = useState<ExportFormat>('csv')
  const [dateRange, setDateRange] = useState<ExportDateRange>(() => ({
    preset: 'month',
    ...resolveExportDateRangePreset('month'),
  }))
  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const categoriesQuery = useCategories()

  const filteredExpensesQuery = useExpenses({
    start_date: dateRange.startDate,
    end_date: dateRange.endDate,
    category_id: categoryIds.length > 0 ? categoryIds : undefined,
    page_size: 1,
  })

  const exportMutation = useExportMutation()

  if (accountExpensesQuery.isPending) return <LoadingState label="Loading export options…" />
  if (accountExpensesQuery.isError) {
    return <SectionError message="Unable to load export options." onRetry={() => accountExpensesQuery.refetch()} />
  }
  if (accountExpensesQuery.data.total === 0) return <EmptyExportState />

  const count = filteredExpensesQuery.data?.total
  const canExport = !filteredExpensesQuery.isPending && (count ?? 0) > 0

  function handleExport() {
    exportMutation.mutate({
      format,
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
      category_id: categoryIds.length > 0 ? categoryIds : undefined,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ExportFilters
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            categoryIds={categoryIds}
            onCategoryChange={setCategoryIds}
          />

          <div className="flex items-center gap-2">
            {FORMATS.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={format === option.value ? 'secondary' : 'outline'}
                onClick={() => setFormat(option.value)}
              >
                <option.icon />
                {option.label}
                {format === option.value && <Check className="text-primary" />}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Export Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ExportSummary
            count={count}
            isLoading={filteredExpensesQuery.isPending}
            dateRange={dateRange}
            format={format}
            categoryIds={categoryIds}
            categories={categoriesQuery.data?.items ?? []}
          />
          {!filteredExpensesQuery.isPending && !canExport && (
            <p className="text-sm text-muted-foreground">No expenses match these filters.</p>
          )}
        </CardContent>
      </Card>

      <Button
        type="button"
        size="lg"
        className="w-full"
        disabled={!canExport || exportMutation.isPending}
        onClick={handleExport}
      >
        {exportMutation.isPending ? (
          <>
            <Loader2 className="animate-spin" />
            Preparing your file…
          </>
        ) : (
          <>
            <Download />
            Export
          </>
        )}
      </Button>
    </div>
  )
}
