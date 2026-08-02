/** Parsed, typed environment variables — the only place `import.meta.env` should be read directly. */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
  appEnv: import.meta.env.VITE_APP_ENV,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const

/**
 * Every backend route path, in one place, grouped by module.
 *
 * The `auth`/`user`/`admin` groups are unversioned (`/api/users`, `/api/admin/users`)
 * while `categories`/`expenses` are versioned (`/api/v1/...`) — this split is
 * intentional and matches the backend's own routing (verified against
 * src/app.py and the module routers in the Spenza backend, not assumed).
 *
 * `dashboard`/`analytics`/`import-export` are deliberately omitted: their
 * route contracts haven't been verified against the backend yet. Add them
 * here — and only here — once confirmed, rather than guessing paths.
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
} as const

/** External links and contact addresses used across the site (footer, legal pages, etc). */
export const SITE_LINKS = {
  github: 'https://github.com/akgaur12',
  medium: 'https://medium.com/@ak_gaur',
  privacyEmail: 'privacy@spenza.app',
  legalEmail: 'legal@spenza.app',
} as const
