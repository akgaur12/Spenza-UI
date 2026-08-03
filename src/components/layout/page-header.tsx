import { useLocation } from '@tanstack/react-router'
import { NAV_ITEMS } from '@/config/navigation'

export function PageHeader() {
  const { pathname } = useLocation()
  const activeItem = NAV_ITEMS.find((item) => pathname.startsWith(item.href))
  const title = activeItem?.title ?? 'Spenza'

  return (
    <div className="hidden min-w-0 flex-col justify-center md:flex">
      <h1 className="truncate text-base font-semibold leading-none">{title}</h1>
      <p className="mt-1 truncate text-xs text-muted-foreground">Home / {title}</p>
    </div>
  )
}
