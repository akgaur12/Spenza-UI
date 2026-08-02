import { BarChart3, FileStack, Mail, PieChart, Receipt, Tags } from 'lucide-react'
import { SectionTitle } from '@/components/common/section-title'
import { FeatureCard } from '@/features/landing/components/feature-card'

const FEATURES = [
  {
    icon: Receipt,
    title: 'Daily Expense Tracking',
    description: 'Log expenses in seconds and keep every transaction organized, right as it happens.',
  },
  {
    icon: Tags,
    title: 'Smart Categories',
    description: 'Group spending into categories that make sense for you — customizable and reusable.',
  },
  {
    icon: PieChart,
    title: 'Smart Analytics',
    description: 'Visualize where your money goes with clean, readable charts and breakdowns.',
  },
  {
    icon: FileStack,
    title: 'Import & Export Data',
    description: 'Bring in existing expense data, or take yours with you — anytime, in either direction.',
  },
  {
    icon: BarChart3,
    title: 'PDF Reports',
    description: 'Polished, shareable summaries of your spending, generated automatically.',
    comingSoon: true,
  },
  {
    icon: Mail,
    title: 'Monthly Email Reports',
    description: 'A recap of your spending delivered straight to your inbox, every month.',
    comingSoon: true,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-14 sm:py-24">
      <SectionTitle
        eyebrow="Features"
        title="Everything you need to stay on top of spending"
        description="From quick daily logging to deep analytics — Spenza covers the full picture."
      />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}
