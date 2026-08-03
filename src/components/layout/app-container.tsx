import type { ReactNode } from 'react'

export function AppContainer({ children }: { children: ReactNode }) {
  return <div className="flex h-svh overflow-hidden bg-background">{children}</div>
}
