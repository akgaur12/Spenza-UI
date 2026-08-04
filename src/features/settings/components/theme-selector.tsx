import { Laptop, Moon, Sun } from 'lucide-react'
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
            'flex-1 flex-col gap-1.5 py-2 h-auto',
            theme === option.value && 'border-primary bg-accent text-foreground',
          )}
        >
          <option.icon className="size-4" />
          {option.label}
        </Button>
      ))}
    </div>
  )
}
