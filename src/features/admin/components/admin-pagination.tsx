import { Button } from '@/components/ui/button'

interface AdminPaginationProps {
  page: number
  pageSize: number
  total: number
  itemLabel: string
  onPageChange: (page: number) => void
}

export function AdminPagination({ page, pageSize, total, itemLabel, onPageChange }: AdminPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} · {total} {total === 1 ? itemLabel : `${itemLabel}s`}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page * pageSize >= total}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
