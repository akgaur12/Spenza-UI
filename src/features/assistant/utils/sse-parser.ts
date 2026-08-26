import type { SSEEvent } from '@/features/assistant/types/chat.types'

const VALID_EVENT_NAMES = new Set<SSEEvent['event']>([
  'run_started',
  'message_started',
  'tool_started',
  'tool_result',
  'message_delta',
  'message_completed',
  'run_completed',
  'run_failed',
  'run_cancelled',
])

function parseBlock(block: string): SSEEvent | null {
  let eventName: string | null = null
  let dataLine: string | null = null

  for (const line of block.split('\n')) {
    if (line.startsWith('event:')) eventName = line.slice('event:'.length).trim()
    else if (line.startsWith('data:')) dataLine = line.slice('data:'.length).trim()
  }

  if (!eventName || dataLine === null || !VALID_EVENT_NAMES.has(eventName as SSEEvent['event'])) return null

  try {
    return { event: eventName, data: JSON.parse(dataLine) } as SSEEvent
  } catch {
    return null
  }
}

/**
 * Incremental SSE frame buffer. Backend frames are separated by a blank line
 * (`\n\n`); a single `fetch` stream chunk can contain zero, one, or several
 * complete frames, and can also split a frame across chunk boundaries.
 */
export class SSEBuffer {
  private buffer = ''

  /** Feeds a raw decoded chunk and returns every complete event parsed out of it. */
  push(chunk: string): SSEEvent[] {
    this.buffer += chunk
    const blocks = this.buffer.split('\n\n')
    this.buffer = blocks.pop() ?? ''
    return blocks.map(parseBlock).filter((event): event is SSEEvent => event !== null)
  }
}
