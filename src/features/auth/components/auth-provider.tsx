import { createContext, use, useEffect, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useMe } from '@/features/auth/hooks/use-me'
import type { UserMe } from '@/features/auth/types'
import { AUTH_LOGOUT_EVENT } from '@/services/api-client'
import { authKeys } from '@/features/auth/hooks/query-keys'

interface AuthContextValue {
  user: UserMe | null
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useMe()
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleForcedLogout = () => {
      queryClient.setQueryData(authKeys.me(), null)
    }
    window.addEventListener(AUTH_LOGOUT_EVENT, handleForcedLogout)
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handleForcedLogout)
  }, [queryClient])

  const value: AuthContextValue = {
    user: user ?? null,
    isAuthenticated: Boolean(user),
    isLoading,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth(): AuthContextValue {
  const context = use(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
