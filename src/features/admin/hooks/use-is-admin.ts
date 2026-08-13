import { queryOptions, useQuery } from '@tanstack/react-query'
import { listAdminUsers } from '@/features/admin/api/admin-users.api'
import { adminKeys } from '@/features/admin/hooks/query-keys'
import { ApiError } from '@/types/api'

/**
 * There's no `role` field on the self-facing user types, so admin status is
 * derived by probing an admin-only endpoint: a 403 means "not admin" (the
 * overwhelming majority of users), resolved as `false` rather than thrown so
 * it never surfaces as an error toast. Any other failure (network, 5xx) is
 * rethrown — a real outage shouldn't be silently cached as "not admin".
 */
export function isAdminQueryOptions() {
  return queryOptions({
    queryKey: adminKeys.isAdmin(),
    queryFn: async () => {
      try {
        await listAdminUsers({ page: 1, page_size: 1 })
        return true
      } catch (error) {
        if (error instanceof ApiError && error.status === 403) return false
        throw error
      }
    },
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 403) return false
      return failureCount < 1
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useIsAdmin() {
  const query = useQuery(isAdminQueryOptions())
  return { isAdmin: query.data === true, isLoading: query.isLoading }
}
