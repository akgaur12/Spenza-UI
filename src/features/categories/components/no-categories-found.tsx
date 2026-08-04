import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NoCategoriesFound({ onClearSearch }: { onClearSearch: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-4 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <SearchX className="size-6" />
      </div>
      <p className="text-sm text-muted-foreground">No matching categories found.</p>
      <Button variant="outline" onClick={onClearSearch}>
        Clear Search
      </Button>
    </div>
  )
}
