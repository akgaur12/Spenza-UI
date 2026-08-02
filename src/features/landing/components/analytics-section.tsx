import { SectionTitle } from '@/components/common/section-title'
import { AnalyticsLineChartCard } from '@/features/landing/components/analytics-preview-card'
import { CategoryBreakdownCard } from '@/features/landing/components/category-breakdown-card'

export function AnalyticsSection() {
  return (
    <section id="analytics" className="border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionTitle
          eyebrow="Analytics"
          title="See your spending clearly"
          description="Trends, breakdowns, and patterns — all in one place, updated as you go."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <AnalyticsLineChartCard />
          <CategoryBreakdownCard />
        </div>
      </div>
    </section>
  )
}
