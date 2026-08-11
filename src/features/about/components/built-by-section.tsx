import { ExternalLink } from 'lucide-react'
import { SITE_LINKS } from '@/config'

export function BuiltBySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 sm:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/40 px-5 py-10 text-center sm:px-16 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <p className="text-sm font-medium text-primary">Built by</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Akash Gaur</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground text-balance sm:text-base">
          Spenza is designed and built independently. Follow along or get in touch through the links below.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href={SITE_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            GitHub
            <ExternalLink className="size-3.5" />
          </a>
          <a
            href={SITE_LINKS.medium}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Medium
            <ExternalLink className="size-3.5" />
          </a>
          <a
            href={SITE_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            LinkedIn
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
