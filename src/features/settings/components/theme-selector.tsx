import { Check, Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Laptop },
] as const

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <div role="radiogroup" aria-label="Theme" className="flex w-full max-w-sm gap-2">
      {THEME_OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant="outline"
          role="radio"
          aria-checked={theme === option.value}
          onClick={() => setTheme(option.value)}
          className={cn(
            'relative flex-1 flex-col gap-1.5 py-2 h-auto transition-all',
            theme === option.value
              ? 'border-primary bg-accent text-foreground ring-2 ring-primary/30'
              : 'hover:border-primary/50',
          )}
        >
          {theme === option.value && (
            <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
          )}
          <option.icon className="size-4" />
          {option.label}
        </Button>
      ))}
    </div>
  )
}
