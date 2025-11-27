import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FactCheckAI</p>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground">
            GitHub
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
