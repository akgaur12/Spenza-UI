import type { ReactNode } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/features/auth/components/auth-provider'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-svh items-center justify-center bg-background">
        <Skeleton className="size-10 rounded-full" />
      </div>
    )
  }

  return children
}
