export type ReportType = 'monthly' | 'quarterly' | 'yearly' | 'custom'

/** Body for both `POST /reports/generate` and `POST /reports/send-now` — see `ReportRequest` in the backend. */
export interface ReportRequest {
  type: ReportType
  format?: 'pdf'
  year?: number
  month?: number
  quarter?: number
  start_date?: string
  end_date?: string
}

export interface SendReportNowResponse {
  sent_to: string
  filename: string
}

interface MonthlyReportPeriod {
  type: 'monthly'
  year: number | null
  month: number | null
}

interface QuarterlyReportPeriod {
  type: 'quarterly'
  year: number | null
  quarter: number | null
}

interface YearlyReportPeriod {
  type: 'yearly'
  year: number | null
}

interface CustomReportPeriod {
  type: 'custom'
  startDate: string | null
  endDate: string | null
}

/** Local form state for the report builder — one shape per `ReportType`, kept as a discriminated union so each selector only ever sees its own fields. */
export type ReportPeriod = MonthlyReportPeriod | QuarterlyReportPeriod | YearlyReportPeriod | CustomReportPeriod

export interface ResolvedReportRange {
  startDate: string
  endDate: string
}
