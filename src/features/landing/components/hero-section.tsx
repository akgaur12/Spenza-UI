import { Link } from '@tanstack/react-router'
import { ArrowRight, IndianRupee, TrendingDown, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AnalyticsLineChartCard } from '@/features/landing/components/analytics-preview-card'

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 pt-20 pb-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14 lg:pt-28">
      <div className="flex flex-col items-center space-y-8 text-center lg:items-start lg:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-medium text-success">
          <span className="size-1.5 rounded-full bg-success" />
          Now tracking expenses smarter
        </div>

        <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:max-w-2xl lg:text-6xl lg:text-pretty">
          Track every rupee. <br className="hidden lg:block" />
          Know where it goes.
        </h1>

        <p className="max-w-lg text-lg text-muted-foreground text-balance">
          Spenza turns scattered spending into clear, actionable insight — daily tracking, smart categories, and
          analytics that actually make sense.
        </p>

        <div className="flex flex-row gap-3">
          <Button size="lg" asChild>
            <Link to="/signup">
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 size-64 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative space-y-3">
          <Card className="border-border/70 py-5 shadow-sm">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This month</p>
                <p className="text-3xl font-semibold tracking-tight">₹24,850</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-success">
                  <TrendingDown className="size-3.5" />
                  12% less than last month
                </p>
              </div>
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent">
                <Wallet className="size-6 text-accent-foreground" />
              </span>
            </CardContent>
          </Card>

          <AnalyticsLineChartCard compact />

          <Card className="border-border/70 py-5 shadow-sm">
            <CardContent className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-accent">
                <IndianRupee className="size-4 text-accent-foreground" />
              </span>
              <div>
                <p className="text-sm font-medium">Top category this week</p>
                <p className="text-xs text-muted-foreground">Food & Dining — ₹3,120</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
