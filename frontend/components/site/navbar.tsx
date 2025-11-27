"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#features", label: "Features" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/signin", label: "Sign in" },
  { href: "/signup", label: "Sign up" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* Using provided logo */}
          <Image
            src="/images/factcheckai-logo.png"
            alt="FactCheckAI logo"
            width={28}
            height={28}
            className="rounded-sm"
            priority
          />
          <span className="font-semibold">FactCheckAI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          {links.slice(0, 4).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("rounded px-3 py-2 text-sm text-muted-foreground hover:text-foreground")}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/signin">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="inline-flex items-center justify-center rounded md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-2">
            <div className="flex flex-col gap-1">
              {links.slice(0, 4).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-1 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-2 px-1 py-2">
                <Link href="/signin" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
