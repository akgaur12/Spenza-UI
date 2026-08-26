import { createFileRoute } from '@tanstack/react-router'
import { AssistantPage } from '@/features/assistant/assistant-page'

export interface AssistantSearch {
  chat?: string
}

export const Route = createFileRoute('/_app/assistant')({
  validateSearch: (search: Record<string, unknown>): AssistantSearch => ({
    chat: typeof search.chat === 'string' ? search.chat : undefined,
  }),
  component: AssistantPage,
})
