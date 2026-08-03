import { format } from 'date-fns'
import { useAuth } from '@/features/auth/components/auth-provider'

export function GreetingCard() {
  const { user } = useAuth()
  const name = user?.full_name || user?.username

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Hey{name ? `, ${name}` : ''} <span className="text-lg align-middle">✨</span>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{format(new Date(), 'EEE, d MMM yyyy')}</p>
    </div>
  )
}
