import { useEffect, useState } from 'react'

export function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft])

  const restart = (seconds = initialSeconds) => setSecondsLeft(seconds)

  return { secondsLeft, isActive: secondsLeft > 0, restart }
}
