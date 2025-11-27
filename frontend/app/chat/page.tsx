"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatInput } from "@/components/chat/chat-input"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { Button } from "@/components/ui/button"

type Msg = { id: string; role: "user" | "assistant"; content: string }
type Conv = { id: string; title: string; createdAt: number; messages: Msg[] }

export default function ChatPage() {
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
            "Hello! This is a demo chat UI. Ask a question and I will respond. You can add multiple conversations from the sidebar.",
        },
      ],
    },
  ])
  const [activeId, setActiveId] = useState<string>("welcome")
  const active = useMemo(() => conversations.find((c) => c.id === activeId) || null, [conversations, activeId])

  function newConversation() {
    const id = crypto.randomUUID()
    const conv: Conv = {
      id,
      title: "New chat",
      createdAt: Date.now(),
      messages: [{ id: crypto.randomUUID(), role: "assistant", content: "How can I help you today?" }],
    }
    setConversations((prev) => [conv, ...prev])
    setActiveId(id)
  }

  function selectConversation(id: string) {
    setActiveId(id)
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

    // Simulated assistant reply (replace with AI SDK)
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
                      "I'm a placeholder assistant response. In production, wire this to your AI backend (e.g., Vercel AI SDK).",
                  },
                ],
              }
            : c,
        ),
      )
    }, 500)
  }

  return (
    <div className="h-[100dvh] flex bg-background text-foreground">
      <ChatSidebar
        conversations={conversations.map(({ id, title, createdAt }) => ({ id, title, createdAt }))}
        activeId={activeId}
        onNew={newConversation}
        onSelect={selectConversation}
      />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-4xl flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Image
                src="/images/factcheckai-logo.png"
                alt="FactCheckAI logo"
                width={24}
                height={24}
                className="rounded"
              />
              <h1 className="text-sm font-medium">FactCheckAI Chat</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="text-sm">
                <a href="/">Home</a>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl p-4 space-y-3" role="list" aria-label="Messages">
            {active?.messages.map((m) => (
              <ChatMessage key={m.id} role={m.role} content={m.content} />
            ))}
          </div>
        </div>

        {/* Input */}
        <ChatInput onSend={sendMessage} />
      </main>
    </div>
  )
}
