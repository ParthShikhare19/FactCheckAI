"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./navbar"

export function NavbarWrapper() {
  const pathname = usePathname()
  
  // Hide navbar on dashboard, chat, signin, and signup pages
  const hideNavbar = pathname?.startsWith("/dashboard") || 
                     pathname?.startsWith("/chat") ||
                     pathname?.startsWith("/signin") ||
                     pathname?.startsWith("/signup")
  
  if (hideNavbar) return null
  
  return <Navbar />
}
