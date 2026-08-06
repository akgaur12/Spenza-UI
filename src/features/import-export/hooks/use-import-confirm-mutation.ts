import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { analyticsKeys } from '@/features/analytics/hooks/query-keys'
import { dashboardKeys } from '@/features/dashboard/hooks/query-keys'
import { confirmImport } from '@/features/import-export/api/import-export.api'
import type { ImportConfirmRequest, ImportResult } from '@/features/import-export/types'
import { expensesKeys } from '@/features/expenses/hooks/query-keys'
import { getErrorMessage } from '@/lib/errors'

export interface ImportConfirmResult extends ImportResult {
  durationMs: number
}

export function useImportConfirmMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: ImportConfirmRequest): Promise<ImportConfirmResult> => {
      const startedAt = performance.now()
      const result = await confirmImport(payload)
      return { ...result, durationMs: Math.round(performance.now() - startedAt) }
    },
    onSuccess: (result) => {
      toast.success(`${result.imported_count} expenses imported`)
    },
    onError: (error) => {
      toast.error('Import failed', { description: getErrorMessage(error) })
    },
    onSettled: () => {
      // Imported expenses affect totals shown on Overview and Analytics too.
      queryClient.invalidateQueries({ queryKey: expensesKeys.all })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
      queryClient.invalidateQueries({ queryKey: analyticsKeys.all })
    },
  })
}
