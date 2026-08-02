import { queryOptions, useQuery } from '@tanstack/react-query'
import { getMe } from '@/features/auth/api/auth.api'
import { ApiError } from '@/types/api'
import { authKeys } from './query-keys'

/**
 * Source of truth for "is the user logged in". A 401 here means no valid
 * session (guest) — not an application error — so retries are disabled.
 */
export function meQueryOptions() {
  return queryOptions({
    queryKey: authKeys.me(),
    queryFn: getMe,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 401) return false
      return failureCount < 1
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useMe() {
  return useQuery(meQueryOptions())
}
