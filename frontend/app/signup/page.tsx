"use client"

import { type FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AuthCard } from "@/components/factcheck/auth-card"
import { InputField } from "@/components/factcheck/input-field"

// Placeholder API call for future integration (Supabase/Auth.js/custom)
async function signUpWithEmailPassword(payload: {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}) {
  console.log("[v0] Sign up payload:", payload)
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true }
}

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    const fullName = String(formData.get("fullName") || "")
    const email = String(formData.get("email") || "")
    const password = String(formData.get("password") || "")
    const confirmPassword = String(formData.get("confirmPassword") || "")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      setLoading(true)
      const res = await signUpWithEmailPassword({ fullName, email, password, confirmPassword })
      if (!res.ok) throw new Error("Sign up failed")
      localStorage.setItem("user", JSON.stringify({ email, fullName }))
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
          title="Create your account"
          description="Join FactCheckAI to verify claims anywhere."
          onGoogle={() => console.log("[v0] TODO: Google sign up")}
          onTwitter={() => console.log("[v0] TODO: X/Twitter sign up")}
          footer={
            <div>
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
              .
            </div>
          }
        >
          <form onSubmit={onSubmit} className="grid gap-4">
            <InputField id="fullName" label="Full Name" autoComplete="name" placeholder="Jane Doe" />
            <InputField id="email" type="email" label="Email" autoComplete="email" placeholder="jane@example.com" />
            <InputField id="password" type="password" label="Password" autoComplete="new-password" />
            <InputField id="confirmPassword" type="password" label="Confirm Password" autoComplete="new-password" />

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Creating account…" : "Sign Up"}
            </Button>
          </form>
        </AuthCard>
      </div>
    </main>
  )
}
