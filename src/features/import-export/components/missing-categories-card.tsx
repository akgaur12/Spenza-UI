import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LoadingButton } from '@/components/common/loading-button'
import { useCreateCategoryMutation } from '@/features/categories/hooks/use-create-category-mutation'
import { extractMissingCategoryNames } from '@/features/import-export/utils/missing-categories'
import type { ImportPreviewRow } from '@/features/import-export/types'

interface MissingCategoriesCardProps {
  rows: ImportPreviewRow[]
  onCategoryCreated: () => void
  isRechecking: boolean
}

/** Lets the user create categories the imported file referenced but don't exist yet, without leaving the wizard to fix and re-upload the file. */
export function MissingCategoriesCard({ rows, onCategoryCreated, isRechecking }: MissingCategoriesCardProps) {
  const missingNames = extractMissingCategoryNames(rows)
  const createMutation = useCreateCategoryMutation()
  const [createdNames, setCreatedNames] = useState<Set<string>>(new Set())
  const [pendingName, setPendingName] = useState<string | null>(null)

  if (missingNames.length === 0) return null

  async function handleCreate(name: string) {
    setPendingName(name)
    try {
      await createMutation.mutateAsync({ name })
      setCreatedNames((current) => new Set(current).add(name))
      toast.success(`Category "${name}" created`)
    } catch {
      // useCreateCategoryMutation's onError already toasts the failure.
    } finally {
      setPendingName(null)
    }
  }

  const allCreated = createdNames.size === missingNames.length

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <div>
        <p className="text-sm font-medium">Missing categories</p>
        <p className="text-xs text-muted-foreground">
          This file references categories that don't exist yet. Create them here, then re-check the file to clear those errors.
        </p>
      </div>

      <ul className="space-y-2">
        {missingNames.map((name) => {
          const isCreated = createdNames.has(name)
          return (
            <li key={name} className="flex items-center justify-between gap-3 text-sm">
              <span className={isCreated ? 'text-muted-foreground line-through' : 'text-foreground'}>{name}</span>
              {isCreated ? (
                <Badge variant="secondary" className="text-success">
                  Created
                </Badge>
              ) : (
                <LoadingButton
                  type="button"
                  size="sm"
                  variant="outline"
                  isLoading={pendingName === name}
                  loadingText="Creating…"
                  onClick={() => handleCreate(name)}
                >
                  Create
                </LoadingButton>
              )}
            </li>
          )
        })}
      </ul>

      {createdNames.size > 0 && (
        <div className="flex items-center justify-between gap-3 border-t pt-3">
          <p className="text-xs text-muted-foreground">
            {allCreated ? 'All missing categories created.' : `${createdNames.size} of ${missingNames.length} created.`}
          </p>
          <Button type="button" size="sm" onClick={onCategoryCreated} disabled={isRechecking}>
            {isRechecking ? 'Re-checking…' : 'Re-check File'}
          </Button>
        </div>
      )}
    </div>
  )
}
