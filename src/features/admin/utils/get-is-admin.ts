import type { QueryClient } from '@tanstack/react-query'
import { isAdminQueryOptions } from '@/features/admin/hooks/use-is-admin'

/**
 * Non-hook resolver for use inside the `/admin` route's `beforeLoad` guard —
 * any failure (network error, unexpected 5xx) collapses to `false` so a route
 * guard never crashes navigation, matching `getAuthUser()`'s precedent.
 */
export async function getIsAdmin(queryClient: QueryClient): Promise<boolean> {
  try {
    return await queryClient.ensureQueryData(isAdminQueryOptions())
  } catch {
    return false
  }
}
