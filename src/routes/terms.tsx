import { createFileRoute } from '@tanstack/react-router'
import { TermsAndConditionsPage } from '@/features/legal/components/terms-and-conditions-page'

export const Route = createFileRoute('/terms')({
  component: TermsAndConditionsPage,
})
