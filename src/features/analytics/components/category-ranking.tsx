import { useNavigate } from '@tanstack/react-router'
import type { CategoryAnalysisItem } from '@/features/analytics/components/category-donut-chart'
import { CategoryIcon } from '@/features/categories/components/category-icon'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

interface CategoryRankingProps {
  categories: CategoryAnalysisItem[]
  activeIndex: number | null
  onActiveIndexChange: (index: number | null) => void
  startDate: string
  endDate: string
}

export function CategoryRanking({ categories, activeIndex, onActiveIndexChange, startDate, endDate }: CategoryRankingProps) {
  const navigate = useNavigate()

  return (
    <ul className="flex w-full flex-col gap-1">
      {categories.map((category, index) => (
        <li
          key={category.category_id}
          onMouseEnter={() => onActiveIndexChange(index)}
          onMouseLeave={() => onActiveIndexChange(null)}
          onClick={() =>
            navigate({
              to: '/expenses',
              search: { category_id: category.category_id, start_date: startDate, end_date: endDate },
            })
          }
          className={cn(
            '-mx-2 flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 transition-colors',
            activeIndex === index && 'bg-accent/60',
          )}
        >
          <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: category.color }} aria-hidden />
          <CategoryIcon icon={category.icon} className="text-lg" />
          <span className="min-w-0 flex-1 truncate text-sm font-medium">{category.name}</span>
          <span className="text-sm font-semibold tabular-nums">{formatCurrency(category.total)}</span>
          <span className="w-10 shrink-0 text-right text-xs text-muted-foreground">{category.percentage.toFixed(0)}%</span>
        </li>
      ))}
    </ul>
  )
}
