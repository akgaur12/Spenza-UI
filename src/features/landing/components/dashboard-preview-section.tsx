import { CalendarClock, PiggyBank, Tags, TrendingUp } from 'lucide-react'
import { SectionTitle } from '@/components/common/section-title'
import { DashboardPreviewCard } from '@/features/landing/components/dashboard-preview-card'

const STATS = [
  { label: "Today's Spending", value: '₹840', icon: PiggyBank, trend: { value: '8% vs yesterday', direction: 'up' as const } },
  { label: 'This Month', value: '₹24,850', icon: CalendarClock, trend: { value: '12% vs last month', direction: 'down' as const } },
  { label: 'Top Category', value: 'Food & Dining', icon: Tags },
  { label: 'Monthly Trend', value: 'Trending down', icon: TrendingUp, trend: { value: '5 months tracked', direction: 'down' as const } },
]

export function DashboardPreviewSection() {
  return (
    <section className="mx-auto hidden max-w-6xl px-6 py-24 sm:block">
      <SectionTitle
        eyebrow="Dashboard"
        title="A dashboard that gets out of your way"
        description="The moment you log in, everything that matters is right there — no digging required."
      />

      <div className="mt-14 rounded-2xl border border-border bg-secondary/30 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <DashboardPreviewCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
