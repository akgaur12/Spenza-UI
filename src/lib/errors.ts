import { ApiError } from '@/types/api'

/** Extracts a user-displayable message from any error thrown by the API layer. */
export function getErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (error instanceof ApiError) {
    return error.message || fallback
  }
  if (error instanceof Error) {
    return error.message || fallback
  }
  return fallback
}

export function getErrorCode(error: unknown): string | null {
  return error instanceof ApiError ? error.errorCode : null
}
