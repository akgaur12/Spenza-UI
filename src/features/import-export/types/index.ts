export type ImportRowErrorCode =
  | 'INVALID_DATE'
  | 'CATEGORY_NOT_FOUND'
  | 'CATEGORY_INACTIVE'
  | 'CATEGORY_AMBIGUOUS'
  | 'DESCRIPTION_REQUIRED'
  | 'DESCRIPTION_TOO_LONG'
  | 'INVALID_AMOUNT'
  | 'AMOUNT_MUST_BE_POSITIVE'
  | 'DUPLICATE_EXPENSE'

export interface ImportRowError {
  field: string
  code: ImportRowErrorCode
  message: string
}

export interface ImportPreviewCategory {
  id: string
  name: string
}

export interface ImportPreviewRow {
  row_number: number
  date: string | null
  category: ImportPreviewCategory | null
  description: string | null
  amount: string | null
  valid: boolean
  errors: ImportRowError[]
}

export interface ImportPreviewResponse {
  import_token: string
  file_name: string
  file_type: 'csv' | 'xlsx'
  total_rows: number
  valid_rows: number
  invalid_rows: number
  expires_at: string
  rows: ImportPreviewRow[]
}

export interface ImportConfirmRequest {
  import_token: string
}

export interface ImportResult {
  status: 'completed'
  imported_count: number
  failed_count: number
}

export type ExportFormat = 'csv' | 'xlsx'

export interface ExportParams {
  format: ExportFormat
  start_date?: string
  end_date?: string
  category_id?: string
  search?: string
}

export type ExportDateRangePreset = 'month' | 'year' | 'last_year' | 'all' | 'custom'

export interface ExportDateRange {
  preset: ExportDateRangePreset
  startDate?: string
  endDate?: string
}

/** Persisted client-side only — the backend has no import-history endpoint yet. */
export interface ImportHistoryEntry {
  id: string
  importedAt: string
  fileName: string
  totalRows: number
  importedCount: number
  failedCount: number
  status: 'completed' | 'failed'
  durationMs: number
}

export type ImportWizardStep = 'upload' | 'preview' | 'validate' | 'import' | 'complete'
