"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
            Fact checking, accelerated by AI
          </div>

          <h1 className={cn("text-pretty font-sans text-4xl font-semibold tracking-tight md:text-6xl")}>FactCheckAI</h1>
          <p className="text-balance text-lg text-muted-foreground md:text-xl">
            Instant Truth. Anywhere. Combat misinformation in real time with AI-powered verification across the web,
            apps, and messages. Built for journalists, researchers, and informed citizens.
          </p>

          <div className="flex items-center gap-3">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white" aria-label="Get Started">
              <Link href="/signup">Get Started</Link>
            </Button>
            {/* removed secondary button */}
          </div>

          {/* removed grid of placeholder images */}
        </div>
      </div>
    </section>
  )
}
