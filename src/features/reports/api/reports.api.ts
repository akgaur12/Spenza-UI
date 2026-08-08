import { API_ENDPOINTS } from '@/config'
import type { ReportRequest, SendReportNowResponse } from '@/features/reports/types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

interface ReportFile {
  blob: Blob
  /** `null` when the response is missing `Content-Disposition` — callers fall back to a generated name. */
  fileName: string | null
}

export async function generateReport(payload: ReportRequest): Promise<ReportFile> {
  const response = await apiClient.post<Blob>(API_ENDPOINTS.reports.generate, payload, {
    responseType: 'blob',
  })

  const disposition = response.headers['content-disposition'] as string | undefined
  const fileName = disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? null

  return { blob: response.data, fileName }
}

export async function sendReportNow(payload: ReportRequest): Promise<SendReportNowResponse> {
  const { data } = await apiClient.post<ApiSuccessResponse<SendReportNowResponse>>(
    API_ENDPOINTS.reports.sendNow,
    payload,
  )
  return data.data
}
