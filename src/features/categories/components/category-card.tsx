import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CategoryBadge } from '@/features/categories/components/category-badge'
import { CategoryIcon } from '@/features/categories/components/category-icon'
import { CategoryStats } from '@/features/categories/components/category-stats'
import type { CategoryWithStats } from '@/features/categories/types'

interface CategoryCardProps {
  category: CategoryWithStats
  onEdit: (category: CategoryWithStats) => void
  onDelete: (category: CategoryWithStats) => void
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <Card className="py-4 transition-colors hover:bg-accent/40 sm:py-6">
      <CardContent className="space-y-2 sm:space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <CategoryIcon
              icon={category.icon}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-base sm:size-10 sm:text-lg"
            />
            <div className="min-w-0">
              <p className="truncate font-medium">{category.name}</p>
              <CategoryBadge isSystem={category.is_system} />
            </div>
          </div>

          {!category.is_system && (
            <div className="flex shrink-0 items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Edit ${category.name}`}
                onClick={() => onEdit(category)}
              >
                <Pencil className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${category.name}`}
                onClick={() => onDelete(category)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          )}
        </div>

        <CategoryStats expenseCount={category.expense_count} total={category.total} />
      </CardContent>
    </Card>
  )
}
