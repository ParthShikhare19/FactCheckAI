"use client"

import { Button } from "@/components/ui/button"
import { Twitter } from "lucide-react"

export function SocialButtons({ onGoogle, onTwitter }: { onGoogle?: () => void; onTwitter?: () => void }) {
  return (
    <div className="grid gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onGoogle}
        className="w-full justify-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 bg-transparent"
        aria-label="Continue with Google"
      >
        <span
          aria-hidden="true"
          className="inline-flex size-5 items-center justify-center rounded bg-white text-blue-600 ring-1 ring-inset ring-blue-600 dark:bg-transparent"
        >
          G
        </span>
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onTwitter}
        className="w-full justify-center gap-2 bg-transparent"
        aria-label="Continue with X / Twitter"
      >
        <Twitter className="size-4" aria-hidden="true" />
        Continue with X / Twitter
      </Button>
    </div>
  )
}
