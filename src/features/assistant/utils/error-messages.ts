/** Friendlier, second-person phrasing for the access/limit error codes the backend returns — falls back to the backend's own message when a code isn't one of these. */
const ASSISTANT_ERROR_MESSAGES: Record<string, string> = {
  AI_ASSISTANT_DISABLED: "You don't currently have access to Spenza AI. Ask an admin to enable it for your account.",
  AI_CHAT_RATE_LIMITED: "You're sending messages too quickly. Wait a moment and try again.",
  AI_CHAT_DAILY_LIMIT_EXCEEDED: "You've reached your daily message limit. Try again tomorrow.",
  AI_CHAT_MONTHLY_LIMIT_EXCEEDED: "You've reached your monthly message limit.",
  AI_CHAT_DAILY_CHAT_LIMIT_EXCEEDED: "You've reached your daily limit for starting new chats. Try again tomorrow.",
  AI_CHAT_MONTHLY_CHAT_LIMIT_EXCEEDED: "You've reached your monthly limit for starting new chats.",
}

export function describeAssistantErrorCode(errorCode: string | null | undefined): string | null {
  if (!errorCode) return null
  return ASSISTANT_ERROR_MESSAGES[errorCode] ?? null
}
