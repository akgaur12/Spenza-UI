import { FolderPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyCategories({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-4 py-10 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <FolderPlus className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">You haven't created any categories yet.</p>
        <p className="text-sm text-muted-foreground">Create your first custom category.</p>
      </div>
      <Button onClick={onCreate}>Create Category</Button>
    </div>
  )
}
