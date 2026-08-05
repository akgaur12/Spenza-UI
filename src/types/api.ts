/**
 * Every Spenza backend response uses this envelope — never a bare object.
 * See src/core/responses.py in the backend.
 */
export interface ApiSuccessResponse<T> {
  success: true
  message: string
  data: T
}

export interface ApiErrorBody {
  success: false
  message: string
  error_code: string
  details: Record<string, unknown> | null
}

/** Stable error_code values the backend can return for auth endpoints. */
export type ApiErrorCode =
  | 'EMAIL_ALREADY_EXISTS'
  | 'USERNAME_ALREADY_EXISTS'
  | 'WEAK_PASSWORD'
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_NOT_VERIFIED'
  | 'ACCOUNT_INACTIVE'
  | 'ACCOUNT_LOCKED'
  | 'USER_NOT_FOUND'
  | 'INVALID_OTP'
  | 'OTP_EXPIRED'
  | 'OTP_ATTEMPTS_EXCEEDED'
  | 'OTP_ALREADY_VERIFIED'
  | 'OTP_RESEND_COOLDOWN'
  | 'INVALID_REFRESH_TOKEN'
  | 'REFRESH_TOKEN_EXPIRED'
  | 'REFRESH_TOKEN_REVOKED'
  | 'INVALID_ACCESS_TOKEN'
  | 'INVALID_RESET_TOKEN'
  | 'ADMIN_PRIVILEGES_REQUIRED'
  | 'CANNOT_MODIFY_OWN_ACCOUNT'
  | 'VALIDATION_ERROR'
  | 'TOO_MANY_REQUESTS'
  | 'HTTP_ERROR'
  | 'INTERNAL_ERROR'
  | 'CATEGORY_ALREADY_EXISTS'
  | 'CATEGORY_NOT_FOUND'
  | 'SYSTEM_CATEGORY_READ_ONLY'
  | 'INCOMPLETE_DATE_RANGE'
  | 'INVALID_DATE_RANGE'
  | 'DATE_RANGE_TOO_LARGE'
  | 'INVALID_YEAR'

/** Thrown by the axios response interceptor for every non-2xx response. */
export class ApiError extends Error {
  readonly errorCode: ApiErrorCode | (string & {})
  readonly status: number
  readonly details: Record<string, unknown> | null

  constructor(body: ApiErrorBody, status: number) {
    super(body.message)
    this.name = 'ApiError'
    this.errorCode = body.error_code
    this.status = status
    this.details = body.details
  }
}
