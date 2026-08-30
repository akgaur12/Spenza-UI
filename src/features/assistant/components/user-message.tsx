import { memo } from 'react'

interface UserMessageProps {
  content: string
  isPending?: boolean
}

export const UserMessage = memo(function UserMessage({ content, isPending }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-base break-words whitespace-pre-wrap text-primary-foreground data-[pending=true]:opacity-70"
        data-pending={isPending}
      >
        {content}
      </div>
    </div>
  )
})
