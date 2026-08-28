import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function ContentContainer({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <main
      className={cn(
        'mx-auto w-full flex-1 px-4 py-6 pb-24 sm:px-6 md:pb-6 lg:px-8',
        wide ? 'max-w-[1600px]' : 'max-w-6xl',
      )}
    >
      {children}
    </main>
  )
}
