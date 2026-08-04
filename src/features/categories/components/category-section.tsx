import type { ReactNode } from 'react'
import { CategoryCard } from '@/features/categories/components/category-card'
import type { CategoryWithStats } from '@/features/categories/types'

interface CategorySectionProps {
  title: string
  categories: CategoryWithStats[]
  onEdit: (category: CategoryWithStats) => void
  onDelete: (category: CategoryWithStats) => void
  /** Rendered instead of the card grid when `categories` is empty — e.g. an empty state. */
  emptyContent?: ReactNode
}

export function CategorySection({ title, categories, onEdit, onDelete, emptyContent }: CategorySectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
      {categories.length === 0 && emptyContent ? (
        emptyContent
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  )
}
