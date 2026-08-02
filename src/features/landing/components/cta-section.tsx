import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 sm:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/40 px-5 py-10 text-center sm:px-16 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <h2 className="mx-auto max-w-xl text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
          Start understanding your money today
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground text-balance sm:mt-4 sm:text-base">
          Free to get started. No credit card required.
        </p>
        <div className="mt-6 flex flex-row items-center justify-center gap-2 sm:mt-8 sm:gap-3">
          <Button size="lg" className="px-4 text-sm sm:px-6 sm:text-base" asChild>
            <Link to="/signup">
              Get started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-4 text-sm sm:px-6 sm:text-base" asChild>
            <Link to="/login">
              <span className="sm:hidden">Log in</span>
              <span className="hidden sm:inline">I already have an account</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
