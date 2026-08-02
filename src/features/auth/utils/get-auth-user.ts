import type { QueryClient } from '@tanstack/react-query'
import { meQueryOptions } from '@/features/auth/hooks/use-me'
import type { UserMe } from '@/features/auth/types'

/**
 * Router `beforeLoad` guards run outside React, so they can't use the `useMe`
 * hook — this resolves the same cached/fetched query for use in route loaders.
 *
 * Any failure here (401, network error, timeout) resolves to `null` rather
 * than throwing: a route guard must never crash navigation just because the
 * API is unreachable — worst case, the user is treated as logged out.
 */
export async function getAuthUser(queryClient: QueryClient): Promise<UserMe | null> {
  try {
    return await queryClient.ensureQueryData(meQueryOptions())
  } catch {
    return null
  }
}
