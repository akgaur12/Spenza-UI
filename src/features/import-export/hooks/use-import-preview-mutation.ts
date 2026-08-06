import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { previewImport } from '@/features/import-export/api/import-export.api'
import { getErrorMessage } from '@/lib/errors'

export function useImportPreviewMutation() {
  const [uploadPercent, setUploadPercent] = useState(0)

  const mutation = useMutation({
    mutationFn: (file: File) => {
      setUploadPercent(0)
      return previewImport(file, setUploadPercent)
    },
    onError: (error) => {
      toast.error('Could not read that file', { description: getErrorMessage(error) })
    },
  })

  return { ...mutation, uploadPercent }
}
