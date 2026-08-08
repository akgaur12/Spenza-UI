import axios, { type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'
import { API_ENDPOINTS, env } from '@/config'
import type { ApiErrorBody, ApiSuccessResponse } from '@/types/api'
import { ApiError } from '@/types/api'

/**
 * Both access_token and refresh_token are HttpOnly cookies set by the backend —
 * the frontend never reads or stores their values directly. `withCredentials`
 * ensures the browser attaches/accepts those cookies on every request.
 */
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface RetriableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

/** Routes that must never trigger a refresh attempt on 401 (avoids infinite loops). */
const AUTH_EXEMPT_PATHS = [API_ENDPOINTS.auth.login, API_ENDPOINTS.auth.refreshToken, API_ENDPOINTS.auth.logout]

/** Dispatched so the app (AuthProvider) can react when a session can no longer be refreshed. */
export const AUTH_LOGOUT_EVENT = 'spenza:auth-logout'

let refreshPromise: Promise<void> | null = null

async function refreshAccessToken(): Promise<void> {
  refreshPromise ??= apiClient
    .post(API_ENDPOINTS.auth.refreshToken)
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null
    })
  return refreshPromise
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError<ApiErrorBody>(error) || !error.response) {
      if (axios.isAxiosError(error)) {
        toast.error('Network error', { description: 'Could not reach the server. Check your connection.' })
      }
      return Promise.reject(error)
    }

    /**
     * A request made with `responseType: 'blob'` (PDF/file downloads) still gets a JSON
     * error body on failure, but axios parses the response per the request's configured
     * `responseType` regardless of status — so a failed blob request lands here with
     * `response.data` as an unparsed `Blob` instead of the expected `ApiErrorBody`. Decode
     * it back to JSON first so the `error_code` check and `ApiError` below see real data.
     */
    const rawData: unknown = error.response.data
    if (rawData instanceof Blob && rawData.type.includes('json')) {
      error.response.data = JSON.parse(await rawData.text())
    }

    const originalRequest = error.config as RetriableConfig | undefined
    const url = originalRequest?.url ?? ''
    const isExempt = AUTH_EXEMPT_PATHS.some((path) => url.includes(path))
    /**
     * The backend also returns plain 401s for reasons unrelated to token expiry — e.g.
     * a wrong "confirm your password" on change-password/delete-account is `401
     * INVALID_CREDENTIALS`. Only `INVALID_ACCESS_TOKEN` means the access token itself
     * is the problem; anything else must be surfaced as a normal error, not treated as
     * a dead session (a wrong-password retry would just fail again with the same code,
     * and that second failure was being caught and misread as "session expired").
     */
    const isExpiredToken = error.response.data?.error_code === 'INVALID_ACCESS_TOKEN'

    if (isExpiredToken && !isExempt && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await refreshAccessToken()
        return await apiClient(originalRequest)
      } catch {
        window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT))
      }
    }

    if (error.response.data) {
      return Promise.reject(new ApiError(error.response.data, error.response.status))
    }
    return Promise.reject(error)
  },
)

export type { ApiSuccessResponse }
