/**
 * Combines a user-picked calendar day with a time-of-day. If it's the same day as the
 * expense's original timestamp, that exact original time is preserved (so editing the
 * description doesn't silently shift "spent at 9pm" to "spent right now"). Otherwise the
 * new day gets the current clock time, since we have no better signal for what time it was.
 */
export function buildSpentAt(pickedDate: Date, originalIso?: string): string {
  if (originalIso) {
    const original = new Date(originalIso)
    const sameDay =
      pickedDate.getFullYear() === original.getFullYear() &&
      pickedDate.getMonth() === original.getMonth() &&
      pickedDate.getDate() === original.getDate()
    if (sameDay) return original.toISOString()
  }

  const now = new Date()
  const combined = new Date(pickedDate)
  combined.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds())
  return combined.toISOString()
}
