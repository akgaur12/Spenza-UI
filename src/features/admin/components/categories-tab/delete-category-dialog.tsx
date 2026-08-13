import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteAdminCategoryMutation } from '@/features/admin/hooks/use-admin-category-mutations'
import type { SystemCategoryResponse } from '@/features/admin/types'

interface DeleteCategoryDialogProps {
  category: SystemCategoryResponse | null
  onOpenChange: (open: boolean) => void
}

export function DeleteCategoryDialog({ category, onOpenChange }: DeleteCategoryDialogProps) {
  const deleteMutation = useDeleteAdminCategoryMutation()

  function handleDelete() {
    if (!category) return
    deleteMutation.mutate(category.id)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={Boolean(category)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate Category</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-1">
              <p className="font-medium text-foreground">{category?.name}</p>
              <p>This category will be deactivated and hidden from new expenses for every user.</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Deactivate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
