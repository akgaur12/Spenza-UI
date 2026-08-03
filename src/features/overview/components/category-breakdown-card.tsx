import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { SectionError } from '@/components/common/section-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCategoryAnalytics } from '@/features/analytics/hooks/use-category-analytics'
import { CategorySkeleton } from '@/features/overview/components/category-skeleton'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

const DONUT_COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']

export function CategoryBreakdownCard() {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const categoryQuery = useCategoryAnalytics()

  const topCategories = (categoryQuery.data?.categories ?? []).slice(0, 5).map((category, index) => ({
    ...category,
    totalValue: Number(category.total),
    color: DONUT_COLORS[index % DONUT_COLORS.length],
  }))

  const donutSize = isMobile ? 140 : 160

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {categoryQuery.isPending ? (
          <CategorySkeleton />
        ) : categoryQuery.isError ? (
          <SectionError message="Unable to load category breakdown." onRetry={() => categoryQuery.refetch()} />
        ) : topCategories.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No spending this month yet.</p>
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ResponsiveContainer width={donutSize} height={donutSize} className="shrink-0">
              <PieChart>
                <Pie
                  data={topCategories}
                  dataKey="totalValue"
                  nameKey="name"
                  innerRadius={isMobile ? 44 : 50}
                  outerRadius={isMobile ? 68 : 78}
                  paddingAngle={2}
                  strokeWidth={0}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onTouchStart={(_, index) => setActiveIndex(index)}
                >
                  {topCategories.map((category, index) => (
                    <Cell
                      key={category.category_id}
                      fill={category.color}
                      fillOpacity={activeIndex === null || activeIndex === index ? 1 : 0.35}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <ul className="flex w-full flex-col gap-1">
              {topCategories.map((category, index) => (
                <li
                  key={category.category_id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={cn(
                    '-mx-2 flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors',
                    activeIndex === index && 'bg-accent/60',
                  )}
                >
                  <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: category.color }} aria-hidden />
                  <span className="text-lg" aria-hidden>
                    {category.icon}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{category.name}</span>
                  <span className="text-sm font-semibold tabular-nums">{formatCurrency(category.total)}</span>
                  <span className="w-10 shrink-0 text-right text-xs text-muted-foreground">
                    {category.percentage.toFixed(0)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="ml-auto" asChild>
          <Link to="/analytics">View Analytics</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
