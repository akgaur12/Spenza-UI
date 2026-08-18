import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/common/theme-provider'
import { AuthProvider } from '@/features/auth/components/auth-provider'
import { queryClient } from '@/app/query-client'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  return <RouterProvider router={router} />
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found')
}

// Recharts gives its root <svg>, z-index layer groups, and individual shapes (pie sectors,
// etc.) tabindex for keyboard a11y. Tapping/clicking any part of a chart focuses that
// element, and some mobile browsers paint their default focus ring regardless of the
// `outline: none` override in index.css — blurring immediately guarantees no ring can
// render. The substring match catches every such element, not just the root surface.
document.addEventListener('focusin', (event) => {
  const target = event.target
  if (target instanceof Element && target.getAttribute('class')?.includes('recharts')) {
    ;(target as HTMLElement | SVGElement).blur()
  }
})

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
        <Toaster richColors closeButton />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
