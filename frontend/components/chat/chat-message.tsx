"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: Props) {
  return (
    <div className={cn("w-full flex gap-3", role === "assistant" ? "bg-muted/40" : "")} role="listitem">
      <div className="pt-2 pl-2">
        {role === "assistant" ? (
          <Image src="/images/factcheckai-logo.png" alt="Assistant avatar" width={24} height={24} className="rounded" />
        ) : (
          <div
            className="h-6 w-6 rounded bg-blue-600/80 text-white flex items-center justify-center text-[11px]"
            aria-label="You"
          >
            Y
          </div>
        )}
      </div>
      <div className="py-3 pr-3">
        <p className="whitespace-pre-wrap text-sm leading-6 text-pretty">{content}</p>
      </div>
    </div>
  )
}
