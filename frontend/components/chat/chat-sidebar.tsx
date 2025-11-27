"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

type Conversation = {
  id: string
  title: string
  createdAt: number
}

type Props = {
  conversations: Conversation[]
  activeId: string | null
  onNew: () => void
  onSelect: (id: string) => void
}

export function ChatSidebar({ conversations, activeId, onNew, onSelect }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn("border-r border-border bg-background", isCollapsed ? "w-14" : "w-64", "hidden md:flex flex-col")}
    >
      <div className="flex items-center gap-2 p-3 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Image
              src="/images/factcheckai-logo.png"
              alt="FactCheckAI logo"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="text-sm font-medium">FactCheckAI</span>
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" onClick={onNew} className="gap-1">
            <Plus className="h-4 w-4" /> {!isCollapsed && <span>New chat</span>}
          </Button>
          <button
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="text-xs text-muted-foreground hover:text-foreground px-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "›" : "‹"}
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground p-2">No conversations yet</p>
          ) : (
            conversations
              .slice()
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((c) => (
                <button
                  key={c.id}
                  className={cn(
                    "w-full text-left text-sm rounded px-2 py-2 hover:bg-accent hover:text-accent-foreground",
                    activeId === c.id ? "bg-accent text-accent-foreground" : "",
                  )}
                  onClick={() => onSelect(c.id)}
                >
                  <div className="truncate">{c.title || "Untitled"}</div>
                </button>
              ))
          )}
        </nav>
      </ScrollArea>

      <div className="p-2 border-t border-border">
        <p className="text-[11px] text-muted-foreground leading-4">Tip: Use Shift+Enter for a newline</p>
      </div>
    </aside>
  )
}
