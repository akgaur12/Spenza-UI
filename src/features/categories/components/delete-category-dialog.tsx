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
import { useDeleteCategoryMutation } from '@/features/categories/hooks/use-delete-category-mutation'
import type { CategoryListItem } from '@/features/categories/types'

interface DeleteCategoryDialogProps {
  category: CategoryListItem | null
  onOpenChange: (open: boolean) => void
}

export function DeleteCategoryDialog({ category, onOpenChange }: DeleteCategoryDialogProps) {
  const deleteMutation = useDeleteCategoryMutation()

  function handleDelete() {
    if (!category) return
    deleteMutation.mutate(category.id)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={Boolean(category)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-1">
              <p className="font-medium text-foreground">{category?.name}</p>
              <p>This action cannot be undone.</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
