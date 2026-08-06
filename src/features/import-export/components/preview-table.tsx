import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { ImportPreviewRow } from '@/features/import-export/types'
import { formatCurrency, formatExpenseTableDate } from '@/lib/format'

const PREVIEW_LIMIT = 20

interface PreviewTableProps {
  rows: ImportPreviewRow[]
}

function MissingCategoryCell({ row }: { row: ImportPreviewRow }) {
  const categoryError = row.errors.find((error) => error.field === 'category')
  if (!categoryError) return <span className="text-destructive">Missing</span>

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help text-destructive underline decoration-dotted underline-offset-2">Missing</span>
      </TooltipTrigger>
      <TooltipContent>{categoryError.message}</TooltipContent>
    </Tooltip>
  )
}

function StatusBadge({ row }: { row: ImportPreviewRow }) {
  if (row.valid) return <Badge variant="secondary">Valid</Badge>

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="destructive" className="cursor-help">
          Issue
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{row.errors.map((error) => error.message).join(' ')}</TooltipContent>
    </Tooltip>
  )
}

export function PreviewTable({ rows }: PreviewTableProps) {
  const visibleRows = rows.slice(0, PREVIEW_LIMIT)

  return (
    <div className="scrollbar-thin max-h-80 overflow-y-auto rounded-lg border">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-card">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.row_number}>
              <TableCell>{row.date ? formatExpenseTableDate(row.date) : '—'}</TableCell>
              <TableCell>{row.category ? row.category.name : <MissingCategoryCell row={row} />}</TableCell>
              <TableCell className="max-w-48 truncate">{row.description ?? '—'}</TableCell>
              <TableCell className="text-right tabular-nums">{row.amount ? formatCurrency(row.amount) : '—'}</TableCell>
              <TableCell className="text-right">
                <StatusBadge row={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
