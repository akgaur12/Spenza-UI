import type { ReactNode } from 'react'

export function ContentContainer({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-24 sm:px-6 md:pb-6 lg:px-8">{children}</main>
  )
}
