import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { AboutHeroSection } from '@/features/about/components/about-hero-section'
import { AboutValuesSection } from '@/features/about/components/about-values-section'
import { BuiltBySection } from '@/features/about/components/built-by-section'

export function AboutPage() {
  return (
    <div className="min-h-svh">
      <Navbar />
      <main>
        <AboutHeroSection />
        <AboutValuesSection />
        <BuiltBySection />
      </main>
      <Footer />
    </div>
  )
}
