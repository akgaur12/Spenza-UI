/** Parsed, typed environment variables — the only place `import.meta.env` should be read directly. */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
  appEnv: import.meta.env.VITE_APP_ENV,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  analyticsYearFilterCount: Number(import.meta.env.VITE_ANALYTICS_YEAR_FILTER_COUNT) || 6,
  analyticsYearFilterMinYear: Number(import.meta.env.VITE_ANALYTICS_YEAR_FILTER_MIN_YEAR) || 2020,
  analyticsTrendYearlyCount: Number(import.meta.env.VITE_ANALYTICS_TREND_YEARLY_COUNT) || 6,
} as const

/**
 * Every backend route path, in one place, grouped by module.
 *
 * The `auth`/`user`/`admin` groups are unversioned (`/api/users`, `/api/admin/users`)
 * while `categories`/`expenses`/`dashboard`/`analytics` are versioned (`/api/v1/...`)
 * — this split is intentional and matches the backend's own routing (verified
 * against src/app.py and the module routers in the Spenza backend, not assumed).
 *
 * `importExport` route contracts were confirmed against the running backend's
 * OpenAPI schema (GET /openapi.json) before being added here.
 */
export const API_ENDPOINTS = {
  auth: {
    signup: '/api/users/signup',
    verifySignupOtp: '/api/users/verify-signup-otp',
    /** Schema exists on the backend but no route is wired up yet — see auth.api.ts. */
    resendSignupOtp: '/api/users/resend-otp',
    login: '/api/users/login',
    loginJson: '/api/users/login-json',
    refreshToken: '/api/users/refresh-token',
    logout: '/api/users/logout',
    logoutAllDevices: '/api/users/logout-all-devices',
    me: '/api/users/me',
    forgotPassword: '/api/users/forgot-password',
    verifyResetOtp: '/api/users/verify-reset-otp',
    resetPassword: '/api/users/reset-password',
    changePassword: '/api/users/change-password',
  },
  user: {
    updateUsername: '/api/users/update-username',
    updateProfile: '/api/users/update-profile',
    profile: '/api/users/profile',
    deleteUser: '/api/users/delete-user',
  },
  admin: {
    users: '/api/admin/users',
    user: (userId: string) => `/api/admin/users/${userId}`,
    setUserActive: (userId: string) => `/api/admin/users/${userId}/active`,
    unlockUser: (userId: string) => `/api/admin/users/${userId}/unlock`,
    categories: '/api/v1/admin/categories',
    category: (categoryId: string) => `/api/v1/admin/categories/${categoryId}`,
  },
  categories: {
    list: '/api/v1/categories',
    detail: (categoryId: string) => `/api/v1/categories/${categoryId}`,
  },
  expenses: {
    list: '/api/v1/expenses',
    detail: (expenseId: string) => `/api/v1/expenses/${expenseId}`,
  },
  dashboard: {
    summary: '/api/v1/dashboard/summary',
  },
  analytics: {
    trends: '/api/v1/analytics/trends',
    categories: '/api/v1/analytics/categories',
    calendarHeatmap: '/api/v1/analytics/calendar-heatmap',
  },
  importExport: {
    importPreview: '/api/v1/import/expenses/preview',
    importConfirm: '/api/v1/import/expenses/confirm',
    export: '/api/v1/export/expenses',
  },
  /** Confirmed against the running backend's OpenAPI schema and `src/modules/reports/router.py`. */
  reports: {
    generate: '/api/v1/reports/generate',
    sendNow: '/api/v1/reports/send-now',
  },
  /** Confirmed against `src/modules/recurring_expenses/router.py` on the backend. */
  recurringExpenses: {
    list: '/api/v1/recurring-expenses',
    detail: (recurringExpenseId: string) => `/api/v1/recurring-expenses/${recurringExpenseId}`,
    pause: (recurringExpenseId: string) => `/api/v1/recurring-expenses/${recurringExpenseId}/pause`,
    resume: (recurringExpenseId: string) => `/api/v1/recurring-expenses/${recurringExpenseId}/resume`,
    run: (recurringExpenseId: string) => `/api/v1/recurring-expenses/${recurringExpenseId}/run`,
  },
} as const

/** External links and contact addresses used across the site (footer, legal pages, etc). */
export const SITE_LINKS = {
  github: 'https://github.com/akgaur12',
  medium: 'https://medium.com/@ak_gaur',
  privacyEmail: 'privacy@spenza.app',
  legalEmail: 'legal@spenza.app',
} as const
