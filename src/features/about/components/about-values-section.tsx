import { Gift, ShieldCheck, Sparkles, XCircle } from 'lucide-react'
import { SectionTitle } from '@/components/common/section-title'
import { FeatureCard } from '@/features/landing/components/feature-card'

const VALUES = [
  {
    icon: Sparkles,
    title: 'Simple by default',
    description: 'No setup wizards or configuration before you can log your first expense.',
  },
  {
    icon: ShieldCheck,
    title: 'Your data stays yours',
    description: 'No selling data, no sharing it with third parties, no dark patterns.',
  },
  {
    icon: XCircle,
    title: 'No ads, no upsells',
    description: 'Every screen is built for tracking expenses, not for selling you something else.',
  },
  {
    icon: Gift,
    title: 'Free to use',
    description: 'The core experience — tracking, categories, analytics, reports — costs nothing.',
  },
]

export function AboutValuesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 sm:py-24">
      <SectionTitle eyebrow="What it stands for" title="A few things Spenza won't compromise on" />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4">
        {VALUES.map((value) => (
          <FeatureCard key={value.title} {...value} />
        ))}
      </div>
    </section>
  )
}
