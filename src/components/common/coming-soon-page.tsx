interface ComingSoonPageProps {
  title: string
  description?: string
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-2 text-center">
      <p className="text-sm font-medium text-primary">{title}</p>
      <h2 className="text-2xl font-semibold tracking-tight">Coming soon</h2>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
