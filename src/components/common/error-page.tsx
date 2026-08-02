import { Link, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function ErrorPage({ error }: { error: Error }) {
  const router = useRouter()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-medium text-destructive">Something went wrong</p>
      <h1 className="text-2xl font-semibold tracking-tight">This page hit an unexpected error</h1>
      <p className="max-w-sm text-sm text-muted-foreground">{error.message || 'Please try again.'}</p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.invalidate()}>
          Try again
        </Button>
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
