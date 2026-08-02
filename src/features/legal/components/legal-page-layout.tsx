import type { ReactNode } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-svh">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

        <div className="mt-10 space-y-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:mt-3 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_a]:text-primary [&_a]:underline-offset-4 [&_a]:hover:underline">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
