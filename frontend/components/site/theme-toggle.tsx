"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
