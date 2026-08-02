import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/features/landing/components/hero-section'
import { FeaturesSection } from '@/features/landing/components/features-section'
import { AnalyticsSection } from '@/features/landing/components/analytics-section'
import { ImportExportSection } from '@/features/landing/components/import-export-section'
import { DashboardPreviewSection } from '@/features/landing/components/dashboard-preview-section'
import { CtaSection } from '@/features/landing/components/cta-section'

export function LandingPage() {
  return (
    <div className="min-h-svh">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AnalyticsSection />
        <ImportExportSection />
        <DashboardPreviewSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
