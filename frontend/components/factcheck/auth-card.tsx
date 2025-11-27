"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SocialButtons } from "./social-buttons"
import type { ReactNode } from "react"

export function AuthCard({
  title,
  description,
  children,
  footer,
  onGoogle,
  onTwitter,
}: {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  onGoogle?: () => void
  onTwitter?: () => void
}) {
  return (
    <Card className="w-full max-w-md border bg-background shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="grid gap-6">
        <SocialButtons onGoogle={onGoogle} onTwitter={onTwitter} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {children}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">{footer}</CardFooter>
    </Card>
  )
}
