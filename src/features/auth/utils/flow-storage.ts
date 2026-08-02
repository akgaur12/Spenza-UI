/**
 * The reset_token is short-lived and single-use, so it's kept out of the URL
 * (unlike email, which travels as a search param) and out of any persisted
 * store — sessionStorage only, cleared once consumed.
 */
const RESET_TOKEN_KEY = 'spenza:reset-token'

export const resetTokenStorage = {
  get: (): string | null => sessionStorage.getItem(RESET_TOKEN_KEY),
  set: (token: string): void => sessionStorage.setItem(RESET_TOKEN_KEY, token),
  clear: (): void => sessionStorage.removeItem(RESET_TOKEN_KEY),
}
