import type { ImportRowErrorCode } from '@/features/import-export/types'

/** Human labels for the backend's row-validation error codes — drives the Validation Summary breakdown. */
export const IMPORT_ERROR_LABELS: Record<ImportRowErrorCode, string> = {
  INVALID_DATE: 'Invalid Date',
  CATEGORY_NOT_FOUND: 'Missing Category',
  CATEGORY_INACTIVE: 'Inactive Category',
  CATEGORY_AMBIGUOUS: 'Ambiguous Category',
  DESCRIPTION_REQUIRED: 'Missing Description',
  DESCRIPTION_TOO_LONG: 'Description Too Long',
  INVALID_AMOUNT: 'Invalid Amount',
  AMOUNT_MUST_BE_POSITIVE: 'Amount Must Be Positive',
  DUPLICATE_EXPENSE: 'Duplicate Expense',
}
