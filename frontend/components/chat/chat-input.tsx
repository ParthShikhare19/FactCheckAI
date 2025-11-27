"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

type Props = {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("")
  const ref = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  function handleSubmit() {
    const text = value.trim()
    if (!text) return
    onSend(text)
    setValue("")
  }

  return (
    <div className="border-t border-border bg-background">
      <div className="mx-auto max-w-3xl p-3">
        <div className="flex items-end gap-2">
          <Textarea
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask FactCheckAI anything..."
            className="min-h-[44px] max-h-48"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            aria-label="Message"
            disabled={disabled}
          />
          <Button onClick={handleSubmit} disabled={disabled || !value.trim()} className="h-[44px]">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">Shift+Enter for newline</p>
      </div>
    </div>
  )
}
