import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CategoryDonutChart } from '@/features/analytics/components/category-donut-chart'
import { CategoryRanking } from '@/features/analytics/components/category-ranking'
import { ChartWrapper } from '@/features/analytics/components/chart-wrapper'
import { TopCategoriesSelector } from '@/features/analytics/components/top-categories-selector'
import { useCategoryAnalytics } from '@/features/analytics/hooks/use-category-analytics'
import { MONTHLY_CATEGORY_COLORS } from '@/features/analytics/hooks/use-monthly-category-spending'
import { useMediaQuery } from '@/hooks/use-media-query'

interface CategoryAnalysisSectionProps {
  startDate: string
  endDate: string
}

export function CategoryAnalysisSection({ startDate, endDate }: CategoryAnalysisSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [topN, setTopN] = useState(5)
  const isMobile = useMediaQuery('(max-width: 639px)')
  const categoryQuery = useCategoryAnalytics({ start_date: startDate, end_date: endDate })

  const ranked = (categoryQuery.data?.categories ?? []).slice(0, topN)

  const categories = ranked.map((category, index) => ({
    ...category,
    color: MONTHLY_CATEGORY_COLORS[index % MONTHLY_CATEGORY_COLORS.length],
  }))

  return (
    <ChartWrapper
      title="Category Analysis"
      compactHeader
      action={<TopCategoriesSelector value={topN} onChange={setTopN} />}
      isPending={categoryQuery.isPending}
      isError={categoryQuery.isError}
      onRetry={categoryQuery.refetch}
      errorMessage="Unable to load category analysis."
      isEmpty={categories.length === 0}
      emptyMessage="No category spending in this range yet."
      skeleton={
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-14">
          <div className="size-40 shrink-0 animate-pulse rounded-full bg-accent/60 sm:ml-6" />
          <div className="flex w-full flex-col gap-3">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="h-6 w-full animate-pulse rounded bg-accent/60" />
            ))}
          </div>
        </div>
      }
      footer={
        <Button variant="outline" size="sm" className="ml-auto" asChild>
          <Link to="/expenses" search={{ start_date: startDate, end_date: endDate }}>
            View All Expenses
          </Link>
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-14">
        <div className="shrink-0 sm:ml-6">
          <CategoryDonutChart
            categories={categories}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            isMobile={isMobile}
          />
        </div>
        <CategoryRanking
          categories={categories}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </ChartWrapper>
  )
}
