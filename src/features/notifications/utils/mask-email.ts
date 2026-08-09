/** "akash@gmail.com" → "ak****@gmail.com" — a settings page showing "where emails go" should
 * never render the full address. */
export function maskEmail(email: string): string {
  const atIndex = email.indexOf('@')
  if (atIndex <= 0) return email

  const visible = email.slice(0, Math.min(2, atIndex))
  return `${visible}****${email.slice(atIndex)}`
}
