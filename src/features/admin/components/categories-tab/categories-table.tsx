import { Edit, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CategoryIcon } from '@/features/categories/components/category-icon'
import type { SystemCategoryResponse } from '@/features/admin/types'
import { formatExpenseTableDate } from '@/lib/format'

interface CategoriesTableProps {
  categories: SystemCategoryResponse[]
  onEdit: (category: SystemCategoryResponse) => void
  onDelete: (category: SystemCategoryResponse) => void
}

export function CategoriesTable({ categories, onEdit, onDelete }: CategoriesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>
              <span className="flex items-center gap-2">
                <CategoryIcon icon={category.icon} className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-base" />
                {category.name}
              </span>
            </TableCell>
            <TableCell>
              <Badge variant={category.is_active ? 'secondary' : 'outline'}>
                {category.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{formatExpenseTableDate(category.created_at)}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="size-8" onClick={() => onEdit(category)}>
                  <Edit className="size-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon" className="size-8" onClick={() => onDelete(category)}>
                  <Trash2 className="size-4 text-destructive" />
                  <span className="sr-only">Deactivate</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
