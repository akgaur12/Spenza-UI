import { getRouteApi, Link } from '@tanstack/react-router'
import { Menu, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/common/logo'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { UserMenu } from '@/components/layout/user-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { AssistantNavRail } from '@/features/assistant/components/assistant-nav-rail'
import { ChatComposer } from '@/features/assistant/components/chat-composer'
import { ChatMessages } from '@/features/assistant/components/chat-messages'
import { ChatSidebar } from '@/features/assistant/components/chat-sidebar'
import { FinancialDisclaimer } from '@/features/assistant/components/financial-disclaimer'
import { NewChatHero } from '@/features/assistant/components/new-chat-hero'
import { useAssistant } from '@/features/assistant/hooks/use-assistant'
import { useChatMessagesMeta } from '@/features/assistant/hooks/use-chat-messages'
import { useSendToAssistant } from '@/features/assistant/hooks/use-send-to-assistant'
import { useAuth } from '@/features/auth/components/auth-provider'
import { NotificationBell } from '@/features/notifications/components/notification-bell'
import { useMediaQuery } from '@/hooks/use-media-query'

const routeApi = getRouteApi('/_app/assistant')

/**
 * A full-viewport takeover (fixed inset-0, above the app's own topbar/sidebar/bottom-nav)
 * so the assistant reads as its own focused chat app. Three columns: the Spenza app nav
 * (icon rail), the chat list, then the message thread centered in the remaining space.
 * The top header mirrors Topbar.tsx exactly so it still reads as the same app.
 */
export function AssistantPage() {
  const { user } = useAuth()
  const search = routeApi.useSearch()
  const navigate = routeApi.useNavigate()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { activeChatId, setActiveChatId, streaming } = useAssistant()
  const sendMessage = useSendToAssistant()
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const metaQuery = useChatMessagesMeta(activeChatId)
  const isLiveHere =
    streaming.state.activeChatId === activeChatId &&
    (streaming.state.isStreaming || Boolean(streaming.state.error) || streaming.state.wasCancelled)
  const isNewChat = !isLiveHere && (!activeChatId || (metaQuery.isSuccess && metaQuery.data.total_pages === 0))

  // The URL is authoritative on load/refresh (deep link); otherwise fall back to the
  // shared context so a conversation started from the floating panel carries over.
  useEffect(() => {
    if (search.chat && search.chat !== activeChatId) {
      setActiveChatId(search.chat)
    } else if (!search.chat && activeChatId) {
      void navigate({ search: { chat: activeChatId }, replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.chat])

  function handleSelectChat(chatId: string) {
    setActiveChatId(chatId)
    void navigate({ search: { chat: chatId } })
    setDrawerOpen(false)
  }

  const isStreamingHere = streaming.state.isStreaming && streaming.state.activeChatId === activeChatId

  if (!user?.ai_assistant.enabled) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Sparkles className="size-6" />
        </div>
        <div className="max-w-sm space-y-1">
          <h1 className="text-lg font-semibold text-foreground">Spenza AI isn't available for your account</h1>
          <p className="text-sm text-muted-foreground">Ask an admin to grant you access to the AI assistant.</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/overview">Back to Overview</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-40 flex bg-background">
      {isDesktop ? (
        <>
          <AssistantNavRail />
          <div className="w-64 shrink-0 border-r border-sidebar-border">
            <ChatSidebar activeChatId={activeChatId} onSelectChat={handleSelectChat} />
          </div>
        </>
      ) : (
        <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
          <SheetContent side="left" className="w-[22rem] p-0">
            <SheetTitle className="sr-only">Conversations</SheetTitle>
            <div className="flex h-full">
              <AssistantNavRail />
              <div className="min-w-0 flex-1">
                <ChatSidebar activeChatId={activeChatId} onSelectChat={handleSelectChat} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open conversations"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="size-5" />
          </Button>

          <Logo className="md:hidden" size="sm" />

          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <NotificationBell />
            <UserMenu />
          </div>
        </header>

        {isNewChat ? (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <NewChatHero onSend={sendMessage} onStop={() => void streaming.cancel()} isStreaming={isStreamingHere} />
          </div>
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <ChatMessages chatId={activeChatId as string} onSelectPrompt={sendMessage} />
            </div>

            <div className="mx-auto flex w-full max-w-3xl shrink-0 flex-col gap-2 px-4 pb-4">
              <ChatComposer onSend={sendMessage} onStop={() => void streaming.cancel()} isStreaming={isStreamingHere} />
              <FinancialDisclaimer />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
