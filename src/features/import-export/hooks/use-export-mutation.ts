import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { exportExpenses } from '@/features/import-export/api/import-export.api'
import type { ExportParams } from '@/features/import-export/types'
import { downloadBlob } from '@/features/import-export/utils/download-file'
import { getErrorMessage } from '@/lib/errors'

export function useExportMutation() {
  return useMutation({
    mutationFn: (params: ExportParams) => exportExpenses(params),
    onSuccess: ({ blob, fileName }) => {
      downloadBlob(blob, fileName)
      toast.success('Export ready — your download has started')
    },
    onError: (error) => {
      toast.error('Could not export expenses', { description: getErrorMessage(error) })
    },
  })
}
