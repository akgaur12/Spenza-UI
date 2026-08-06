import { API_ENDPOINTS } from '@/config'
import type {
  ExportParams,
  ImportConfirmRequest,
  ImportPreviewResponse,
  ImportResult,
} from '@/features/import-export/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function previewImport(file: File, onUploadProgress?: (percent: number) => void): Promise<ImportPreviewResponse> {
  const formData = new FormData()
  formData.append('file', file)

  // apiClient's instance default `Content-Type: application/json` header would otherwise stick
  // and override the multipart boundary the browser needs to add — null clears it for this one
  // request so the browser can set the correct `multipart/form-data; boundary=...` itself.
  const { data } = await apiClient.post<ApiSuccessResponse<ImportPreviewResponse>>(
    API_ENDPOINTS.importExport.importPreview,
    formData,
    {
      headers: { 'Content-Type': null },
      onUploadProgress: (event) => {
        if (event.total) onUploadProgress?.(Math.round((event.loaded / event.total) * 100))
      },
    },
  )
  return data.data
}

export async function confirmImport(payload: ImportConfirmRequest): Promise<ImportResult> {
  const { data } = await apiClient.post<ApiSuccessResponse<ImportResult>>(
    API_ENDPOINTS.importExport.importConfirm,
    payload,
  )
  return data.data
}

interface ExportFile {
  blob: Blob
  fileName: string
}

export async function exportExpenses(params: ExportParams): Promise<ExportFile> {
  const response = await apiClient.get<Blob>(API_ENDPOINTS.importExport.export, {
    params,
    responseType: 'blob',
  })

  const disposition = response.headers['content-disposition'] as string | undefined
  const fileName = disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? `expenses.${params.format}`

  return { blob: response.data, fileName }
}
