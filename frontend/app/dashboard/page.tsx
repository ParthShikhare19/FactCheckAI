"use client"

import { useMemo, useState } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatInput } from "@/components/chat/chat-input"
import { DashboardNavbar } from "@/components/site/dashboard-navbar"

type Msg = { id: string; role: "user" | "assistant"; content: string }
type Conv = { id: string; title: string; createdAt: number; messages: Msg[] }

export default function DashboardPage() {
  const [conversations, setConversations] = useState<Conv[]>(() => [
    {
      id: "welcome",
      title: "Welcome to FactCheckAI",
      createdAt: Date.now(),
      messages: [
        {
          id: "m1",
          role: "assistant",
          content:
            "Hello! Welcome to FactCheckAI. Ask any claim you'd like me to fact-check, and I'll help verify it for you.",
        },
      ],
    },
  ])
  const [activeId, setActiveId] = useState<string>("welcome")
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useMemo(() => conversations.find((c) => c.id === activeId) || null, [conversations, activeId])

  function newConversation() {
    const id = crypto.randomUUID()
    const conv: Conv = {
      id,
      title: "New chat",
      createdAt: Date.now(),
      messages: [{ id: crypto.randomUUID(), role: "assistant", content: "How can I help you fact-check today?" }],
    }
    setConversations((prev) => [conv, ...prev])
    setActiveId(id)
  }

  function selectConversation(id: string) {
    setActiveId(id)
    setMobileOpen(false)
  }

  function sendMessage(text: string) {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              title: c.title === "New chat" || c.title === "Welcome to FactCheckAI" ? text.slice(0, 40) : c.title,
              messages: [...c.messages, { id: crypto.randomUUID(), role: "user", content: text }],
            }
          : c,
      ),
    )

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content:
                      "I'm analyzing this claim. In production, this would connect to your fact-checking AI backend.",
                  },
                ],
              }
            : c,
        ),
      )
    }, 500)
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <DashboardNavbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <ChatSidebar
          conversations={conversations.map(({ id, title, createdAt }) => ({ id, title, createdAt }))}
          activeId={activeId}
          onNew={newConversation}
          onSelect={selectConversation}
        />

        <main className="flex-1 flex flex-col">
          {/* Messages area - clean and readable */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl p-6 space-y-4 w-full" role="list" aria-label="Messages">
              {active?.messages.map((m) => (
                <ChatMessage key={m.id} role={m.role} content={m.content} />
              ))}
            </div>
          </div>

          {/* Input area */}
          <ChatInput onSend={sendMessage} />
        </main>
      </div>
    </div>
  )
}
