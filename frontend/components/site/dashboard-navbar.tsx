"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#features", label: "Features" },
  { href: "/#testimonials", label: "Testimonials" },
]

export function DashboardNavbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/factcheckai-logo.png"
            alt="FactCheckAI logo"
            width={28}
            height={28}
            className="rounded-sm"
            priority
          />
          <span className="font-semibold hidden sm:inline">FactCheckAI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side - theme toggle and logout */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Logout</span>
          </Button>

          {/* Mobile menu toggle */}
          <button
            className="inline-flex items-center justify-center rounded md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-2">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded px-3 py-2 text-sm hover:bg-muted transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
