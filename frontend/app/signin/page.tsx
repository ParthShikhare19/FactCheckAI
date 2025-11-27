"use client"

import { type FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AuthCard } from "@/components/factcheck/auth-card"
import { InputField } from "@/components/factcheck/input-field"

async function signInWithEmailPassword(payload: { email: string; password: string }) {
  console.log("[v0] Sign in payload:", payload)
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true }
}

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    const email = String(formData.get("email") || "")
    const password = String(formData.get("password") || "")

    try {
      setLoading(true)
      const res = await signInWithEmailPassword({ email, password })
      if (!res.ok) throw new Error("Invalid credentials")
      localStorage.setItem("user", JSON.stringify({ email }))
      router.push("/dashboard")
    } catch (err: any) {
      setError(err?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
        <AuthCard
          title="Welcome back"
          description="Sign in to continue verifying."
          onGoogle={() => console.log("[v0] TODO: Google sign in")}
          onTwitter={() => console.log("[v0] TODO: X/Twitter sign in")}
          footer={
            <div className="flex items-center gap-2">
              <Link href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
              <span aria-hidden>•</span>
              <span>
                New here?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Create an account
                </Link>
                .
              </span>
            </div>
          }
        >
          <form onSubmit={onSubmit} className="grid gap-4">
            <InputField id="email" type="email" label="Email" autoComplete="email" placeholder="jane@example.com" />
            <InputField id="password" type="password" label="Password" autoComplete="current-password" />

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </AuthCard>
      </div>
    </main>
  )
}
